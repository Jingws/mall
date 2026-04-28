import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface NavBarProps {
  title: string
  back?: boolean
  right?: ReactNode
  transparent?: boolean
}

export default function NavBar({ title, back = true, right, transparent }: NavBarProps) {
  const navigate = useNavigate()
  return (
    <header className={'navbar' + (transparent ? ' navbar-transparent' : '')}>
      <div className="navbar-left">
        {back && (
          <button
            className="navbar-back"
            onClick={() => navigate(-1)}
            aria-label="返回"
          >
            ‹
          </button>
        )}
      </div>
      <div className="navbar-title">{title}</div>
      <div className="navbar-right">{right}</div>
    </header>
  )
}
