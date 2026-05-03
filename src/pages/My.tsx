import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { siteConfig } from '../config'
import Icon, { type IconName } from '../components/Icon'

interface ServiceItem {
  icon: IconName
  name: string
  to?: string
}

const services: ServiceItem[] = [
  { icon: 'wallet', name: 'wallet · 我的钱包' },
  { icon: 'ticket', name: 'coupons · 优惠券' },
  { icon: 'star', name: 'favorites · 我的收藏' },
  { icon: 'footprint', name: 'history · 浏览足迹' },
  { icon: 'location', name: 'address · 收货地址', to: '/addresses' },
  { icon: 'headset', name: 'support · 在线客服' },
  { icon: 'settings', name: 'settings · 设置' },
  { icon: 'help', name: 'help · 帮助中心' },
]

interface OrderTab {
  icon: IconName
  name: string
  showBadgeFor?: '待发货'
}

const orderTabs: OrderTab[] = [
  { icon: 'card', name: 'unpaid' },
  { icon: 'package', name: 'ship', showBadgeFor: '待发货' },
  { icon: 'truck', name: 'on_way' },
  { icon: 'star', name: 'review' },
  { icon: 'refund', name: 'refund' },
]

export default function My() {
  const navigate = useNavigate()
  const { orders } = useCart()
  const pendingShipCount = orders.filter((o) => o.status === '待发货').length

  return (
    <div className="my-page">
      <div className="my-header">
        <div className="my-avatar">{siteConfig.user.avatarChar}</div>
        <div className="my-info">
          <div className="my-name">{siteConfig.user.name}</div>
          <div className="my-vip">
            <span className="vip-tag">{siteConfig.user.vipLevel}</span>
            <span className="my-id mono">ID · {siteConfig.user.userId}</span>
          </div>
        </div>
        <button
          type="button"
          className="my-setting"
          aria-label="设置"
          onClick={() => navigate('/my')}
        >
          <Icon name="settings" size={16} />
        </button>
      </div>

      <div className="my-stats">
        <div className="my-stat">
          <div className="my-stat-num">{orders.length}</div>
          <div className="my-stat-label">orders</div>
        </div>
        <div className="my-stat">
          <div className="my-stat-num">12</div>
          <div className="my-stat-label">favs</div>
        </div>
        <div className="my-stat">
          <div className="my-stat-num">3</div>
          <div className="my-stat-label">coupons</div>
        </div>
        <div className="my-stat">
          <div className="my-stat-num">688</div>
          <div className="my-stat-label">points</div>
        </div>
      </div>

      <div className="my-card bracket-corners">
        <div className="my-card-title">
          orders
          <span
            className="my-card-more"
            onClick={() => navigate('/orders')}
          >
            view all ›
          </span>
        </div>
        <div className="my-orders">
          {orderTabs.map((t) => {
            const showBadge =
              t.showBadgeFor === '待发货' && pendingShipCount > 0
            return (
              <div
                key={t.name}
                className="my-order-item"
                onClick={() => navigate('/orders')}
              >
                <div className="my-order-icon">
                  <Icon name={t.icon} size={22} />
                </div>
                <div>{t.name}</div>
                {showBadge && (
                  <span className="my-order-badge">{pendingShipCount}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="my-card bracket-corners">
        <div className="my-card-title">tools</div>
        <div className="my-services">
          {services.map((s) => (
            <div
              key={s.name}
              className="my-service"
              onClick={() => s.to && navigate(s.to)}
            >
              <div className="my-service-icon">
                <Icon name={s.icon} size={16} />
              </div>
              <div className="my-service-name">{s.name}</div>
              <div className="my-service-arrow">
                <Icon name="chevron-right" size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-footer">{siteConfig.pageFooter}</div>
    </div>
  )
}
