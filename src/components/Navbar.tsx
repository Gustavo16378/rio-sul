import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useScrollDirection } from '../hooks/useScrollDirection'

const links = [
  { to: '/',            label: 'Rio Sul'     },
  { to: '/servicos',    label: 'Serviços'    },
  { to: '/seja-rio-sul',label: 'Seja Rio Sul'},
  { to: '/parceiros',   label: 'Parceiros'   },
  { to: '/blog',        label: 'Blog'        },
  { to: '/contato',     label: 'Contato'     },
]

export default function Navbar() {
  const direction = useScrollDirection()
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const scrollRef = useRef(0)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY >= 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollRef.current}px`
      document.body.style.width = '100%'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollRef.current)
    }
  }, [isOpen])

  const mobileMenu = (
    <>
      <div
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 250ms ease',
        }}
        onClick={() => setIsOpen(false)}
      />
      <aside
        style={{
          position: 'fixed', top: 0, right: 0,
          width: 'min(320px, 85vw)', height: '100dvh',
          background: '#fff',
          zIndex: 9999,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
          overflowY: 'auto',
          padding: '24px',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <img
              src="/photos/logo.jpeg"
              alt="Rio Sul Benefícios"
              className="h-9 w-auto object-contain"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-offwhite transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} className="text-ink" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg font-sans font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-red/10 text-red'
                    : 'text-ink hover:bg-offwhite'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <a
          href="https://riosul.org.br/area"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsOpen(false)}
          className="mt-6 block text-center bg-red hover:bg-red-hover text-white font-sans font-semibold text-sm px-6 py-3 rounded-lg transition-colors min-h-[44px]"
        >
          Área do Associado
        </a>
      </aside>
    </>
  )

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 300ms ease, background 300ms ease, box-shadow 300ms ease',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/photos/logo.jpeg"
            alt="Rio Sul Benefícios"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Links desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 font-sans text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? 'text-red'
                    : 'text-ink hover:text-red'
                }`
              }
              style={({ isActive }) => isActive ? {
                borderBottom: '2px solid var(--red)',
                borderRadius: '0',
                paddingBottom: '4px',
              } : {}}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + hambúrguer */}
        <div className="flex items-center gap-3">
          <a
            href="https://riosul.org.br/area"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center bg-red hover:bg-red-hover text-white font-sans font-semibold text-sm px-5 py-2 rounded-lg transition-colors min-h-[44px]"
          >
            Área do Associado
          </a>
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Abrir menu"
          >
            <Menu size={22} className="text-ink" />
          </button>
        </div>
      </div>

      {createPortal(mobileMenu, document.body)}
    </header>
  )
}
