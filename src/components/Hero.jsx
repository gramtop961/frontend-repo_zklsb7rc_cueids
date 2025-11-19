import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Gift, Box, Search } from 'lucide-react'
import { useRef } from 'react'

export default function Hero({ onSelectMood, onSearch }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])

  const moods = [
    { key: 'happy', label: 'Happy' },
    { key: 'calm', label: 'Calm' },
    { key: 'romantic', label: 'Romantic' },
    { key: 'stress', label: 'Stress' },
    { key: 'self-love', label: 'Self-Love' },
  ]

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-20%,#FFD6E0_0%,transparent_60%),radial-gradient(1200px_600px_at_90%_-10%,#E8DFF5_0%,transparent_55%),radial-gradient(800px_500px_at_50%_120%,#B9F3E4_0%,transparent_60%)]"/>
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -40, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 19) % 100}%`,
              background:
                i % 3 === 0
                  ? '#F4D9B3'
                  : i % 3 === 1
                  ? '#FFD6E0'
                  : '#E8DFF5',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24">
        <motion.div style={{ y }} className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl font-semibold text-[#2b2b2b] tracking-tight"
            style={{ fontFamily: 'Poppins, ui-sans-serif' }}
          >
            BloomBox – Gifting with Emotion 🌸
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 text-lg sm:text-xl text-[#6b6b6b]"
            style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}
          >
            AI-powered gifting for moods, moments, and the people you love.
          </motion.p>

          <div className="mt-8 mx-auto max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" size={20} />
              <input
                type="text"
                placeholder="What gift are you looking for?"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && onSearch) onSearch(e.target.value)
                }}
                className="w-full rounded-2xl bg-white/60 backdrop-blur-md border border-rose-200/50 shadow-lg focus:ring-2 focus:ring-rose-200/80 focus:outline-none pl-12 pr-4 py-4 text-[#3a3a3a] placeholder:text-rose-300/80"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -inset-px rounded-2xl pointer-events-none border border-white/40"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {moods.map((m) => (
                <button
                  key={m.key}
                  onClick={() => onSelectMood && onSelectMood(m.key)}
                  className="px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-rose-200/50 text-rose-700 hover:-translate-y-0.5 hover:shadow-md transition-all"
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55] px-5 py-3 shadow hover:shadow-lg transition-all">
                <Gift size={18} /> Shop Gifts
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-white text-rose-600 border border-rose-200/60 px-5 py-3 shadow hover:shadow-lg transition-all">
                <Box size={18} /> Build Your Box 💝
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
