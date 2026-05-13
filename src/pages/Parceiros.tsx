import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { partners } from '../data/partners'

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
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
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

export default function Parceiros() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section style={{ background: 'var(--offwhite)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 font-sans text-sm text-ink-soft mb-6">
            <Link to="/" className="hover:text-red transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <span>·</span>
            <span className="text-ink">Parceiros</span>
          </nav>
          <h1 className="font-serif font-bold text-5xl lg:text-6xl text-ink mb-4">Parceiros</h1>
          <p className="font-sans text-xl text-ink-soft max-w-2xl">
            Uma rede de empresas parceiras para oferecer ainda mais vantagens aos nossos associados.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partners.map((partner, i) => (
              <RevealSection key={partner.id}>
                <div
                  className="p-8 rounded-2xl border text-center cursor-default transition-all duration-300 hover:-translate-y-0.5 h-full"
                  style={{
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    transitionDelay: `${(i % 4) * 75}ms`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--red)'
                    el.style.boxShadow = 'var(--shadow-md)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--border)'
                    el.style.boxShadow = 'var(--shadow-sm)'
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 font-serif font-bold text-lg text-white"
                    style={{ background: 'var(--red)' }}
                  >
                    {getInitials(partner.name)}
                  </div>
                  <h3 className="font-sans font-semibold text-ink text-sm mb-1">{partner.name}</h3>
                  <p className="font-sans text-xs text-ink-soft">{partner.segment}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div
              className="rounded-2xl p-10 text-center"
              style={{ background: 'var(--offwhite)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-serif font-bold text-3xl text-ink mb-3">Quer ser parceiro Rio Sul?</h2>
              <p className="font-sans text-ink-soft mb-7">
                Expanda sua visibilidade e alcance nossos associados em toda a região.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 font-sans font-semibold text-red border-2 border-red px-6 py-3 rounded-xl hover:bg-red/5 transition-colors"
              >
                Entre em contato <ChevronRight size={16} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
