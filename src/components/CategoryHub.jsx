import { Link, useParams } from 'react-router-dom'

const data = {
  moods: [
    { key: 'happy', label: 'Happy', colors: ['#FFD6E0','#E8DFF5'] },
    { key: 'calm', label: 'Calm', colors: ['#B9F3E4','#E8DFF5'] },
    { key: 'romantic', label: 'Romantic', colors: ['#FFD6E0','#F4D9B3'] },
    { key: 'festive', label: 'Festive', colors: ['#FFF7E9','#F4D9B3'] },
    { key: 'sad', label: 'Sad', colors: ['#E8DFF5','#FFF7E9'] },
    { key: 'self-love', label: 'Self Love', colors: ['#E8DFF5','#FFD6E0'] },
  ],
  occasions: [
    { key: 'birthday', label: 'Birthday', colors: ['#FFF7E9','#FFD6E0'] },
    { key: 'anniversary', label: 'Anniversary', colors: ['#FFD6E0','#F4D9B3'] },
    { key: 'graduation', label: 'Graduation', colors: ['#B9F3E4','#E8DFF5'] },
    { key: 'self-love', label: 'Self Love', colors: ['#E8DFF5','#FFD6E0'] },
  ],
  relationships: [
    { key: 'for her', label: 'For Her', colors: ['#FFD6E0','#F4D9B3'] },
    { key: 'for him', label: 'For Him', colors: ['#E8DFF5','#B9F3E4'] },
    { key: 'parents', label: 'Parents', colors: ['#FFF7E9','#F4D9B3'] },
    { key: 'friends', label: 'Friends', colors: ['#B9F3E4','#E8DFF5'] },
  ]
}

export default function CategoryHub(){
  const { kind } = useParams()
  const tiles = data[kind] || []

  return (
    <div className="min-h-screen">
      <div className="h-44 sm:h-56 w-full" style={{ backgroundImage: 'linear-gradient(135deg,#FFF7E9,#E8DFF5)' }}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-end pb-6">
          <div className="rounded-2xl bg-white/60 backdrop-blur border border-white/50 px-4 py-2 shadow">
            <h1 className="text-2xl sm:text-3xl font-semibold" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{kind?.[0]?.toUpperCase()+kind?.slice(1)}</h1>
            <p className="text-sm text-[#777]">Explore {kind}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {tiles.map(t => (
          <Link key={t.key} to={`/category/${kind}/${encodeURIComponent(t.key)}`} className="rounded-2xl overflow-hidden border border-white/60 bg-white/70 backdrop-blur shadow hover:-translate-y-1 transition">
            <div className="h-28" style={{ backgroundImage: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})` }} />
            <div className="p-3 text-center font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>{t.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
