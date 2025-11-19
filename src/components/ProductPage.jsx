import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Player } from '@lottiefiles/react-lottie-player'
import { useCart } from '../CartContext'
import Reviews from './Reviews'
import RecommendationsCarousel from './RecommendationsCarousel'

export default function ProductPage(){
  const { slug } = useParams()
  const backend = import.meta.env.VITE_BACKEND_URL
  const [box, setBox] = useState(null)
  const [ribbon, setRibbon] = useState('Blush Pink')
  const [shimmer, setShimmer] = useState(false)
  const { addItem } = useCart()

  useEffect(()=>{
    const load = async () => {
      try{
        const res = await fetch(`${backend}/api/box/${slug}`)
        const data = await res.json()
        setBox(data)
      }catch(e){console.error(e)}
    }
    if (backend) load()
  }, [backend, slug])

  if (!box) return <div className="max-w-7xl mx-auto px-6 py-10">Loading...</div>

  const addToCart = () => {
    addItem({ id: box.slug, title: box.name, price: box.price, ribbon })
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-56 w-full overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-20%,#FFD6E0_0%,transparent_60%),radial-gradient(1200px_600px_at_90%_-10%,#E8DFF5_0%,transparent_55%),radial-gradient(800px_500px_at_50%_120%,#B9F3E4_0%,transparent_60%)]"/>
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-6">
          <div className="rounded-2xl bg-white/60 backdrop-blur border border-white/50 px-4 py-2 shadow">
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{box.name}</h1>
            <p className="text-sm text-[#777]">Dreamy curated box</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="rounded-3xl bg-white/60 border border-white/60 p-4 shadow overflow-hidden">
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <img src={box.gallery?.[0]} alt={box.name} className="absolute inset-0 w-full h-full object-cover" />
              {shimmer && (
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.7), transparent)', transform: 'translateX(-100%)', animation: 'shine 1.4s forwards' }} />
              )}
            </div>
            <div className="flex gap-2 mt-3">
              {box.gallery?.map((g, i)=> (
                <img key={i} src={g} alt={i} className="w-20 h-16 object-cover rounded-xl border border-white/60" />
              ))}
            </div>
          </div>
          <style>{`@keyframes shine { to { transform: translateX(120%); } }`}</style>
        </div>

        <div>
          <div className="rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
            <p className="text-rose-600 font-semibold">₹{box.price}</p>
            <p className="text-sm text-[#777] mt-1" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>{box.description}</p>
            <div className="mt-3">
              <p className="text-sm font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Ribbon</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {box.ribbonOptions?.map((r)=> (
                  <button key={r} onClick={()=>setRibbon(r)} className={`px-3 py-1.5 rounded-full border ${ribbon===r?'bg-rose-50 border-rose-300':'bg-white border-rose-200/60'}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Inside</p>
              <ul className="list-disc list-inside text-sm text-[#555] mt-1">
                {box.items?.map((i)=> <li key={i}>{i}</li>)}
              </ul>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={()=>{setShimmer(true); setTimeout(()=>setShimmer(false), 1600)}} className="flex-1 rounded-xl bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55] px-5 py-3 font-medium">Unbox ✨</button>
              <button onClick={addToCart} className="flex-1 rounded-xl bg-[#2b2b2b] text-white px-5 py-3">Add to Cart</button>
            </div>
            <div className="mt-4 text-xs text-[#8a8a8a]">Delivery: {box.estimated_delivery} • Rating {box.rating} ({box.reviews})</div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/60 border border-white/60 p-5 shadow relative overflow-hidden">
            <Player autoplay loop src="https://assets8.lottiefiles.com/packages/lf20_q5pk6p1k.json" style={{ height: '100px', width: '100px', position: 'absolute', right: -10, top: -20, opacity: 0.7 }} />
            <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Why they love it</p>
            <p className="text-sm text-[#777] mt-1">Soft, feminine, celebratory. A ready-to-gift curation that feels personal and premium.</p>
          </div>

          <Reviews box={box} />
          <RecommendationsCarousel mood={box.mood} />
        </div>
      </div>
    </div>
  )
}
