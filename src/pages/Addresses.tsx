import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { showToast } from '../components/Toast'
import { useCart } from '../store/CartContext'
import type { AddressEntry } from '../store/CartContext'

function withQueryParam(pathWithQuery: string, key: string, value: string) {
  const [path, query] = pathWithQuery.split('?')
  const params = new URLSearchParams(query ?? '')
  params.set(key, value)
  const qs = params.toString()
  return qs ? `${path}?${qs}` : path
}

export default function Addresses() {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const { addresses, removeAddress } = useCart()

  const returnTo = useMemo(() => {
    const raw = search.get('returnTo')
    if (!raw) return null
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }, [search])

  const [deletingId, setDeletingId] = useState<string | null>(null)

  const createNew = () => {
    const targetReturnTo = returnTo ?? '/checkout'
    navigate(
      `/addresses/new?returnTo=${encodeURIComponent(targetReturnTo)}`,
      { replace: true },
    )
  }

  const selectAddress = (a: AddressEntry) => {
    if (!returnTo) {
      showToast('地址已选择（返回上一页）')
      navigate(-1)
      return
    }
    navigate(withQueryParam(returnTo, 'addressId', a.id), { replace: true })
  }

  return (
    <div className="addr-manage-page">
      <NavBar title={returnTo ? '选择收货地址' : '收货地址管理'} back={true} />

      {addresses.length === 0 ? (
        <div className="addr-empty">
          <div className="addr-empty-emoji">📭</div>
          <div className="addr-empty-title">还没有收货地址</div>
          <div className="addr-empty-sub">先创建一个，才能继续下单。</div>
          <div className="addr-empty-hint">点击页面底部“新增”创建地址</div>
        </div>
      ) : (
        <div className="addr-list">
          {addresses.map((a) => (
            <div key={a.id} className="addr-row">
              <button
                type="button"
                className="addr-card"
                onClick={() => selectAddress(a)}
              >
                <div className="addr-card-top">
                  <div className="addr-recipient">
                    <span className="addr-pin">📍</span>
                    <span className="addr-name">{a.name}</span>
                  </div>
                  <div className="addr-phone">{a.phone}</div>
                </div>
                <div className="addr-detail">{a.detail}</div>
              </button>

              <div className="addr-actions">
                <button
                  className="ghost-btn small"
                  disabled={deletingId === a.id}
                  onClick={() => {
                    const ok = window.confirm('确认删除该地址？')
                    if (!ok) return
                    setDeletingId(a.id)
                    removeAddress(a.id)
                    setDeletingId(null)
                    showToast('已删除')
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="addr-bottom-bar">
        <button className="primary-btn addr-bottom-btn" onClick={createNew}>
          新增收货地址
        </button>
      </div>
    </div>
  )
}

