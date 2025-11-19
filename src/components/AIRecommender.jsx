import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AIRecommender({ seedMood, seedQuery }) {
  const [input, setInput] = useState(seedQuery || '')
  const [mood, setMood] = useState(seedMood || '')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (seedMood) setMood(seedMood)
    if (seedQuery) setInput(seedQuery)
  }, [seedMood, seedQuery])

  const backend = import.meta.env.VITE_BACKEND_URL

  const run = async () => {
    if (!backend) return
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/recommend-gifts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input, mood }),
      })
      const data = await res.json()
      setResults(data.results || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Not sure what to buy?</h2>
          <p className="mt-2 text-[#777]" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>Let our AI choose the perfect gift for you.</p>
        </div>

        <div className="mx-auto max-w-2xl bg-white/70 backdrop-blur rounded-2xl border border-white/50 p-4 shadow">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Gift for my girlfriend who loves books"
              className="flex-1 rounded-xl px-4 py-3 bg-white/80 border border-rose-200/60 focus:outline-none"
            />
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="rounded-xl px-3 py-3 bg-white/80 border border-rose-200/60"
            >
              <option value="">Mood</option>
              {["happy","calm","romantic","festive","sad","self-love"].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <button onClick={run} className="rounded-xl px-5 py-3 bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55] font-medium">Ask AI</button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {loading && <p className="col-span-full text-center text-rose-500">Thinking...</p>}
            {!loading && results.map((r, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="rounded-xl bg-white/80 border border-rose-200/50 p-4 shadow-sm">
                <p className="font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{r.title}</p>
                <p className="text-sm text-rose-600">₹{r.price}</p>
                <p className="text-xs text-[#8a8a8a] mt-1">{r.tag}</p>
                <button className="mt-3 w-full text-sm rounded-lg bg-[#2b2b2b] text-white py-2">Add to Box</button>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 text-xs text-[#8a8a8a]">
            Try: “I feel sad, suggest a self-care gift” • “Budget 500–2000, birthday gift for friend”
          </div>
        </div>
      </div>
    </section>
  )
}
