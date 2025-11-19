import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Checkout(){
  const [step, setStep] = useState(1)

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

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          {[1,2,3].map((i)=> (
            <div key={i} className={`h-2 flex-1 rounded-full ${step>=i?'bg-rose-300':'bg-rose-100'}`} />
          ))}
        </div>

        {step===1 && (
          <section className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
            <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Gift Details</p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <input placeholder="To" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <input placeholder="From" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <input placeholder="Occasion" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <input placeholder="Message" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
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
              <input placeholder="Address" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <input placeholder="City" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <input placeholder="Postal Code" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <input placeholder="Phone" className="rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
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
              <button className="rounded-xl bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55] px-5 py-2">Pay ₹2,499</button>
            </div>
          </section>
        )}

        <div className="mt-8 rounded-3xl bg-white/60 border border-white/60 p-5 shadow flex items-center gap-4">
          <div className="w-20 h-14 rounded-2xl bg-[radial-gradient(80px_80px_at_50%_-20%,#FFD6E0,transparent_60%),radial-gradient(80px_80px_at_20%_120%,#B9F3E4,transparent_60%)] border border-white/60" />
          <div>
            <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Gifted note preview</p>
            <p className="text-xs text-[#777]">A soft envelope animation reveals the message at delivery.</p>
          </div>
          <div className="ml-auto">
            <div className="relative w-16 h-12">
              <div className="absolute inset-0 rounded-md bg-white border border-rose-200/60" />
              <div className="absolute left-0 right-0 top-0 h-6 bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] border border-white/60 rounded-t-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
