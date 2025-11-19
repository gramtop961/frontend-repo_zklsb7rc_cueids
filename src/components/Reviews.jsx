export default function Reviews({ box }){
  const sample = [
    { name: 'Aarohi', rating: 5, text: 'So dreamy and elegant. The note made my day!' },
    { name: 'Natasha', rating: 5, text: 'Perfect for birthdays. Loved the ribbon options.' },
    { name: 'Meera', rating: 4, text: 'Soft, premium vibes. Delivery was quick.' },
  ]
  const stars = (n) => '★★★★★☆☆☆☆☆'.slice(5 - Math.round(n), 10 - Math.round(n))
  return (
    <div className="mt-6 rounded-3xl bg-white/60 border border-white/60 p-5 shadow">
      <p className="font-medium" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>Reviews</p>
      <div className="grid sm:grid-cols-3 gap-4 mt-3">
        {sample.map((r,i)=>(
          <div key={i} className="rounded-xl bg-white/80 border border-rose-200/60 p-3">
            <p className="text-sm font-medium">{r.name}</p>
            <p className="text-rose-500 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</p>
            <p className="text-sm text-[#777] mt-1">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
