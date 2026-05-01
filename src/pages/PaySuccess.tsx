import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'

export default function PaySuccess() {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const orderId = search.get('orderId') ?? '-'

  return (
    <div className="success-page">
      <div className="success-icon">
        <div className="success-circle">
          <Icon name="check" size={44} strokeWidth={2.4} />
        </div>
      </div>
      <div className="success-title">transaction ok</div>
      <div className="success-sub">trace_id · {orderId}</div>
      <div className="success-tip">
        // 感谢您的购买，预计 1-3 天内为您发货。
      </div>
      <pre className="success-ascii">
{`+--------------------------+
|  STARFIELD · DELIVERY    |
|  STATUS  : QUEUED        |
|  ETA     : 1-3 DAYS      |
+--------------------------+`}
      </pre>
      <div className="success-actions">
        <button className="ghost-btn" onClick={() => navigate('/orders', { replace: true })}>
          orders
        </button>
        <button className="primary-btn" onClick={() => navigate('/', { replace: true })}>
          continue
        </button>
      </div>
    </div>
  )
}
