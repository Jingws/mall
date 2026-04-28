import { useNavigate } from 'react-router-dom'
import { useCart } from '../store/CartContext'
import { findProduct } from '../config'
import ProductImage from '../components/ProductImage'
import { showToast } from '../components/Toast'

export default function Cart() {
  const {
    items,
    updateQty,
    removeFromCart,
    toggleSelect,
    toggleSelectAll,
    selectedItems,
    selectedTotal,
  } = useCart()
  const navigate = useNavigate()

  const allSelected = items.length > 0 && items.every((i) => i.selected)

  const goCheckout = () => {
    if (selectedItems.length === 0) {
      showToast('请先选择商品')
      return
    }
    navigate('/checkout?from=cart')
  }

  return (
    <div className="cart-page">
      <header className="navbar navbar-static">
        <div className="navbar-title">购物车</div>
      </header>

      {items.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-emoji">🛒</div>
          <div className="cart-empty-text">购物车空空如也</div>
          <button className="primary-btn" onClick={() => navigate('/')}>
            去逛逛
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => {
              const p = findProduct(item.id)
              if (!p) return null
              return (
                <div key={item.id} className="cart-item">
                  <span
                    className={'check' + (item.selected ? ' active' : '')}
                    onClick={() => toggleSelect(item.id)}
                  />
                  <div className="cart-item-img">
                    <ProductImage
                      emoji={p.emoji}
                      gradient={p.gradient}
                      image={p.image}
                      alt={p.name}
                      size={80}
                      radius={10}
                      fontSize={40}
                    />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{p.name}</div>
                    <div className="cart-item-desc">{p.desc}</div>
                    <div className="cart-item-bottom">
                      <div className="cart-item-price">
                        <span className="price-symbol">¥</span>
                        <span className="price-num">{p.price}</span>
                      </div>
                      <div className="qty-control small">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="cart-item-del"
                    onClick={() => {
                      removeFromCart(item.id)
                      showToast('已删除')
                    }}
                  >
                    🗑
                  </button>
                </div>
              )
            })}
          </div>

          <div className="cart-bar">
            <span
              className={'check' + (allSelected ? ' active' : '')}
              onClick={() => toggleSelectAll(!allSelected)}
            />
            <span className="cart-bar-all">全选</span>
            <div className="cart-bar-total">
              合计：
              <span className="price-symbol">¥</span>
              <span className="price-num big">{selectedTotal}</span>
            </div>
            <button className="cart-bar-btn" onClick={goCheckout}>
              结算 ({selectedItems.reduce((s, i) => s + i.qty, 0)})
            </button>
          </div>
        </>
      )}
    </div>
  )
}
