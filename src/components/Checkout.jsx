import { useMemo, useState } from 'react'
import { useCart } from '../CartContext'

export default function Checkout(){
  const [step, setStep] = useState(1)
  const { items, updateQty, removeItem, subtotal, clear } = useCart()
  const backend = import.meta.env.VITE_BACKEND_URL

  const shipping = useMemo(()=> (subtotal > 2500 ? 0 : 149), [subtotal])
  const total = useMemo(()=> subtotal + shipping, [subtotal, shipping])

  const [gift, setGift] = useState({ to: '', from: '', occasion: '', message: '' })
  const [addr, setAddr] = useState({ address: '', city: '', postal: '', phone: '' })
  const [paying, setPaying] = useState(false)
  const [orderResult, setOrderResult] = useState(null)

  const placeOrder = async () => {
    if (!backend) return
    setPaying(true)
    try {
      const res = await fetch(`${backend}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          name: gift.from || 'BloomBox Customer',
          address: addr.address,
          city: addr.city,
          postal_code: addr.postal,
          phone: addr.phone,
          amount: Math.round(total * 100),
          currency: 'inr',
          items: items.map(i => ({ id: i.id, title: i.title, price: i.price, qty: i.qty })),
        })
      })
      const data = await res.json()
      // Mock payment confirmation
      await fetch(`${backend}/api/orders/confirm`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id: data.order_id, payment_ref: data.payment_ref, success: true }) })
      // Mock email
      await fetch(`${backend}/api/send-email`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: 'test@example.com', subject: 'Your BloomBox Order', html: `<p>Thanks! Order ${data.order_id}</p>` }) })
      setOrderResult(data)
      clear()
      setStep(4)
    } catch (e) {
      console.error(e)
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-40 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-20%,#FFD6E0_0%,transparent_60%),radial-gradient(1200px_600px_at_90%_-10%,#E8DFF5_0%,transparent_55%),radial-gradient(800px_500px_at_50%_120%,#B9F3E4_0%,transparent_60%)]"/>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-6">
          <div className="rounded-2xl bg-white/60 backdrop-blur border border-white/50 px-4 py-2 shadow">
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Checkout</h1>
            <p className="text-sm text-[#777]">Wrap, details, delivery, payment</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 grid md:grid-cols-[1fr_380px] gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            {[1,2,3].map((i)=> (
              <div key={i} className={`h-2 flex-1 rounded-full ${step>=i?'bg-rose-300':'bg-rose-100'}`} />
            ))}
          </div>

          {step===1 && (
            <section className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
              <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Gift Details</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <input value={gift.to} onChange={(e)=>setGift(g=>({...g,to:e.target.value}))} placeholder="To" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input value={gift.from} onChange={(e)=>setGift(g=>({...g,from:e.target.value}))} placeholder="From" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input value={gift.occasion} onChange={(e)=>setGift(g=>({...g,occasion:e.target.value}))} placeholder="Occasion" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input value={gift.message} onChange={(e)=>setGift(g=>({...g,message:e.target.value}))} placeholder="Message" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={()=>setStep(2)} className="rounded-xl bg-[#2b2b2b] text-white px-5 py-2">Next →</button>
              </div>
            </section>
          )}

          {step===2 && (
            <section className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
              <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Delivery</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <input value={addr.address} onChange={(e)=>setAddr(a=>({...a,address:e.target.value}))} placeholder="Address" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input value={addr.city} onChange={(e)=>setAddr(a=>({...a,city:e.target.value}))} placeholder="City" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input value={addr.postal} onChange={(e)=>setAddr(a=>({...a,postal:e.target.value}))} placeholder="Postal Code" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input value={addr.phone} onChange={(e)=>setAddr(a=>({...a,phone:e.target.value}))} placeholder="Phone" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              </div>
              <div className="mt-4 flex justify-between">
                <button onClick={()=>setStep(1)} className="rounded-xl bg-white border border-rose-200/60 px-5 py-2">← Back</button>
                <button onClick={()=>setStep(3)} className="rounded-xl bg-[#2b2b2b] text-white px-5 py-2">Next →</button>
              </div>
            </section>
          )}

          {step===3 && (
            <section className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
              <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Payment</p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <input placeholder="Cardholder" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input placeholder="Card Number" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input placeholder="MM/YY" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
                <input placeholder="CVV" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              </div>
              <div className="mt-4 flex justify-between">
                <button onClick={()=>setStep(2)} className="rounded-xl bg-white border border-rose-200/60 px-5 py-2">← Back</button>
                <button onClick={placeOrder} disabled={paying || !items.length} className="rounded-xl bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55] px-5 py-2 disabled:opacity-50">{paying? 'Processing…' : `Pay ₹${total.toLocaleString()}`}</button>
              </div>
            </section>
          )}

          {step===4 && orderResult && (
            <section className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow text-center">
              <p className="text-2xl font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Order Confirmed</p>
              <p className="mt-2 text-[#777]">We sent a confirmation to your email.</p>
              <div className="mt-4 text-sm">Reference: {orderResult.payment_ref}</div>
            </section>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
            <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Your Cart</p>
            {!items.length && <p className="text-sm text-[#777] mt-2">No items yet.</p>}
            <div className="mt-2 space-y-3">
              {items.map((it)=> (
                <div key={it.id} className="flex items-center gap-3">
                  <div className="w-14 h-12 rounded-xl bg-[radial-gradient(80px_80px_at_50%_-20%,#FFD6E0,transparent_60%),radial-gradient(80px_80px_at_20%_120%,#B9F3E4,transparent_60%)] border border-white/60" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{it.title}</p>
                    <p className="text-xs text-rose-600">₹{it.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>updateQty(it.id, Math.max(1, (it.qty||1)-1))} className="w-6 h-6 rounded bg-white border">-</button>
                    <span className="text-sm w-6 text-center">{it.qty||1}</span>
                    <button onClick={()=>updateQty(it.id, (it.qty||1)+1)} className="w-6 h-6 rounded bg-white border">+</button>
                  </div>
                  <button onClick={()=>removeItem(it.id)} className="text-xs text-rose-500">Remove</button>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-white/60 pt-3 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping? `₹${shipping}` : 'Free'}</span></div>
              <div className="flex justify-between font-semibold"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
