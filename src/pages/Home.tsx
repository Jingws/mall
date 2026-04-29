import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products, categories, banners, siteConfig } from '../config'
import ProductImage from '../components/ProductImage'

export default function Home() {
  const navigate = useNavigate()
  const [bannerIdx, setBannerIdx] = useState(0)
  const [keyword, setKeyword] = useState('')
  const hour = new Date().getHours()
  const greeting = hour < 11 ? '早安' : hour < 18 ? '下午好' : '晚上好'

  const filtered = useMemo(() => {
    if (!keyword.trim()) return products
    const k = keyword.trim().toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(k) ||
        p.desc.toLowerCase().includes(k),
    )
  }, [keyword])

  const banner = banners[bannerIdx]
  const picks = products.slice(0, 4)

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-logo-wrap">
          <div className="home-logo">{siteConfig.brand.name}</div>
          <div className="home-sub-title">{greeting}，发现你的心选好物</div>
        </div>
        <div className="home-search">
          <span className="home-search-icon">🔍</span>
          <input
            placeholder="搜索心仪好物"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="home-msg">💬</div>
      </div>

      <div
        className="banner"
        style={{ background: banner.bg }}
        onClick={() => setBannerIdx((i) => (i + 1) % banners.length)}
      >
        <div className="banner-text">
          <div className="banner-title">{banner.title}</div>
          <div className="banner-sub">{banner.sub}</div>
          <div className="banner-cta">立即抢购 ›</div>
        </div>
        <div className="banner-emoji">{banner.emoji}</div>
        <div className="banner-pill">
          <span>品牌精选</span>
          <strong>{siteConfig.brand.slogan}</strong>
        </div>
        <div className="banner-dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={'banner-dot' + (i === bannerIdx ? ' active' : '')}
            />
          ))}
        </div>
      </div>

      <div className="quick-cats">
        {categories.slice(1).map((c) => (
          <div
            key={c.id}
            className="quick-cat"
            onClick={() => navigate(`/category?cat=${c.id}`)}
          >
            <div className="quick-cat-icon">{c.emoji}</div>
            <div className="quick-cat-name">{c.name}</div>
          </div>
        ))}
      </div>

      <div className="home-story-card">
        <div>
          <div className="home-story-title">{siteConfig.brand.fullName}</div>
          <div className="home-story-sub">{siteConfig.brand.slogan}</div>
        </div>
        <button className="home-story-btn" onClick={() => navigate('/category')}>
          进入选购
        </button>
      </div>

      <div className="section-title">
        <span className="section-bar" />
        <span>编辑精选</span>
        <span className="section-tip">今日灵感 ✨</span>
      </div>
      <div className="pick-scroll">
        {picks.map((p) => (
          <div key={p.id} className="pick-card" onClick={() => navigate(`/product/${p.id}`)}>
            <ProductImage
              emoji={p.emoji}
              gradient={p.gradient}
              image={p.image}
              alt={p.name}
              size={88}
              radius={10}
              fontSize={38}
            />
            <div className="pick-name">{p.name}</div>
            <div className="pick-price">¥{p.price}</div>
          </div>
        ))}
      </div>

      <div className="section-title">
        <span className="section-bar" />
        <span>为你推荐</span>
        <span className="section-tip">猜你喜欢 🔥</span>
      </div>

      <div className="product-grid">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="product-card product-card-stagger"
            onClick={() => navigate(`/product/${p.id}`)}
          >
            <div className="product-card-img">
              <ProductImage emoji={p.emoji} gradient={p.gradient} image={p.image} alt={p.name} fontSize={64} radius={14} />
              <span className="product-card-tag">{p.tag}</span>
            </div>
            <div className="product-card-name">{p.name}</div>
            <div className="product-card-desc">{p.desc}</div>
            <div className="product-card-bottom">
              <div className="product-card-price">
                <span className="price-symbol">¥</span>
                <span className="price-num">{p.price}</span>
              </div>
              <div className="product-card-sales">{p.sales}+ 人付款</div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty">没有找到相关商品 🥲</div>
        )}
      </div>
    </div>
  )
}
