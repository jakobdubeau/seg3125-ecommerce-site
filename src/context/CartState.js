"use client"

import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext(null)

const STORAGE_KEY = "summit-cart"

export function CartState({ children }) {
  const [items, setItems] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved) setItems(JSON.parse(saved))
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, ready])

  function add(product, color, size, qty = 1) {
    const key = `${product.id}-${color}-${size}`
    const unitPrice = product.onSale ? product.salePrice : product.price
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key)
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      }
      return [
        ...prev,
        { key, id: product.id, name: product.name, price: unitPrice, color, size, qty },
      ]
    })
  }

  function updateQty(key, qty) {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty } : i)).filter((i) => i.qty > 0)
    )
  }

  function remove(key) {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }

  function clear() {
    setItems([])
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <Context.Provider value={{ items, add, updateQty, remove, clear, count, subtotal }}>
      {children}
    </Context.Provider>
  )
}

export function useCartState() {
  const value = useContext(Context)
  if (!value) throw new Error("useCartState must be used within CartState")
  return value
}
