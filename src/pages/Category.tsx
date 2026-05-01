import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { categories, products } from '../config'
import ProductImage from '../components/ProductImage'
import Icon, { type IconName } from '../components/Icon'

const CAT_ICON_MAP: Record<string, IconName> = {
  all: 'sparkle',
  gear: 'pad',
  toy: 'cube',
  audio: 'audio',
  light: 'light',
  mech: 'keyboard',
  phone: 'cpu',
  wear: 'sparkle',
  home: 'cube',
  food: 'fire',
  beauty: 'star',
}

export default function Category() {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const initialCat = search.get('cat') ?? 'all'
  const [active, setActive] = useState(initialCat)

  useEffect(() => {
    setActive(initialCat)
  }, [initialCat])

  const list = useMemo(() => {
    if (active === 'all') return products
    return products.filter((p) => p.category === active)
  }, [active])
  const activeCat = categories.find((c) => c.id === active) ?? categories[0]

  return (
    <div className="category-page">
      <header className="navbar navbar-static">
        <div className="navbar-title">Catalog</div>
      </header>

      <div className="category-tabs">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={'category-tab' + (active === c.id ? ' active' : '')}
            onClick={() => setActive(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="category-hero bracket-corners">
        <div className="category-hero-emoji">
          <Icon name={CAT_ICON_MAP[activeCat.id] ?? 'cube'} size={22} />
        </div>
        <div className="category-hero-info">
          <div className="category-hero-title">{activeCat.name} module</div>
          <div className="category-hero-sub">
            {String(list.length).padStart(2, '0')} items · auto-restock
          </div>
        </div>
      </div>

      <div className="category-grid">
        {list.map((p) => (
          <div
            key={p.id}
            className="product-card product-card-stagger bracket-corners"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="product-card-img">
              <ProductImage
                emoji={p.emoji}
                gradient={p.gradient}
                image={p.image}
                alt={p.name}
                fontSize={56}
                radius={0}
              />
              <span className="product-card-tag">{p.tag}</span>
            </div>
            <div className="product-card-name">{p.name}</div>
            <div className="product-card-desc">{p.desc}</div>
            <div className="product-card-bottom">
              <div className="product-card-price">
                <span className="price-symbol">¥</span>
                <span className="price-num">{p.price}</span>
              </div>
              <div className="product-card-sales">{p.sales}+ sold</div>
            </div>
          </div>
        ))}
        {list.length === 0 && <div className="empty">// no_module.items</div>}
      </div>
    </div>
  )
}
