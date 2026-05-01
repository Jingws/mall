import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products, categories, banners, siteConfig } from '../config'
import ProductImage from '../components/ProductImage'
import Icon, { type IconName } from '../components/Icon'

const CAT_ICON_MAP: Record<string, IconName> = {
  all: 'sparkle',
  gear: 'pad',
  toy: 'cube',
  audio: 'audio',
  light: 'light',
  mech: 'keyboard',
  // 兼容旧分类 id
  phone: 'cpu',
  wear: 'sparkle',
  home: 'cube',
  food: 'fire',
  beauty: 'star',
}

export default function Home() {
  const navigate = useNavigate()
  const [bannerIdx, setBannerIdx] = useState(0)
  const [keyword, setKeyword] = useState('')
  const hour = new Date().getHours()
  const greeting =
    hour < 6 ? 'NIGHT_OPS' : hour < 12 ? 'MORNING_OPS' : hour < 18 ? 'DAY_OPS' : 'NIGHT_OPS'

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
  const stamp = String(Math.floor(Date.now() / 1000)).slice(-6)

  return (
    <div className="home">
      <div className="home-header">
        <div className="home-brand">
          <div className="home-logo-mark">{siteConfig.brand.name}</div>
          <div>
            <div className="home-logo-name">{siteConfig.brand.name}</div>
            <div className="home-logo-sub">{greeting} · pilot ready</div>
          </div>
        </div>
        <div className="home-status" aria-label="online">
          <span className="dot" />
          online
        </div>
      </div>

      <div className="home-search">
        <span className="home-search-prefix mono">$</span>
        <input
          placeholder="search the matrix..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Icon name="search" size={18} style={{ color: 'var(--text-3)' }} />
      </div>

      <div
        className="banner"
        style={{ background: banner.bg }}
        onClick={() => setBannerIdx((i) => (i + 1) % banners.length)}
      >
        <div className="banner-text">
          <div className="banner-meta">
            mission_{String(bannerIdx + 1).padStart(2, '0')} · {stamp}
          </div>
          <div className="banner-title">{banner.title}</div>
          <div className="banner-sub">{banner.sub}</div>
          <div className="banner-cta">
            engage <Icon name="arrow-right" size={12} />
          </div>
        </div>
        <div className="banner-emoji">{banner.emoji}</div>
        <div className="banner-dots">
          {banners.map((_, i) => (
            <span
              key={i}
              className={'banner-dot' + (i === bannerIdx ? ' active' : '')}
            />
          ))}
        </div>
      </div>

      <div className="cat-chips">
        {categories.slice(1).map((c) => (
          <div
            key={c.id}
            className="cat-chip"
            onClick={() => navigate(`/category?cat=${c.id}`)}
          >
            <span className="cat-chip-icon">
              <Icon name={CAT_ICON_MAP[c.id] ?? 'cube'} size={14} />
            </span>
            <span>{c.name}</span>
          </div>
        ))}
      </div>

      <div className="home-story-card">
        <div className="home-story-mark">
          <Icon name="bolt" size={22} />
        </div>
        <div className="home-story-info">
          <div className="home-story-title">{siteConfig.brand.fullName}</div>
          <div className="home-story-sub">{siteConfig.brand.slogan}</div>
        </div>
        <button
          type="button"
          className="home-story-btn"
          onClick={() => navigate('/category')}
        >
          enter
        </button>
      </div>

      <div className="section-title">
        Curated drop
        <span className="section-tip">
          <Icon name="sparkle" size={11} /> editor pick
        </span>
      </div>
      <div className="pick-scroll">
        {picks.map((p) => (
          <div key={p.id} className="pick-card" onClick={() => navigate(`/product/${p.id}`)}>
            <ProductImage
              emoji={p.emoji}
              gradient={p.gradient}
              image={p.image}
              alt={p.name}
              size={112}
              radius={0}
              fontSize={38}
            />
            <div className="pick-name">{p.name}</div>
            <div className="pick-meta">
              <span className="pick-price">¥{p.price}</span>
              <span className="pick-tag">{p.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">
        All Items
        <span className="section-tip">
          <Icon name="fire" size={11} /> trending
        </span>
      </div>

      <div className="product-grid">
        {filtered.map((p) => (
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
                fontSize={64}
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
        {filtered.length === 0 && (
          <div className="empty">// no_match.found</div>
        )}
      </div>
    </div>
  )
}
