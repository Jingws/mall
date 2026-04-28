import { NavLink } from 'react-router-dom'
import { useCart } from '../store/CartContext'

const tabs = [
  { to: '/', label: '首页', icon: '🏠' },
  { to: '/category', label: '分类', icon: '🗂️' },
  { to: '/cart', label: '购物车', icon: '🛒' },
  { to: '/my', label: '我的', icon: '👤' },
]

export default function TabBar() {
  const { totalQty } = useCart()

  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end
          className={({ isActive }) =>
            'tabbar-item' + (isActive ? ' active' : '')
          }
        >
          <span className="tabbar-icon">
            {t.icon}
            {t.to === '/cart' && totalQty > 0 && (
              <span className="tabbar-badge">{totalQty > 99 ? '99+' : totalQty}</span>
            )}
          </span>
          <span className="tabbar-label">{t.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
