import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function RecommendationsCarousel({ mood }){
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    const run = async () => {
      try{
        const res = await fetch(`${backend}/api/recommend-gifts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mood }) })
        const data = await res.json()
        setItems(data.results || [])
      }catch(e){ console.error(e) }
    }
    if (backend) run()
  }, [backend, mood])

  if (!items.length) return null

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>You may also love</h3>
      <div className="mt-3 grid grid-flow-col auto-cols-[70%] sm:auto-cols-[45%] md:auto-cols-[30%] gap-4 overflow-x-auto pb-2 snap-x">
        {items.map((it,i)=> (
          <motion.div key={i} whileHover={{ y: -4 }} className="snap-start rounded-xl bg-white/80 border border-rose-200/60 p-4 shadow">
            <div className="h-28 rounded-lg bg-gradient-to-br from-[#FFF7E9] to-[#FFD6E0] border border-white/60"/>
            <p className="mt-2 font-medium text-[#2b2b2b]">{it.title}</p>
            <p className="text-sm text-rose-600">₹{it.price}</p>
            <button className="mt-2 w-full rounded-lg bg-[#2b2b2b] text-white py-1.5 text-sm">Add</button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
