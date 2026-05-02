import { useState, useCallback } from 'react'
import { Hash, Gamepad2, Sparkles, RefreshCw, Copy, Check, Share2, Shuffle, Wand2 } from 'lucide-react'
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

function UsernameGenerator() {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm mb-4">
            <Wand2 className="w-4 h-4" />
            Username Creator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Generate Perfect Usernames
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Create unique handles for TikTok, gaming, or your social media. Click to copy instantly!
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-6 w-full max-w-2xl">
          <div className="mystical-card p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Choose a Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-purple-100 border-2 border-purple-400 text-purple-700'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-2 border-transparent'
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
          className="generate-btn flex items-center gap-2 mb-8"
        >
          <Wand2 className="w-5 h-5" />
          Generate Usernames
        </button>

        {/* Generated Usernames */}
        {displayUsernames.length > 0 ? (
          <div className="w-full max-w-3xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {showFavorites ? `Saved Favorites (${favorites.length})` : 'Generated Usernames'}
              </h3>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  showFavorites
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {showFavorites ? `Show All (${generatedUsernames.length})` : `Saved (${favorites.length})`}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayUsernames.map((username, index) => (
                <div
                  key={`${username}-${index}`}
                  className="mystical-card p-4 hover:shadow-lg transition-all group relative"
                >
                  <p className="text-lg font-semibold text-slate-800 text-center mb-3">@{username}</p>
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
                      className={`share-btn text-xs py-1.5 px-2 ${favorites.includes(username) ? 'text-rose-500' : ''}`}
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
            <div className="mystical-card p-8 text-center">
              <span className="text-5xl mb-4 block">✨</span>
              <p className="text-slate-500">
                Click the button above to generate unique usernames
              </p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Username Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">📱 For TikTok</p>
                <p>Use short, catchy names that are easy to remember and spell. Avoid numbers if possible.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">🎮 For Gaming</p>
                <p>Pick something edgy or cool. Numbers at the end (like _x or 99) help avoid duplicates.</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">✨ For Aesthetic</p>
                <p>Focus on vibe words and mood. Mix in some symbols or spellings to make it unique.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Find your perfect online identity</p>
        </div>

        {/* SEO Content */}
        <div className="w-full max-w-3xl mt-16 mb-8">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is a Username Generator?</h2>
            <p className="text-slate-600 mb-4">
              A username generator is a creative tool that helps you come up with unique handles for social media, gaming platforms, and online accounts. Whether you need a TikTok username, gaming tag, or Instagram handle, our generator creates memorable options tailored to your style.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Why Use a Username Generator?</h3>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li>• Finding available usernames across multiple platforms</li>
              <li>• Creating consistent handles for your personal brand</li>
              <li>• Discovering creative names you wouldn't think of yourself</li>
              <li>• Avoiding the frustration of "username taken" errors</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Pros</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>✓ Instant generation of unique usernames</li>
                  <li>✓ Multiple style categories to choose from</li>
                  <li>✓ One-click copy functionality</li>
                  <li>✓ Save favorites for later</li>
                  <li>✓ Works for any platform</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-2">Tips</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Check availability before committing</li>
                  <li>• Avoid using personal info like birth year</li>
                  <li>• Keep it simple and easy to spell</li>
                  <li>• Consider your long-term branding goals</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-700 font-medium text-sm">Are these usernames available?</p>
                <p className="text-slate-600 text-sm">We generate creative suggestions, but you'll need to check availability on each platform. Many usernames may already be taken, so generate multiple options.</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">Can I use these for multiple platforms?</p>
                <p className="text-slate-600 text-sm">Yes! Try to use the same username across all platforms for brand consistency. Check each platform separately for availability.</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">How do I make my username unique?</p>
                <p className="text-slate-600 text-sm">Try adding symbols like underscores, periods, or numbers. Mix spellings (like "xtra" instead of "extra") and combine words creatively.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .generate-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.4);
        }

        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(139, 92, 246, 0.5);
        }

        .generate-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default UsernameGenerator