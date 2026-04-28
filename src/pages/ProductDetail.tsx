import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { findProduct, siteConfig } from '../config'
import { useCart } from '../store/CartContext'
import NavBar from '../components/NavBar'
import ProductImage from '../components/ProductImage'
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
          商品不存在 🥲
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
      </div>

      <div className="detail-card">
        <div className="detail-price-row">
          <div className="detail-price">
            <span className="price-symbol">¥</span>
            <span className="price-num big">{product.price}</span>
            <span className="price-origin">¥{product.origin}</span>
          </div>
          <div className="detail-sales">{product.sales}+ 人付款</div>
        </div>
        <div className="detail-name">{product.name}</div>
        <div className="detail-desc">{product.desc}</div>
        <div className="detail-services">
          {siteConfig.services.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>

      <div className="detail-card">
        <div className="section-title">
          <span className="section-bar" />
          <span>商品详情</span>
        </div>
        <ul className="detail-list">
          {product.detail.map((d, i) => (
            <li key={i}>
              <span className="detail-list-dot">●</span>
              {d}
            </li>
          ))}
        </ul>
        <div className="detail-image-block" style={{ background: product.gradient }}>
          <ProductImage
            emoji={product.emoji}
            gradient={product.gradient}
            image={product.image}
            alt={product.name}
            fontSize={96}
            radius={10}
          />
        </div>
      </div>

      <div className="detail-bar">
        <div className="detail-bar-icon" onClick={() => navigate('/')}>
          <div>🏪</div>
          <div>店铺</div>
        </div>
        <div className="detail-bar-icon" onClick={() => navigate('/cart')}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            🛒
            {totalQty > 0 && <span className="bar-badge">{totalQty}</span>}
          </div>
          <div>购物车</div>
        </div>
        <button
          className="detail-bar-btn cart"
          onClick={() => {
            setQty(1)
            setShowSku('cart')
          }}
        >
          加入购物车
        </button>
        <button
          className="detail-bar-btn buy"
          onClick={() => {
            setQty(1)
            setShowSku('buy')
          }}
        >
          立即购买
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
                radius={10}
                fontSize={42}
              />
              <div className="sku-head-info">
                <div className="sku-price">
                  <span className="price-symbol">¥</span>
                  <span className="price-num big">{product.price}</span>
                </div>
                <div className="sku-stock">库存充足 · 已选 1 件</div>
              </div>
              <span className="sku-close" onClick={() => setShowSku(null)}>×</span>
            </div>
            <div className="sku-section">
              <div className="sku-label">规格</div>
              <div className="sku-options">
                <span className="sku-option active">标准款</span>
                <span className="sku-option">尊享款</span>
              </div>
            </div>
            <div className="sku-section">
              <div className="sku-label">数量</div>
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>
            <button
              className={'sku-confirm ' + (showSku === 'buy' ? 'buy' : 'cart')}
              onClick={confirmSku}
            >
              {showSku === 'buy' ? '立即购买' : '加入购物车'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
