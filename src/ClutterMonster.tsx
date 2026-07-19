import { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, Share2, Check, RefreshCw, Swords, Pause, Play, ArrowRight, Trophy } from 'lucide-react'
import { playClick, playRPSSting, playMagicChime, playFanfare } from './lib/sounds'
import './index.css'

interface Monster {
  id: string
  name: string
  emoji: string
  taunt: string
  defeat: string
}

const MONSTERS: Monster[] = [
  { id: 'sock', name: 'The Sock Gobbler', emoji: '🧦', taunt: '"Your floor is MINE! I eat matched pairs for breakfast!"', defeat: 'The Sock Gobbler flees, dropping seventeen mismatched socks on the way out!' },
  { id: 'lego', name: 'The Lego Leviathan', emoji: '🧱', taunt: '"Step on me. I DARE you. Mwahaha!"', defeat: 'The Lego Leviathan crumbles into neatly sorted bricks. The carpet is safe to walk again!' },
  { id: 'laundry', name: 'The Laundry Lurker', emoji: '👕', taunt: '"Clean? Dirty? WHO KNOWS! That is my power!"', defeat: 'The Laundry Lurker is banished to the hamper, where it belongs. Order is restored!' },
  { id: 'paper', name: 'The Paper Pile Phantom', emoji: '📄', taunt: '"Every flat surface belongs to meeeee!"', defeat: 'The Paper Pile Phantom scatters into the recycling bin with a dramatic wail!' },
  { id: 'toynado', name: 'The Toy-nado', emoji: '🌪️', taunt: '"I spread toys across THREE rooms in under a minute!"', defeat: 'The Toy-nado spins itself out. Every toy has returned to its rightful bin!' },
]

const DURATIONS = [
  { minutes: 5, label: '5 min', level: 'Quick Skirmish' },
  { minutes: 10, label: '10 min', level: 'Full Battle' },
  { minutes: 15, label: '15 min', level: 'Epic Quest' },
]

const STRIKE_COOLDOWN = 30 // seconds
const STRIKE_DAMAGE = 6
const STRIKE_LINES = [
  'POW! Direct hit! The monster staggers!',
  'CRITICAL STRIKE! Bits of clutter fly everywhere!',
  'BOOM! The monster howls — keep cleaning, hero!',
  'WHAM! That one left a mark. The room grows tidier!',
  'ZAP! The monster shrinks a little. Victory is near!',
]

type Phase = 'pick' | 'battle' | 'victory'

function ClutterMonster({ onNavigate }: { onNavigate?: (toolId: string) => void }) {
  const [phase, setPhase] = useState<Phase>('pick')
  const [monster, setMonster] = useState<Monster>(MONSTERS[0])
  const [duration, setDuration] = useState(DURATIONS[1])
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [paused, setPaused] = useState(false)
  const [strikes, setStrikes] = useState(0)
  const [strikeCooldown, setStrikeCooldown] = useState(0)
  const [strikeLine, setStrikeLine] = useState('')
  const [shaking, setShaking] = useState(false)
  const [copied, setCopied] = useState(false)
  const intervalRef = useRef<number>()

  const totalSeconds = duration.minutes * 60
  const elapsed = totalSeconds - secondsLeft
  const timeDamage = totalSeconds > 0 ? (elapsed / totalSeconds) * 100 : 0
  const hp = Math.max(0, Math.round(100 - timeDamage - strikes * STRIKE_DAMAGE))
  const powerLevel = Math.min(9999, 1000 + strikes * 350 + Math.round(elapsed / 2))

  const startBattle = (m: Monster) => {
    playClick()
    setMonster(m)
    setSecondsLeft(duration.minutes * 60)
    setStrikes(0)
    setStrikeCooldown(0)
    setStrikeLine('')
    setPaused(false)
    setPhase('battle')
    playRPSSting()
  }

  const win = useCallback(() => {
    setPhase('victory')
    playFanfare()
    setTimeout(() => playMagicChime(), 700)
  }, [])

  // Battle clock
  useEffect(() => {
    if (phase !== 'battle' || paused) return
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
      setStrikeCooldown((c) => (c > 0 ? c - 1 : 0))
    }, 1000)
    return () => window.clearInterval(intervalRef.current)
  }, [phase, paused])

  // Win conditions: timer done, or HP struck down to zero
  useEffect(() => {
    if (phase !== 'battle') return
    if (secondsLeft === 0 && elapsed > 0) win()
    else if (hp === 0) win()
  }, [secondsLeft, hp, phase, elapsed, win])

  const powerStrike = () => {
    if (strikeCooldown > 0 || paused) return
    playRPSSting()
    setStrikes((s) => s + 1)
    setStrikeCooldown(STRIKE_COOLDOWN)
    setStrikeLine(STRIKE_LINES[Math.floor(Math.random() * STRIKE_LINES.length)])
    setShaking(true)
    setTimeout(() => setShaking(false), 600)
  }

  const minutesFought = Math.max(1, Math.round(elapsed / 60))
  const shareText = `⚔️ BATTLE REPORT: ${monster.name} DEFEATED! ${minutesFought} minutes of cleaning, ${strikes} power strikes, Cleaning Power Level ${powerLevel}. The room is saved! Fight your own clutter monster free at magicdecisions.com/clutter-monster`

  const handleShare = async () => {
    playClick()
    if (navigator.share) {
      await navigator.share({ title: 'Clutter Monster defeated!', text: shareText })
    } else {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const mmss = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`

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
            Clutter Monster Battle
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Cleaning is boring. Fighting a monster is not. Pick your enemy, start the clock, and clean like a hero — every tidy minute drains its health.
          </p>
        </div>

        {phase === 'pick' && (
          <div className="max-w-2xl w-full">
            <div className="mystical-card p-6 md:p-8 mb-6">
              <h2 className="text-lg font-bold font-display text-ink-800 text-center mb-4">Choose your enemy</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-2">
                {MONSTERS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => { playClick(); setMonster(m) }}
                    className={`mystical-card p-4 text-center cursor-pointer transition-all bg-transparent ${monster.id === m.id ? 'border-highlight-400 shadow-md' : 'hover:border-secondary-400'}`}
                  >
                    <span className="text-4xl block mb-1">{m.emoji}</span>
                    <span className="font-semibold text-ink-800 text-sm">{m.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-[#A09080] italic mb-6">{monster.taunt}</p>

              <h2 className="text-lg font-bold font-display text-ink-800 text-center mb-3">Choose your battle</h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                {DURATIONS.map((d) => (
                  <button
                    key={d.minutes}
                    onClick={() => { playClick(); setDuration(d) }}
                    className={`share-btn px-5 py-2.5 ${duration.minutes === d.minutes ? 'border-secondary-400 text-secondary-600 font-bold' : ''}`}
                  >
                    <span className="block text-sm font-semibold">{d.label}</span>
                    <span className="block text-xs text-[#A09080]">{d.level}</span>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button onClick={() => startBattle(monster)} className="mystical-btn inline-flex items-center gap-2">
                  <Swords className="w-5 h-5" />
                  Begin the Battle!
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === 'battle' && (
          <div className="max-w-lg w-full">
            <div className="mystical-card p-6 md:p-8 text-center">
              <div className={`text-8xl mb-2 transition-transform ${shaking ? 'animate-bounce' : ''}`} style={{ opacity: 0.35 + (hp / 100) * 0.65 }}>
                {monster.emoji}
              </div>
              <h2 className="text-xl font-bold font-display text-ink-800 mb-3">{monster.name}</h2>

              {/* HP bar */}
              <div className="w-full bg-cream-200 rounded-full h-5 mb-1 border border-cream-300 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${hp}%`, background: hp > 50 ? '#F09080' : hp > 20 ? '#E8B931' : '#5BA5A5' }}
                />
              </div>
              <p className="text-xs text-[#A09080] mb-4">Monster health: {hp}%</p>

              <div className="text-5xl font-bold font-display text-ink-800 mb-1 tabular-nums">{mmss}</div>
              <p className="text-xs text-[#A09080] mb-5">Keep cleaning — every minute drains the monster!</p>

              {strikeLine && <p className="text-sm font-semibold text-highlight-500 mb-4 animate-fade-in">{strikeLine}</p>}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={powerStrike}
                  disabled={strikeCooldown > 0 || paused}
                  className={`mystical-btn inline-flex items-center gap-2 ${strikeCooldown > 0 ? 'opacity-50' : ''}`}
                >
                  <Swords className="w-5 h-5" />
                  {strikeCooldown > 0 ? `Power Strike in ${strikeCooldown}s` : 'POWER STRIKE!'}
                </button>
                <button onClick={() => { playClick(); setPaused(!paused) }} className="share-btn inline-flex items-center gap-2 px-4 py-2.5">
                  {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  {paused ? 'Resume' : 'Pause'}
                </button>
              </div>
              <p className="text-xs text-[#A09080] mt-4">
                Rule of the realm: you may only press Power Strike right after putting something away. Honor system. ⚔️
              </p>
            </div>
          </div>
        )}

        {phase === 'victory' && (
          <div className="max-w-lg w-full animate-fade-in">
            <div className="mystical-card p-8 text-center border-2 border-primary-400">
              <div className="text-6xl mb-2">🏆</div>
              <p className="text-xs uppercase tracking-widest text-[#A09080] mb-2">Official Battle Report</p>
              <h2 className="text-3xl font-bold font-display text-ink-800 mb-2">VICTORY!</h2>
              <p className="text-[#6B5E4E] mb-5">{monster.defeat}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="mystical-card p-3 bg-cream-50">
                  <p className="text-2xl font-bold font-display text-secondary-500">{minutesFought}</p>
                  <p className="text-xs text-[#A09080]">minutes fought</p>
                </div>
                <div className="mystical-card p-3 bg-cream-50">
                  <p className="text-2xl font-bold font-display text-highlight-500">{strikes}</p>
                  <p className="text-xs text-[#A09080]">power strikes</p>
                </div>
                <div className="mystical-card p-3 bg-cream-50">
                  <p className="text-2xl font-bold font-display text-primary-500">{powerLevel}</p>
                  <p className="text-xs text-[#A09080]">cleaning power</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                <button onClick={handleShare} className="mystical-btn inline-flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Share the Battle Report'}
                </button>
                <button
                  onClick={() => { playClick(); setPhase('pick') }}
                  className="share-btn inline-flex items-center gap-2 px-4 py-2.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  Fight Another Monster
                </button>
              </div>
              <p className="text-xs text-[#A09080] flex items-center justify-center gap-1">
                <Trophy className="w-3.5 h-3.5" /> Screenshot the report — heroes deserve bragging rights.
              </p>
            </div>
          </div>
        )}

        {/* Parent note */}
        <div className="w-full max-w-2xl mt-12 mb-4 px-4">
          <div className="mystical-card p-6 bg-cream-50 border-cream-300">
            <h2 className="text-xl font-bold text-ink-800 mb-4 text-center font-display">
              Why a Timer With a Monster Beats a Timer Alone
            </h2>
            <p className="text-[#6B5E4E] text-center mb-3">
              A plain 10-minute timer is a countdown to freedom — kids watch the clock instead of cleaning. Give the same ten minutes an enemy, and everything flips: now time is a weapon, the mess is the monster's health bar, and every toy put away is damage dealt. The Power Strike button adds the missing ingredient — little bursts of reward mid-task — which is exactly what makes games hard to put down and, briefly, makes cleaning hard to put down too. Short battles, real victories, and a room that actually got cleaned.
            </p>
            <p className="text-[#6B5E4E] text-center text-sm">
              Parent tip: fight alongside them. A shared enemy is the fastest team-builder known to family science.
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
              { name: 'Should I Keep It?', description: 'Spin the wheel for on-the-fence stuff', id: 'keepit', emoji: '📦' },
              { name: 'Toy Farewell', description: 'A funny goodbye ceremony for outgrown toys', id: 'farewell', emoji: '🎖️' },
              { name: 'Magic Chores', description: 'Turn tasks into quests with rewards', id: 'chores', emoji: '🔥' },
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

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8 px-4">
          <div className="mystical-card p-8 text-center bg-cream-50 border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold text-ink-800 mb-3 font-display">
              Want More Battles Won Before Bedtime?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide — five patterns that keep kids stuck on everyday choices, and a playful fix for each one.
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

export default ClutterMonster
