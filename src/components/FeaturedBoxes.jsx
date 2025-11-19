import { motion } from 'framer-motion'

export default function FeaturedBoxes({ boxes = [], onSelect }) {
  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Featured Mood Boxes</h2>
          <p className="text-sm text-[#8a8a8a]" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>Curated with love</p>
        </div>
        <div className="grid grid-flow-col auto-cols-[80%] sm:auto-cols-[45%] md:auto-cols-[32%] gap-6 overflow-x-auto pb-4 snap-x">
          {boxes.map((box, i) => (
            <motion.div
              key={box.slug}
              whileHover={{ y: -6 }}
              className="snap-start rounded-2xl shadow-lg bg-white/70 backdrop-blur border border-white/50 overflow-hidden"
            >
              <div
                className="h-40 sm:h-48 w-full"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${box.gradient[0]}, ${box.gradient[1]})`,
                }}
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#3a3a3a]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{box.name}</h3>
                  <span className="text-rose-600 font-semibold">₹{box.price}</span>
                </div>
                <p className="mt-1 text-sm text-[#777]" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>{box.items.slice(0,3).join(' • ')}</p>
                <button
                  onClick={() => onSelect && onSelect(box.slug)}
                  className="mt-3 w-full rounded-xl bg-[#2b2b2b] text-white py-2 text-sm hover:opacity-90"
                >
                  View Box
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
