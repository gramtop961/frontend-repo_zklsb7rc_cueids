import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function readCart() {
  try {
    const raw = localStorage.getItem('bloombox_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items) {
  try { localStorage.setItem('bloombox_cart', JSON.stringify(items)) } catch {}
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readCart())

  useEffect(() => { writeCart(items) }, [items])

  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) => p.id === item.id ? { ...p, qty: Math.min(99, (p.qty || 1) + (item.qty || 1)) } : p)
      }
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id))
  const clear = () => setItems([])
  const updateQty = (id, qty) => setItems((prev) => prev.map((p) => p.id === id ? { ...p, qty: Math.max(1, Math.min(99, qty)) } : p))

  const count = useMemo(() => items.reduce((a, b) => a + (b.qty || 1), 0), [items])
  const subtotal = useMemo(() => items.reduce((a, b) => a + (b.price || 0) * (b.qty || 1), 0), [items])

  const value = useMemo(() => ({ items, addItem, removeItem, clear, updateQty, count, subtotal }), [items, count, subtotal])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
