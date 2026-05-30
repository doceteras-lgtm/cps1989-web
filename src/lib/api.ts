/**
 * Contact form pega a terium-leads-api (servicio cross-marca).
 *
 * Producción: `VITE_CONTACT_API_URL=https://api.terium-app.com/api/v1`.
 * El payload viaja con `source: "cps1989"` — debe estar registrado en
 * `terium-leads-api/src/lib/brand.ts` (SOURCES + BRAND) o el server
 * responde 400.
 *
 * El insert real vive en terium-app Supabase, schema `terium_leads`,
 * tabla `cps1989`. El field `metadata` lleva campos landing-specific
 * (tipo, plaga, metros) que el backend rutea a esas columnas.
 *
 * ## Robustez
 *
 * Este wrapper tiene auto-retry y timeout porque el caso real es:
 *   1. El form se envía
 *   2. El backend procesa OK (email + insert) pero la conexión TCP se
 *      cae antes de que la respuesta 200 llegue al browser
 *   3. fetch() lanza un TypeError de red — sin status code
 *   4. La UI muestra "error" aunque el lead sí quedó registrado
 *
 * El fix:
 *   - AbortController con timeout 30s para no colgar indefinido
 *   - Retry automático en network errors y 5xx (no 4xx)
 *   - Identifica el tipo de fallo en ApiError.kind para que la UI
 *     diferencie network-ambiguo de server-real
 */

const CONTACT_API =
  (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ??
  'http://localhost:3030/api/v1'

const REQUEST_TIMEOUT_MS = 30_000
const MAX_RETRIES = 2
const RETRY_DELAYS_MS = [1000, 3000] // backoff: 1s, 3s

export interface ContactPayload {
  nombre: string
  email: string
  telefono?: string
  organizacion?: string
  mensaje?: string
  honeypot?: string
  metadata?: Record<string, string | number | boolean | null>
}

/**
 * Tipo de error para que el caller decida UX:
 * - `network`: fetch nunca obtuvo respuesta. El backend QUIZÁS procesó.
 *              UI debería sugerir esperar antes de reintentar.
 * - `server`:  respuesta HTTP no-OK con status code. Backend sabe que
 *              algo falló; el lead NO se procesó.
 * - `timeout`: AbortController cortó. Mismo tratamiento que network.
 */
export type ApiErrorKind = 'network' | 'server' | 'timeout'

export interface ApiError extends Error {
  kind: ApiErrorKind
  /** Solo presente cuando kind === 'server' */
  status?: number
  payload?: unknown
}

function makeError(kind: ApiErrorKind, message: string, status?: number, payload?: unknown): ApiError {
  const err = new Error(message) as ApiError
  err.kind = kind
  if (status !== undefined) err.status = status
  if (payload !== undefined) err.payload = payload
  return err
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Una sola tentativa de POST. Lanza ApiError tipado para que el wrapper
 * de arriba decida si reintentar.
 */
async function attemptSubmit(payload: ContactPayload): Promise<{ ok: boolean }> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let res: Response
  try {
    res = await fetch(`${CONTACT_API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'cps1989' }),
      signal: controller.signal,
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      throw makeError('timeout', 'Request timed out')
    }
    // TypeError de fetch = error de red genuino. No sabemos si el server lo recibió.
    throw makeError('network', (err as Error).message || 'Network error')
  } finally {
    clearTimeout(timer)
  }

  const contentType = res.headers.get('content-type') ?? ''
  const body = contentType.includes('application/json')
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null)

  if (!res.ok) {
    const msg =
      body && typeof body === 'object' && 'error' in (body as Record<string, unknown>)
        ? String((body as { error?: unknown }).error ?? `HTTP ${res.status}`)
        : `HTTP ${res.status}`
    throw makeError('server', msg, res.status, body)
  }
  return body as { ok: boolean }
}

/**
 * Submit con retry automático.
 *
 * Política de retry:
 *   - `network` y `timeout`: 2 retries con backoff 1s, 3s
 *   - `server` 5xx (excepto 503): 2 retries con backoff
 *   - `server` 4xx: NO retry (es problema de la request, no transitorio)
 *   - `server` 429: NO retry (rate-limit, el server quiere que espere)
 *
 * Si todos los retries fallan, propaga el último error con su kind original.
 */
export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean }> {
  let lastError: ApiError | undefined
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await attemptSubmit(payload)
    } catch (err) {
      lastError = err as ApiError
      const shouldRetry =
        attempt < MAX_RETRIES &&
        (lastError.kind === 'network' ||
          lastError.kind === 'timeout' ||
          (lastError.kind === 'server' &&
            lastError.status !== undefined &&
            lastError.status >= 500 &&
            lastError.status !== 503))
      if (!shouldRetry) throw lastError
      await sleep(RETRY_DELAYS_MS[attempt] ?? RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]!)
    }
  }
  throw lastError ?? makeError('network', 'Unknown error')
}
