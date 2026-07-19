import { useState, useEffect, useCallback, useRef } from 'react'
import { Sparkles, RefreshCw, ArrowRight } from 'lucide-react'
import { playWheelSpin, playMagicChime, playClick } from './lib/sounds'
import toolFaqs from './tool-faqs.json'
import './index.css'

interface Verdict {
  label: string
  short: string
  emoji: string
  color: string
  detail: string
}

const VERDICTS: Verdict[] = [
  {
    label: 'Donate it', short: 'Donate', emoji: '✨', color: '#E8B931',
    detail: 'Pass the magic on! Somewhere a younger kid will think this is the best thing ever. Put it in the donate bag right now, while the wheel is still warm.',
  },
  {
    label: 'Maybe box, 1 week', short: 'Maybe box', emoji: '📦', color: '#5BA5A5',
    detail: "Into the Maybe Box it goes! If nobody asks for it in one week, it graduates to the donate bag — no second spin needed. Write today's date on the box.",
  },
  {
    label: 'Keep — if it fits the bin', short: 'Keep (bin rule)', emoji: '💖', color: '#F09080',
    detail: "It stays! But the bin rule is the bin rule: it has to fit in the keep bin. If the bin is full, something else has to move out to make room.",
  },
  {
    label: 'Toss — say thanks first', short: 'Toss', emoji: '🗑️', color: '#6B5E4E',
    detail: 'It did its job well. Say "thanks for the fun!" out loud (yes, really — it helps) and into the bin it goes. You just made room for something new.',
  },
  {
    label: 'Sell it, keep the cash', short: 'Sell', emoji: '💰', color: '#2D8A8A',
    detail: "This one's worth something! Add it to the sell pile — and the seller keeps the money. Suddenly decluttering pays better than chores.",
  },
  {
    label: 'Photo it, then let go', short: 'Photo & release', emoji: '📸', color: '#C77B5F',
    detail: 'Take one great photo of it — the memory stays forever, the clutter leaves today. Then choose: donate bag or bin. The photo does the remembering for you.',
  },
]

function KeepItWheel({ onNavigate }: { onNavigate?: (toolId: string) => void }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<Verdict | null>(null)
  const [spinCount, setSpinCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const drawWheel = useCallback((currentRotation: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10
    const segmentAngle = (2 * Math.PI) / VERDICTS.length

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    VERDICTS.forEach((v, index) => {
      const startAngle = currentRotation + index * segmentAngle - Math.PI / 2
      const endAngle = startAngle + segmentAngle

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = v.color
      ctx.fill()
      ctx.strokeStyle = '#FEFCF8'
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + segmentAngle / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 15px Quicksand, sans-serif'
      ctx.shadowColor = 'rgba(0,0,0,0.35)'
      ctx.shadowBlur = 4
      ctx.fillText(v.emoji + ' ' + v.short, radius - 16, 5)
      ctx.restore()
    })

    // Center hub
    ctx.beginPath()
    ctx.arc(centerX, centerY, 32, 0, 2 * Math.PI)
    ctx.fillStyle = '#1A1A2E'
    ctx.fill()
    ctx.strokeStyle = '#E8B931'
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.fillStyle = '#FEFCF8'
    ctx.font = '20px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🎩', centerX, centerY + 7)

    // Pointer
    ctx.beginPath()
    ctx.moveTo(centerX - 15, 15)
    ctx.lineTo(centerX, 40)
    ctx.lineTo(centerX + 15, 15)
    ctx.closePath()
    ctx.fillStyle = '#E8B931'
    ctx.fill()
    ctx.strokeStyle = '#B8930F'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [])

  useEffect(() => {
    drawWheel(rotation)
  }, [drawWheel, rotation])

  useEffect(() => () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
  }, [])

  const spin = useCallback(() => {
    if (isSpinning) return
    playWheelSpin()
    setIsSpinning(true)
    setResult(null)

    const spinDuration = 3500 + Math.random() * 1500
    const spinRotations = 5 + Math.random() * 3
    const extraAngle = Math.random() * 2 * Math.PI
    const startRotation = rotation
    const totalRotation = startRotation + spinRotations * 2 * Math.PI + extraAngle
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentRotation = startRotation + (totalRotation - startRotation) * easeOut
      setRotation(currentRotation)
      drawWheel(currentRotation)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        const segmentAngle = (2 * Math.PI) / VERDICTS.length
        const normalized = ((currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
        const segmentsPassed = normalized / segmentAngle
        const winnerIndex = Math.floor((VERDICTS.length - segmentsPassed + 1000 * VERDICTS.length) % VERDICTS.length)
        setResult(VERDICTS[winnerIndex])
        setSpinCount((c) => c + 1)
        playMagicChime()
      }
    }
    animationRef.current = requestAnimationFrame(animate)
  }, [isSpinning, rotation, drawWheel])

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        <div className="text-center mb-6 mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            ✨ Magic Clean
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-ink-800 font-display">
            Should I Keep It? Spin the Wheel
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            On the fence about something? Hold it up, give the wheel a spin, and do what it says. Six fair fates — no agonizing allowed.
          </p>
        </div>

        <div className="mystical-card p-6 md:p-8 flex flex-col items-center max-w-lg w-full">
          <canvas ref={canvasRef} width={340} height={340} className="mb-6 max-w-full" />
          <button
            onClick={spin}
            disabled={isSpinning}
            className="mystical-btn inline-flex items-center gap-2"
          >
            <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Deciding your fate…' : spinCount === 0 ? 'Spin the Wheel' : 'Spin for the Next Thing'}
          </button>

          {result && (
            <div className="mt-6 text-center animate-fade-in">
              <div className="text-5xl mb-2">{result.emoji}</div>
              <h2 className="text-2xl font-bold font-display text-ink-800 mb-2 glow-pulse">{result.label}</h2>
              <p className="text-[#6B5E4E] max-w-sm mx-auto text-sm">{result.detail}</p>
            </div>
          )}
        </div>

        {/* Rules of the wheel */}
        <div className="w-full max-w-2xl mt-12 mb-4 px-4">
          <div className="mystical-card p-6 bg-cream-50 border-cream-300">
            <h2 className="text-xl font-bold text-ink-800 mb-4 text-center font-display">
              The One Rule: The Wheel Is the Boss
            </h2>
            <p className="text-[#6B5E4E] text-center mb-3">
              This wheel is for things you're <em>on the fence</em> about — if you know you love it, keep it; this tool never touches treasures. But for fence-sitters, the deal is made before you spin: whatever the wheel says, you do. That's the whole magic. Kids (and adults) accept a random verdict far more easily than one that comes from a person, because random is fair — nobody chose against you. The "Maybe Box" and "Photo it" slots build in gentle off-ramps, so no spin ever feels cruel.
            </p>
            <p className="text-[#6B5E4E] text-center text-sm">
              Pro tip: pile up 10 fence-sitters and spin through them in one go. Momentum is everything in decluttering.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12 px-4">
          <h2 className="text-xl font-semibold text-ink-800 mb-6 text-center font-display">
            More Magic for Cleanup Time
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Sorting Hat', description: 'Three questions decide: keep, toss, or magic', id: 'sortinghat', emoji: '🎩' },
              { name: 'Magic Chores', description: 'Turn tasks into quests with rewards', id: 'chores', emoji: '🔥' },
              { name: 'Spin Wheel', description: 'Build your own wheel for any decision', id: 'spin', emoji: '🎡' },
              { name: 'Screen Time Swap', description: 'Trade cleanup minutes for screen time', id: 'screentime', emoji: '🖥️' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => { playClick(); onNavigate && onNavigate(tool.id) }}
                className="mystical-card p-4 text-center hover:shadow-md transition-all hover:border-secondary-400 cursor-pointer bg-transparent"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#A09080] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full max-w-2xl mb-12 px-4">
          <h2 className="text-xl font-semibold text-ink-800 mb-6 text-center font-display">
            Questions Parents Ask
          </h2>
          <div className="space-y-4">
            {(toolFaqs as Record<string, { q: string; a: string }[]>)['should-i-keep-it'].map((f) => (
              <div key={f.q} className="mystical-card p-5">
                <h3 className="font-semibold text-ink-800 mb-2">{f.q}</h3>
                <p className="text-[#6B5E4E] text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8 px-4">
          <div className="mystical-card p-8 text-center bg-cream-50 border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold text-ink-800 mb-3 font-display">
              Is Every "Keep or Toss?" a Standoff at Your House?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide — five patterns that make small choices feel huge for kids, and a playful fix for each one.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 mystical-btn"
            >
              Get the Free Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="h-24" />
      </div>
    </div>
  )
}

export default KeepItWheel
