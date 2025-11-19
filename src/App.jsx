import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Hero from './components/Hero'
import FeaturedBoxes from './components/FeaturedBoxes'
import AIRecommender from './components/AIRecommender'
import BuildBox from './components/BuildBox'
import Footer from './components/Footer'
import CategoryPage from './components/CategoryPage'
import ProductPage from './components/ProductPage'
import Checkout from './components/Checkout'
import TopBar from './components/TopBar'
import CategoryHub from './components/CategoryHub'

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

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/hub/:kind" element={<CategoryHub />} />
        <Route path="/category/:ctype/:key" element={<CategoryPage />} />
        <Route path="/box/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
