import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Instagram, Award, CheckCircle, Home } from 'lucide-react'

const inputClass = `
  w-full border font-sans text-sm text-ink placeholder-ink-soft rounded-lg px-3.5 py-2.5 bg-white
  transition-all
`.trim()

const labelClass = `block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5`

export default function Contato() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <section style={{ background: 'var(--red)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 font-sans text-sm text-red-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <span>·</span>
            <span className="text-white">Contato</span>
          </nav>
          <h1 className="font-serif font-bold text-5xl text-white mb-3">Fale com a gente</h1>
          <p className="font-sans text-red-200 text-lg">Estamos prontos para atender você.</p>
        </div>
      </section>

      {/* Conteúdo */}
      <section style={{ background: 'var(--offwhite)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações */}
            <div
              className="rounded-2xl p-10 h-fit"
              style={{ background: 'var(--offwhite)', border: '1px solid var(--border)' }}
            >
              <h2 className="font-serif font-bold text-2xl text-ink mb-7">Informações de contato</h2>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3E0' }}>
                    <MapPin size={18} className="text-red" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-0.5">Endereço</p>
                    <p className="font-sans text-ink-soft text-sm leading-relaxed">
                      Quadra 602 Sul, Conj. 01, Lote 01<br />
                      Plano Diretor Sul — Palmas/TO<br />
                      CEP: 77022-002
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3E0' }}>
                    <Phone size={18} className="text-red" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-1">Telefone</p>
                    <a href="tel:+556332162002" className="font-sans text-ink-soft text-sm hover:text-red transition-colors block mb-2">
                      (63) 3216-2002
                    </a>
                    <a
                      href="https://wa.me/556332162002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-white px-3 py-1.5 rounded-lg transition-colors"
                      style={{ background: '#25D366' }}
                    >
                      <Phone size={12} /> WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--red)' }}
                  >
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-0.5">Assistência 24h</p>
                    <p
                      className="font-serif font-bold text-xl"
                      style={{ color: 'var(--red)' }}
                    >
                      0800-030-6672
                    </p>
                    <p className="font-sans text-xs text-ink-soft">Gratuito · Todo o Brasil</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#FFF3E0' }}>
                    <Mail size={18} className="text-red" />
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-ink text-sm mb-0.5">E-mail</p>
                    <a href="mailto:atendimento@riosul.org.br" className="font-sans text-ink-soft text-sm hover:text-red transition-colors">
                      atendimento@riosul.org.br
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes */}
              <div className="mt-8 pt-7" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-4">Redes sociais</p>
                <a
                  href="https://instagram.com/riosulbeneficos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm text-ink hover:text-red transition-colors"
                >
                  <Instagram size={18} /> @riosulbeneficos
                </a>
              </div>

              {/* Selos */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: '#FFF3E0' }}>
                  <Award size={14} className="text-gold" />
                  <span className="font-sans text-xs font-semibold text-ink">ISO 9001</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: '#FFF3E0' }}>
                  <Award size={14} className="text-gold" />
                  <span className="font-sans text-xs font-semibold text-ink">AAAPV</span>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div
              className="rounded-2xl p-10"
              style={{ background: 'white', boxShadow: 'var(--shadow-lg)' }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-2xl text-ink mb-2">Mensagem enviada!</h3>
                  <p className="font-sans text-ink-soft">
                    Retornaremos em até 1 dia útil.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h2 className="font-serif font-bold text-2xl text-ink mb-2">Envie uma mensagem</h2>

                  <div>
                    <label className={labelClass}>Nome</label>
                    <input
                      type="text" required placeholder="Seu nome completo"
                      className={inputClass} style={{ border: '1.5px solid var(--border)' }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>E-mail</label>
                    <input
                      type="email" required placeholder="seu@email.com"
                      className={inputClass} style={{ border: '1.5px solid var(--border)' }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Telefone</label>
                    <input
                      type="tel" placeholder="(63) 99999-9999"
                      className={inputClass} style={{ border: '1.5px solid var(--border)' }}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Assunto</label>
                    <select className={inputClass} style={{ border: '1.5px solid var(--border)' }}>
                      <option value="">Selecione o assunto</option>
                      <option>Quero ser associado</option>
                      <option>Sou associado</option>
                      <option>Parceria</option>
                      <option>Imprensa</option>
                      <option>Outros</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Mensagem</label>
                    <textarea
                      required rows={4}
                      placeholder="Como podemos ajudar?"
                      className={inputClass}
                      style={{ border: '1.5px solid var(--border)', resize: 'none' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full font-sans font-bold text-white rounded-xl transition-colors min-h-[52px]"
                    style={{ background: 'var(--red)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--red-hover)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--red)')}
                  >
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-8 rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.4684228131105!2d-48.332631299999996!3d-10.223753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x933b34bd8e2384d1%3A0xea459715932d23fc!2sRio%20Sul%20-%20Clube%20de%20Beneficios!5e0!3m2!1spt-BR!2sbr!4v1778644630976!5m2!1spt-BR!2sbr"
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Rio Sul Benefícios"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
