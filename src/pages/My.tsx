import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { siteConfig } from '../config'

const services = [
  { icon: '💰', name: '我的钱包' },
  { icon: '🎟️', name: '优惠券' },
  { icon: '⭐', name: '我的收藏' },
  { icon: '👣', name: '浏览足迹' },
  { icon: '📍', name: '收货地址' },
  { icon: '🎧', name: '在线客服' },
  { icon: '⚙️', name: '设置' },
  { icon: '❓', name: '帮助中心' },
]

export default function My() {
  const navigate = useNavigate()
  const { orders } = useCart()

  return (
    <div className="my-page">
      <div className="my-header">
        <div className="my-avatar">{siteConfig.user.avatarChar}</div>
        <div className="my-info">
          <div className="my-name">{siteConfig.brand.name}用户</div>
          <div className="my-vip">
            <span className="vip-tag">{siteConfig.user.vipLevel}</span>
            <span className="my-id">ID: {siteConfig.user.userId}</span>
          </div>
        </div>
        <div className="my-setting">⚙️</div>
      </div>

      <div className="my-stats">
        <div className="my-stat">
          <div className="my-stat-num">{orders.length}</div>
          <div className="my-stat-label">订单</div>
        </div>
        <div className="my-stat">
          <div className="my-stat-num">12</div>
          <div className="my-stat-label">收藏</div>
        </div>
        <div className="my-stat">
          <div className="my-stat-num">3</div>
          <div className="my-stat-label">优惠券</div>
        </div>
        <div className="my-stat">
          <div className="my-stat-num">688</div>
          <div className="my-stat-label">积分</div>
        </div>
      </div>

      <div className="my-card">
        <div className="my-card-title">
          <span>我的订单</span>
          <span
            className="my-card-more"
            onClick={() => navigate('/orders')}
          >
            全部订单 ›
          </span>
        </div>
        <div className="my-orders">
          <div className="my-order-item" onClick={() => navigate('/orders')}>
            <div className="my-order-icon">💳</div>
            <div>待付款</div>
          </div>
          <div className="my-order-item" onClick={() => navigate('/orders')}>
            <div className="my-order-icon">📦</div>
            <div>待发货</div>
            {orders.filter((o) => o.status === '待发货').length > 0 && (
              <span className="my-order-badge">
                {orders.filter((o) => o.status === '待发货').length}
              </span>
            )}
          </div>
          <div className="my-order-item" onClick={() => navigate('/orders')}>
            <div className="my-order-icon">🚚</div>
            <div>待收货</div>
          </div>
          <div className="my-order-item" onClick={() => navigate('/orders')}>
            <div className="my-order-icon">⭐</div>
            <div>待评价</div>
          </div>
          <div className="my-order-item" onClick={() => navigate('/orders')}>
            <div className="my-order-icon">↩️</div>
            <div>退款</div>
          </div>
        </div>
      </div>

      <div className="my-card">
        <div className="my-card-title">
          <span>常用功能</span>
        </div>
        <div className="my-services">
          {services.map((s) => (
            <div key={s.name} className="my-service">
              <div className="my-service-icon">{s.icon}</div>
              <div>{s.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-footer">{siteConfig.pageFooter}</div>
    </div>
  )
}
