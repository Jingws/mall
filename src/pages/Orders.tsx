import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useCart } from '../store/CartContext'
import { findProduct, siteConfig } from '../config'
import ProductImage from '../components/ProductImage'

const formatTime = (ts: number) => {
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`
}

export default function Orders() {
  const { orders } = useCart()
  const navigate = useNavigate()

  return (
    <div className="orders-page">
      <NavBar title="我的订单" />

      {orders.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-emoji">📦</div>
          <div className="cart-empty-text">还没有订单哦</div>
          <button className="primary-btn" onClick={() => navigate('/')}>
            去下单
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <div key={o.id} className="order-card">
              <div className="order-card-head">
                <span className="order-shop">🏪 {siteConfig.shop.name}</span>
                <span className="order-status">{o.status}</span>
              </div>
              {o.items.map((it) => {
                const p = findProduct(it.id)
                if (!p) return null
                return (
                  <div
                    key={it.id}
                    className="order-item"
                    onClick={() => navigate(`/product/${it.id}`)}
                  >
                    <ProductImage
                      emoji={p.emoji}
                      gradient={p.gradient}
                      image={p.image}
                      alt={p.name}
                      size={64}
                      radius={8}
                      fontSize={32}
                    />
                    <div className="order-item-info">
                      <div className="order-item-name">{p.name}</div>
                      <div className="order-item-desc">{p.desc}</div>
                    </div>
                    <div className="order-item-right">
                      <div>
                        <span className="price-symbol">¥</span>
                        {p.price}
                      </div>
                      <div className="muted">×{it.qty}</div>
                    </div>
                  </div>
                )
              })}
              <div className="order-card-foot">
                <div className="order-time">下单时间 {formatTime(o.createdAt)}</div>
                <div className="order-total">
                  共 {o.items.reduce((s, i) => s + i.qty, 0)} 件，实付
                  <span className="price-symbol red">¥</span>
                  <span className="price-num red big">{o.total}</span>
                </div>
              </div>
              <div className="order-card-actions">
                <button className="ghost-btn small">查看物流</button>
                <button className="primary-btn small">再次购买</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
