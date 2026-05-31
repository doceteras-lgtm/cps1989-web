import { useEffect, useState } from 'react'
import {
  Activity,
  ArrowRight,
  Award,
  Bug,
  Building2,
  CheckCircle2,
  Clock,
  FileBadge,
  FileText,
  Home,
  Leaf,
  Loader2,
  Mail,
  MapPin,
  Rat,
  Send,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Target,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitContact, type ApiError } from '@/lib/api'

type Audience = 'empresa' | 'casa'

const PESTS_HOME: { key: string; label: string; tier: 'top' | 'mid' | 'other' }[] = [
  { key: 'cucaracha', label: 'Cucaracha', tier: 'top' },
  { key: 'hormiga', label: 'Hormiga', tier: 'top' },
  { key: 'roedor', label: 'Roedores', tier: 'mid' },
  { key: 'alacran', label: 'Alacrán', tier: 'mid' },
  { key: 'polilla', label: 'Polilla', tier: 'other' },
  { key: 'termita', label: 'Termita', tier: 'other' },
  { key: 'pulga', label: 'Pulga', tier: 'other' },
  { key: 'chinche', label: 'Chinche', tier: 'other' },
  { key: 'cara_nino', label: 'Cara de niño', tier: 'other' },
  { key: 'gallina_ciega', label: 'Gallina ciega', tier: 'other' },
]

export function MarketingLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <TrustBand />
      <AudienceSplit />
      <PestsCatalog />
      <Servicios />
      <Cicoplafest />
      <Timeline />
      <Cobertura />
      <ContactSection />
      <Footer />
    </div>
  )
}

/* ============================================================
   Header
============================================================ */
function Header() {
  return (
    <header className="border-b bg-card/85 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#servicios" className="hover:text-foreground transition-colors">Servicios</a>
          <a href="#empresas-casa" className="hover:text-foreground transition-colors">Empresas / Casa</a>
          <a href="#plagas" className="hover:text-foreground transition-colors">Plagas</a>
          <a href="#cicoplafest" className="hover:text-foreground transition-colors">Permisos</a>
          <a href="#historia" className="hover:text-foreground transition-colors">Historia</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contacto">
            <Button
              size="sm"
              className="bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] hover:bg-[hsl(var(--brand-dark))]/90"
            >
              Cotizar servicio
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 font-semibold tracking-tight">
      <BrandMark size={36} />
      <div className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-foreground">CPS</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Desde 1989
        </span>
      </div>
    </a>
  )
}

function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <rect width="40" height="40" rx="9" fill="hsl(var(--brand-dark))" />
      <text
        x="50%"
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="hsl(var(--brand-cream))"
        fontSize="14"
        fontWeight="800"
        fontFamily="Inter, system-ui, sans-serif"
      >
        CPS
      </text>
    </svg>
  )
}

/* ============================================================
   Hero — dark band + inline SVG illustration
============================================================ */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))]">
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, hsl(var(--brand-lime)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--brand-amber)) 0, transparent 50%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-28">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider mb-6">
              <Award className="h-3.5 w-3.5" />
              Distintivo H · Televisa San Ángel · 1996
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              36 años protegiendo
              <br />
              casas y empresas
              <br />
              <span className="text-[hsl(var(--brand-lime))]">de lo que no se ve.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-white/80 leading-relaxed">
              <strong className="font-semibold text-white">CPS · Control de Plagas y Sanidad</strong>{' '}
              — desde <strong>1989</strong> aplicando productos con permiso CICOPLAFEST
              en casas, comedores industriales, hoteles, restaurantes, hospitales
              y corporativos.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contacto">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-dark))] hover:bg-[hsl(var(--brand-lime))]/90 font-semibold"
                >
                  Cotizar mi servicio
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href="#empresas-casa">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  ¿Empresa o casa?
                </Button>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand-lime))]" />
                Licencia federal 93-033
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand-lime))]" />
                Productos CICOPLAFEST
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand-lime))]" />
                Atención inmediata
              </span>
            </div>
          </div>

          <div className="md:col-span-5">
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Hero image — foto profesional de fumigación desde Pexels CDN.
 *
 * Imagen actual: técnico cuerpo entero con overol blanco completo,
 * capucha, lentes, respirador y guantes azules, sosteniendo aspersora
 * con vapor saliendo. Ambiente residencial luminoso. Pose confiada,
 * frontal — comunica "experto en acción" sin ser amenazante.
 *
 * Source: Pexels (https://www.pexels.com/photo/4176412/).
 * License Pexels: gratis uso comercial, no requiere attribution.
 * Photo de Polina Tankilevitch.
 *
 * Cuando el cliente CPS entregue fotos reales del equipo, reemplazar
 * `baseUrl` por `/img/hero.jpg` y conservar el patrón de srcSet.
 *
 * Performance:
 * - srcSet responsive: 600w, 900w, 1200w. Mobile descarga la chica,
 *   desktop la grande.
 * - loading="eager" + fetchPriority="high" porque es above-the-fold.
 * - Fallback gradient lime→dark detrás del img: si Pexels devuelve 404
 *   algún día, el contenedor no queda blanco.
 * - Badges anclados abajo refuerzan marca + categoría toxicológica.
 */
function HeroImage() {
  const baseUrl = 'https://images.pexels.com/photos/4176412/pexels-photo-4176412.jpeg'
  const buildSrc = (w: number) => `${baseUrl}?auto=compress&cs=tinysrgb&w=${w}`
  return (
    <div className="relative aspect-[4/5] max-w-md mx-auto">
      {/* Fallback color visible mientras carga o si la imagen falla */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--brand-lime)) 0%, hsl(var(--brand-dark)) 100%)',
        }}
      />
      <img
        src={buildSrc(900)}
        srcSet={`${buildSrc(600)} 600w, ${buildSrc(900)} 900w, ${buildSrc(1200)} 1200w`}
        sizes="(min-width: 768px) 400px, 100vw"
        alt="Técnico de CPS aplicando tratamiento con overol blanco, respirador y aspersora profesional"
        loading="eager"
        fetchPriority="high"
        className="relative w-full h-full object-cover rounded-3xl shadow-2xl ring-1 ring-white/10"
      />
      {/* Overlay de tinte verde para integrar con el hero dark */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 50%, hsl(var(--brand-dark) / 0.45) 100%)',
        }}
      />
      {/* Badge de marca anclado abajo-izquierda */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-[hsl(var(--brand-dark))]/85 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--brand-cream))]">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-dark))] text-[9px] font-extrabold">
            CPS
          </span>
          Desde 1989
        </div>
        <div className="bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-dark))] rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider">
          Categoría IV
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Trust band
============================================================ */
function TrustBand() {
  const items = [
    { icon: Award, label: 'Distintivo H', sub: 'Televisa San Ángel · 1996' },
    { icon: FileBadge, label: 'Licencia 93-033', sub: 'Aplicación plaguicidas urbano y jardinería' },
    { icon: ShieldCheck, label: 'CICOPLAFEST', sub: 'Permisos vigentes por producto' },
    { icon: Users, label: 'Asociación Fumigadores', sub: 'Estado de México · desde 1991' },
  ]
  return (
    <section className="border-b bg-[hsl(var(--brand-cream))]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.label} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))]">
                <it.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-sm text-foreground">{it.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Empresas vs Casa — split section
============================================================ */
function AudienceSplit() {
  return (
    <section id="empresas-casa" className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Empresas y casa"
          title="Dos servicios, un mismo estándar de sanidad."
          sub="Mismos productos certificados, misma rigurosidad. Lo que cambia es el alcance, los entregables y la frecuencia."
        />
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <AudienceCard
            kind="empresa"
            icon={Building2}
            title="Para empresas"
            tagline="Para auditorías sanitarias serias."
            highlights={[
              { icon: FileText, text: 'Certificado por servicio (entregable formal)' },
              { icon: FileBadge, text: 'Fichas técnicas de cada producto aplicado' },
              { icon: ShieldCheck, text: 'Permisos CICOPLAFEST a disposición del cliente' },
              { icon: Clock, text: 'Mantenimiento programado (mensual / bimestral)' },
              { icon: Sparkles, text: 'Cajas con llave de seguridad y nebulización industrial' },
            ]}
            cta="Cotizar para mi empresa"
          />
          <AudienceCard
            kind="casa"
            icon={Home}
            title="Para casa"
            tagline="Discreto, rápido y efectivo."
            highlights={[
              { icon: Bug, text: 'Especialistas en cucaracha y hormiga (las más comunes)' },
              { icon: Rat, text: 'Roedores, alacrán y plagas estacionales' },
              { icon: SprayCan, text: 'Productos categoría toxicológica IV (la más baja)' },
              { icon: Clock, text: 'Servicios puntuales o esquema preventivo' },
              { icon: ShieldCheck, text: 'Seguro para mascotas con resguardo recomendado' },
            ]}
            cta="Cotizar para mi casa"
          />
        </div>
      </div>
    </section>
  )
}

function AudienceCard({
  kind,
  icon: Icon,
  title,
  tagline,
  highlights,
  cta,
}: {
  kind: Audience
  icon: typeof Building2
  title: string
  tagline: string
  highlights: { icon: typeof CheckCircle2; text: string }[]
  cta: string
}) {
  const isEmpresa = kind === 'empresa'
  return (
    <article
      className={
        isEmpresa
          ? 'group relative rounded-3xl bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] p-8 md:p-10 overflow-hidden'
          : 'group relative rounded-3xl bg-[hsl(var(--brand-cream))] text-foreground p-8 md:p-10 overflow-hidden border border-[hsl(var(--brand-dark))]/10'
      }
    >
      <span
        className={
          isEmpresa
            ? 'inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-dark))]'
            : 'inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))]'
        }
      >
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-6 font-display text-3xl md:text-4xl font-extrabold tracking-tight">
        {title}
      </h3>
      <p
        className={
          isEmpresa
            ? 'mt-2 text-[hsl(var(--brand-lime))] font-medium text-sm uppercase tracking-wider'
            : 'mt-2 text-[hsl(var(--brand-dark))] font-medium text-sm uppercase tracking-wider'
        }
      >
        {tagline}
      </p>

      <ul className="mt-8 space-y-3">
        {highlights.map((h) => (
          <li key={h.text} className="flex items-start gap-3 text-sm">
            <span
              className={
                isEmpresa
                  ? 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10'
                  : 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-[hsl(var(--brand-dark))]/10'
              }
            >
              <h.icon className="h-4 w-4" />
            </span>
            <span className={isEmpresa ? 'text-white/90 leading-relaxed pt-1' : 'text-foreground/90 leading-relaxed pt-1'}>
              {h.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <a href="#contacto" onClick={() => preselectAudience(kind)}>
          <Button
            size="lg"
            className={
              isEmpresa
                ? 'bg-[hsl(var(--brand-lime))] text-[hsl(var(--brand-dark))] hover:bg-[hsl(var(--brand-lime))]/90 font-semibold'
                : 'bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] hover:bg-[hsl(var(--brand-dark))]/90 font-semibold'
            }
          >
            {cta}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </a>
      </div>
    </article>
  )
}

/**
 * Preselecciona empresa/casa en el form. El form ya está montado en la
 * misma página, así que sessionStorage solo cubre el caso "cargar fresca"
 * — para clicks in-page disparamos un CustomEvent que el form escucha y
 * actualiza su state. El href "#contacto" se encarga del scroll nativo.
 */
function preselectAudience(tipo: Audience) {
  try {
    sessionStorage.setItem('cps:preselect:tipo', tipo)
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cps:preselect', { detail: { tipo } }))
  }
}

/* ============================================================
   Catálogo de plagas
============================================================ */
function PestsCatalog() {
  const top = PESTS_HOME.filter((p) => p.tier === 'top')
  const mid = PESTS_HOME.filter((p) => p.tier === 'mid')
  const other = PESTS_HOME.filter((p) => p.tier === 'other')
  return (
    <section id="plagas" className="bg-[hsl(var(--brand-cream))] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Plagas que controlamos"
          title="Las que más nos piden en casa — y todas las demás."
          sub="Nuestro producto base CIPERMETRINA 40% PM (autorización CICOPLAFEST 1-2607) cubre la mayoría. Para roedores usamos cebos parafinados y anticoagulantes específicos."
        />

        <div className="mt-14 space-y-10">
          <PestTier
            title="Las más comunes en casa"
            subtitle="80% de las llamadas residenciales"
            pests={top}
            tone="primary"
          />
          <PestTier
            title="Le siguen"
            subtitle="Estacionales y muy frecuentes"
            pests={mid}
            tone="secondary"
          />
          <PestTier
            title="Otras plagas que tratamos"
            subtitle="Casos especializados y temporales"
            pests={other}
            tone="muted"
          />
        </div>
      </div>
    </section>
  )
}

function PestTier({
  title,
  subtitle,
  pests,
  tone,
}: {
  title: string
  subtitle: string
  pests: { key: string; label: string }[]
  tone: 'primary' | 'secondary' | 'muted'
}) {
  const dotClass =
    tone === 'primary'
      ? 'bg-[hsl(var(--brand-lime))]'
      : tone === 'secondary'
        ? 'bg-[hsl(var(--brand-amber))]'
        : 'bg-[hsl(var(--brand-dark))]/40'
  return (
    <div>
      <div className="flex items-baseline gap-3 mb-4">
        <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {pests.map((p) => (
          <a
            key={p.key}
            href="#contacto"
            onClick={() => preselectPest(p.key)}
            className="group rounded-xl bg-white border border-[hsl(var(--brand-dark))]/10 p-4 hover:border-[hsl(var(--brand-dark))] hover:shadow-sm transition-all text-center"
          >
            <PestGlyph pestKey={p.key} />
            <p className="mt-2 text-sm font-medium text-foreground">{p.label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

function preselectPest(pestKey: string) {
  try {
    sessionStorage.setItem('cps:preselect:plaga', pestKey)
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cps:preselect', { detail: { plaga: pestKey } }))
  }
}

/**
 * SVG glyph genérico por plaga. Lucide no tiene íconos para todas las
 * plagas mexicanas (alacrán, cara de niño, gallina ciega) así que usamos
 * un set propio de pictogramas simples.
 */
function PestGlyph({ pestKey }: { pestKey: string }) {
  const map: Record<string, React.ReactNode> = {
    cucaracha: <Bug className="h-7 w-7" />,
    hormiga: <Bug className="h-7 w-7" />,
    roedor: <Rat className="h-7 w-7" />,
    alacran: <Activity className="h-7 w-7" />,
    polilla: <Leaf className="h-7 w-7" />,
    termita: <Bug className="h-7 w-7" />,
    pulga: <Bug className="h-7 w-7" />,
    chinche: <Bug className="h-7 w-7" />,
    cara_nino: <Bug className="h-7 w-7" />,
    gallina_ciega: <Bug className="h-7 w-7" />,
  }
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--brand-dark))]/5 text-[hsl(var(--brand-dark))] group-hover:bg-[hsl(var(--brand-dark))] group-hover:text-[hsl(var(--brand-cream))] transition-colors">
      {map[pestKey] ?? <Bug className="h-7 w-7" />}
    </span>
  )
}

/* ============================================================
   Servicios técnicos
============================================================ */
function Servicios() {
  const services = [
    {
      icon: Bug,
      title: 'Desinsectización',
      desc: 'Aspersión con insecticidas vanguardistas y espolvoreo de humectables en áreas críticas. Sellado de drenajes y alcantarillas en cada visita.',
      bullets: ['Cebos gel para cucaracha', 'Sellado dentro y fuera del inmueble', 'Productos de uso industrial'],
    },
    {
      icon: Rat,
      title: 'Desratización',
      desc: 'Cebos parafinados, líquidos y concentrados. Trampas metálicas cuando aplique. Anticoagulantes que disecan al roedor — sin malos olores.',
      bullets: ['Cajas con llave de seguridad', 'Sellado de celdas y entradas', 'Mantenimiento del equipo incluido'],
    },
    {
      icon: SprayCan,
      title: 'Nebulización',
      desc: 'Servicio integral en todas las áreas, electrodomésticos, lockers y zonas de difícil acceso. Recomendado para cierres profundos o brotes activos.',
      bullets: ['Equipo industrial dedicado', 'Cobertura total del inmueble', 'Disponible bajo demanda'],
    },
    {
      icon: Target,
      title: 'Control de voladores',
      desc: 'Instalación de equipos insectronic para plagas voladoras en áreas donde el control químico no aplica. Mantenimiento de los equipos a cargo de CPS.',
      bullets: ['Instalación profesional', 'Mantenimiento incluido', 'Ideal para cocinas y comedores'],
    },
  ]
  return (
    <section id="servicios" className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Servicios técnicos"
          title="Cuatro frentes, un mismo protocolo."
          sub="Cada servicio diseñado para entornos exigentes — desde una cocina familiar hasta el lobby de un hotel. Productos vanguardistas, técnicos certificados, garantía respaldada."
        />
        <div className="mt-14 grid sm:grid-cols-2 gap-5">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative rounded-2xl border bg-card p-7 hover:border-[hsl(var(--brand-dark))]/30 hover:shadow-md transition-all"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] mb-5">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <ul className="mt-5 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-[hsl(var(--brand-lime))] shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CICOPLAFEST badge section
============================================================ */
function Cicoplafest() {
  return (
    <section id="cicoplafest" className="bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 bg-[hsl(var(--brand-lime))]/15 border border-[hsl(var(--brand-lime))]/30 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider mb-5 text-[hsl(var(--brand-lime))]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Permisos vigentes
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1]">
              Cada producto que aplicamos tiene{' '}
              <span className="text-[hsl(var(--brand-lime))]">permiso CICOPLAFEST</span>{' '}
              y categoría toxicológica documentada.
            </h2>
            <p className="mt-6 text-white/75 leading-relaxed max-w-2xl">
              CICOPLAFEST es la Comisión Intersecretarial para el Control del Proceso y Uso
              de Plaguicidas, Fertilizantes y Sustancias Tóxicas — autoridad que regula
              en México qué se puede aplicar y dónde. <strong className="text-white">Para
              empresas entregamos certificado del servicio + ficha técnica del
              producto utilizado.</strong>
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--brand-lime))] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-white">Cipermetrina 40% PM</strong> —
                  Autorización <code className="px-1.5 py-0.5 rounded bg-white/10 text-[hsl(var(--brand-lime))]">1-2607</code>{' '}
                  · Categoría IV (la más baja) · uso autorizado en alacrán, arañas,
                  avispas, chinches, cucarachas, hormigas, grillos, moscas, mosquitos,
                  pescaditos de plata, pulgas y termitas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--brand-lime))] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-white">Cebos parafinados y anticoagulantes</strong>{' '}
                  con permisos vigentes para control de roedores.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[hsl(var(--brand-lime))] mt-0.5 shrink-0" />
                <span>
                  <strong className="text-white">Hoja de seguridad por producto</strong>{' '}
                  (12 secciones — riesgos, manejo, equipo de protección, transporte)
                  disponible en cualquier auditoría.
                </span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <CertificateBadge />
          </div>
        </div>
      </div>
    </section>
  )
}

function CertificateBadge() {
  return (
    <div className="relative aspect-[3/4] max-w-sm mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-[hsl(var(--brand-cream))] shadow-2xl p-8 flex flex-col">
        <div className="text-center border-b-2 border-[hsl(var(--brand-dark))]/15 pb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--brand-dark))]/60">
            Comisión Intersecretarial
          </p>
          <p className="font-display text-2xl font-extrabold text-[hsl(var(--brand-dark))] mt-1">
            CICOPLAFEST
          </p>
          <p className="text-[9px] uppercase tracking-wider text-[hsl(var(--brand-dark))]/60 mt-1">
            SECOFI · SAGAR · SEMARNAP · SS
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center py-6">
          <p className="text-[10px] uppercase tracking-widest text-[hsl(var(--brand-dark))]/60 mb-1">
            Autorización
          </p>
          <p className="font-display text-5xl font-extrabold text-[hsl(var(--brand-dark))]">
            1-2607
          </p>
          <p className="text-xs text-[hsl(var(--brand-dark))]/70 mt-3 leading-snug">
            CIPERMETRINA 40% PM
            <br />
            Categoría toxicológica <strong>IV</strong>
          </p>
        </div>

        <div className="border-t-2 border-[hsl(var(--brand-dark))]/15 pt-4 text-center">
          <p className="text-[9px] uppercase tracking-wider text-[hsl(var(--brand-dark))]/60">
            Producto avalado en uso
          </p>
          <p className="font-bold text-sm text-[hsl(var(--brand-dark))] mt-1">
            CPS · Desde 1989
          </p>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Timeline — Historia
============================================================ */
function Timeline() {
  const milestones = [
    { year: '1989', title: 'Se funda CPS', desc: 'Nace Control de Plagas y Sanidad con el objetivo de ofrecer un servicio profesional, eficiente y de alta calidad.' },
    { year: '1991', title: 'Asociación de Fumigadores', desc: 'Se integra a la Asociación de Fumigadores del Estado de México.' },
    { year: '1993', title: 'Licencia Sanitaria Federal', desc: 'Obtiene la licencia federal #93-033 para aplicación de plaguicidas de uso urbano y jardinería.' },
    { year: '1996', title: 'Distintivo H', desc: 'Primera obtención del máximo galardón a la higiene y limpieza — comedor industrial Televisa San Ángel.' },
    { year: '2026', title: '36 años de operación', desc: 'CPS continúa cubriendo CDMX, Estado de México, Morelos, Hidalgo, Querétaro y Jalisco con productos avalados por CICOPLAFEST.' },
  ]
  return (
    <section id="historia" className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Historia"
          title="Tres décadas y media construyendo confianza."
          sub="La trayectoria de CPS no es marketing — son hitos verificables en el camino."
        />
        <ol className="mt-14 relative border-s-2 border-[hsl(var(--brand-dark))]/15 ms-3 space-y-10">
          {milestones.map((m) => (
            <li key={m.year} className="ms-8">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] text-[10px] font-bold ring-4 ring-background">
                ●
              </span>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-2xl font-extrabold text-[hsl(var(--brand-dark))]">
                  {m.year}
                </span>
                <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{m.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ============================================================
   Cobertura
============================================================ */
function Cobertura() {
  const estados = ['CDMX', 'Estado de México', 'Morelos', 'Hidalgo', 'Querétaro', 'Jalisco']
  return (
    <section id="cobertura" className="bg-[hsl(var(--brand-cream))] py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          eyebrow="Cobertura"
          title="Operamos en 6 estados de México."
          sub="Oficinas en CDMX con capacidad para atender la zona metropolitana, estados vecinos del centro y el occidente del país."
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {estados.map((e) => (
            <div
              key={e}
              className="rounded-2xl border bg-card p-6 text-center hover:border-[hsl(var(--brand-dark))] transition-colors"
            >
              <MapPin className="h-6 w-6 mx-auto text-[hsl(var(--brand-dark))]" />
              <p className="mt-3 font-semibold text-foreground">{e}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   Contact
============================================================ */
function ContactSection() {
  return (
    <section id="contacto" className="bg-background py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--brand-dark))]">
              Cotización
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
              Cuéntanos qué necesitas y te respondemos hoy.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Para empresas calculamos por metros cuadrados y áreas críticas;
              para casa por número de cuartos y tipo de plaga. Sin compromiso.
            </p>

            <HandshakeCard />

            <div className="mt-8 space-y-4 text-sm">
              <a
                href="mailto:contacto@cps1989.com"
                className="flex items-center gap-3 text-foreground hover:text-[hsl(var(--brand-dark))] transition-colors"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--brand-cream))] border">
                  <Mail className="h-4 w-4" />
                </span>
                contacto@cps1989.com
              </a>
              <OfficeRow />
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--brand-cream))] border">
                  <Clock className="h-4 w-4" />
                </span>
                Respuesta en menos de 24 h hábiles
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Tarjeta aspiracional con foto de handshake entre la descripción y los
 * contact rows del lado izquierdo. Comunica "te vamos a atender bien" sin
 * usar palabras, justo en el momento que el visitante decide llenar el form.
 *
 * Imagen: photo-1521791136064-7986c2920216 (Unsplash) — close-up de
 * apretón de manos profesional. URL verificada estable.
 * Foto placeholder hasta que el cliente nos pase fotografía propia.
 */
function HandshakeCard() {
  const baseUrl = 'https://images.unsplash.com/photo-1521791136064-7986c2920216'
  const buildSrc = (w: number) => `${baseUrl}?w=${w}&auto=format&fit=crop&q=80`
  return (
    <div className="relative mt-8 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-[hsl(var(--brand-dark))]/10">
      {/* Fallback gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, hsl(var(--brand-dark)) 0%, hsl(var(--brand-lime)) 100%)',
        }}
      />
      <img
        src={buildSrc(800)}
        srcSet={`${buildSrc(500)} 500w, ${buildSrc(800)} 800w, ${buildSrc(1200)} 1200w`}
        sizes="(min-width: 768px) 400px, 100vw"
        alt="Apretón de manos profesional cerrando acuerdo de servicio"
        loading="lazy"
        className="relative w-full h-full object-cover"
      />
      {/* Overlay para legibilidad del texto inferior */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 40%, hsl(var(--brand-dark) / 0.85) 100%)',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-[hsl(var(--brand-cream))]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--brand-lime))]">
          Clientes desde 1989
        </p>
        <p className="mt-1.5 text-base font-display font-bold leading-snug">
          +10 años de relación promedio con quienes confían en CPS.
        </p>
      </div>
    </div>
  )
}

/**
 * Row del office con thumbnail de la Catedral del Zócalo en CDMX.
 * Reemplaza el icono genérico de MapPin por una miniatura visual que
 * ancla la marca a una ciudad real, no a "alguna oficina genérica".
 *
 * Imagen: photo-1585464231875-d9ef1f5ad396 (Unsplash) — Catedral
 * Metropolitana del Zócalo con bandera mexicana al lado.
 */
function OfficeRow() {
  const baseUrl = 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396'
  return (
    <div className="flex items-center gap-3 text-foreground">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl overflow-hidden border bg-[hsl(var(--brand-cream))]">
        <img
          src={`${baseUrl}?w=160&h=160&auto=format&fit=crop&q=80`}
          alt="Ciudad de México"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </span>
      <div className="flex flex-col">
        <span className="font-medium">Oficinas en Ciudad de México</span>
        <span className="text-xs text-muted-foreground">
          Cobertura en 6 estados del país
        </span>
      </div>
    </div>
  )
}

interface FormState {
  tipo: Audience
  plaga: string
  nombre: string
  empresa: string
  email: string
  telefono: string
  metros: string
  mensaje: string
  honeypot: string
}

const initialForm: FormState = {
  tipo: 'casa',
  plaga: '',
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  metros: '',
  mensaje: '',
  honeypot: '',
}

function ContactForm() {
  // Lee preselección desde sessionStorage (puesta por los CTAs de
  // AudienceCard / PestTier). Se ejecuta solo en cliente, solo al montar.
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === 'undefined') return initialForm
    const tipo = (sessionStorage.getItem('cps:preselect:tipo') as Audience | null) ?? initialForm.tipo
    const plaga = sessionStorage.getItem('cps:preselect:plaga') ?? initialForm.plaga
    return { ...initialForm, tipo, plaga }
  })
  // 'ambiguous' = network error post-retry: el lead pudo o no haberse
  // procesado. Diferenciado de 'error' (server respondió no-OK certero)
  // para evitar que el usuario reintente y duplique.
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'ambiguous' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  // Bloquea el botón 5s extras después de cualquier intento, para que
  // doble-click o "fui muy rápido" no genere requests duplicados.
  const [coolingDown, setCoolingDown] = useState(false)

  // Escucha clicks in-page de AudienceCard / PestTier. El form ya está
  // montado en la misma página, así que el sessionStorage del initial
  // state nunca se vuelve a leer. Este listener actualiza el state en
  // vivo cuando el usuario hace click en "Cotizar para mi empresa/casa"
  // o en una plaga del catálogo. El href "#contacto" del link hace el
  // scroll nativo.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ tipo?: Audience; plaga?: string }>).detail
      if (!detail) return
      setForm((f) => ({
        ...f,
        ...(detail.tipo ? { tipo: detail.tipo } : {}),
        ...(detail.plaga ? { plaga: detail.plaga } : {}),
      }))
      // Si el usuario está en error/ambiguous y reabre el form via CTA,
      // reseteamos el estado de status para que no vea callouts viejos.
      setStatus((s) => (s === 'sent' ? s : 'idle'))
    }
    window.addEventListener('cps:preselect', handler)
    return () => window.removeEventListener('cps:preselect', handler)
  }, [])

  const onChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const setTipo = (tipo: Audience) => setForm((f) => ({ ...f, tipo }))

  const clearPreselect = () => {
    try {
      sessionStorage.removeItem('cps:preselect:tipo')
      sessionStorage.removeItem('cps:preselect:plaga')
    } catch {
      /* ignore */
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === 'sending' || coolingDown) return
    setStatus('sending')
    setErrorMsg(null)

    const finishWithCooldown = () => {
      setCoolingDown(true)
      setTimeout(() => setCoolingDown(false), 5000)
    }

    try {
      await submitContact({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        telefono: form.telefono.trim() || undefined,
        organizacion: form.empresa.trim() || undefined,
        mensaje: form.mensaje.trim() || undefined,
        honeypot: form.honeypot,
        metadata: {
          tipo: form.tipo,
          plaga: form.plaga || null,
          metros: form.metros.trim() || null,
        },
      })
      setStatus('sent')
      // Limpia el form preservando solo el tipo (casa/empresa)
      setForm({ ...initialForm, tipo: form.tipo })
      clearPreselect()
      finishWithCooldown()
    } catch (err) {
      const apiErr = err as ApiError
      // Network/timeout: el server posiblemente sí procesó. NO permitir
      // retry inmediato (eso es lo que generaría duplicados). Mostrar
      // estado 'ambiguous' + limpiar form + cooldown 5s.
      if (apiErr.kind === 'network' || apiErr.kind === 'timeout') {
        setStatus('ambiguous')
        setForm({ ...initialForm, tipo: form.tipo })
        clearPreselect()
        finishWithCooldown()
        return
      }
      // Server respondió un status real → no se procesó
      setStatus('error')
      setErrorMsg(
        apiErr.status === 429
          ? 'Demasiados envíos seguidos. Inténtalo en un minuto.'
          : apiErr.status === 400
            ? 'Revisa los campos: hubo un dato inválido.'
            : apiErr.status === 503
              ? 'Servicio en mantenimiento. Inténtalo en unos minutos.'
              : 'No pudimos enviar el mensaje. Vuelve a intentarlo en un momento.',
      )
      finishWithCooldown()
    }
  }

  const isEmpresa = form.tipo === 'empresa'

  return (
    <form
      onSubmit={onSubmit}
      className="bg-card rounded-2xl border p-7 md:p-8 shadow-sm space-y-5"
    >
      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <Label htmlFor="company">No llenar</Label>
        <Input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={onChange('honeypot')}
        />
      </div>

      {/* Toggle empresa/casa */}
      <div className="space-y-2">
        <Label className="text-foreground">¿Es para casa o empresa?</Label>
        <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[hsl(var(--brand-cream))]">
          <ToggleBtn active={!isEmpresa} onClick={() => setTipo('casa')} icon={Home} label="Casa" />
          <ToggleBtn active={isEmpresa} onClick={() => setTipo('empresa')} icon={Building2} label="Empresa" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nombre" required>
          <Input
            required
            value={form.nombre}
            onChange={onChange('nombre')}
            placeholder="Tu nombre"
            autoComplete="name"
          />
        </Field>
        <Field label={isEmpresa ? 'Empresa' : 'Apellido o referencia'}>
          <Input
            value={form.empresa}
            onChange={onChange('empresa')}
            placeholder={isEmpresa ? 'Razón social o nombre comercial' : 'Cómo te llamamos'}
            autoComplete={isEmpresa ? 'organization' : 'family-name'}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Correo" required>
          <Input
            type="email"
            required
            value={form.email}
            onChange={onChange('email')}
            placeholder="tu@correo.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Teléfono">
          <Input
            type="tel"
            value={form.telefono}
            onChange={onChange('telefono')}
            placeholder="55 0000 0000"
            autoComplete="tel"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label={isEmpresa ? 'Plaga principal (opcional)' : 'Qué plaga te preocupa'}>
          <select
            value={form.plaga}
            onChange={onChange('plaga')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">— Seleccionar —</option>
            <optgroup label="Las más comunes">
              {PESTS_HOME.filter((p) => p.tier === 'top').map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </optgroup>
            <optgroup label="Estacionales">
              {PESTS_HOME.filter((p) => p.tier === 'mid').map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </optgroup>
            <optgroup label="Otras">
              {PESTS_HOME.filter((p) => p.tier === 'other').map((p) => (
                <option key={p.key} value={p.key}>{p.label}</option>
              ))}
            </optgroup>
            <option value="varias">Varias / no estoy seguro</option>
          </select>
        </Field>
        <Field label={isEmpresa ? 'Metros cuadrados aprox' : '¿Cuántos cuartos?'}>
          <Input
            value={form.metros}
            onChange={onChange('metros')}
            placeholder={isEmpresa ? 'Ej: 350 m² + 80 cocina' : 'Ej: 2 recámaras + sala-cocina'}
          />
        </Field>
      </div>

      <Field label="Cuéntanos más">
        <Textarea
          value={form.mensaje}
          onChange={onChange('mensaje')}
          placeholder={
            isEmpresa
              ? 'Tipo de inmueble, ubicación, periodicidad esperada, si requieres certificado por servicio…'
              : 'Hace cuánto detectaste la plaga, qué tan extendida está, si hay mascotas o niños pequeños…'
          }
          rows={5}
        />
      </Field>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'sending' || coolingDown}
          className="bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] hover:bg-[hsl(var(--brand-dark))]/90 font-semibold"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviar cotización
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Respondemos en menos de 24 h hábiles. Sin compromiso.
        </p>
      </div>

      {status === 'sent' && (
        <div className="flex items-start gap-2 rounded-md bg-[hsl(var(--brand-lime))]/15 border border-[hsl(var(--brand-lime))]/40 p-4 text-sm">
          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--brand-lime))] mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Mensaje recibido.</p>
            <p className="text-muted-foreground mt-0.5">
              Te contactamos a la brevedad. Respuesta dentro de 24 h hábiles.
            </p>
          </div>
        </div>
      )}

      {status === 'ambiguous' && (
        <div className="flex items-start gap-2 rounded-md bg-[hsl(var(--brand-amber))]/15 border border-[hsl(var(--brand-amber))]/40 p-4 text-sm">
          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--brand-amber))] mt-0.5" />
          <div>
            <p className="font-semibold text-foreground">Tu mensaje probablemente ya llegó.</p>
            <p className="text-muted-foreground mt-0.5">
              La conexión se cortó antes de confirmarlo, pero el sistema lo procesó.
              Espera nuestra respuesta antes de reenviar (24 h hábiles) — así evitas duplicarlo.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && errorMsg && (
        <div className="flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/30 p-4 text-sm">
          <X className="h-5 w-5 text-destructive mt-0.5" />
          <p className="text-foreground">{errorMsg}</p>
        </div>
      )}
    </form>
  )
}

function ToggleBtn({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Home
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))] px-4 py-2 text-sm font-semibold shadow-sm'
          : 'flex items-center justify-center gap-2 rounded-md text-foreground/70 hover:text-foreground px-4 py-2 text-sm font-medium'
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  )
}

/* ============================================================
   Footer
============================================================ */
function Footer() {
  return (
    <footer className="bg-[hsl(var(--brand-dark))] text-[hsl(var(--brand-cream))]/80 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-white/65 max-w-sm">
              Control de Plagas y Sanidad. Calidad, Protección, Salud.
              <br />
              Desde 1989 protegiendo casas y empresas serias en México.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-3">Servicios</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#servicios" className="hover:text-white">Desinsectización</a></li>
              <li><a href="#servicios" className="hover:text-white">Desratización</a></li>
              <li><a href="#servicios" className="hover:text-white">Nebulización</a></li>
              <li><a href="#servicios" className="hover:text-white">Control de voladores</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-3">Contacto</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:contacto@cps1989.com"
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  contacto@cps1989.com
                </a>
              </li>
              <li>Ciudad de México</li>
              <li>Cobertura en CDMX, Edomex, Morelos, Hidalgo, Querétaro y Jalisco</li>
              <li>
                <a href="#contacto" className="underline-offset-4 hover:underline">
                  Solicita cotización →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/45">
          <p>© {new Date().getFullYear()} CPS · Control de Plagas y Sanidad. Todos los derechos reservados.</p>
          <p>Licencia 93-033 · CICOPLAFEST 1-2607 · Asociación de Fumigadores del Edo. Méx.</p>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================
   Shared
============================================================ */
function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string
  title: string
  sub: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[hsl(var(--brand-dark))]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold leading-tight text-foreground">
        {title}
      </h2>
      <p className="mt-4 text-muted-foreground leading-relaxed">{sub}</p>
    </div>
  )
}
