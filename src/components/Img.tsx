import { useState } from 'react'
import { ImageOff } from 'lucide-react'

interface ImgProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  placeholderLabel?: string
}

export default function Img({ src, alt, className = '', style = {}, placeholderLabel }: ImgProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 ${className}`}
        style={{ background: 'linear-gradient(135deg, #ede8e3 0%, #d9d3cc 100%)', ...style }}
      >
        <ImageOff size={28} className="text-ink-soft opacity-40" />
        <div className="text-center px-4">
          <p className="font-sans text-[11px] font-semibold text-ink-soft opacity-60 leading-tight">
            {placeholderLabel ?? src}
          </p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      style={style}
      onError={() => setError(true)}
      loading="lazy"
    />
  )
}
