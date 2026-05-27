# cps1989-web

Landing de marketing para **CPS · Control de Plagas y Sanidad** (cps1989.com).

Marca independiente — no es parte de la familia Terium aunque comparte stack,
servicio de leads y base de datos (esquema `teriumx_sv` del CRM Omaha).

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS 3.4 + shadcn primitives (button, input, label, textarea)
- Lucide icons + Inter + Playfair Display (Google Fonts)
- Deploy: Vercel
- Form de leads → `POST /api/v1/contact` en `terium-leads-api`
- Persistencia en CRM Omaha → `teriumx_sv.cps1989_lead_intake`

## Dev

```bash
npm install
cp .env.example .env       # apunta a localhost:3030 por default
npm run dev                # http://localhost:5175
```

## Build

```bash
npm run build              # genera dist/
npm run preview            # sirve dist/ localmente
```

## Deploy a Vercel

1. Conectar el repo en Vercel (framework: Vite).
2. Configurar variable de entorno:
   - `VITE_CONTACT_API_URL=https://api.terium-app.com/api/v1`
3. Asignar dominio `cps1989.com` (DNS apunta a Vercel — registrar en HostGator
   con NS `ns1/2.vercel-dns.com`).

## Backend de leads

El form hace `POST /api/v1/contact` a [`terium-leads-api`](../terium-leads-api/)
con `source: "cps1989"` y un objeto `metadata` con campos específicos de CPS:

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "telefono": "5555550100",
  "organizacion": "Acme",
  "mensaje": "…",
  "source": "cps1989",
  "metadata": {
    "tipo": "empresa",     // "empresa" | "casa"
    "plaga": "cucaracha",  // key del catálogo de plagas
    "metros": "350 m²"
  }
}
```

El backend hace **dos cosas**:

1. **Envía email branded "CPS · 1989"** vía Resend a `hola@terium-app.com`.
2. **Inserta el lead** en `teriumx_sv.cps1989_lead_intake` (tabla staging del
   CRM Omaha) si `DATABASE_URL` está configurado. El insert falla silencioso
   para no romper el form si la DB está caída.

### Requisitos para que la integración funcione

| # | Requisito | Estado |
|---|---|---|
| 1 | `cps1989` registrado en `terium-leads-api/src/lib/brand.ts` (SOURCES + BRAND) | ✅ hecho |
| 2 | `metadata` aceptado en el zod schema de `/contact` | ✅ hecho |
| 3 | Bootstrap idempotente `ensureCps1989LeadTables()` corre al boot del API | ✅ hecho |
| 4 | **Redeployar `terium-leads-api`** en Railway con los cambios anteriores | ⏳ pendiente |
| 5 | `DATABASE_URL` ya configurado en Railway (compartido con meta-leads) | ✅ ya estaba |
| 6 | `cps1989.com` + `www.cps1989.com` añadidos a `CORS_ORIGINS` en Railway | ⏳ pendiente |

### Tabla `teriumx_sv.cps1989_lead_intake`

Se crea automáticamente al boot. Schema:

```sql
CREATE TABLE teriumx_sv.cps1989_lead_intake (
  intake_id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre            text NOT NULL,
  email             text NOT NULL,
  telefono          text,
  organizacion      text,
  mensaje           text,
  tipo              text,        -- 'empresa' | 'casa'
  plaga             text,        -- cucaracha, hormiga, roedor, alacran, etc.
  metros            text,
  origen            text,        -- hostname (cps1989.com, etc.)
  ip                text,
  user_agent        text,
  raw_payload       jsonb NOT NULL DEFAULT '{}',
  converted_lead_id uuid,        -- nullable; se llena cuando se promueve a lead real
  converted_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);
```

Es **tabla staging**: los leads viven aquí hasta que alguien (admin, agente
o un job futuro) los promueva a la tabla `leads` viva del CRM Omaha. Mientras
tanto, son visibles via consulta SQL desde Supabase o desde un panel admin
que se conecte al schema `teriumx_sv`.

### Promover leads a CRM Omaha (manual por ahora)

```sql
-- Listar leads no procesados
SELECT intake_id, created_at, tipo, plaga, nombre, email, telefono, mensaje
FROM teriumx_sv.cps1989_lead_intake
WHERE converted_at IS NULL
ORDER BY created_at DESC;

-- Marcar como convertido (cuando se cree el lead real en la tabla viva)
UPDATE teriumx_sv.cps1989_lead_intake
SET converted_lead_id = '<uuid-del-lead-creado>',
    converted_at      = now()
WHERE intake_id = '<intake-id>';
```

## Estructura

```
src/
  main.tsx                 — entrypoint
  MarketingLanding.tsx     — todas las secciones (Hero, TrustBand,
                              AudienceSplit empresa/casa, PestsCatalog,
                              Servicios, Cicoplafest, Timeline, Cobertura,
                              Contact, Footer)
  index.css                — tokens HSL del tema CPS (forest + cream + lime)
  lib/
    api.ts                 — fetch al endpoint de leads con metadata
    utils.ts               — cn() helper (clsx + tailwind-merge)
  components/ui/           — primitives shadcn (button, input, label, textarea)
public/
  favicon.svg              — logo CPS
  img/                     — placeholder folder; cliente entrega fotos reales
```

## Decisiones de marca

- **Nombre comercial:** se mantiene "CPS" (logo existente del cliente) y se
  refuerza con el año de fundación `1989` como sello de heritage.
- **Tagline:** "Calidad, Protección, Salud" — re-significación de las siglas.
- **Paleta:** verde forest (sanidad) + crema cálido + lime accent.
- **Tipografía:** Inter (body) + Playfair Display (headings).
- **Audiencia:** empresas + casas con tracks visualmente distintos pero mismo
  estándar de servicio.
- **Diferenciador principal en B2B:** certificado por servicio + ficha técnica
  + permisos CICOPLAFEST (autorización 1-2607 para Cipermetrina 40% PM, Cat. IV).
