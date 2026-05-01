import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import type { OrderItem, AddressEntry } from '../store/CartContext'
import { findProduct, siteConfig } from '../config'
import NavBar from '../components/NavBar'
import ProductImage from '../components/ProductImage'
import { showToast } from '../components/Toast'
import wechatPayIcon from '../static/images/wechatpay.png'
import alipayIcon from '../static/images/alipay.png'

export default function Checkout() {
  const [search] = useSearchParams()
  const location = useLocation()
  const from = search.get('from')
  const directId = search.get('id')
  const navigate = useNavigate()
  const { items, selectedItems, createOrder, clearSelected, removeFromCart, addresses } =
    useCart()

  const addressIdFromQuery = search.get('addressId')
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addressIdFromQuery,
  )

  useEffect(() => {
    if (addressIdFromQuery) {
      setSelectedAddressId(addressIdFromQuery)
      return
    }
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id)
    }
  }, [addressIdFromQuery, selectedAddressId, addresses])

  const selectedAddress: AddressEntry | undefined = useMemo(() => {
    if (!selectedAddressId) return undefined
    return addresses.find((a) => a.id === selectedAddressId)
  }, [addresses, selectedAddressId])

  const orderAddress = selectedAddress
    ? { name: selectedAddress.name, phone: selectedAddress.phone, detail: selectedAddress.detail }
    : null

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

  const [pay, setPay] = useState<'wechat' | 'alipay'>('wechat')
  const [submitting, setSubmitting] = useState(false)

  const submit = () => {
    if (checkoutItems.length === 0) {
      showToast('没有可结算的商品')
      return
    }
    if (!orderAddress) {
      showToast('请先选择收货地址')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const order = createOrder(checkoutItems, total, orderAddress)
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

      {addresses.length === 0 ? (
        <div className="address-empty-card">
          <div className="address-empty-title">还没有收货地址</div>
          <div className="address-empty-sub">先创建收货人/地址，才能提交订单。</div>
          <button
            className="primary-btn"
            onClick={() => {
              const returnTo = location.pathname + location.search
              const encoded = encodeURIComponent(returnTo)
              navigate(`/addresses/new?returnTo=${encoded}`)
            }}
          >
            创建收货地址
          </button>
          <div className="address-empty-hint">
            可先用默认信息（来自配置）创建：{siteConfig.user.name} / {siteConfig.user.phone}
          </div>
        </div>
      ) : (
        <div className="address-select">
          <div className="address-select-head">
            <div className="section-title" style={{ padding: '10px 0 0', margin: 0 }}>
              <span className="section-bar" />
              <span>收货人 / 地址</span>
              <span className="section-tip">提交前必选</span>
            </div>
          </div>

          <div className="address-select-list">
            {addresses.map((a) => (
              <button
                key={a.id}
                type="button"
                className={'address-select-item' + (a.id === selectedAddress?.id ? ' active' : '')}
                onClick={() => setSelectedAddressId(a.id)}
              >
                <div className="address-select-radio" />
                <div className="address-select-info">
                  <div className="address-line1">
                    <span className="address-name">{a.name}</span>
                    <span className="address-phone">{a.phone}</span>
                  </div>
                  <div className="address-detail">{a.detail}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="address-manage-row">
            <button
              className="ghost-btn small"
              onClick={() => {
                const returnTo = location.pathname + location.search
                const encoded = encodeURIComponent(returnTo)
                navigate(`/addresses?returnTo=${encoded}`)
              }}
            >
              管理收货地址
            </button>
          </div>
        </div>
      )}

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
          <span className="pay-icon">
            <img src={wechatPayIcon} alt="微信支付" className="pay-logo" />
          </span>
          <span className="pay-name">微信支付</span>
          <span className="pay-radio" />
        </div>
        <div
          className={'pay-option' + (pay === 'alipay' ? ' active' : '')}
          onClick={() => setPay('alipay')}
        >
          <span className="pay-icon">
            <img src={alipayIcon} alt="支付宝" className="pay-logo" />
          </span>
          <span className="pay-name">支付宝</span>
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
