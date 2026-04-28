import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { CartProvider } from './store/CartContext'
import { applyTheme, siteConfig } from './config'
import './styles/index.css'

applyTheme(siteConfig.theme)
document.title = siteConfig.brand.title

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>,
)
