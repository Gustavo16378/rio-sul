import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Zap, Layers, Check, ChevronRight, Home } from 'lucide-react'
import { services } from '../data/services'
import Img from '../components/Img'

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

export default function Servicos() {
  const [assistencia, protecao, vidros] = services

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
            <span className="text-ink">Serviços</span>
          </nav>
          <h1 className="font-serif font-bold text-5xl lg:text-6xl text-ink mb-4">
            Nossos Serviços
          </h1>
          <p className="font-sans text-xl text-ink-soft max-w-2xl">
            Proteção veicular completa, assistência 24 horas e cobertura nacional — tudo em um só lugar.
          </p>
        </div>
      </section>

      {/* Assistência 24h */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* IMAGEM: public/images/assistencia.jpg — proporção 4:3, ex: 800×600px */}
            <RevealSection>
              <Img
                src="/images/assistencia.jpg"
                alt="Equipe de assistência 24h Rio Sul"
                className="w-full aspect-[4/3] rounded-2xl"
                placeholderLabel="Solte aqui: public/images/assistencia.jpg (4:3)"
              />
            </RevealSection>

            <RevealSection>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-semibold mb-5"
                style={{ background: '#FFF3E0', color: '#8B1A1A' }}
              >
                <Zap size={12} /> {assistencia.title}
              </span>
              <h2 className="font-serif font-bold text-4xl text-red mb-5">{assistencia.title}</h2>
              <p className="font-sans text-ink-soft leading-relaxed mb-7">{assistencia.summary}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {assistencia.items.map(item => (
                  <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-ink">
                    <Check size={16} className="text-red flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Proteção Total */}
      <section style={{ background: 'var(--offwhite)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              {protecao.badge && (
                <span
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-sans font-semibold mb-5"
                  style={{ background: 'var(--gold)', color: '#7a4a00' }}
                >
                  {protecao.badge}
                </span>
              )}
              <h2 className="font-serif font-bold text-4xl text-red mb-5">{protecao.title}</h2>
              <p className="font-sans text-ink-soft leading-relaxed mb-7">{protecao.summary}</p>
              <ul className="flex flex-col gap-2.5">
                {protecao.items.map(item => (
                  <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-ink">
                    <Check size={16} className="text-red flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealSection>

            {/* Visual chave */}
            <RevealSection>
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div style={{ transform: 'rotate(-15deg)', filter: 'drop-shadow(0 20px 40px rgba(139,26,26,0.2))' }}>
                  <Shield size={220} className="text-red" strokeWidth={1} />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Proteção de Vidros */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <RevealSection>
            <div
              className="rounded-2xl p-10"
              style={{ background: 'var(--offwhite)', border: '1px solid var(--border)' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-sans font-semibold mb-5"
                    style={{ background: '#FFF3E0', color: '#8B1A1A' }}
                  >
                    <Layers size={12} /> {vidros.title}
                  </span>
                  <h2 className="font-serif font-bold text-3xl text-red mb-4">{vidros.title}</h2>
                  <p className="font-sans text-ink-soft leading-relaxed">{vidros.summary}</p>
                </div>
                <ul className="grid grid-cols-2 gap-2.5">
                  {vidros.items.map(item => (
                    <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-ink">
                      <Check size={16} className="text-red flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div
              className="rounded-2xl px-8 py-14 text-center"
              style={{ background: 'var(--red)' }}
            >
              <h2 className="font-serif font-bold text-4xl text-white mb-4">
                Pronto para se proteger?
              </h2>
              <p className="font-sans text-red-200 mb-8">
                Cadastre-se gratuitamente e faça parte da Rio Sul Benefícios.
              </p>
              <Link
                to="/seja-rio-sul"
                className="inline-flex items-center gap-2 font-sans font-bold text-amber-900 px-8 py-4 rounded-xl transition-colors"
                style={{ background: 'var(--gold)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
              >
                Quero ser associado <ChevronRight size={18} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
