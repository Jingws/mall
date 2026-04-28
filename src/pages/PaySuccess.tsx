import { useNavigate, useSearchParams } from 'react-router-dom'

export default function PaySuccess() {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const orderId = search.get('orderId') ?? '-'

  return (
    <div className="success-page">
      <div className="success-icon">
        <div className="success-circle">✓</div>
      </div>
      <div className="success-title">支付成功</div>
      <div className="success-sub">订单编号：{orderId}</div>
      <div className="success-tip">
        感谢您的购买，预计 1-3 天内为您发货 📦
      </div>
      <div className="success-actions">
        <button className="ghost-btn" onClick={() => navigate('/orders', { replace: true })}>
          查看订单
        </button>
        <button className="primary-btn" onClick={() => navigate('/', { replace: true })}>
          继续逛逛
        </button>
      </div>
    </div>
  )
}
