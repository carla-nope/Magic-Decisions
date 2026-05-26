import { useState, useCallback } from 'react'
import { Hash, Gamepad2, Sparkles, RefreshCw, Copy, Check, Share2, Shuffle, Wand2, ArrowRight } from 'lucide-react'
import './index.css'

const categories = [
  { id: 'tiktok', name: 'TikTok', icon: Hash, emoji: '📱' },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, emoji: '🎮' },
  { id: 'aesthetic', name: 'Aesthetic', icon: Sparkles, emoji: '✨' },
  { id: 'all', name: 'All Styles', icon: Shuffle, emoji: '🌟' },
]

const prefixes: Record<string, string[]> = {
  tiktok: ['vibe', 'glow', 'xtra', 'real', 'only', 'the', 'mr', 'ms', 'day', 'night', 'dream', 'star', 'mid', 'cosmic', 'neo'],
  gaming: ['pro', 'x', 'shadow', 'dark', 'ghost', 'night', 'storm', 'blade', 'dragon', 'wolf', 'titan', 'cyber', 'neo', 'alpha'],
  aesthetic: ['soft', 'golden', 'velvet', 'moon', 'haze', 'rose', 'soul', 'wild', 'silent', 'vintage', 'dusty', 'mystic'],
  all: ['the', 'real', 'only', 'xtra', 'neo', 'mid', 'cosmic', 'ultra', 'super', 'mega'],
}

const suffixes: Record<string, string[]> = {
  tiktok: ['queen', 'king', 'vibes', 'era', 'mood', 'story', 'life', 'world', 'dreams', 'flow', 'trip', 'haze', 'wave'],
  gaming: ['gamer', 'hd', 'pro', 'gg', 'xy', 'zt', 'vn', 'xd', 'lp', 'ops', 'mlg', 'fn', 'mc', 'rl'],
  aesthetic: ['girl', 'boy', 'soul', 'core', 'wave', 'light', 'gaze', 'bliss', 'quest', 'muse', 'lane'],
  all: ['xtra', 'vibes', 'life', 'world', 'core', 'wave', 'mode', 'flow', 'haze', 'soul', 'bliss', 'dream'],
}

const numberStyles = ['add', 'none', 'end', 'start']

interface UsernameGeneratorProps {
  onNavigate?: (toolId: string) => void
}

function UsernameGenerator({ onNavigate }: UsernameGeneratorProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [generatedUsernames, setGeneratedUsernames] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  const generateUsername = useCallback(() => {
    const cat = selectedCategory
    const prefixList = prefixes[cat] || prefixes.all
    const suffixList = suffixes[cat] || suffixes.all

    const newUsernames: string[] = []

    // Generate 12 unique usernames
    const usedNames = new Set<string>()

    while (newUsernames.length < 12) {
      const hasNumber = Math.random() > 0.5
      const numberStyle = numberStyles[Math.floor(Math.random() * numberStyles.length)]
      const number = Math.floor(Math.random() * 99)

      const prefix = prefixList[Math.floor(Math.random() * prefixList.length)]
      const suffix = suffixList[Math.floor(Math.random() * suffixList.length)]

      let name = ''

      if (numberStyle === 'add' || numberStyle === 'none') {
        name = Math.random() > 0.5
          ? `${prefix}${suffix}`
          : `${suffix}${prefix}`
      } else if (numberStyle === 'start') {
        name = `${number}${prefix}${suffix}`
      } else {
        name = `${prefix}${suffix}${number}`
      }

      // Add random character replacements
      if (Math.random() > 0.7) {
        name = name.replace(/a/g, '@').replace(/i/g, '1').replace(/e/g, '3').replace(/s/g, '$').replace(/o/g, '0')
      }

      if (!usedNames.has(name) && name.length >= 4 && name.length <= 16) {
        usedNames.add(name)
        newUsernames.push(name)
      }
    }

    setGeneratedUsernames(newUsernames)
  }, [selectedCategory])

  const handleCopy = async (username: string, index: number) => {
    await navigator.clipboard.writeText(username)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleShare = async (username: string) => {
    const text = `✨ Check out this username idea: @${username}`
    if (navigator.share) {
      navigator.share({ title: 'Username Generator', text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  const toggleFavorite = (username: string) => {
    setFavorites(prev =>
      prev.includes(username)
        ? prev.filter(f => f !== username)
        : [...prev, username]
    )
  }

  const displayUsernames = showFavorites ? favorites : generatedUsernames

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Wand2 className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
            Perfect Username Picker
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Can't decide on a username? Let fate choose for you! Get unique handles for TikTok, gaming, or social media in seconds.
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-6 w-full max-w-2xl">
          <div className="mystical-card rounded-2xl p-4">
            <h3 className="text-lg font-bold font-display text-ink-800 mb-4 text-center">Choose a Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-secondary/10 border-2 border-secondary-400 text-secondary-400'
                        : 'bg-cream-50 hover:bg-cream-100 text-[#6B5E4E] border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="font-medium text-sm">{cat.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateUsername}
          className="mystical-btn flex items-center gap-2 mb-8"
        >
          <Wand2 className="w-5 h-5" />
          Pick Usernames
        </button>

        {/* Generated Usernames */}
        {displayUsernames.length > 0 ? (
          <div className="w-full max-w-3xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-display text-ink-800">
                {showFavorites ? `Saved Favorites (${favorites.length})` : 'Generated Usernames'}
              </h3>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  showFavorites
                    ? 'bg-secondary/10 text-secondary-400'
                    : 'bg-cream-100 text-[#6B5E4E] hover:bg-cream-50'
                }`}
              >
                {showFavorites ? `Show All (${generatedUsernames.length})` : `Saved (${favorites.length})`}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayUsernames.map((username, index) => (
                <div
                  key={`${username}-${index}`}
                  className="mystical-card rounded-2xl p-4 hover:shadow-lg transition-all group relative"
                >
                  <p className="text-lg font-bold text-ink-800 text-center mb-3">@{username}</p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopy(username, index)}
                      className="share-btn text-xs py-1.5 px-2"
                      title="Copy username"
                    >
                      {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => handleShare(username)}
                      className="share-btn text-xs py-1.5 px-2"
                      title="Share"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(username)}
                      className={`share-btn text-xs py-1.5 px-2 ${favorites.includes(username) ? 'text-highlight-500' : ''}`}
                      title={favorites.includes(username) ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      {favorites.includes(username) ? '★' : '☆'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg mb-8">
            <div className="mystical-card rounded-2xl p-8 text-center">
              <span className="text-5xl mb-4 block">✨</span>
              <p className="text-[#A09080]">
                Click the button above to generate unique usernames
              </p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card rounded-2xl p-6">
            <h3 className="text-lg font-bold font-display text-ink-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary-400" />
              Username Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-[#6B5E4E]">
              <div className="bg-cream-50 rounded-2xl p-4">
                <p className="font-bold text-ink-800 mb-2">📱 For TikTok</p>
                <p>Use short, catchy names that are easy to remember and spell. Avoid numbers if possible.</p>
              </div>
              <div className="bg-cream-50 rounded-2xl p-4">
                <p className="font-bold text-ink-800 mb-1">🎮 For Gaming</p>
                <p>Pick something edgy or cool. Numbers at the end (like _x or 99) help avoid duplicates.</p>
              </div>
              <div className="bg-cream-50 rounded-2xl p-4">
                <p className="font-bold text-ink-800 mb-2">✨ For Aesthetic</p>
                <p>Focus on vibe words and mood. Mix in some symbols or spellings to make it unique.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card rounded-2xl p-6 bg-cream-50 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use the Username Generator to Teach Identity and Self-Expression
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              The Username Generator opens conversations about online identity and self-expression. Have kids discuss why they like certain usernames—what does their choice say about how they want to present themselves? This tool helps families talk about the difference between anonymity, privacy, and authenticity online. Kids learn that usernames are a first impression, and making a choice through randomization helps them step outside their comfort zone and try new forms of expression.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-bold font-display text-ink-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Name Picker', description: 'Random name selection for fair picks', id: 'names', emoji: '👤' },
              { name: 'Random Picker', description: 'Pick from any list of options', id: 'picker', emoji: '🎯' },
              { name: 'Outfit Picker', description: 'Decide what to wear with ease', id: 'outfit', emoji: '👕' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="tool-card mystical-card rounded-2xl p-4 text-center hover:shadow-md transition-all cursor-pointer"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-bold font-display text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#A09080] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card rounded-2xl p-8 text-center bg-cream-50 border border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
              Want to Help Kids Make Confident Identity Choices?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="mystical-btn inline-flex items-center gap-2 px-6 py-3"
            >
              Get the Free Decision Traps Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-24" />
      </div>

      <style>{`
        .share-btn {
          padding: 0.375rem 0.5rem;
          background: #FFFBF7;
          border: 1px solid #D4C9B9;
          border-radius: 0.5rem;
          color: #6B5E4E;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .share-btn:hover {
          background: #F5EDE2;
        }
      `}</style>
    </div>
  )
}

export default UsernameGenerator
