import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { categories, products } from '../config'
import ProductImage from '../components/ProductImage'

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

  return (
    <div className="category-page">
      <header className="navbar navbar-static">
        <div className="navbar-title">商品分类</div>
      </header>
      <div className="category-body">
        <aside className="category-side">
          {categories.map((c) => (
            <div
              key={c.id}
              className={
                'category-side-item' + (active === c.id ? ' active' : '')
              }
              onClick={() => setActive(c.id)}
            >
              <span>{c.name}</span>
              {active === c.id && <span className="category-side-bar" />}
            </div>
          ))}
        </aside>

        <main className="category-main">
          {list.map((p) => (
            <div
              key={p.id}
              className="row-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <div className="row-card-img">
                <ProductImage emoji={p.emoji} gradient={p.gradient} image={p.image} alt={p.name} fontSize={48} radius={12} />
              </div>
              <div className="row-card-info">
                <div className="row-card-name">{p.name}</div>
                <div className="row-card-desc">{p.desc}</div>
                <div className="row-card-bottom">
                  <div className="row-card-price">
                    <span className="price-symbol">¥</span>
                    <span className="price-num">{p.price}</span>
                    <span className="price-origin">¥{p.origin}</span>
                  </div>
                  <button
                    className="row-card-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/product/${p.id}`)
                    }}
                  >
                    去看看
                  </button>
                </div>
              </div>
            </div>
          ))}
          {list.length === 0 && <div className="empty">该分类暂无商品</div>}
        </main>
      </div>
    </div>
  )
}
