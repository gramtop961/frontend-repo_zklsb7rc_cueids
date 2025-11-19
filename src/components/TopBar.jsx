import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../CartContext'

export default function TopBar(){
  const { count } = useCart()
  return (
    <div className="sticky top-0 z-40 bg-white/60 backdrop-blur border-b border-white/60">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>BloomBox</Link>
        <div className="flex items-center gap-6 text-sm" style={{ fontFamily: 'Nunito, Quicksand, ui-sans-serif' }}>
          <Link to="/hub/moods" className="hover:opacity-80">Moods</Link>
          <Link to="/hub/occasions" className="hover:opacity-80">Occasions</Link>
          <Link to="/hub/relationships" className="hover:opacity-80">Relationships</Link>
        </div>
        <Link to="/checkout" className="relative inline-flex items-center gap-2 rounded-xl bg-[#2b2b2b] text-white px-3 py-2">
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
          <span className="absolute -top-2 -right-2 text-xs bg-rose-500 text-white rounded-full px-1.5 py-0.5">{count}</span>
        </Link>
      </div>
    </div>
  )
}
