import { useState } from 'react'
import { Sparkles, RefreshCw, Share2, Copy, Check, Printer, ArrowRight, Scroll } from 'lucide-react'
import { playClick, playEnchant, playFanfare } from './lib/sounds'
import './index.css'

type ToyType = 'stuffed animal' | 'action figure' | 'doll' | 'building blocks' | 'toy car' | 'board game' | 'book' | 'costume' | 'other toy'

const TOY_TYPES: ToyType[] = ['stuffed animal', 'action figure', 'doll', 'building blocks', 'toy car', 'board game', 'book', 'costume', 'other toy']

const SERVICE_RECORDS: Record<ToyType, string[]> = {
  'stuffed animal': [
    'survived approximately 1,000 hugs, 47 tea parties, and at least one trip through the washing machine',
    'served bravely as pillow, confidant, and monster-under-the-bed security detail',
    'absorbed an estimated 3 gallons of tears, 14 secrets, and one entire juice box',
  ],
  'action figure': [
    'defended the living room carpet from invasion forces on more than 200 occasions',
    'survived 62 epic battles, 3 missions to the backyard, and one week lost behind the couch',
    'performed heroic stunts no insurance company would ever approve',
  ],
  'doll': [
    'attended every tea party, school lesson, and living-room fashion show without a single complaint',
    'endured 34 haircuts, 12 outfit changes per week, and years of devoted care',
    'listened to every story, plan, and secret with perfect patience',
  ],
  'building blocks': [
    'formed 1,000 towers, 400 castles, and one structure nobody could identify but everyone admired',
    'bravely endured being stepped on in the dark, an act of sacrifice no parent will forget',
    'built entire cities, destroyed them, and built them again without complaint',
  ],
  'toy car': [
    'logged over 10,000 carpet miles with zero speeding tickets',
    'survived ramp jumps, staircase rallies, and the Great Bathtub Flood',
    'raced in 500 championships and won every single one that mattered',
  ],
  'board game': [
    'hosted 100 family game nights and only caused 12 arguments, a record of distinguished diplomacy',
    'kept all of its important pieces for a remarkably long time',
    'taught patience, strategy, and the fine art of losing gracefully (eventually)',
  ],
  'book': [
    'was read approximately 400 times, including 200 times as a bedtime stall tactic',
    'transported its reader to other worlds without ever leaving the bed',
    'survived bent corners, juice spills, and being loved nearly to pieces',
  ],
  'costume': [
    'transformed an ordinary kid into a hero, a monster, and a very convincing dinosaur',
    'served through 3 Halloweens, 40 dress-up days, and one memorable grocery store trip',
    'granted magical powers every single time it was worn, without exception',
  ],
  'other toy': [
    'provided countless hours of joy, chaos, and exactly the right amount of noise',
    'served its kid loyally through every season, mood, and living room fort',
    'performed its duties with honor, even when left outside overnight',
  ],
}

const OPENINGS = [
  'Friends, family, and fellow toys — we gather today to honor {toy}.',
  'Dearly beloved, we are here today to say farewell to a true legend: {toy}.',
  'Attention please! Today we celebrate the distinguished career of {toy}.',
  'Let the record show that on this day, we honor the noble service of {toy}.',
]

const MEMORY_LINES = [
  'We will never forget the time: {memory}. Historians will speak of it for generations.',
  'Of all its adventures, one shines brightest: {memory}. What a moment that was.',
  'Ask anyone about {toy}, and they will tell you about the day: {memory}. Legendary.',
]

const CLOSINGS = [
  'And so, {toy}, we salute you. May your next kid love you as fiercely as we did. Mission complete. 🫡',
  'Go now, {toy}, to new adventures and new hugs. You will always have a home in our hearts (just not in our toy bin). 💛',
  '{toy}, your watch has ended. Somewhere, a new adventure is waiting — and you have earned it. Farewell, old friend. ✨',
  'Thank you for your service, {toy}. The toy bin will feel bigger without you — because it literally will be. We love you. Onward! 🎉',
]

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]
}

function buildSpeech(toy: string, type: ToyType, memory: string, seed: number): string {
  const opening = pick(OPENINGS, seed).replace(/\{toy\}/g, toy)
  const service = `In its years of loyal service, this ${type} ${pick(SERVICE_RECORDS[type], seed + 1)}.`
  const memoryLine = memory.trim()
    ? pick(MEMORY_LINES, seed + 2).replace(/\{toy\}/g, toy).replace('{memory}', memory.trim().replace(/\.$/, ''))
    : ''
  const closing = pick(CLOSINGS, seed + 3).replace(/\{toy\}/g, toy)
  return [opening, service, memoryLine, closing].filter(Boolean).join('\n\n')
}

function ToyFarewell({ onNavigate }: { onNavigate?: (toolId: string) => void }) {
  const [toyName, setToyName] = useState('')
  const [toyType, setToyType] = useState<ToyType>('stuffed animal')
  const [memory, setMemory] = useState('')
  const [speech, setSpeech] = useState('')
  const [seed, setSeed] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showCertificate, setShowCertificate] = useState(false)

  const generate = () => {
    if (!toyName.trim()) return
    playClick()
    const s = Math.floor(Math.random() * 1000)
    setSeed(s)
    setSpeech(buildSpeech(toyName.trim(), toyType, memory, s))
    setShowCertificate(false)
    playEnchant()
  }

  const regenerate = () => {
    playClick()
    const s = seed + 1 + Math.floor(Math.random() * 7)
    setSeed(s)
    setSpeech(buildSpeech(toyName.trim(), toyType, memory, s))
  }

  const handleShare = async () => {
    playClick()
    const text = `🎤 ${toyName}'s Farewell Speech:\n\n${speech}\n\n(Record your kid reading it! #MagicDecisionsFarewell — free at magicdecisions.com/toy-farewell)`
    if (navigator.share) {
      await navigator.share({ title: `Farewell, ${toyName}!`, text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const showCert = () => {
    setShowCertificate(true)
    playFanfare()
  }

  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        <div className="text-center mb-6 mt-4 print:hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            ✨ Magic Clean
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-ink-800 font-display">
            The Toy Farewell Ceremony
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Some toys deserve more than a donate bag — they deserve a send-off. Generate a farewell speech and an official certificate, hold a tiny ceremony, and let go with a smile.
          </p>
        </div>

        {/* Form */}
        <div className="mystical-card p-6 md:p-8 max-w-lg w-full print:hidden">
          <label className="block text-sm font-semibold text-[#6B5E4E] mb-1">The toy's name</label>
          <input
            type="text"
            value={toyName}
            onChange={(e) => setToyName(e.target.value)}
            placeholder='e.g. "Mr. Waffles"'
            className="mystical-input mb-4"
          />
          <label className="block text-sm font-semibold text-[#6B5E4E] mb-1">What kind of toy?</label>
          <select
            value={toyType}
            onChange={(e) => { playClick(); setToyType(e.target.value as ToyType) }}
            className="mystical-input mb-4"
          >
            {TOY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <label className="block text-sm font-semibold text-[#6B5E4E] mb-1">One favorite memory (optional)</label>
          <input
            type="text"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            placeholder='e.g. "he came camping and fell in the lake"'
            className="mystical-input mb-6"
          />
          <div className="text-center">
            <button onClick={generate} disabled={!toyName.trim()} className="mystical-btn inline-flex items-center gap-2">
              <Scroll className="w-5 h-5" />
              Write the Farewell Speech
            </button>
          </div>
        </div>

        {/* Speech */}
        {speech && !showCertificate && (
          <div className="mystical-card p-8 max-w-lg w-full mt-8 animate-fade-in print:hidden">
            <div className="text-center text-5xl mb-4">🎤</div>
            <h2 className="text-xl font-bold font-display text-ink-800 text-center mb-6">
              A Farewell to {toyName}
            </h2>
            <div className="text-[#6B5E4E] leading-relaxed whitespace-pre-line border-l-4 border-secondary-400 bg-cream-50 rounded-r-xl p-5 mb-6 italic">
              {speech}
            </div>
            <p className="text-xs text-[#A09080] text-center mb-6">
              Best performed standing on a chair, in a serious voice, with the toy held high. Record it — you'll want this one later. 🎥
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button onClick={regenerate} className="share-btn inline-flex items-center gap-2 px-4 py-2.5">
                <RefreshCw className="w-4 h-4" />
                Try Another Speech
              </button>
              <button onClick={handleShare} className="share-btn inline-flex items-center gap-2 px-4 py-2.5">
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy / Share'}
              </button>
              <button onClick={showCert} className="mystical-btn inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Award the Certificate
              </button>
            </div>
          </div>
        )}

        {/* Certificate */}
        {showCertificate && (
          <div className="max-w-lg w-full mt-8 animate-fade-in">
            <div id="farewell-certificate" className="bg-cream-50 border-4 border-double border-primary-400 rounded-2xl p-8 text-center shadow-warm">
              <div className="text-4xl mb-2">🎖️</div>
              <p className="text-xs uppercase tracking-widest text-[#A09080] mb-1">Magic Decisions hereby presents this</p>
              <h2 className="text-2xl font-bold font-display text-ink-800 mb-4">Certificate of Honorable Service</h2>
              <p className="text-[#6B5E4E] mb-2">awarded to the {toyType}</p>
              <p className="text-3xl font-bold font-display text-secondary-500 mb-4">{toyName}</p>
              <p className="text-sm text-[#6B5E4E] leading-relaxed mb-4">
                for years of loyal play, faithful companionship, and service above and beyond the call of duty.
                Honorably discharged with gratitude, and released to bring joy on new adventures.
              </p>
              <div className="flex items-center justify-center gap-8 text-xs text-[#A09080] mt-6 pt-4 border-t border-cream-300">
                <span>{today}</span>
                <span>🔮 MagicDecisions.com</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
              <button onClick={() => { playClick(); window.print() }} className="mystical-btn inline-flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print the Certificate
              </button>
              <button onClick={() => { playClick(); setShowCertificate(false) }} className="share-btn inline-flex items-center gap-2 px-4 py-2.5">
                Back to the Speech
              </button>
              <button
                onClick={() => { playClick(); setToyName(''); setMemory(''); setSpeech(''); setShowCertificate(false) }}
                className="share-btn inline-flex items-center gap-2 px-4 py-2.5"
              >
                <RefreshCw className="w-4 h-4" />
                New Ceremony
              </button>
            </div>
          </div>
        )}

        {/* Parent note */}
        <div className="w-full max-w-2xl mt-12 mb-4 px-4 print:hidden">
          <div className="mystical-card p-6 bg-cream-50 border-cream-300">
            <h2 className="text-xl font-bold text-ink-800 mb-4 text-center font-display">
              Why a Silly Ceremony Makes Letting Go Easier
            </h2>
            <p className="text-[#6B5E4E] text-center mb-3">
              Kids don't resist decluttering because they need the toy — they resist because letting go feels like losing a friend without saying goodbye. A farewell ceremony gives the attachment somewhere to go: the toy is honored, the memory is spoken out loud, and the ending feels chosen instead of imposed. The humor matters too — laughing during the goodbye teaches kids that endings can be warm instead of sad. By the time the certificate is on the fridge, the toy is in the donate bag and everyone feels good about it.
            </p>
            <p className="text-[#6B5E4E] text-center text-sm">
              Works for grown-ups too. Nobody is judging you for giving your old hoodie a eulogy.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12 px-4 print:hidden">
          <h2 className="text-xl font-semibold text-ink-800 mb-6 text-center font-display">
            More Magic for Cleanup Time
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Sorting Hat', description: 'Three questions decide: keep, toss, or magic', id: 'sortinghat', emoji: '🎩' },
              { name: 'Should I Keep It?', description: 'Spin the wheel for on-the-fence stuff', id: 'keepit', emoji: '📦' },
              { name: 'Magic Chores', description: 'Turn tasks into quests with rewards', id: 'chores', emoji: '🔥' },
              { name: 'Spin Wheel', description: 'Build your own wheel for any decision', id: 'spin', emoji: '🎡' },
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
        <div className="w-full max-w-2xl mb-8 px-4 print:hidden">
          <div className="mystical-card p-8 text-center bg-cream-50 border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold text-ink-800 mb-3 font-display">
              Letting Go Is a Decision Skill Too
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

export default ToyFarewell
