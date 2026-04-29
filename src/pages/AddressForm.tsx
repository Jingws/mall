import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { showToast } from '../components/Toast'
import { useCart } from '../store/CartContext'
import type { AddressEntry } from '../store/CartContext'
import { siteConfig } from '../config'

function withQueryParam(pathWithQuery: string, key: string, value: string) {
  const [path, query] = pathWithQuery.split('?')
  const params = new URLSearchParams(query ?? '')
  params.set(key, value)
  const qs = params.toString()
  return qs ? `${path}?${qs}` : path
}

export default function AddressForm() {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const { addAddress } = useCart()

  const returnTo = (() => {
    const raw = search.get('returnTo')
    if (!raw) return '/checkout'
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  })()

  const [name, setName] = useState(siteConfig.user.name)
  const [phone, setPhone] = useState(siteConfig.user.phone)
  const [detail, setDetail] = useState(siteConfig.user.address)
  const [submitting, setSubmitting] = useState(false)

  const submit = () => {
    const n = name.trim()
    const p = phone.trim()
    const d = detail.trim()
    if (!n || !p || !d) {
      showToast('请把收货人/电话/地址填写完整')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      const created: AddressEntry = addAddress({ name: n, phone: p, detail: d })
      setSubmitting(false)
      navigate(withQueryParam(returnTo, 'addressId', created.id), { replace: true })
    }, 300)
  }

  return (
    <div className="addr-form-page">
      <NavBar title="新增收货地址" />

      <div className="form-card">
        <div className="form-field">
          <div className="form-label">收货人</div>
          <input
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="请输入姓名"
          />
        </div>

        <div className="form-field">
          <div className="form-label">手机</div>
          <input
            className="form-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="请输入手机号"
            inputMode="tel"
          />
        </div>

        <div className="form-field">
          <div className="form-label">收货地址</div>
          <textarea
            className="form-input form-textarea"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="请输入详细地址"
            rows={4}
          />
        </div>

        <button className="primary-btn" disabled={submitting} onClick={submit}>
          {submitting ? '保存中...' : '保存并返回'}
        </button>

        <div className="form-hint">
          提交后会自动返回到订单页并选中该地址。
        </div>
      </div>
    </div>
  )
}

