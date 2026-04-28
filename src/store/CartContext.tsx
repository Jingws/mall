import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { findProduct } from '../config'

export interface CartItem {
  id: number
  qty: number
  selected: boolean
}

export interface OrderItem {
  id: number
  qty: number
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  createdAt: number
  status: '待发货' | '已发货' | '已完成'
  address: { name: string; phone: string; detail: string }
}

interface CartContextValue {
  items: CartItem[]
  orders: Order[]
  addToCart: (productId: number, qty?: number) => void
  removeFromCart: (productId: number) => void
  updateQty: (productId: number, qty: number) => void
  toggleSelect: (productId: number) => void
  toggleSelectAll: (checked: boolean) => void
  clearSelected: () => void
  totalQty: number
  selectedItems: CartItem[]
  selectedTotal: number
  createOrder: (
    items: OrderItem[],
    total: number,
    address: Order['address'],
  ) => Order
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'h5-mall-state-v1'

interface PersistShape {
  items: CartItem[]
  orders: Order[]
}

function loadPersist(): PersistShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { items: [], orders: [] }
    const parsed = JSON.parse(raw) as PersistShape
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    }
  } catch {
    return { items: [], orders: [] }
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const initial = loadPersist()
  const [items, setItems] = useState<CartItem[]>(initial.items)
  const [orders, setOrders] = useState<Order[]>(initial.orders)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, orders }))
  }, [items, orders])

  const addToCart = (productId: number, qty = 1) => {
    setItems((prev) => {
      const exist = prev.find((i) => i.id === productId)
      if (exist) {
        return prev.map((i) =>
          i.id === productId ? { ...i, qty: i.qty + qty } : i,
        )
      }
      return [...prev, { id: productId, qty, selected: true }]
    })
  }

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.id !== productId))
  }

  const updateQty = (productId: number, qty: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === productId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    )
  }

  const toggleSelect = (productId: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { ...i, selected: !i.selected } : i,
      ),
    )
  }

  const toggleSelectAll = (checked: boolean) => {
    setItems((prev) => prev.map((i) => ({ ...i, selected: checked })))
  }

  const clearSelected = () => {
    setItems((prev) => prev.filter((i) => !i.selected))
  }

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  )

  const selectedItems = useMemo(
    () => items.filter((i) => i.selected),
    [items],
  )

  const selectedTotal = useMemo(() => {
    return selectedItems.reduce((sum, i) => {
      const p = findProduct(i.id)
      return p ? sum + p.price * i.qty : sum
    }, 0)
  }, [selectedItems])

  const createOrder: CartContextValue['createOrder'] = (
    orderItems,
    total,
    address,
  ) => {
    const order: Order = {
      id: 'NO' + Date.now(),
      items: orderItems,
      total,
      createdAt: Date.now(),
      status: '待发货',
      address,
    }
    setOrders((prev) => [order, ...prev])
    return order
  }

  const value: CartContextValue = {
    items,
    orders,
    addToCart,
    removeFromCart,
    updateQty,
    toggleSelect,
    toggleSelectAll,
    clearSelected,
    totalQty,
    selectedItems,
    selectedTotal,
    createOrder,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
