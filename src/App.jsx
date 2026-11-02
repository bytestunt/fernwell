import { useCallback, useEffect, useMemo, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Care from './components/Care'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import Footer from './components/Footer'
import ProductSheet from './components/ProductSheet'
import CartSheet from './components/CartSheet'
import Toast from './components/Toast'
import { useLocalStorage, useScrollSpy } from './hooks'
import { PRODUCTS, SIZES } from './data'

const SECTION_IDS = ['top', 'shop', 'care', 'reviews', 'faq']
const DEFAULT_FILTERS = { q: '', light: 'all', pet: false, sort: 'featured' }
const lineKey = (i) => `${i.id}|${i.size}`

export default function App() {
  const active = useScrollSpy(SECTION_IDS)
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [stored, setStored] = useLocalStorage('fernwell-cart-ro', [])
  const [selected, setSelected] = useState(null)
  const [productOpen, setProductOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const cart = useMemo(
    () => (Array.isArray(stored) ? stored.filter((i) => PRODUCTS.some((p) => p.id === i.id) && SIZES.some((s) => s.id === i.size) && i.qty > 0) : []),
    [stored],
  )

  const lines = useMemo(
    () =>
      cart.map((i) => {
        const product = PRODUCTS.find((p) => p.id === i.id)
        const unit = product.prices[SIZES.findIndex((s) => s.id === i.size)]
        return { ...i, key: lineKey(i), product, unit }
      }),
    [cart],
  )
  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + l.qty * l.unit, 0)

  const showToast = useCallback((message, action) => setToast({ id: Date.now(), message, action }), [])
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 5000)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = ({ id, size }) => {
    const item = { id, size, qty: 1 }
    setStored((prev) => {
      const list = Array.isArray(prev) ? prev : []
      const hit = list.find((i) => lineKey(i) === lineKey(item))
      return hit ? list.map((i) => (i === hit ? { ...i, qty: Math.min(9, i.qty + 1) } : i)) : [...list, item]
    })
    const name = PRODUCTS.find((p) => p.id === id).name
    showToast(`Adăugat în coș: ${name}`, { label: 'Vezi coșul', run: () => setCartOpen(true) })
  }

  const quickAdd = (p) => addToCart({ id: p.id, size: 's' })

  const removeLine = (key) => {
    const index = cart.findIndex((i) => lineKey(i) === key)
    if (index < 0) return
    const removed = cart[index]
    setStored(cart.filter((_, n) => n !== index))
    const name = PRODUCTS.find((p) => p.id === removed.id).name
    showToast(`Eliminat din coș: ${name}`, {
      label: 'Anulează',
      run: () =>
        setStored((prev) => {
          const list = [...(Array.isArray(prev) ? prev : [])]
          list.splice(Math.min(index, list.length), 0, removed)
          return list
        }),
    })
  }

  const changeQty = (key, delta) => {
    const line = lines.find((l) => l.key === key)
    if (!line) return
    if (line.qty + delta < 1) return removeLine(key)
    setStored(cart.map((i) => (lineKey(i) === key ? { ...i, qty: i.qty + delta } : i)))
  }

  const openProduct = (p) => {
    setSelected(p)
    setProductOpen(true)
  }

  const goShop = (patch) => {
    setFilters({ ...DEFAULT_FILTERS, ...patch })
    requestAnimationFrame(() => document.getElementById('shop')?.scrollIntoView())
  }

  const toastEl = <Toast toast={toast} onDismiss={() => setToast(null)} />

  return (
    <>
      <a className="skip-link" href="#shop">
        Sari la magazin
      </a>
      <Nav active={active} cartCount={count} onCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Shop filters={filters} setFilters={setFilters} onOpen={openProduct} onQuickAdd={quickAdd} />
        <Care onOpen={openProduct} onShowLight={(light) => goShop({ light })} onShowPetSafe={() => goShop({ pet: true })} />
        <Reviews />
        <Faq />
      </main>
      <Footer />

      <ProductSheet
        product={selected}
        open={productOpen}
        onClose={() => setProductOpen(false)}
        onAdd={(item) => {
          addToCart(item)
          setProductOpen(false)
        }}
      />
      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        lines={lines}
        subtotal={subtotal}
        onQty={changeQty}
        onRemove={removeLine}
        onCheckout={() => setStored([])}
        toastSlot={cartOpen ? toastEl : null}
      />
      {!cartOpen && toastEl}
    </>
  )
}
