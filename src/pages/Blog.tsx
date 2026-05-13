import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ChevronRight, ChevronLeft, Home } from 'lucide-react'
import { posts } from '../data/posts'
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in'); obs.disconnect() } },
      { threshold: 0.05 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  red:  { bg: '#FEE2E2', text: '#8B1A1A' },
  gold: { bg: '#FEF3C7', text: '#92400E' },
  gray: { bg: '#F3F4F6', text: '#374151' },
}

function CategoryTag({ color, label }: { color: string; label: string }) {
  const style = categoryStyles[color] ?? categoryStyles.gray
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-full font-sans text-xs font-semibold"
      style={{ background: style.bg, color: style.text }}
    >
      {label}
    </span>
  )
}

export default function Blog() {
  const featured = posts.find(p => p.featured)!
  const others = posts.filter(p => !p.featured)
  const sideOthers = others.slice(0, 2)
  const bottomOthers = others.slice(2)

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-white" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 font-sans text-sm text-ink-soft mb-6">
            <Link to="/" className="hover:text-red transition-colors flex items-center gap-1">
              <Home size={14} /> Home
            </Link>
            <span>·</span>
            <span className="text-ink">Blog</span>
          </nav>
          <h1 className="font-serif font-bold text-5xl lg:text-6xl text-ink mb-4">Blog</h1>
          <p className="font-sans text-xl text-ink-soft">Dicas, novidades e conteúdo sobre proteção veicular.</p>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          {/* Grid assimétrico — destaque + 2 laterais */}
          {/* IMAGENS: public/images/blog/post-{id}.jpg */}
          {/* Post destaque: 16:7, ex: 1200×525px  |  Posts laterais: 3:2, ex: 600×400px  |  Posts menores: 4:3, ex: 800×600px */}
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

              {/* Post destaque */}
              <div
                className="lg:col-span-2 rounded-2xl overflow-hidden border cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div className="w-full aspect-[16/7] relative overflow-hidden">
                  <img
                    src={`/images/blog/post-${featured.id}.jpg`}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <CategoryTag color={featured.categoryColor} label={featured.category} />
                    <span className="font-sans text-xs text-ink-soft flex items-center gap-1">
                      <Clock size={12} /> {featured.readTime}
                    </span>
                    <span className="font-sans text-xs text-ink-soft">{featured.date}</span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl text-ink mb-3 group-hover:text-red transition-colors">
                    {featured.title}
                  </h2>
                  <p className="font-sans text-ink-soft text-sm leading-relaxed">{featured.excerpt}</p>
                </div>
              </div>

              {/* 2 posts laterais */}
              <div className="flex flex-col gap-6">
                {sideOthers.map(post => (
                  <div
                    key={post.id}
                    className="rounded-2xl overflow-hidden border cursor-pointer group flex-1 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div className="w-full h-28 relative overflow-hidden">
                      <img
                        src={`/images/blog/post-${post.id}.jpg`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryTag color={post.categoryColor} label={post.category} />
                        <span className="font-sans text-xs text-ink-soft">{post.readTime}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base text-ink group-hover:text-red transition-colors mb-1">
                        {post.title}
                      </h3>
                      <p className="font-sans text-xs text-ink-soft line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* Posts menores em grid 3 col */}
          {bottomOthers.length > 0 && (
            <RevealSection>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {bottomOthers.map(post => (
                  <div
                    key={post.id}
                    className="rounded-2xl overflow-hidden border cursor-pointer group transition-all duration-300 hover:-translate-y-0.5"
                    style={{ borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--red)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  >
                    <div className="w-full h-36 relative overflow-hidden">
                      <img
                        src={`/images/blog/post-${post.id}.jpg`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <CategoryTag color={post.categoryColor} label={post.category} />
                        <span className="font-sans text-xs text-ink-soft flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-ink mb-2 group-hover:text-red transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-sans text-sm text-ink-soft">{post.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          )}

          {/* Paginação */}
          <RevealSection>
            <div className="flex items-center justify-center gap-2">
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg font-sans text-sm text-ink-soft hover:text-ink border border-border hover:border-ink-soft transition-colors min-h-[44px]">
                <ChevronLeft size={16} /> Anterior
              </button>
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`w-10 h-10 rounded-lg font-sans text-sm font-medium transition-colors min-h-[44px] ${
                    n === 1
                      ? 'text-white'
                      : 'text-ink hover:bg-offwhite border border-border'
                  }`}
                  style={n === 1 ? { background: 'var(--red)' } : {}}
                >
                  {n}
                </button>
              ))}
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg font-sans text-sm text-ink-soft hover:text-ink border border-border hover:border-ink-soft transition-colors min-h-[44px]">
                Próxima <ChevronRight size={16} />
              </button>
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}
