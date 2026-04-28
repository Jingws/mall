import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import Cart from './pages/Cart'
import My from './pages/My'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import PaySuccess from './pages/PaySuccess'
import Orders from './pages/Orders'
import TabBar from './components/TabBar'
import ToastHost from './components/Toast'

const TAB_PATHS = ['/', '/category', '/cart', '/my']

export default function App() {
  const location = useLocation()
  const showTabBar = TAB_PATHS.includes(location.pathname)

  return (
    <div className="app">
      <div className="page" style={{ paddingBottom: showTabBar ? 64 : 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my" element={<My />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pay-success" element={<PaySuccess />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
      {showTabBar && <TabBar />}
      <ToastHost />
    </div>
  )
}
