import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, MapPin, Phone, Mail, Award } from 'lucide-react'

const navLinks = [
  { to: '/',             label: 'Rio Sul'      },
  { to: '/servicos',     label: 'Serviços'     },
  { to: '/seja-rio-sul', label: 'Seja Rio Sul' },
  { to: '/parceiros',    label: 'Parceiros'    },
  { to: '/blog',         label: 'Blog'         },
  { to: '/contato',      label: 'Contato'      },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--footer-bg)', borderTop: '2px solid var(--red)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1 — Logo e redes */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 bg-red rounded flex items-center justify-center flex-shrink-0">
                <span className="font-serif font-bold text-base text-white">RS</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gold rounded-full border-2 border-footer-bg" />
              </div>
              <div className="leading-tight">
                <div className="font-serif font-bold text-sm text-white">Rio Sul</div>
                <div className="text-[10px] font-sans tracking-widest uppercase text-gray-400">Benefícios</div>
              </div>
            </div>
            <p className="font-sans text-sm text-gray-400 leading-relaxed mb-5">
              Proteção veicular completa para você e sua família. Há mais de 13 anos cuidando do que move você.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/riosulbeneficos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white" />
              </a>
              <a
                href="https://wa.me/556332162002"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Col 2 — Navegação */}
          <div>
            <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Navegue
            </h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contato */}
          <div>
            <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Contato
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-3">
                <MapPin size={16} className="text-red flex-shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-gray-300">
                  Quadra 602 Sul, Conj. 01, Lote 01<br />
                  Plano Diretor Sul — Palmas/TO<br />
                  CEP: 77022-002
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={16} className="text-red flex-shrink-0" />
                <a href="tel:+556332162002" className="font-sans text-sm text-gray-300 hover:text-white transition-colors">
                  (63) 3216-2002
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} className="text-red flex-shrink-0" />
                <a href="mailto:atendimento@riosul.org.br" className="font-sans text-sm text-gray-300 hover:text-white transition-colors">
                  atendimento@riosul.org.br
                </a>
              </li>
              <li>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-sans text-xs font-semibold text-white"
                  style={{ background: 'var(--red)' }}
                >
                  <Phone size={12} />
                  24h: 0800-030-6672
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-gray-500 text-center sm:text-left">
            Rio Sul Benefícios © 2025 · CNPJ 18.205.068/0001-72 · Palmas, TO
          </p>
          <div className="flex items-center gap-2">
            <Award size={14} className="text-gold" />
            <span className="font-sans text-xs text-gray-500">ISO 9001</span>
            <span className="text-gray-600">·</span>
            <Award size={14} className="text-gold" />
            <span className="font-sans text-xs text-gray-500">AAAPV</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
