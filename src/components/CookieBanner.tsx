import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const pref = localStorage.getItem('cookie-pref')
    if (!pref) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-pref', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-pref', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9990]"
      style={{ background: '#262626', borderTop: '1px solid rgba(255,255,255,0.1)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <Cookie size={18} className="text-gold flex-shrink-0 mt-0.5" />
          <p className="font-sans text-sm text-gray-300">
            Usamos cookies para melhorar sua experiência. Seus dados são protegidos pela{' '}
            <span className="text-white font-medium">LGPD</span>.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="font-sans text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 min-h-[44px]"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="font-sans text-sm font-semibold text-white px-4 py-2 rounded-lg transition-colors min-h-[44px]"
            style={{ background: 'var(--red)' }}
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  )
}
