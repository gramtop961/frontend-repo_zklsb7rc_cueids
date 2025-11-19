import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BuildBox() {
  const [step, setStep] = useState(1)
  const [theme, setTheme] = useState('')
  const [items, setItems] = useState([])
  const [message, setMessage] = useState('')
  const [wrap, setWrap] = useState('Ribbon – Blush Pink')
  const [loadingMsg, setLoadingMsg] = useState(false)

  const backend = import.meta.env.VITE_BACKEND_URL

  const toggleItem = (name) => {
    setItems((prev) =>
      prev.includes(name)
        ? prev.filter((i) => i !== name)
        : prev.length < 5
        ? [...prev, name]
        : prev
    )
  }

  const genMessage = async () => {
    if (!backend) return
    setLoadingMsg(true)
    try {
      const res = await fetch(`${backend}/api/generate-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: 'warm', mood: theme || 'happy' }),
      })
      const data = await res.json()
      setMessage(data.message || '')
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingMsg(false)
    }
  }

  const sampleItems = [
    'Rose-scented candle',
    'Chamomile tea',
    'Silk scrunchie',
    'Almond cookies',
    'Lavender mist',
    'Kind notes',
    'Affirmation cards',
    'Mini bouquet',
  ]

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2b2b2b] mb-2" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Build Your Own Box</h2>
          <p className="text-[#777] mb-6" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>Choose a theme, pick up to 5 items, personalize, and preview.</p>

          <div className="flex items-center gap-3 mb-6">
            {[1,2,3,4].map((s) => (
              <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-rose-300' : 'bg-rose-100'}`}/>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/70 backdrop-blur p-4 rounded-2xl border border-white/50">
                <p className="mb-3 text-sm text-[#777]">Step 1: Choose Theme</p>
                <div className="flex flex-wrap gap-2">
                  {['happy','calm','romantic','festive','self-love'].map((t) => (
                    <button key={t} onClick={() => setTheme(t)} className={`px-4 py-2 rounded-xl border ${theme===t?'bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55]':'bg-white/80'} border-rose-200/60`}>{t}</button>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <button disabled={!theme} onClick={() => setStep(2)} className="rounded-xl px-5 py-2 bg-[#2b2b2b] text-white disabled:opacity-40">Next →</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/70 backdrop-blur p-4 rounded-2xl border border-white/50">
                <p className="mb-3 text-sm text-[#777]">Step 2: Select Items (3–5)</p>
                <div className="grid grid-cols-2 gap-2">
                  {sampleItems.map((it) => (
                    <button key={it} onClick={() => toggleItem(it)} className={`text-left p-3 rounded-xl border ${items.includes(it)?'bg-rose-50 border-rose-300':'bg-white/80 border-rose-200/60'}`}>{it}</button>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-[#777]">Selected: {items.length}/5</span>
                  <div className="flex gap-2">
                    <button onClick={() => setStep(1)} className="rounded-xl px-4 py-2 bg-white border border-rose-200/60">← Back</button>
                    <button disabled={items.length < 3} onClick={() => setStep(3)} className="rounded-xl px-4 py-2 bg-[#2b2b2b] text-white disabled:opacity-40">Next →</button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/70 backdrop-blur p-4 rounded-2xl border border-white/50">
                <p className="mb-3 text-sm text-[#777]">Step 3: Personalize</p>
                <div className="grid gap-3">
                  <textarea value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Write your note here..." rows={4} className="w-full rounded-xl border border-rose-200/60 p-3 bg-white/80"/>
                  <div className="flex gap-2">
                    <select value={wrap} onChange={(e)=>setWrap(e.target.value)} className="rounded-xl border border-rose-200/60 p-2 bg-white/80">
                      {['Ribbon – Blush Pink','Ribbon – Sage Green','Wrap – Lavender Mist'].map(w => <option key={w}>{w}</option>)}
                    </select>
                    <button onClick={genMessage} className="rounded-xl px-4 py-2 bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55]">AI message</button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <button onClick={() => setStep(2)} className="rounded-xl px-4 py-2 bg-white border border-rose-200/60">← Back</button>
                  <button onClick={() => setStep(4)} className="rounded-xl px-4 py-2 bg-[#2b2b2b] text-white">Next →</button>
                </div>
                {loadingMsg && <p className="mt-2 text-rose-500 text-sm">Crafting your message...</p>}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-white/70 backdrop-blur p-4 rounded-2xl border border-white/50">
                <p className="mb-3 text-sm text-[#777]">Step 4: Final Preview</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-rose-200/60 p-4 bg-white/80">
                    <p className="font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Your Box</p>
                    <p className="text-sm text-[#777]">Theme: {theme || '—'}</p>
                    <ul className="mt-2 list-disc list-inside text-sm text-[#555]">
                      {items.map(i => <li key={i}>{i}</li>)}
                    </ul>
                    <p className="mt-3 text-sm">Wrap: {wrap}</p>
                  </div>
                  <div className="rounded-xl border border-rose-200/60 p-4 bg-gradient-to-br from-[#FFF7E9] to-[#FFD6E0]">
                    <p className="font-semibold mb-2" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Message Card</p>
                    <div className="rounded-xl bg-white/80 border border-white/60 p-3 text-sm min-h-[120px] whitespace-pre-wrap">{message || 'Your note will appear here...'}</div>
                    <button className="mt-3 w-full rounded-xl bg-[#2b2b2b] text-white py-2">Checkout →</button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-[#8a8a8a]">Soft sparkles appear after adding items ✨</div>
                <div className="mt-3">
                  <button onClick={() => setStep(3)} className="rounded-xl px-4 py-2 bg-white border border-rose-200/60">← Back</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="sticky top-24">
          <div className="rounded-3xl border border-white/50 bg-white/60 backdrop-blur p-6 shadow-lg">
            <div className="h-48 rounded-2xl bg-[radial-gradient(600px_200px_at_50%_-30%,#FFD6E0,transparent_60%),radial-gradient(600px_200px_at_10%_130%,#B9F3E4,transparent_60%)] border border-white/50" />
            <p className="mt-3 text-center text-sm text-[#777]">Live preview of your dreamy box</p>
          </div>
        </div>
      </div>
    </section>
  )
}
