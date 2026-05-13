import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Zap, Layers, Star, ChevronRight, Award, Clock, CheckCircle } from 'lucide-react'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
const iconMap: Record<string, React.ElementType> = { Shield, Zap, Layers }

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">
        {/* Textura diagonal */}
        <svg
          className="absolute right-0 top-0 w-1/2 h-full opacity-40 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="diag" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M-4 4 l8-8 M0 24 l24-24 M20 28 l8-8" stroke="#F0EDE8" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag)" />
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Texto */}
            <div>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium mb-8"
                style={{ background: '#FFF3E0', border: '1px solid #F5A623', color: '#8B1A1A' }}
              >
                <Shield size={14} className="text-red" />
                ISO 9001 · AAAPV · +25 anos protegendo você
              </div>

              <h1
                className="font-serif font-bold text-ink leading-tight mb-6"
                style={{ fontSize: 'clamp(42px, 6vw, 80px)' }}
              >
                Proteção veicular<br />
                <span className="text-red">que você pode</span><br />
                confiar.
              </h1>

              <p className="font-sans text-lg text-ink-soft leading-relaxed mb-8 max-w-lg">
                Assistência 24 horas, proteção total e cobertura nacional — sem distinção de perfil e com indenização de 100% da Tabela FIPE.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/seja-rio-sul"
                  className="inline-flex items-center gap-2 font-sans font-semibold text-white px-7 py-3.5 rounded-xl transition-colors min-h-[52px]"
                  style={{ background: 'var(--red)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--red-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--red)')}
                >
                  Quero Proteção <ChevronRight size={18} />
                </Link>
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-2 font-sans font-semibold text-red px-7 py-3.5 rounded-xl border-2 border-red hover:bg-red/5 transition-colors min-h-[52px]"
                >
                  Ver Serviços
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-0 divide-x divide-border">
                {[
                  { num: '+25', label: 'Anos' },
                  { num: '24h', label: 'Assistência' },
                  { num: 'ISO', label: '9001' },
                  { num: 'AA', label: 'APV' },
                ].map(({ num, label }) => (
                  <div key={num} className="px-5 first:pl-0 last:pr-0 py-2">
                    <div className="font-serif font-bold text-2xl text-red">{num}</div>
                    <div className="font-sans text-xs text-ink-soft uppercase tracking-wider">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup mobile */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Smartphone frame */}
                <div
                  className="relative rounded-[40px] overflow-hidden shadow-2xl"
                  style={{
                    width: '280px',
                    height: '560px',
                    background: 'var(--red)',
                    border: '8px solid #1a0a0a',
                  }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />

                  {/* App UI */}
                  <div className="pt-10 px-5 pb-5 h-full flex flex-col">
                    {/* Header da app */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="font-sans text-[10px] text-red-200 uppercase tracking-wider">Olá, Associado</p>
                        <p className="font-serif font-bold text-white text-lg">Minha Proteção</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                        <Shield size={16} className="text-white" />
                      </div>
                    </div>

                    {/* Card principal */}
                    <div
                      className="rounded-2xl p-4 mb-4"
                      style={{ background: 'rgba(255,255,255,0.12)' }}
                    >
                      <p className="font-sans text-[10px] text-red-200 uppercase tracking-wider mb-1">Status</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <p className="font-sans font-semibold text-white text-sm">Proteção Ativa</p>
                      </div>
                      <p className="font-serif font-bold text-white text-xl">Toyota Corolla</p>
                      <p className="font-sans text-xs text-red-200">Plano Proteção Total · R$ 52.000 FIPE</p>
                    </div>

                    {/* Serviços rápidos */}
                    <p className="font-sans text-[10px] text-red-200 uppercase tracking-wider mb-3">Serviços Rápidos</p>
                    <div className="grid grid-cols-2 gap-2 flex-1">
                      {[
                        { icon: Zap, label: 'Assistência 24h' },
                        { icon: Shield, label: 'Acionar Proteção' },
                        { icon: Clock, label: 'Histórico' },
                        { icon: CheckCircle, label: 'Documentos' },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="rounded-xl p-3 flex flex-col gap-2"
                          style={{ background: 'rgba(255,255,255,0.1)' }}
                        >
                          <Icon size={16} className="text-gold" />
                          <span className="font-sans text-[10px] text-white leading-tight">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Badge flutuante */}
                <div
                  className="absolute -right-6 top-20 rounded-2xl px-4 py-3 shadow-xl"
                  style={{ background: 'var(--gold)', minWidth: '120px' }}
                >
                  <p className="font-sans text-[10px] font-semibold text-amber-900 uppercase tracking-wider">Assistência</p>
                  <p className="font-serif font-bold text-amber-900 text-lg">24 horas</p>
                  <p className="font-sans text-[9px] text-amber-800">Em todo o Brasil</p>
                </div>

                {/* Badge inferior */}
                <div
                  className="absolute -left-6 bottom-24 rounded-2xl px-4 py-3 shadow-xl bg-white"
                  style={{ border: '1px solid var(--border)' }}
                >
                  <p className="font-sans text-[10px] font-semibold text-ink-soft uppercase tracking-wider">Cobertura</p>
                  <p className="font-serif font-bold text-red text-lg">100% FIPE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOBRE ────────────────────────────────── */}
      <section style={{ background: 'var(--offwhite)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-red mb-3">A Rio Sul</p>
              <h2 className="font-serif font-bold text-4xl lg:text-5xl text-ink leading-tight mb-6">
                Uma associação que cuida do que move você.
              </h2>
              <p className="font-sans text-ink-soft leading-relaxed mb-8">
                Fundada em 2000 em Palmas/TO, a Rio Sul Benefícios nasceu com a missão de oferecer proteção veicular acessível, humana e eficiente. Hoje somos certificados ISO 9001 e associados à AAAPV, com cobertura nacional e atendimento 24 horas.
              </p>

              <div className="flex flex-col gap-5 mb-10">
                {[
                  { icon: Shield, title: 'Confiança', desc: 'Certificação ISO 9001 e associação à AAAPV garantem padrão de excelência.' },
                  { icon: Clock, title: 'Disponibilidade', desc: 'Assistência 24h em todo o Brasil, inclusive feriados e finais de semana.' },
                  { icon: Award, title: 'Transparência', desc: 'Indenização de 100% da Tabela FIPE, sem letras miúdas ou pegadinhas.' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3E0' }}>
                      <Icon size={18} className="text-red" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm mb-0.5">{title}</p>
                      <p className="font-sans text-ink-soft text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 font-sans font-semibold text-red border-2 border-red px-6 py-3 rounded-xl hover:bg-red/5 transition-colors"
              >
                Saiba Mais <ChevronRight size={16} />
              </Link>
            </RevealSection>

            <RevealSection>
              <div className="relative">
                <img
                  src="/images/sede.jpg"
                  alt="Sede Rio Sul Benefícios em Palmas/TO"
                  className="w-full aspect-[4/3] rounded-2xl object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute -bottom-4 -right-4 rounded-xl px-5 py-4 shadow-lg"
                  style={{ background: 'var(--red)' }}
                >
                  <p className="font-sans text-xs text-red-200 uppercase tracking-wider">Fundada em</p>
                  <p className="font-serif font-bold text-white text-2xl">2000</p>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ─────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <RevealSection>
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-red mb-2">O que oferecemos</p>
              <h2 className="font-serif font-bold text-4xl text-ink">O que sua proteção inclui.</h2>
            </RevealSection>
            <Link to="/servicos" className="font-sans text-sm font-semibold text-red hover:underline flex items-center gap-1 flex-shrink-0">
              Ver todos os serviços <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon] ?? Shield
              return (
                <RevealSection key={svc.id}>
                  <div
                    className="p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 h-full"
                    style={{
                      borderColor: 'var(--border)',
                      boxShadow: 'var(--shadow-sm)',
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: '#FFF3E0' }}
                    >
                      <Icon size={22} className="text-red" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-ink mb-3">{svc.title}</h3>
                    <p className="font-sans text-ink-soft text-sm leading-relaxed mb-5">{svc.summary}</p>
                    <Link
                      to="/servicos"
                      className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-red hover:underline"
                    >
                      Ver detalhes <ChevronRight size={14} />
                    </Link>
                  </div>
                </RevealSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ──────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <RevealSection className="text-center mb-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-widest text-red mb-2">Quem protegemos</p>
            <h2 className="font-serif font-bold text-4xl text-ink">O que nossos associados dizem.</h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <RevealSection key={t.id}>
                <div
                  className="p-7 rounded-2xl border h-full flex flex-col"
                  style={{
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={14} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="font-serif italic text-ink text-lg leading-relaxed flex-1 mb-6">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-serif font-bold text-sm text-white"
                      style={{ background: 'var(--red)' }}
                    >
                      {t.author.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-ink text-sm">{t.author}</p>
                      <p className="font-sans text-xs text-ink-soft">{t.vehicle} · {t.years} anos</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div
              className="rounded-2xl px-8 py-14 text-center"
              style={{ background: 'var(--red)' }}
            >
              <p className="font-sans text-xs font-semibold uppercase tracking-widest text-red-200 mb-3">Pronto?</p>
              <h2 className="font-serif font-bold text-4xl md:text-5xl text-white mb-4">
                Pronto para proteger seu veículo?
              </h2>
              <p className="font-sans text-red-200 text-lg mb-8 max-w-lg mx-auto">
                Junte-se a milhares de associados que já contam com a Rio Sul Benefícios.
              </p>
              <Link
                to="/seja-rio-sul"
                className="inline-flex items-center gap-2 font-sans font-bold text-amber-900 px-8 py-4 rounded-xl transition-colors min-h-[56px]"
                style={{ background: 'var(--gold)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
              >
                Faça parte da Rio Sul <ChevronRight size={18} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
