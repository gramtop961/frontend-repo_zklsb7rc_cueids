import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import FeaturedBoxes from './components/FeaturedBoxes'
import AIRecommender from './components/AIRecommender'
import BuildBox from './components/BuildBox'
import Footer from './components/Footer'

function App() {
  const [featured, setFeatured] = useState([])
  const [seedMood, setSeedMood] = useState('')
  const [seedQuery, setSeedQuery] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL

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
      <Hero onSelectMood={(m) => setSeedMood(m)} onSearch={(q) => setSeedQuery(q)} />
      <FeaturedBoxes boxes={featured} />
      <AIRecommender seedMood={seedMood} seedQuery={seedQuery} />
      <BuildBox />
      <Footer />
    </div>
  )
}

export default App
