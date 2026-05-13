import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Lock, CheckCircle, Home } from 'lucide-react'

const ufs = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO'
]

const inputClass = `
  w-full border font-sans text-sm text-ink placeholder-ink-soft rounded-lg px-3.5 py-2.5 bg-white
  transition-all
`.trim()

const labelClass = `block font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft mb-1.5`

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-sans font-bold text-sm uppercase tracking-widest text-ink mb-2">{children}</h2>
      <div className="h-px" style={{ background: 'var(--red)' }} />
    </div>
  )
}

export default function SejaRioSul() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
            <span className="text-white">Seja Rio Sul</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <Shield size={40} className="text-white/30" />
            <div>
              <h1 className="font-serif font-bold text-5xl text-white">Seja Rio Sul</h1>
              <p className="font-sans text-red-200 text-lg">Preencha o formulário e nossa equipe entrará em contato.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section style={{ background: 'var(--offwhite)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {submitted ? (
            <div
              className="rounded-2xl p-14 text-center"
              style={{ background: 'white', boxShadow: 'var(--shadow-lg)' }}
            >
              <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
              <h2 className="font-serif font-bold text-3xl text-ink mb-3">Cadastro enviado!</h2>
              <p className="font-sans text-ink-soft mb-8">
                Nossa equipe recebeu seu cadastro e entrará em contato em breve.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-sans font-semibold text-white px-6 py-3 rounded-xl"
                style={{ background: 'var(--red)' }}
              >
                Voltar para o início
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 md:p-12"
              style={{ background: 'white', boxShadow: 'var(--shadow-lg)' }}
            >
              {/* INFORMAÇÕES BÁSICAS */}
              <SectionTitle>Informações Básicas</SectionTitle>
              <div className="flex flex-col gap-5 mb-10">
                <Field label="Nome / Razão Social">
                  <input
                    type="text"
                    required
                    placeholder="Nome completo ou razão social"
                    className={inputClass}
                    style={{ border: '1.5px solid var(--border)' }}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="CPF / CNPJ">
                    <input type="text" placeholder="000.000.000-00" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="RG / IE">
                    <input type="text" placeholder="00.000.000-0" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Data de Nascimento / Abertura">
                    <input type="date" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="Data de Emissão">
                    <input type="date" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Órgão Emissor">
                    <input type="text" placeholder="Ex: SSP/TO" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="Estado Civil">
                    <select className={inputClass} style={{ border: '1.5px solid var(--border)' }}>
                      <option value="">Selecione</option>
                      <option>Solteiro(a)</option>
                      <option>Casado(a)</option>
                      <option>Divorciado(a)</option>
                      <option>Viúvo(a)</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Field label="Dependentes">
                    <input type="number" min="0" placeholder="0" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="Telefone">
                    <input type="tel" placeholder="(63) 99999-9999" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="E-mail">
                    <input type="email" placeholder="seu@email.com" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                </div>
              </div>

              {/* ENDEREÇO */}
              <SectionTitle>Endereço</SectionTitle>
              <div className="flex flex-col gap-5 mb-10">
                <div className="grid grid-cols-3 gap-5">
                  <div className="col-span-2">
                    <Field label="Endereço">
                      <input type="text" placeholder="Rua, Quadra, Avenida..." className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                    </Field>
                  </div>
                  <Field label="Número">
                    <input type="text" placeholder="Nº" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Complemento">
                    <input type="text" placeholder="Apto, Bloco, Sala..." className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="Bairro">
                    <input type="text" placeholder="Bairro" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <Field label="Cidade">
                    <input type="text" placeholder="Palmas" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                  <Field label="UF">
                    <select className={inputClass} style={{ border: '1.5px solid var(--border)' }}>
                      <option value="">UF</option>
                      {ufs.map(uf => <option key={uf}>{uf}</option>)}
                    </select>
                  </Field>
                  <Field label="CEP">
                    <input type="text" placeholder="77000-000" className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                  </Field>
                </div>
              </div>

              {/* VEÍCULO */}
              <SectionTitle>Informações do Veículo</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                <Field label="Tipo do Veículo">
                  <select className={inputClass} style={{ border: '1.5px solid var(--border)' }}>
                    <option value="">Selecione</option>
                    <option>Passeio</option>
                    <option>Pickup</option>
                    <option>SUV</option>
                    <option>Van</option>
                    <option>Caminhão</option>
                    <option>Moto</option>
                  </select>
                </Field>
                <Field label="Marca">
                  <input type="text" placeholder="Ex: Toyota, Fiat, Chevrolet..." className={inputClass} style={{ border: '1.5px solid var(--border)' }} />
                </Field>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full font-sans font-bold text-white rounded-xl transition-colors min-h-[56px]"
                style={{ background: 'var(--red)', padding: '16px', fontSize: '16px' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--red-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--red)')}
              >
                Solicitar Proteção →
              </button>

              <p className="font-sans text-xs text-ink-soft text-center mt-4 flex items-center justify-center gap-1.5">
                <Lock size={12} />
                Cadastro gratuito. Seus dados são protegidos pela LGPD.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
