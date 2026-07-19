import { useState } from 'react'
import { Sparkles, Share2, Copy, Check, RefreshCw, ArrowRight, Trophy } from 'lucide-react'
import { playEnchant, playClick } from './lib/sounds'
import toolFaqs from './tool-faqs.json'
import './index.css'

type Verdict = 'keep' | 'toss' | 'magic'
type Phase = 'start' | 'quiz' | 'verdict' | 'certificate'

interface Question {
  key: 'recent' | 'broken' | 'smile'
  text: string
  hint: string
}

const QUESTIONS: Question[] = [
  { key: 'recent', text: 'Have you played with it (or used it) in the last month?', hint: 'Be honest — the hat can tell! 🎩' },
  { key: 'broken', text: 'Is it broken or missing important pieces?', hint: 'Peek at it closely…' },
  { key: 'smile', text: 'Does it make you smile BIG when you hold it?', hint: 'Not a polite smile. A real one.' },
]

const VERDICT_INFO: Record<Verdict, { emoji: string; title: string; color: string; lines: string[] }> = {
  keep: {
    emoji: '💖',
    title: 'KEEP!',
    color: 'text-secondary-400',
    lines: [
      'The hat has spoken — this one still belongs with you. Give it a good home on the shelf!',
      'A true treasure! Keepers deserve a special spot where you can actually find them.',
      'This one sparks real joy. Keep it — and maybe give it a place of honor.',
    ],
  },
  toss: {
    emoji: '🗑️',
    title: 'TOSS',
    color: 'text-highlight-500',
    lines: [
      'Broken things did their job well. Say "thanks for the fun!" and let this one rest.',
      'It gave you its best days. A quick thank-you, and into the bin it goes — you made room for something new!',
    ],
  },
  magic: {
    emoji: '✨',
    title: 'MAGIC!',
    color: 'text-primary-400',
    lines: [
      'This one has magic left for another kid! Donate it and let its adventure continue.',
      "You've outgrown it, but somewhere a younger kid will think it's the best thing ever. Pass the magic on!",
      'Off to a new home! Donating a toy is like giving its story a sequel.',
    ],
  },
}

function decideVerdict(a: Record<string, boolean>): Verdict {
  if (a.broken) return 'toss'
  if (a.smile) return 'keep'
  if (a.recent) return 'keep'
  return 'magic'
}

function SortingHat({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [phase, setPhase] = useState<Phase>('start')
  const [itemName, setItemName] = useState('')
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [verdict, setVerdict] = useState<Verdict>('keep')
  const [verdictLine, setVerdictLine] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [tally, setTally] = useState({ keep: 0, toss: 0, magic: 0 })
  const [copied, setCopied] = useState(false)

  const itemsSorted = tally.keep + tally.toss + tally.magic

  const startItem = () => {
    playClick()
    setAnswers({})
    setQIndex(0)
    setPhase('quiz')
  }

  const answer = (val: boolean) => {
    playClick()
    const q = QUESTIONS[qIndex]
    const next = { ...answers, [q.key]: val }
    setAnswers(next)
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1)
    } else {
      setIsThinking(true)
      setTimeout(() => {
        const v = decideVerdict(next)
        const lines = VERDICT_INFO[v].lines
        setVerdict(v)
        setVerdictLine(lines[Math.floor(Math.random() * lines.length)])
        setTally((t) => ({ ...t, [v]: t[v as keyof typeof t] + 1 }))
        setIsThinking(false)
        setPhase('verdict')
        playEnchant()
      }, 900)
    }
  }

  const shareText = `🎩 Declutter Hero! We sorted ${itemsSorted} things with the Magic Sorting Hat: ${tally.keep} kept 💖, ${tally.magic} donated ✨, ${tally.toss} tossed 🗑️. Try it free at magicdecisions.com/keep-or-toss`

  const handleShare = async () => {
    playClick()
    if (navigator.share) {
      await navigator.share({ title: 'Declutter Hero!', text: shareText })
    } else {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        <div className="text-center mb-8 mt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            ✨ Magic Clean
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-ink-800 font-display">
            Keep, Toss, or Magic? Ask the Sorting Hat
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Stuck deciding what stays and what goes? Answer three quick questions per item and let the hat decide. No shame, no fights — just magic.
          </p>
        </div>

        {/* Session tally */}
        {itemsSorted > 0 && (
          <div className="flex items-center gap-3 mb-6 text-sm">
            <span className="px-3 py-1.5 rounded-full bg-secondary/10 border border-cream-300 text-secondary-600 font-semibold">💖 Keep: {tally.keep}</span>
            <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-cream-300 text-primary-600 font-semibold">✨ Magic: {tally.magic}</span>
            <span className="px-3 py-1.5 rounded-full bg-highlight/10 border border-cream-300 text-highlight-500 font-semibold">🗑️ Toss: {tally.toss}</span>
          </div>
        )}

        <div className="w-full max-w-lg">
          {phase === 'start' && (
            <div className="mystical-card p-8 text-center">
              <div className="text-7xl mb-6">🎩</div>
              <p className="text-[#6B5E4E] mb-6">
                Grab the pile you're unsure about. Hold up one thing at a time and let the Sorting Hat do the hard part.
              </p>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="What are we sorting? (optional, e.g. 'blue dino')"
                className="mystical-input text-center mb-6"
              />
              <button onClick={startItem} className="mystical-btn inline-flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Ask the Sorting Hat
              </button>
            </div>
          )}

          {phase === 'quiz' && (
            <div className="mystical-card p-8 text-center">
              <div className={`text-6xl mb-4 ${isThinking ? 'animate-bounce' : ''}`}>🎩</div>
              {isThinking ? (
                <p className="text-lg font-semibold text-ink-800 font-display glow-pulse">Hmm… the hat is thinking…</p>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-widest text-[#A09080] mb-3">
                    Question {qIndex + 1} of {QUESTIONS.length}{itemName ? ` · ${itemName}` : ''}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-ink-800 font-display mb-2">
                    {QUESTIONS[qIndex].text}
                  </h2>
                  <p className="text-sm text-[#A09080] mb-6">{QUESTIONS[qIndex].hint}</p>
                  <div className="flex items-center justify-center gap-4">
                    <button onClick={() => answer(true)} className="mystical-btn px-10">Yes</button>
                    <button onClick={() => answer(false)} className="share-btn px-10 py-3 text-base">No</button>
                  </div>
                </>
              )}
            </div>
          )}

          {phase === 'verdict' && (
            <div className="mystical-card p-8 text-center animate-fade-in">
              <div className="text-7xl mb-4">{VERDICT_INFO[verdict].emoji}</div>
              <h2 className={`text-4xl font-bold font-display mb-4 ${VERDICT_INFO[verdict].color} glow-pulse`}>
                {VERDICT_INFO[verdict].title}
              </h2>
              {itemName && <p className="text-[#6B5E4E] font-semibold mb-2">The hat has sorted: {itemName}</p>}
              <p className="text-[#6B5E4E] mb-8 max-w-sm mx-auto">{verdictLine}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => { setItemName(''); startItem() }}
                  className="mystical-btn inline-flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Sort the Next Thing
                </button>
                {itemsSorted >= 3 && (
                  <button
                    onClick={() => { playClick(); playEnchant(); setPhase('certificate') }}
                    className="share-btn inline-flex items-center gap-2 px-5 py-3 text-base"
                  >
                    <Trophy className="w-4 h-4" />
                    Finish & Get My Badge
                  </button>
                )}
              </div>
            </div>
          )}

          {phase === 'certificate' && (
            <div className="mystical-card p-8 text-center animate-fade-in border-2 border-primary-400">
              <div className="text-6xl mb-3">🏆</div>
              <p className="text-xs uppercase tracking-widest text-[#A09080] mb-2">Official Magic Decisions Award</p>
              <h2 className="text-3xl font-bold font-display text-ink-800 mb-4">Declutter Hero!</h2>
              <p className="text-[#6B5E4E] mb-6">
                The Monster of the Mess has been defeated. <strong>{itemsSorted} things sorted</strong> — {tally.keep} kept with love 💖, {tally.magic} sent on new adventures ✨, and {tally.toss} thanked and tossed 🗑️.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                <button onClick={handleShare} className="mystical-btn inline-flex items-center gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Share the Victory'}
                </button>
                <button
                  onClick={() => { playClick(); setTally({ keep: 0, toss: 0, magic: 0 }); setItemName(''); setPhase('start') }}
                  className="share-btn inline-flex items-center gap-2 px-5 py-3 text-base"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Session
                </button>
              </div>
              <p className="text-xs text-[#A09080]">Tip: screenshot this badge for the fridge — or the grandparents.</p>
            </div>
          )}
        </div>

        {/* Parent note */}
        <div className="w-full max-w-2xl mt-12 mb-4 px-4">
          <div className="mystical-card p-6 bg-cream-50 border-cream-300">
            <h2 className="text-xl font-bold text-ink-800 mb-4 text-center font-display">
              Why the Hat Works Better Than "Just Pick Some Toys to Give Away"
            </h2>
            <p className="text-[#6B5E4E] text-center mb-3">
              Kids hold onto things because every item feels equally important — and because letting go feels like their choice is being taken away. The Sorting Hat fixes both: three concrete questions shrink an overwhelming judgment into small, answerable pieces, and the verdict comes from the hat, not from you. No negotiating with a parent, no shame — just a playful referee. The "Magic" pile reframes donating as passing the fun to another kid, which is the single biggest unlock for kids who resist letting go.
            </p>
            <p className="text-[#6B5E4E] text-center text-sm">
              Works great in 10-minute bursts: one pile, one hat, and stop while it's still fun.
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
              { name: 'Magic Chores', description: 'Turn tasks into quests with rewards', id: 'chores', emoji: '🔥' },
              { name: 'Spin Wheel', description: 'Let the wheel pick who tidies what', id: 'spin', emoji: '🎡' },
              { name: 'Screen Time Swap', description: 'Trade cleanup minutes for screen time', id: 'screentime', emoji: '🖥️' },
              { name: 'Coin Flip', description: 'Settle "who does it" in three seconds', id: 'coin', emoji: '🪙' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => { playClick(); onNavigate(tool.id) }}
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
            {(toolFaqs as Record<string, { q: string; a: string }[]>)['keep-or-toss'].map((f) => (
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
              Does Your Kid Freeze on Every "Keep or Toss?"
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide — five patterns that make small choices feel huge for kids (decluttering included), and a simple fix for each one.
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

export default SortingHat
