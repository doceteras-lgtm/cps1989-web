/**
 * Contact form pega a terium-leads-api (servicio cross-marca).
 *
 * Producción: `VITE_CONTACT_API_URL=https://api.terium-app.com/api/v1`.
 * El payload viaja con `source: "cps1989"` — debe estar registrado en
 * `terium-leads-api/src/lib/brand.ts` (SOURCES + BRAND) o el server
 * responde 400.
 *
 * El campo `metadata` se persiste en `teriumx_sv.cps1989_lead_intake`
 * (staging del CRM Omaha) — ahí va `tipo`, `plaga`, `metros`, etc.
 */
const CONTACT_API =
  (import.meta.env.VITE_CONTACT_API_URL as string | undefined) ??
  'http://localhost:3030/api/v1'

export interface ContactPayload {
  nombre: string
  email: string
  telefono?: string
  organizacion?: string
  mensaje?: string
  honeypot?: string
  metadata?: Record<string, string | number | boolean | null>
}

export interface ApiError extends Error {
  status: number
  payload?: unknown
}

export async function submitContact(payload: ContactPayload): Promise<{ ok: boolean }> {
  const res = await fetch(`${CONTACT_API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, source: 'cps1989' }),
  })
  const contentType = res.headers.get('content-type') ?? ''
  const body = contentType.includes('application/json')
    ? await res.json().catch(() => null)
    : await res.text().catch(() => null)

  if (!res.ok) {
    const msg =
      body && typeof body === 'object' && 'error' in (body as Record<string, unknown>)
        ? String((body as { error?: unknown }).error ?? `HTTP ${res.status}`)
        : `HTTP ${res.status}`
    const err = new Error(msg) as ApiError
    err.status = res.status
    err.payload = body
    throw err
  }
  return body as { ok: boolean }
}
