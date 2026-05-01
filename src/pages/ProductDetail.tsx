import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findProduct, siteConfig } from '../config'
import { useCart } from '../store/CartContext'
import NavBar from '../components/NavBar'
import ProductImage from '../components/ProductImage'
import Icon from '../components/Icon'
import { showToast } from '../components/Toast'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = findProduct(Number(id))
  const { addToCart, totalQty } = useCart()
  const [showSku, setShowSku] = useState<null | 'cart' | 'buy'>(null)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="page-center">
        <NavBar title="商品详情" />
        <div className="empty" style={{ padding: 80 }}>
          // item.not_found
        </div>
      </div>
    )
  }

  const confirmSku = () => {
    if (showSku === 'cart') {
      addToCart(product.id, qty)
      showToast('已加入购物车')
      setShowSku(null)
    } else if (showSku === 'buy') {
      addToCart(product.id, qty)
      setShowSku(null)
      navigate('/checkout?from=detail&id=' + product.id)
    }
  }

  const skuId = 'SKU-' + String(product.id).padStart(4, '0')

  return (
    <div className="detail-page">
      <NavBar title="" transparent />

      <div className="detail-banner" style={{ background: product.gradient }}>
        <ProductImage
          emoji={product.emoji}
          gradient={product.gradient}
          image={product.image}
          alt={product.name}
          fontSize={160}
          radius={0}
        />
        <div className="detail-banner-tag">{product.tag}</div>
        <div className="detail-banner-id">
          <span className="dot" />
          {skuId}
        </div>
      </div>

      <div className="detail-card bracket-corners">
        <div className="detail-price-row">
          <div className="detail-price">
            <span className="price-symbol">¥</span>
            <span className="price-num big">{product.price}</span>
            <span className="price-origin">¥{product.origin}</span>
          </div>
          <div className="detail-sales">{product.sales}+ sold</div>
        </div>
        <div className="detail-name">{product.name}</div>
        <div className="detail-desc">{product.desc}</div>
        <div className="detail-services">
          {siteConfig.services.map((s) => (
            <span key={s}>{s.replace(/^·\s*/, '')}</span>
          ))}
        </div>
      </div>

      <div className="detail-card bracket-corners">
        <div className="section-title" style={{ padding: '0 0 8px' }}>
          spec sheet
          <span className="section-tip">
            <Icon name="cpu" size={11} /> verified
          </span>
        </div>
        <ul className="detail-list">
          {product.detail.map((d, i) => (
            <li key={i}>
              <span className="detail-list-dot">
                {String(i + 1).padStart(2, '0')}
              </span>
              {d}
            </li>
          ))}
        </ul>
        <div
          className="detail-image-block"
          style={{ background: product.gradient }}
        >
          <ProductImage
            emoji={product.emoji}
            gradient={product.gradient}
            image={product.image}
            alt={product.name}
            fontSize={96}
            radius={0}
          />
        </div>
      </div>

      <div className="detail-bar">
        <button
          type="button"
          className="detail-bar-icon"
          onClick={() => navigate('/')}
        >
          <span className="detail-bar-icon-svg">
            <Icon name="store" size={18} />
          </span>
          <span className="detail-bar-icon-label">shop</span>
        </button>
        <button
          type="button"
          className="detail-bar-icon"
          onClick={() => navigate('/cart')}
          style={{ position: 'relative' }}
        >
          <span className="detail-bar-icon-svg">
            <Icon name="cart" size={18} />
          </span>
          <span className="detail-bar-icon-label">cart</span>
          {totalQty > 0 && <span className="bar-badge">{totalQty}</span>}
        </button>
        <button
          className="detail-bar-btn cart"
          onClick={() => {
            setQty(1)
            setShowSku('cart')
          }}
        >
          add to cart
        </button>
        <button
          className="detail-bar-btn buy"
          onClick={() => {
            setQty(1)
            setShowSku('buy')
          }}
        >
          buy now
        </button>
      </div>

      {showSku && (
        <div className="sku-mask" onClick={() => setShowSku(null)}>
          <div className="sku-panel" onClick={(e) => e.stopPropagation()}>
            <div className="sku-head">
              <ProductImage
                emoji={product.emoji}
                gradient={product.gradient}
                image={product.image}
                alt={product.name}
                size={88}
                radius={0}
                fontSize={42}
              />
              <div className="sku-head-info">
                <div className="sku-price">
                  <span className="price-symbol">¥</span>
                  <span className="price-num big">{product.price}</span>
                </div>
                <div className="sku-stock">stock_ok · {skuId}</div>
              </div>
              <button
                type="button"
                className="sku-close"
                onClick={() => setShowSku(null)}
                aria-label="关闭"
              >
                <Icon name="close" size={14} />
              </button>
            </div>
            <div className="sku-section">
              <div className="sku-label">variant</div>
              <div className="sku-options">
                <span className="sku-option active">standard</span>
                <span className="sku-option">prestige</span>
              </div>
            </div>
            <div className="sku-section">
              <div className="sku-label">quantity</div>
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Icon name="minus" size={14} />
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button onClick={() => setQty((q) => q + 1)}>
                  <Icon name="plus" size={14} />
                </button>
              </div>
            </div>
            <button
              className={'sku-confirm ' + (showSku === 'buy' ? 'buy' : 'cart')}
              onClick={confirmSku}
            >
              {showSku === 'buy' ? 'execute purchase' : 'add to cart'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
