import { useState } from 'react'

interface Props {
  emoji: string
  gradient: string
  image?: string
  size?: number
  radius?: number
  fontSize?: number
  alt?: string
}

export default function ProductImage({
  emoji,
  gradient,
  image,
  size,
  radius = 12,
  fontSize,
  alt,
}: Props) {
  const [failed, setFailed] = useState(false)
  const showImage = image && !failed

  return (
    <div
      className="product-image"
      style={{
        background: gradient,
        width: size ? size + 'px' : '100%',
        height: size ? size + 'px' : '100%',
        borderRadius: radius,
        fontSize: fontSize ? fontSize + 'px' : undefined,
      }}
    >
      {showImage ? (
        <img
          className="product-image-img"
          src={image}
          alt={alt ?? ''}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="product-image-emoji">{emoji}</span>
      )}
    </div>
  )
}
