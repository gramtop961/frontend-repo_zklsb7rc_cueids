import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Loader2 } from 'lucide-react'

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi love! I can suggest gifts by mood, budget, or occasion. 💗' },
    { role: 'assistant', content: 'Try: “Gift ideas under ₹1000” or “Help me build a box”.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async () => {
    if (!input.trim()) return
    const text = input
    setInput('')
    setMessages((m) => [...m, { role: 'user', content: text }])
    setLoading(true)

    try {
      if (text.toLowerCase().includes('under')) {
        // parse budget
        const nums = text.match(/\d+/g)
        const max = nums ? parseInt(nums[nums.length-1]) : undefined
        const res = await fetch(`${backend}/api/recommend-gifts`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ max_budget: max })
        })
        const data = await res.json()
        const list = (data.results||[]).map(r=>`• ${r.title} – ₹${r.price}`).join('\n') || 'Let me try a different mood!'
        setMessages((m)=>[...m, { role: 'assistant', content: `Here are a few dreamy picks:\n${list}` }])
      } else if (text.toLowerCase().includes('build')) {
        setMessages((m)=>[...m, { role: 'assistant', content: 'Start with a mood, pick 3–5 items, then personalize your note. Tap “Build Your Box 💝”.' }])
      } else {
        const res = await fetch(`${backend}/api/recommend-gifts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: text }) })
        const data = await res.json()
        const list = (data.results||[]).map(r=>`• ${r.title} – ₹${r.price}`).join('\n') || 'Tell me a mood: happy, calm, romantic, festive, sad, or self-love.'
        setMessages((m)=>[...m, { role: 'assistant', content: list }])
      }
    } catch (e) {
      setMessages((m)=>[...m, { role: 'assistant', content: 'I lost my sparkle for a second. Try again? ✨' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button onClick={()=>setOpen(o=>!o)} className="rounded-full bg-gradient-to-r from-[#FFD6E0] to-[#E8DFF5] text-[#624a55] p-3 shadow-lg border border-white/60">
        <MessageSquare size={22} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-3 w-80 sm:w-96 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl overflow-hidden">
            <div className="px-4 py-3 bg-[radial-gradient(400px_120px_at_80%_-10%,#FFD6E0,transparent_60%)]">
              <p className="font-semibold text-[#2b2b2b]" style={{ fontFamily: 'Poppins, ui-sans-serif' }}>BloomBot</p>
              <p className="text-xs text-[#777]">Your gifting assistant</p>
            </div>
            <div className="p-3 h-72 overflow-y-auto space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`${m.role==='assistant' ? 'bg-rose-50 text-[#444]' : 'bg-white'} border border-rose-200/60 px-3 py-2 rounded-xl text-sm whitespace-pre-wrap`}>{m.content}</div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="p-3 border-t border-rose-200/60 flex gap-2">
              <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask me anything..." className="flex-1 rounded-xl border border-rose-200/60 px-3 py-2 bg-white/80" />
              <button onClick={send} className="rounded-xl px-3 py-2 bg-[#2b2b2b] text-white flex items-center gap-2">{loading && <Loader2 className="animate-spin" size={16} />}<span>Send</span></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
