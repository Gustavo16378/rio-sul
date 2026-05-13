# PROMPT — RIO SUL BENEFÍCIOS · SITE OFICIAL · CLAUDE CODE

---

## MISSÃO

Implemente o site oficial da **Rio Sul Benefícios** em React 19 + TypeScript + Vite + TailwindCSS v3 + Lucide React, com base no design aprovado. O design de referência é um protótipo HTML que já foi validado — o objetivo é recriar fielmente em código limpo, componentizado e escalável.

---

## STACK OBRIGATÓRIA

```json
{
  "dependencies": {
    "lucide-react": "^1.14.0",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.14",
    "tailwindcss": "^3.4.19",
    "typescript": "~6.0.2",
    "vite": "^8.0.10"
  }
}
```

Use apenas essas dependências. Nada além.

---

## IDENTIDADE VISUAL (extraída do design aprovado)

**Variáveis CSS — definir no `index.css`:**
```css
:root {
  --red:       #8B1A1A;
  --red-hover: #A52020;
  --gold:      #F5A623;
  --gold-hover:#E8891A;
  --ink:       #2D2D2D;
  --ink-soft:  #6B6B6B;
  --offwhite:  #F7F5F3;
  --white:     #FFFFFF;
  --border:    #E8E4E0;
  --footer-bg: #262626;
  --shadow-sm: 0 1px 4px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 48px rgba(0,0,0,0.12);
}
```

**Tipografia (Google Fonts — importar no `index.css`):**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
```
- Títulos/display: `Playfair Display` — peso 700/800/900
- Todo o resto: `DM Sans` — peso 400/500/600/700
- NUNCA use Inter, Roboto, Arial ou system fonts

**Tailwind config — estender com as cores:**
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      red:    { DEFAULT: '#8B1A1A', hover: '#A52020' },
      gold:   { DEFAULT: '#F5A623', hover: '#E8891A' },
      ink:    { DEFAULT: '#2D2D2D', soft: '#6B6B6B' },
      border: '#E8E4E0',
    },
    fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
      sans:  ['"DM Sans"', 'sans-serif'],
    },
  }
}
```

---

## ESTRUTURA DE ARQUIVOS

```
/src
  /components
    Navbar.tsx
    Footer.tsx
    CookieBanner.tsx
  /pages
    Home.tsx
    Servicos.tsx
    SejaRioSul.tsx
    Parceiros.tsx
    Blog.tsx
    Contato.tsx
  /data
    services.ts
    partners.ts
    posts.ts
    testimonials.ts
  /hooks
    useScrollDirection.ts
  App.tsx
  main.tsx
  index.css
```

---

## ROTEAMENTO

Usar `react-router-dom` v7 com `BrowserRouter`:

```
/           → Home
/servicos   → Serviços
/seja-rio-sul → Seja Rio Sul
/parceiros  → Parceiros
/blog       → Blog
/contato    → Contato
```

Scroll para o topo em toda mudança de rota (`useEffect` + `window.scrollTo(0,0)` no App.tsx ou via `ScrollRestoration`).

---

## NAVBAR — IMPLEMENTAÇÃO TÉCNICA OBRIGATÓRIA

### Comportamento geral
- Fixa no topo: `position: fixed`, `z-index: 1000`
- Transparente quando `scrollY < 40px`
- Fundo `#FFFFFF` + `backdrop-blur-md` + `border-bottom: 1px solid var(--border)` quando `scrollY >= 40px`
- Transição suave: `transition: all 300ms ease`

### Hide on scroll down / Show on scroll up
Hook `useScrollDirection` em `/hooks/useScrollDirection.ts`:
```ts
import { useEffect, useRef, useState } from 'react'

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const lastY = useRef(0)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setDirection(y > lastY.current && y > 80 ? 'down' : 'up')
      lastY.current = y
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return direction
}
```

Aplicar na Navbar:
```tsx
const direction = useScrollDirection()
// transform: direction === 'down' ? 'translateY(-100%)' : 'translateY(0)'
// transition: 'transform 300ms ease'
```

### Layout desktop
- Logo à esquerda: quadrado vermelho `40×40px` com "RS" em Playfair Display + badge dourado `8×8px` no canto superior direito + texto "Rio Sul / BENEFÍCIOS" ao lado
- Links centralizados: `Rio Sul · Serviços · Seja Rio Sul · Parceiros · Blog · Contato`
- Link ativo: `color: var(--red)` + underline `2px solid var(--red)` abaixo
- CTA à direita: `"Área do Associado"` → `https://riosul.org.br/area` (link externo), botão vermelho preenchido

### Menu mobile (hambúrguer) — IMPLEMENTAÇÃO OBRIGATÓRIA
Renderizar via `ReactDOM.createPortal(content, document.body)` — NUNCA dentro do `<nav>`.

```tsx
// Estrutura do portal:
// 1. Overlay: div com backdrop-blur, z-index 9998
// 2. Painel: aside deslizando da direita, z-index 9999

// Overlay — usar estilos INLINE (não Tailwind) para evitar conflitos:
const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  zIndex: 9998,
  opacity: isOpen ? 1 : 0,
  pointerEvents: isOpen ? 'auto' : 'none',
  transition: 'opacity 250ms ease',
}

// Painel — usar estilos INLINE:
const panelStyle: React.CSSProperties = {
  position: 'fixed', top: 0, right: 0,
  width: 'min(320px, 85vw)', height: '100dvh',
  background: '#fff',
  zIndex: 9999,
  transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
  overflowY: 'auto',
  padding: '24px',
  display: 'flex', flexDirection: 'column',
}
```

**Scroll lock (funciona no iOS Safari):**
```tsx
useEffect(() => {
  if (isOpen) {
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
  } else {
    const scrollY = document.body.style.top
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    if (scrollY) window.scrollTo(0, parseInt(scrollY) * -1)
  }
}, [isOpen])
```

Clicar em qualquer link do painel: navega + fecha menu (`setIsOpen(false)`).
Clicar no overlay: fecha menu.
Botão "×" dentro do painel para fechar.
Prefixo `WebkitBackdropFilter` para iOS Safari.

---

## ANIMAÇÕES

`IntersectionObserver` para fade-in + slide-up ao entrar na viewport.

No `index.css`:
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal.in {
  opacity: 1;
  transform: translateY(0);
}
```

Hook reutilizável ou utilitário que adiciona `.in` quando elemento entra na viewport.
Stagger nos cards: `transition-delay` de 0ms, 100ms, 200ms por item via inline style.

---

## DADOS — `/data` (fonte da verdade)

### `/data/services.ts`
```ts
export const services = [
  {
    id: 'assistencia',
    icon: 'Zap',
    title: 'Assistência 24h',
    summary: 'Reboque, chaveiro, pane seca, motorista substituto e mais — onde e quando precisar.',
    items: [
      'Reboque', 'Socorro elétrico/mecânico', 'Motorista Substituto',
      'Chaveiro', 'Pane-Seca', 'Táxi', 'Remoção', 'Hospedagem',
      'Guarda do veículo', 'Troca de pneus',
    ],
  },
  {
    id: 'protecao',
    icon: 'Shield',
    title: 'Proteção Total',
    summary: 'Furto, roubo, colisão e incêndio com indenização integral pela Tabela FIPE.',
    badge: 'Sem distinção de perfil',
    items: [
      'Furto / Roubo / Colisão / Incêndio',
      'Indenização de 100% Tabela FIPE',
      'Cobertura Nacional',
      'Sem distinção de perfil',
      'Cobertura para veículos com até 20 anos',
      'Carro Reserva por 10 dias (passeio)',
      'Proteção de vidros — opcional',
      'Cobertura à Acidentes Pessoais (A.P.P.) — opcional',
    ],
  },
  {
    id: 'vidros',
    icon: 'Layers',
    title: 'Proteção de Vidros',
    summary: 'Reparo ou substituição de vidros, retrovisores e faróis com cobertura nacional.',
    items: ['Parabrisa', 'Vidros laterais', 'Vidro traseiro', 'Retrovisores', 'Faróis'],
  },
]
```

### `/data/partners.ts`
```ts
export const partners = [
  { id: 1,  name: 'Aliança Reformas',    segment: 'Serviços e Peças para Caminhões' },
  { id: 2,  name: 'Atlântico Life Style', segment: 'Lifestyle'                       },
  { id: 3,  name: 'AVIS',                segment: 'Locadora de Veículos'             },
  { id: 4,  name: 'Goldkar',             segment: 'Estética Automotiva'              },
  { id: 5,  name: 'JS Baterias',         segment: 'Baterias Automotivas'             },
  { id: 6,  name: 'Leo Kar Auto Center', segment: 'Auto Center'                      },
  { id: 7,  name: 'Localiza',            segment: 'Locadora de Veículos'             },
  { id: 8,  name: 'Parceria Auto Center',segment: 'Auto Center'                      },
  { id: 9,  name: 'Pneus Norte',         segment: 'Vidros Automotivos e Pneus'       },
  { id: 10, name: 'RS24horas',           segment: 'Assistência 24h'                  },
  { id: 11, name: 'SanMax Automotiva',   segment: 'Automotiva'                       },
  { id: 12, name: 'WG Lanternagem',      segment: 'Mecânica, Funilaria e Pintura'    },
]
```

### `/data/posts.ts`
```ts
export const posts = [
  {
    id: 1, featured: true,
    category: 'Proteção Veicular', categoryColor: 'red',
    title: 'Como funciona a proteção veicular? Tire suas dúvidas',
    excerpt: 'Entenda as diferenças entre seguro tradicional e proteção veicular, e por que cada vez mais motoristas estão fazendo a troca.',
    date: '10 Jan 2025', readTime: '5 min',
    image: null,
  },
  {
    id: 2, featured: false,
    category: 'Dicas', categoryColor: 'gold',
    title: '5 situações em que a assistência 24h salva o seu dia',
    excerpt: 'Da pane seca ao pneu furado na estrada — veja como funciona na prática.',
    date: '22 Jan 2025', readTime: '4 min',
    image: null,
  },
  {
    id: 3, featured: false,
    category: 'Institucional', categoryColor: 'gray',
    title: 'Rio Sul renova certificação ISO 9001 pelo terceiro ano consecutivo',
    excerpt: 'A renovação reforça nosso compromisso com a qualidade e a satisfação dos associados.',
    date: '05 Fev 2025', readTime: '3 min',
    image: null,
  },
  {
    id: 4, featured: false,
    category: 'Proteção Veicular', categoryColor: 'red',
    title: 'Diferença entre seguro e proteção veicular: o que você precisa saber',
    excerpt: 'Muita gente confunde os dois. Veja o comparativo completo e tome a melhor decisão.',
    date: '18 Fev 2025', readTime: '6 min',
    image: null,
  },
]
```

### `/data/testimonials.ts`
```ts
export const testimonials = [
  { id: 1, text: 'Reboque chegou em 30 minutos. Atendimento foi humano e rápido.', author: 'Carla M.', vehicle: 'Honda HR-V', years: 3  },
  { id: 2, text: 'Indeniziaram 100% da FIPE sem burocracia. Recomendo.',           author: 'Rodrigo P.', vehicle: 'Toyota Corolla', years: 2 },
  { id: 3, text: 'Atendimento 24h funciona de verdade. Já usei 3 vezes.',          author: 'Janaína S.', vehicle: 'Fiat Argo', years: 4    },
]
```

---

## PÁGINAS — CONTEÚDO E LAYOUT

### `Home.tsx`

**Seção 1 — Hero** (`min-h-screen`, fundo branco)
- Textura diagonal sutil no lado direito: SVG inline com `<pattern>` de linhas finas `#F0EDE8`, `opacity: 0.4`
- Layout 2 colunas: texto à esquerda, visual à direita
- Badge: pill com ícone Shield + `"ISO 9001 · AAAPV · +13 anos protegendo você"` — fundo `#FFF3E0`, borda `#F5A623`, texto `#8B1A1A`
- Título: Playfair Display 700, `clamp(42px, 6vw, 80px)`:
  ```
  Proteção veicular
  que você pode confiar.
  ```
- Subtítulo DM Sans, cinza suave
- CTAs: `"Quero Proteção →"` (vermelho) + `"Ver Serviços"` (outline vermelho)
- Stats em linha: `+13 Anos · 24h Assistência · ISO 9001 · AAAPV` — separados por linha vertical `1px solid var(--border)`. Números em Playfair Display vermelho.
- Visual direito: mockup de app mobile (div estilizada simulando tela de smartphone com fundo vermelho, cards de serviço e badge dourado flutuante). Recriar o mockup do design aprovado com divs/CSS — sem imagem externa.

**Seção 2 — Sobre** (fundo `var(--offwhite)`, border top/bottom `var(--border)`)
- Label `"A RIO SUL"` em DM Sans uppercase vermelho
- Título Playfair Display: `"Uma associação que cuida do que move você."`
- Texto descritivo + 3 pilares (ícone + título + descrição)
- Placeholder de imagem à direita com badge `"2012 / Fundada em"` sobreposto
- Botão outline `"Saiba Mais →"` → `/servicos`

**Seção 3 — Serviços resumo** (fundo branco)
- Header: label + título `"O que sua proteção inclui."` + link `"Ver todos os serviços →"` alinhado à direita
- Grid 3 colunas → 1 mobile: cards dos 3 serviços principais do array `services`
- Cada card: ícone Lucide (fundo `#FFF3E0`, ícone vermelho), título, descrição, link `"Ver detalhes →"` vermelho

**Seção 4 — Depoimentos** (fundo branco, padding menor)
- Grid 3 colunas → 1 mobile: cards de depoimentos do array `testimonials`
- Cada card: estrelas douradas, texto em Playfair Display itálico, avatar + nome + veículo + anos

**Seção 5 — CTA Banner** (fundo vermelho `#8B1A1A`, `border-radius: 16px`, dentro do container)
- Label `"PRONTO?"` uppercase
- Título branco: `"Pronto para proteger seu veículo?"`
- Subtexto branco suave
- Botão dourado `"Faça parte da Rio Sul →"` → `/seja-rio-sul`

---

### `Servicos.tsx`

**Hero da página** (fundo `var(--offwhite)`, ~300px)
- Breadcrumb: `Home / Serviços` com separador `·`
- Título Playfair Display grande
- Subtítulo DM Sans

**Serviço 1 — Assistência 24h** (layout alternado: imagem esquerda, conteúdo direita)
- Placeholder de imagem (`border-radius: 16px`)
- Título vermelho Playfair Display
- Lista de itens com ícone `Check` vermelho + texto

**Serviço 2 — Proteção Total** (layout alternado: conteúdo esquerda, visual direita)
- Visual direito: SVG de chave automotiva estilizada (recriar com SVG path ou usar ícone Lucide `Key` grande, `font-size: 200px`, cor `#8B1A1A`, com `filter: drop-shadow(...)` e `transform: rotate(-15deg)`)
- Badge pill dourado: `"Sem distinção de perfil"`
- Lista completa de itens

**Serviço 3 — Proteção de Vidros** (card em fundo `var(--offwhite)`)

**CTA final** → vermelho → `/seja-rio-sul`

---

### `SejaRioSul.tsx`

**Hero** (fundo vermelho `#8B1A1A`, ~280px, texto branco)

**Formulário** (card branco centralizado, `max-width: 860px`, `border-radius: 24px`, sombra `var(--shadow-lg)`)

Organizado em 3 seções, cada uma com título + linha vermelha fina separando:

**INFORMAÇÕES BÁSICAS**
- Nome/Razão Social — full width
- CPF/CNPJ · RG/IE — 2 col
- Data Nascimento/Abertura · Data Emissão — 2 col
- Órgão Emissor · Estado Civil (select) — 2 col
- Dependentes · Telefone · E-mail — 3 col

**ENDEREÇO**
- Endereço · Nº — 3/1 col
- Complemento · Bairro — 2 col
- Cidade · UF (select) · CEP — 3 col

**INFORMAÇÕES DO VEÍCULO**
- Tipo do Veículo · Marca — 2 col

**Estilo dos inputs:**
- Label acima, DM Sans `12px` cinza, `font-weight: 600`, uppercase, `letter-spacing: 0.08em`
- Input: `border: 1.5px solid var(--border)`, `border-radius: 8px`, `padding: 10px 14px`, fundo branco
- Focus: `border-color: var(--red)`, `box-shadow: 0 0 0 3px rgba(139,26,26,0.1)`, outline none
- Placeholder: `var(--ink-soft)`

**Botão submit:** `"Solicitar Proteção →"` — vermelho, full width, `padding: 16px`, `border-radius: 12px`, DM Sans 700
**Nota LGPD:** `"🔒 Cadastro gratuito. Seus dados são protegidos pela LGPD."` — DM Sans pequeno, cinza

---

### `Parceiros.tsx`

**Hero** (fundo `var(--offwhite)`)

**Grid de parceiros** — 4 col desktop / 2 tablet / 1 mobile
- Cada card: fundo branco, `border: 1px solid var(--border)`, `border-radius: 16px`, `padding: 32px 24px`
- Centro: iniciais estilizadas (2 letras) em quadrado vermelho `60×60px` `border-radius: 12px` + nome + segmento
- Hover: `border-color: var(--red)`, `box-shadow: var(--shadow-md)`, `transform: translateY(-2px)`
- Dados do array `partners`

**CTA final:** `"Quer ser parceiro Rio Sul?"` + botão outline vermelho → `/contato`

---

### `Blog.tsx`

**Hero** (fundo branco)

**Grid assimétrico** — post em destaque (`featured: true`) ocupa 2/3 à esquerda, 2 posts menores empilhados à direita. No mobile: 1 coluna.

**Cards:**
- Tag de categoria com cor: vermelho (Proteção Veicular), dourado (Dicas), cinza (Institucional)
- Placeholder de imagem com `border-radius: 12px` + overlay escuro sutil no rodapé
- Título, data, tempo de leitura
- Hover: borda vermelha + zoom `scale(1.02)` na imagem

**Posts menores** abaixo em grid 3 colunas → 1 mobile

**Paginação:** `← Anterior · 1 · 2 · 3 · Próxima →` — simples, sem funcionalidade real

---

### `Contato.tsx`

**Hero** (fundo vermelho `#8B1A1A`, texto branco)

**Layout 2 colunas** → 1 mobile:

**Coluna esquerda — Informações:**
- Card fundo `var(--offwhite)`, `border-radius: 16px`, `padding: 40px`
- Cada item com ícone Lucide vermelho (`MapPin`, `Phone`, `Mail`):
  - Endereço: `Quadra 602 Sul, Conj. 01, Lote 01, Plano Diretor Sul — Palmas/TO · CEP: 77022-002`
  - Telefone: `(63) 3216-2002` + botão WhatsApp → `https://wa.me/556332162002`
  - Assistência 24h: `0800-030-6672` — badge vermelho destacado
  - E-mail: `atendimento@riosul.org.br`
- Redes sociais: ícone Instagram → `https://instagram.com/riosulbeneficos`
- Selos: `ISO 9001 · AAAPV`

**Coluna direita — Formulário:**
- Card branco com sombra
- Campos: Nome · E-mail · Telefone · Assunto (select: Quero ser associado / Sou associado / Parceria / Imprensa / Outros) · Mensagem (textarea 4 linhas)
- Botão: `"Enviar Mensagem"` — vermelho, full width
- Submit: sem backend — mostrar mensagem de sucesso inline após envio

---

## FOOTER (presente em todas as páginas)

Fundo `#262626`. Linha fina `2px solid var(--red)` no topo.

3 colunas → 1 mobile:
- **Col 1:** Logo "RS" + slogan + ícones Instagram/WhatsApp
- **Col 2:** `"Navegue"` + links das páginas
- **Col 3:** `"Contato"` + endereço + telefone + e-mail + badge `"24h: 0800-030-6672"` vermelho

Footer bottom (linha separadora fina cinza):
- `"Rio Sul Benefícios © 2025 · CNPJ 18.205.068/0001-72 · Palmas, TO"`
- Selos `ISO 9001 · AAAPV` com ícone dourado

---

## COOKIE BANNER

Componente `CookieBanner.tsx` fixo no rodapé da página.
- Fundo `#262626`, texto branco, `border-radius: 12px 12px 0 0` ou card flutuante
- Texto: `"Usamos cookies para melhorar sua experiência. Seus dados são protegidos pela LGPD."`
- Botões: `"Aceitar"` (vermelho) + `"Recusar"` (outline cinza)
- Salvar preferência em `localStorage`, não mostrar novamente se já escolheu

---

## SEO

No `index.html`:
```html
<title>Rio Sul Benefícios — Proteção Veicular em Palmas, TO</title>
<meta name="description" content="Proteção veicular completa para leves e pesados. Assistência 24h, proteção total, carro reserva e muito mais. ISO 9001 e AAAPV. Palmas/TO.">
<meta property="og:title" content="Rio Sul Benefícios — Proteção Veicular">
<meta property="og:description" content="Proteção veicular completa com assistência 24h nacional. Certificada ISO 9001 e AAAPV.">
<meta property="og:type" content="website">
<meta name="theme-color" content="#8B1A1A">
```

---

## RESPONSIVIDADE

- **Mobile-first obrigatório** — escrever classes mobile primeiro, depois `md:` e `lg:`
- Navbar: hambúrguer em `< lg` (1024px)
- Hero: título `text-4xl md:text-6xl lg:text-7xl`, stats em grid `2×2` no mobile
- Todos os grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Parceiros: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Formulário: todos campos full width no mobile
- Footer: `grid-cols-1 md:grid-cols-3`
- Tap targets mínimos: `min-h-[44px] min-w-[44px]`
- Imagens e placeholders com `loading="lazy"`
- Links externos: `target="_blank" rel="noopener noreferrer"`

---

## O QUE NÃO FAZER

❌ Site escuro — FUNDO BRANCO/OFF-WHITE obrigatório
❌ Inter, Roboto, Arial ou system fonts
❌ Amarelo como cor de fundo de seções
❌ Inline styles espalhados pelo código — usar Tailwind + CSS vars
❌ Componentes gigantes — cada seção é um componente separado
❌ Dados hardcoded nos componentes — tudo vem dos arrays em `/data`
❌ `overflow: hidden` no body para scroll lock — usar o método `position: fixed` + `top: -scrollY`
❌ Overlay/painel do mobile menu dentro do `<nav>` — usar `ReactDOM.createPortal`
❌ Sombras pesadas exageradas
❌ `rounded-full` em cards e botões grandes

---

## REFERÊNCIAS DO DESIGN APROVADO

O design foi gerado e aprovado no Claude Design com base nas seguintes decisões:
- Playfair Display + DM Sans como tipografia
- Vermelho `#8B1A1A` institucional + dourado `#F5A623` como acento
- Cards brancos com borda `#E8E4E0` e sombra sutil
- Seções alternando entre `#FFFFFF` e `#F7F5F3`
- Mockup de app mobile no hero (recriar com divs CSS)
- Depoimentos de associados na home (adição aprovada)
- Footer escuro `#262626` com linha vermelha no topo

---

*Prompt gerado para implementação no Claude Code · VSCode*
*Projeto: Rio Sul Benefícios · Palmas, TO*