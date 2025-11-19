import { motion } from 'framer-motion'

const items = [
  {
    name: 'Aarohi K.',
    text: 'BloomBox made my bestie cry tears of joy 🥹💝 The details felt so personal and dreamy.',
    img: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Mira D.',
    text: 'The Calm Box was a hug in a package. Soft scents, warm notes, and so pretty!',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
  },
  {
    name: 'Anika S.',
    text: 'Loved the Build Your Own Box. It felt luxurious and so easy ✨',
    img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&auto=format&fit=crop',
  },
]

export default function Testimonials(){
  return (
    <section className="relative py-14">
      <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_80%_0%,#FFD6E0,transparent_60%)]"/>
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#2b2b2b] mb-8" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Loved by happy hearts</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} className="rounded-2xl bg-white/70 backdrop-blur border border-white/50 p-5 shadow">
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/70" />
                <p className="font-semibold text-[#3a3a3a]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{t.name}</p>
              </div>
              <p className="mt-3 text-[#555]" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
