import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import FeaturedBoxes from './components/FeaturedBoxes'
import AIRecommender from './components/AIRecommender'
import BuildBox from './components/BuildBox'
import Footer from './components/Footer'
import CategoryPage from './components/CategoryPage'
import ProductPage from './components/ProductPage'
import Checkout from './components/Checkout'
import { ShoppingCart } from 'lucide-react'

function Landing() {
  const [featured, setFeatured] = useState([])
  const [seedMood, setSeedMood] = useState('')
  const [seedQuery, setSeedQuery] = useState('')
  const backend = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        if (!backend) return
        const res = await fetch(`${backend}/api/featured-boxes`)
        const data = await res.json()
        setFeatured(data.boxes || [])
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [backend])

  return (
    <div className="min-h-screen bg-[#FFF7E9]">
      <TopBar />
      <Hero onSelectMood={(m) => { setSeedMood(m); navigate(`/category/moods/${m}`) }} onSearch={(q) => setSeedQuery(q)} />
      <FeaturedBoxes boxes={featured} onSelect={(slug)=>navigate(`/box/${slug}`)} />
      <AIRecommender seedMood={seedMood} seedQuery={seedQuery} />
      <BuildBox />
      <Footer />
    </div>
  )
}

function TopBar(){
  const cartCount = 0
  return (
    <div className="sticky top-0 z-40 bg-white/60 backdrop-blur border-b border-white/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>BloomBox</Link>
        <div className="flex items-center gap-6 text-sm" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>
          <Link to="/category/moods/happy" className="hover:opacity-80">Moods</Link>
          <Link to="/category/occasions/birthday" className="hover:opacity-80">Occasions</Link>
          <Link to="/category/relationships/for%20her" className="hover:opacity-80">For Her</Link>
        </div>
        <Link to="/checkout" className="relative inline-flex items-center gap-2 rounded-xl bg-[#2b2b2b] text-white px-3 py-2">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
          <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
        </Link>
      </div>
    </div>
  )
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/category/:ctype/:key" element={<CategoryPage />} />
        <Route path="/box/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
