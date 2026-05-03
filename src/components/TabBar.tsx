import { NavLink } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import Icon, { type IconName } from './Icon'

interface Tab {
  to: string
  label: string
  icon: IconName
}

const tabs: Tab[] = [
  { to: '/', label: 'home', icon: 'home' },
  { to: '/category', label: 'shop', icon: 'grid' },
  { to: '/cart', label: 'cart', icon: 'cart' },
  { to: '/my', label: 'me', icon: 'user' },
]

export default function TabBar() {
  const { totalQty } = useCart()

  return (
    <div className="tabbar-wrap">
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
              <Icon name={t.icon} size={20} />
              {t.to === '/cart' && totalQty > 0 && (
                <span className="tabbar-badge">{totalQty > 99 ? '99+' : totalQty}</span>
              )}
            </span>
            <span className="tabbar-label">{t.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
