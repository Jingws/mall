import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCart, type OrderItem } from '../store/CartContext'
import { findProduct, siteConfig } from '../config'
import NavBar from '../components/NavBar'
import ProductImage from '../components/ProductImage'
import { showToast } from '../components/Toast'

export default function Checkout() {
  const [search] = useSearchParams()
  const from = search.get('from')
  const directId = search.get('id')
  const navigate = useNavigate()
  const { items, selectedItems, createOrder, clearSelected, removeFromCart } =
    useCart()

  const checkoutItems: OrderItem[] = useMemo(() => {
    if (from === 'detail' && directId) {
      const it = items.find((i) => i.id === Number(directId))
      return it ? [{ id: it.id, qty: it.qty }] : []
    }
    return selectedItems.map((i) => ({ id: i.id, qty: i.qty }))
  }, [from, directId, items, selectedItems])

  const total = useMemo(() => {
    return checkoutItems.reduce((sum, i) => {
      const p = findProduct(i.id)
      return p ? sum + p.price * i.qty : sum
    }, 0)
  }, [checkoutItems])

  const [address] = useState({
    name: siteConfig.user.name,
    phone: siteConfig.user.phone,
    detail: siteConfig.user.address,
  })

  const [pay, setPay] = useState<'wechat' | 'alipay' | 'card'>('wechat')
  const [submitting, setSubmitting] = useState(false)

  const submit = () => {
    if (checkoutItems.length === 0) {
      showToast('没有可结算的商品')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const order = createOrder(checkoutItems, total, address)
      if (from === 'detail' && directId) {
        removeFromCart(Number(directId))
      } else {
        clearSelected()
      }
      setSubmitting(false)
      navigate('/pay-success?orderId=' + order.id, { replace: true })
    }, 700)
  }

  return (
    <div className="checkout-page">
      <NavBar title="确认订单" />

      <div className="address-card">
        <div className="address-icon">📍</div>
        <div className="address-info">
          <div className="address-line1">
            <span className="address-name">{address.name}</span>
            <span className="address-phone">{address.phone}</span>
          </div>
          <div className="address-detail">{address.detail}</div>
        </div>
        <span className="address-arrow">›</span>
      </div>

      <div className="checkout-card">
        <div className="checkout-shop">
          <span className="shop-icon">🏪</span>
          <span>{siteConfig.shop.name}</span>
        </div>
        {checkoutItems.map((i) => {
          const p = findProduct(i.id)
          if (!p) return null
          return (
            <div key={i.id} className="checkout-item">
              <ProductImage
                emoji={p.emoji}
                gradient={p.gradient}
                image={p.image}
                alt={p.name}
                size={72}
                radius={10}
                fontSize={36}
              />
              <div className="checkout-item-info">
                <div className="checkout-item-name">{p.name}</div>
                <div className="checkout-item-desc">{p.desc}</div>
                <div className="checkout-item-bottom">
                  <div>
                    <span className="price-symbol">¥</span>
                    <span className="price-num">{p.price}</span>
                  </div>
                  <span className="checkout-item-qty">×{i.qty}</span>
                </div>
              </div>
            </div>
          )
        })}
        <div className="checkout-row">
          <span>配送方式</span>
          <span className="muted">顺丰速运 · 包邮</span>
        </div>
        <div className="checkout-row">
          <span>订单备注</span>
          <span className="muted">无</span>
        </div>
      </div>

      <div className="checkout-card">
        <div className="checkout-row pay-row">
          <span>支付方式</span>
        </div>
        <div
          className={'pay-option' + (pay === 'wechat' ? ' active' : '')}
          onClick={() => setPay('wechat')}
        >
          <span className="pay-icon" style={{ background: '#1aad19' }}>💚</span>
          <span className="pay-name">微信支付</span>
          <span className="pay-radio" />
        </div>
        <div
          className={'pay-option' + (pay === 'alipay' ? ' active' : '')}
          onClick={() => setPay('alipay')}
        >
          <span className="pay-icon" style={{ background: '#1677ff' }}>💙</span>
          <span className="pay-name">支付宝</span>
          <span className="pay-radio" />
        </div>
        <div
          className={'pay-option' + (pay === 'card' ? ' active' : '')}
          onClick={() => setPay('card')}
        >
          <span className="pay-icon" style={{ background: '#ff7a45' }}>💳</span>
          <span className="pay-name">银行卡</span>
          <span className="pay-radio" />
        </div>
      </div>

      <div className="checkout-card">
        <div className="checkout-row">
          <span>商品金额</span>
          <span>¥{total}</span>
        </div>
        <div className="checkout-row">
          <span>运费</span>
          <span>¥0</span>
        </div>
        <div className="checkout-row">
          <span>优惠</span>
          <span style={{ color: 'var(--primary)' }}>-¥0</span>
        </div>
      </div>

      <div className="checkout-bar">
        <div className="checkout-bar-total">
          实付：
          <span className="price-symbol red">¥</span>
          <span className="price-num big red">{total}</span>
        </div>
        <button
          className="checkout-bar-btn"
          disabled={submitting}
          onClick={submit}
        >
          {submitting ? '提交中...' : '提交订单'}
        </button>
      </div>
    </div>
  )
}
