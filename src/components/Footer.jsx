export default function Footer(){
  return (
    <footer className="relative mt-12">
      <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_50%_0%,#E8DFF5,transparent_60%)]"/>
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-3xl bg-white/60 backdrop-blur border border-white/50 p-6 text-center shadow">
          <p className="text-[#2b2b2b] text-lg" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>BloomBox — Send Happiness in a Box.</p>
          <p className="text-[#8a8a8a] text-sm mt-1" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>Soft floral love from us to you 🌸</p>
        </div>
      </div>
    </footer>
  )
}
