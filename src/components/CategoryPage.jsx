import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const gradients = {
  moods: {
    happy: ['#FFD6E0','#E8DFF5'],
    calm: ['#B9F3E4','#E8DFF5'],
    romantic: ['#FFD6E0','#F4D9B3'],
    festive: ['#FFF7E9','#F4D9B3'],
    sad: ['#E8DFF5','#FFF7E9'],
    'self-love': ['#E8DFF5','#FFD6E0'],
  },
  occasions: {
    birthday: ['#FFF7E9','#FFD6E0'],
    anniversary: ['#FFD6E0','#F4D9B3'],
    graduation: ['#B9F3E4','#E8DFF5'],
    'self-love': ['#E8DFF5','#FFD6E0']
  },
  relationships: {
    'for him': ['#E8DFF5','#B9F3E4'],
    'for her': ['#FFD6E0','#F4D9B3'],
    parents: ['#FFF7E9','#F4D9B3'],
    friends: ['#B9F3E4','#E8DFF5']
  }
}

export default function CategoryPage(){
  const { ctype, key } = useParams()
  const [items, setItems] = useState([])
  const backend = import.meta.env.VITE_BACKEND_URL

  const theme = useMemo(()=>{
    const g = gradients[ctype]?.[decodeURIComponent(key)] || ['#FFF7E9','#E8DFF5']
    return `linear-gradient(135deg, ${g[0]}, ${g[1]})`
  }, [ctype, key])

  useEffect(()=>{
    const load = async () => {
      try{
        const res = await fetch(`${backend}/api/category/${ctype}/${decodeURIComponent(key)}`)
        const data = await res.json()
        setItems(data.results || [])
      }catch(e){console.error(e)}
    }
    if (backend) load()
  }, [backend, ctype, key])

  return (
    <div className="min-h-screen">
      <div className="h-44 sm:h-56 w-full" style={{ backgroundImage: theme }}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-end pb-6">
          <div className="rounded-2xl bg-white/60 backdrop-blur border border-white/50 px-4 py-2 shadow">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{decodeURIComponent(key)}</h1>
            <p className="text-sm text-[#777]" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>{ctype}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((b)=> (
          <motion.div key={b.slug} whileHover={{ y: -6 }} className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow overflow-hidden">
            <div className="h-40 w-full" style={{ backgroundImage: `linear-gradient(135deg, ${b.gradient[0]}, ${b.gradient[1]})` }} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{b.name}</h3>
                <span className="text-rose-600 font-semibold">₹{b.price}</span>
              </div>
              <p className="text-sm text-[#777] mt-1" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>{b.items?.slice(0,3).join(' • ')}</p>
              <Link to={`/box/${b.slug}`} className="mt-3 inline-flex items-center justify-center w-full rounded-xl bg-[#2b2b2b] text-white py-2 text-sm">View</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
