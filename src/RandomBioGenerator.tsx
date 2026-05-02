import { useState, useCallback } from 'react'
import { FileText, RefreshCw, Copy, Check, Share2, Sparkles, Heart, Briefcase, Instagram, Calendar } from 'lucide-react'
import './index.css'

const bioCategories = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, emoji: '📸', desc: 'Fun, trendy, lifestyle' },
  { id: 'dating', name: 'Dating Apps', icon: Heart, emoji: '💕', desc: 'Hinge, Tinder, Bumble' },
  { id: 'professional', name: 'Professional', icon: Briefcase, emoji: '💼', desc: 'LinkedIn, Bio links' },
  { id: 'all', name: 'Mixed Vibes', icon: Calendar, emoji: '🌟', desc: 'Creative & varied' },
]

const bioTemplates = {
  instagram: [
    "making {adj} memories 🎈",
    "{adj} vibes only ✨",
    "{adj} & unapologetic",
    "living my {adj} story 📖",
    "{adj} days & sunny days ☀️",
    "just a {noun} living my best life 🌴",
    "{adj} soul with a {adj} heart 💫",
    "less {noun}, more {noun} 🦋",
    "{adj} by day, {adj} by night 🌙",
    "my own kind of {noun} 🌻",
  ],
  dating: [
    "{adj} & looking for {noun} 🏳️‍🌈",
    "here for a good time, not a long time ⏳",
    "{adj} soul seeking {adj} adventures",
    "let's grab {noun} & see what happens ☕",
    "just a {noun} who loves {noun}",
    "{profession} by day, {adj} by night",
    "looking for someone to {verb} with 🎯",
    "honest, {adj}, & looking for {noun}",
    "{adj} vibes in a {adj} world",
    "let's skip the small talk & {verb}",
  ],
  professional: [
    "{profession} | {adj} thinker 💡",
    "Helping {noun} succeed 🚀",
    "{profession} & {adj} creator",
    "Building {noun} & {noun}",
    "Making {noun} happen ✨",
    "{profession} | {noun} | {adj}",
    "Innovating {noun} daily",
    "{adj} leader & {adj} learner",
    "Creating {noun} that matter",
    "{profession} | {verb} enthusiast",
  ],
  all: [
    "living, learning, creating ✨",
    "{adj} & always learning",
    "dreamer, doer, {noun} 🌍",
    "{adj} human doing {adj} things",
    "trying to be {adj} every day 🌱",
    "collecting {noun} & {noun}",
    "here for the {noun} 🎪",
    "making every {noun} count",
    "{adj} & curious about everything",
    "just trying to figure it out 💫",
  ],
}

const words = {
  adj: [
    'sunny', 'chill', 'vibrant', 'curious', 'ambitious', 'soulful', 'adventurous', 'creative',
    'laid-back', 'wavy', 'cosmic', 'dreamy', 'spontaneous', 'grounded', 'limitless',
    'authentic', 'fearless', 'gentle', 'bold', 'vivid', 'serene', 'radiant', 'effortless',
  ],
  noun: [
    'soul', 'spirit', 'mind', 'heart', 'life', 'vibes', 'dreams', 'goals', 'story', 'journey',
    'coffee', 'sun', 'music', 'art', 'travel', 'nature', 'food', 'books', 'adventures', 'magic',
    'coffee dates', 'golden hours', 'good times', 'real moments', 'new beginnings',
  ],
  profession: [
    'designer', 'developer', 'marketer', 'creator', 'writer', 'artist', 'entrepreneur',
    'strategist', 'consultant', 'analyst', 'manager', 'specialist', 'coach', 'producer',
  ],
  verb: [
    'explore', 'create', 'connect', 'build', 'dream', 'grow', 'learn', 'make', 'share', 'inspire',
    'collaborate', 'experiment', 'discover', 'create', 'connect', 'laugh', 'live', 'travel',
  ],
}

function RandomBioGenerator() {
  const [selectedCategory, setSelectedCategory] = useState('instagram')
  const [generatedBios, setGeneratedBios] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavorites, setShowFavorites] = useState(false)

  const fillTemplate = (template: string): string => {
    let result = template
    const matches = template.match(/\{(\w+)\}/g) || []

    matches.forEach(match => {
      const key = match.replace(/[{}]/g, '') as keyof typeof words
      if (words[key] && words[key].length > 0) {
        const word = words[key][Math.floor(Math.random() * words[key].length)]
        result = result.replace(match, word)
      }
    })

    return result.charAt(0).toUpperCase() + result.slice(1)
  }

  const generateBio = useCallback(() => {
    const templates = bioTemplates[selectedCategory as keyof typeof bioTemplates] || bioTemplates.all
    const newBios: string[] = []

    const shuffled = [...templates].sort(() => Math.random() - 0.5)

    for (let i = 0; i < Math.min(8, shuffled.length); i++) {
      let bio = fillTemplate(shuffled[i])

      // Sometimes add emoji combinations
      if (Math.random() > 0.5) {
        const emojiCombos = [' ✨', ' 🌟', ' 🦋', ' ☀️', ' 💫', ' 🌴', ' 🎈', ' 🌍', ' 🌸']
        bio += emojiCombos[Math.floor(Math.random() * emojiCombos.length)]
      }

      // Sometimes remove period at end
      if (bio.endsWith('.') && Math.random() > 0.5) {
        bio = bio.slice(0, -1)
      }

      newBios.push(bio)
    }

    setGeneratedBios(newBios)
  }, [selectedCategory])

  const handleCopy = async (bio: string, index: number) => {
    await navigator.clipboard.writeText(bio)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleShare = async (bio: string) => {
    const text = `✨ Check out this bio idea: "${bio}"`
    if (navigator.share) {
      navigator.share({ title: 'Bio Generator', text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  const toggleFavorite = (bio: string) => {
    setFavorites(prev =>
      prev.includes(bio)
        ? prev.filter(f => f !== bio)
        : [...prev, bio]
    )
  }

  const displayBios = showFavorites ? favorites : generatedBios

  const charCount = (bio: string) => {
    if (bio.length <= 150) return { count: bio.length, color: 'text-emerald-600' }
    if (bio.length <= 200) return { count: bio.length, color: 'text-amber-600' }
    return { count: bio.length, color: 'text-rose-600' }
  }

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-sm mb-4">
            <FileText className="w-4 h-4" />
            Bio Creator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Create Your Perfect Bio
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Generate catchy bios for Instagram, dating apps, or professional profiles!
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-6 w-full max-w-2xl">
          <div className="mystical-card p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">Choose a Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {bioCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl transition-all flex flex-col items-center gap-2 ${
                      selectedCategory === cat.id
                        ? 'bg-rose-100 border-2 border-rose-400 text-rose-700'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="font-medium text-sm">{cat.name}</span>
                    <span className="text-xs text-slate-400">{cat.desc}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateBio}
          className="bio-btn flex items-center gap-2 mb-8"
        >
          <Sparkles className="w-5 h-5" />
          Generate Bios
        </button>

        {/* Generated Bios */}
        {displayBios.length > 0 ? (
          <div className="w-full max-w-3xl mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {showFavorites ? `Saved Favorites (${favorites.length})` : 'Generated Bios'}
              </h3>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`text-sm px-3 py-1 rounded-full transition-colors ${
                  showFavorites
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {showFavorites ? `Show All (${generatedBios.length})` : `Saved (${favorites.length})`}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {displayBios.map((bio, index) => {
                const { count, color } = charCount(bio)
                return (
                  <div
                    key={`${bio}-${index}`}
                    className="mystical-card p-5 hover:shadow-lg transition-all"
                  >
                    <p className="text-slate-700 mb-4 leading-relaxed">"{bio}"</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium ${color}`}>
                        {count} characters {count <= 150 ? '✓' : count <= 200 ? '~' : '!'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(bio, index)}
                          className="share-btn text-xs py-1.5 px-2"
                          title="Copy bio"
                        >
                          {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => handleShare(bio)}
                          className="share-btn text-xs py-1.5 px-2"
                          title="Share"
                        >
                          <Share2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(bio)}
                          className={`share-btn text-xs py-1.5 px-2 ${favorites.includes(bio) ? 'text-rose-500' : ''}`}
                          title={favorites.includes(bio) ? 'Remove from favorites' : 'Save to favorites'}
                        >
                          {favorites.includes(bio) ? '★' : '☆'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg mb-8">
            <div className="mystical-card p-8 text-center">
              <span className="text-5xl mb-4 block">✨</span>
              <p className="text-slate-500">
                Click the button above to generate creative bios
              </p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              Bio Writing Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">📸 Instagram</p>
                <p>Keep it under 150 characters. Use line breaks for readability. Show your personality!</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">💕 Dating Apps</p>
                <p>Be specific about what you're looking for. Show your humor. Avoid clichés!</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">💼 Professional</p>
                <p>Lead with what you do. Include a value prop. Keep it clean and memorable.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Express yourself in words</p>
        </div>

        {/* SEO Content */}
        <div className="w-full max-w-3xl mt-16 mb-8">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is a Bio Generator?</h2>
            <p className="text-slate-600 mb-4">
              A bio generator helps you craft the perfect description for your social media profiles, dating apps, or professional platforms. Whether you need an Instagram bio that captures your vibe, a dating app bio that attracts the right matches, or a LinkedIn summary that showcases your expertise, our generator creates personalized options in seconds.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Why Use a Bio Generator?</h3>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li>• Overcome writer's block when creating bios</li>
              <li>• Get fresh ideas you wouldn't think of alone</li>
              <li>• Match your bio to different platforms' vibes</li>
              <li>• Save time while getting creative results</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Pros</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>✓ Multiple platform categories</li>
                  <li>✓ Character count guidance</li>
                  <li>✓ One-click copy functionality</li>
                  <li>✓ Save favorites for later</li>
                  <li>✓ Fresh, creative options every time</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-2">Tips</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Customize generated bios to match your voice</li>
                  <li>• Keep Instagram bios under 150 characters</li>
                  <li>• Be authentic, not just catchy</li>
                  <li>• Update your bio regularly</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-700 font-medium text-sm">How do I make my bio stand out?</p>
                <p className="text-slate-600 text-sm">Focus on what makes you unique. Use specific details about your interests, humor, or values. Avoid generic phrases like "I love travel and food."</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">What's the ideal bio length?</p>
                <p className="text-slate-600 text-sm">For Instagram, aim for under 150 characters. Dating apps usually allow more (up to 500 characters). LinkedIn summaries can be longer (under 3,000 characters).</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">Should I use emojis in my bio?</p>
                <p className="text-slate-600 text-sm">Emojis can add personality and visual interest, but use them sparingly and intentionally. They work well for personal brands but may look unprofessional on LinkedIn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .bio-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(244, 63, 94, 0.4);
        }

        .bio-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(244, 63, 94, 0.5);
        }

        .bio-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default RandomBioGenerator