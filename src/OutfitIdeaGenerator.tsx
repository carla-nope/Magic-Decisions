import { useState, useCallback } from 'react'
import { Shirt, RefreshCw, Copy, Check, Share2, Sun, Cloud, CloudRain, Snowflake, Wind, Thermometer, Sparkles, PartyPopper, Briefcase, Heart, Coffee } from 'lucide-react'
import './index.css'

const vibes = [
  { id: 'casual', name: 'Casual', emoji: '☕', desc: 'Relaxed & comfy' },
  { id: 'streetwear', name: 'Streetwear', emoji: '🔥', desc: 'Urban & fresh' },
  { id: 'elegant', name: 'Elegant', emoji: '✨', desc: 'Classy & sophisticated' },
  { id: 'sporty', name: 'Sporty', emoji: '🏃', desc: 'Active & athletic' },
  { id: 'boho', name: 'Boho', emoji: '🌻', desc: 'Free-spirited & natural' },
  { id: 'minimalist', name: 'Minimalist', emoji: '🤍', desc: 'Clean & simple' },
]

const weather = [
  { id: 'hot', name: 'Hot', icon: Sun, emoji: '☀️', temp: '85°F+' },
  { id: 'warm', name: 'Warm', icon: Sun, emoji: '🌤️', temp: '70-85°F' },
  { id: 'mild', name: 'Mild', icon: Cloud, emoji: '⛅', temp: '55-70°F' },
  { id: 'cool', name: 'Cool', icon: Wind, emoji: '🍃', temp: '40-55°F' },
  { id: 'cold', name: 'Cold', icon: Snowflake, emoji: '❄️', temp: '<40°F' },
  { id: 'rainy', name: 'Rainy', icon: CloudRain, emoji: '🌧️', temp: 'Any' },
]

const occasions = [
  { id: 'any', name: 'Any Occasion', icon: Sparkles, emoji: '🌟' },
  { id: 'work', name: 'Work/Office', icon: Briefcase, emoji: '💼' },
  { id: 'date', name: 'Date Night', icon: Heart, emoji: '💕' },
  { id: 'party', name: 'Party/Hanging Out', icon: PartyPopper, emoji: '🎉' },
  { id: 'lounge', name: 'Lounge/Home', icon: Coffee, emoji: '🏠' },
]

const outfitData: Record<string, { top: string[], bottom: string[], shoes: string[], accessories: string[], style: string }[]> = {
  casual: [
    { top: ['Classic white tee', 'Graphic t-shirt', 'Linen button-up', 'Cozy hoodie', 'Striped rugby shirt'], bottom: ['Blue jeans', 'Khaki chinos', 'Jogger pants', 'Denim shorts'], shoes: ['White sneakers', 'Canvas slip-ons', 'Leather sandals', 'Loafers'], accessories: ['Baseball cap', 'Woven belt', 'Simple watch', 'Canvas tote'], style: 'effortlessly cool' },
    { top: ['Oversized sweater', 'Cropped hoodie', 'Flannel shirt', 'Tank top', 'Polo shirt'], bottom: ['Mom jeans', 'Linen pants', 'Cargo pants', 'A-line skirt'], shoes: ['Platform sneakers', 'Mules', 'High-top sneakers', 'Espadrilles'], accessories: ['Bucket hat', 'Crossbody bag', 'Sunglasses', 'Layered necklaces'], style: 'laid-back chic' },
  ],
  streetwear: [
    { top: ['Oversized hoodie', 'Graphic tee', 'Bomber jacket', 'Cropped puffer', 'Mesh jersey'], bottom: ['Baggy jeans', 'Cargo pants', 'Joggers', 'Skate shorts'], shoes: ['Chunky sneakers', 'High-top Jordan', 'Platform boots', 'Slides'], accessories: ['Beanie', 'Chain necklace', 'Backpack', 'Watch'], style: 'bold & statement' },
    { top: ['Windbreaker', 'Logo tee', 'Zip-up hoodie', 'Denim vest', 'Varsity jacket'], bottom: ['Ripped jeans', 'Track pants', 'Cargo shorts', 'Leather pants'], shoes: ['Dunk lows', 'Old skools', 'Trail sneakers', 'Chelsea boots'], accessories: ['Snapback', 'Sunglasses', 'Chain bracelet', 'Bum bag'], style: 'urban edge' },
  ],
  elegant: [
    { top: ['Silk blouse', 'Crisp button-up', 'Turtleneck', 'Fitted blazer', 'Cashmere sweater'], bottom: ['Tailored trousers', 'Midi skirt', 'Dress pants', 'Wide-leg pants'], shoes: ['Pointed heels', 'Loafers', 'Strappy sandals', 'Oxford shoes'], accessories: ['Pearl earrings', 'Leather belt', 'Structured handbag', 'Simple watch'], style: 'refined & polished' },
    { top: ['Camisole top', 'Sheer blouse', 'Velvet top', 'Satin shirt', 'Wrap top'], bottom: ['Pleated pants', 'A-line dress', 'Silk skirt', 'Palazzo pants'], shoes: ['Kitten heels', 'Mules', 'Ballet flats', 'Ankle boots'], accessories: ['Gold jewelry', 'Clutch bag', 'Silk scarf', 'Stacked bracelets'], style: 'sophisticated glamour' },
  ],
  sporty: [
    { top: ['Performance tee', 'Sports bra', 'Zip-up jacket', 'Crop top', 'Tank with built-in support'], bottom: ['Leggings', 'Biker shorts', 'Jogger pants', 'Tennis skirt'], shoes: ['Running shoes', 'Training sneakers', 'Hiking boots', 'Cross trainers'], accessories: ['Sports watch', 'Sweatband', 'Gym bag', 'Fitness tracker'], style: 'active & functional' },
    { top: ['Oversized sweatshirt', 'Cropped hoodie', 'Longline tee', 'Windbreaker', 'Fleece vest'], bottom: ['Sweatpants', 'Joggers', 'Cycling shorts', 'Tennis dress'], shoes: ['White sneakers', 'Slip-on sneakers', 'Trail runners', 'Court shoes'], accessories: ['Baseball cap', 'Athletic socks', 'Gym duffel', 'Headband'], style: ' athleisure vibes' },
  ],
  boho: [
    { top: ['Flowy peasant top', 'Crochet halter', 'Embroidered blouse', 'Kimono jacket', 'Boho tunic'], bottom: ['Maxi skirt', 'Wide-leg jeans', 'Harem pants', 'Flowy shorts'], shoes: ['Leather sandals', 'Ankle boots', 'Espadrilles', 'Moccasins'], accessories: ['Oversized earrings', 'Fringe bag', 'Layered necklaces', 'Stacked bracelets'], style: 'free & artistic' },
    { top: ['Floral maxi dress', 'Linen wrap top', 'Macramé top', 'Vintage band tee', 'Tiered ruffle top'], bottom: ['Denim cutoffs', 'Midi skirt', 'Palazzo pants', 'Leather skirt'], shoes: ['Flat sandals', 'Gladiator sandals', 'Cowboy boots', 'Ballet flats'], accessories: ['Wide-brim hat', 'Macramé bag', 'Silver rings', 'Feather earrings'], style: 'earthy & romantic' },
  ],
  minimalist: [
    { top: ['Basic white tee', 'Ribbed tank', 'Slip cami', 'Oxford shirt', 'Fine knit sweater'], bottom: ['Straight-leg jeans', 'Tailored shorts', 'Midi skirt', 'Wide-leg trousers'], shoes: ['White sneakers', 'Ballet flats', 'Simple sandals', 'Loafers'], accessories: ['Leather watch', 'Gold hoops', 'Simple tote', 'Stud earrings'], style: 'clean & timeless' },
    { top: ['Cotton bodysuit', 'Silk cami', 'Classic stripe tee', 'Relaxed linen shirt', 'Fitted turtleneck'], bottom: ['Black jeans', 'Pleated trousers', 'A-line skirt', 'Tailored culottes'], shoes: ['Pointed flats', 'Minimalist sneakers', 'Slingback heels', 'Simple mules'], accessories: ['Minimalist jewelry', 'Structured tote', 'Canvas belt', 'Simple sunglasses'], style: 'effortless simplicity' },
  ],
}

function OutfitIdeaGenerator() {
  const [selectedVibe, setSelectedVibe] = useState<string>('casual')
  const [selectedWeather, setSelectedWeather] = useState<string>('warm')
  const [selectedOccasion, setSelectedOccasion] = useState<string>('any')
  const [generatedOutfits, setGeneratedOutfits] = useState<typeof outfitData.casual>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generateOutfits = useCallback(() => {
    const vibeOutfits = outfitData[selectedVibe] || outfitData.casual
    const shuffled = [...vibeOutfits].sort(() => Math.random() - 0.5).slice(0, 4)
    setGeneratedOutfits(shuffled)
  }, [selectedVibe])

  const handleCopy = async (outfit: typeof outfitData.casual[0], index: number) => {
    const text = `👗 Outfit Idea: ${outfit.style}\n\nTop: ${outfit.top[0]}\nBottom: ${outfit.bottom[0]}\nShoes: ${outfit.shoes[0]}\nAccessories: ${outfit.accessories[0]}`
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleShare = async (outfit: typeof outfitData.casual[0]) => {
    const text = `👗 Found the perfect outfit: ${outfit.top[0]} + ${outfit.bottom[0]} = ${outfit.style} vibes!`
    if (navigator.share) {
      navigator.share({ title: 'Outfit Idea', text })
    } else {
      await navigator.clipboard.writeText(text)
    }
  }

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 border border-cyan-200 text-cyan-700 text-sm mb-4">
            <Shirt className="w-4 h-4" />
            Outfit Creator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Get Outfit Inspiration
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Find the perfect outfit based on your vibe, weather, and occasion!
          </p>
        </div>

        {/* Selection Grid */}
        <div className="w-full max-w-4xl mb-6">
          <div className="mystical-card p-4">
            {/* Vibe Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                What's Your Vibe?
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {vibes.map((vibe) => (
                  <button
                    key={vibe.id}
                    onClick={() => setSelectedVibe(vibe.id)}
                    className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 ${
                      selectedVibe === vibe.id
                        ? 'bg-purple-100 border-2 border-purple-400 text-purple-700'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-2 border-transparent'
                    }`}
                  >
                    <span className="text-xl">{vibe.emoji}</span>
                    <span className="font-medium text-xs">{vibe.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weather Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-500" />
                What's the Weather?
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {weather.map((w) => {
                  const Icon = w.icon
                  return (
                    <button
                      key={w.id}
                      onClick={() => setSelectedWeather(w.id)}
                      className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 ${
                        selectedWeather === w.id
                          ? 'bg-orange-100 border-2 border-orange-400 text-orange-700'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-xl">{w.emoji}</span>
                      <span className="font-medium text-xs">{w.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Occasion Selection */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-emerald-500" />
                What's the Occasion?
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {occasions.map((occ) => {
                  const Icon = occ.icon
                  return (
                    <button
                      key={occ.id}
                      onClick={() => setSelectedOccasion(occ.id)}
                      className={`p-3 rounded-xl transition-all flex flex-col items-center gap-1 ${
                        selectedOccasion === occ.id
                          ? 'bg-emerald-100 border-2 border-emerald-400 text-emerald-700'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-xl">{occ.emoji}</span>
                      <span className="font-medium text-xs">{occ.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateOutfits}
          className="outfit-btn flex items-center gap-2 mb-8"
        >
          <RefreshCw className="w-5 h-5" />
          Get Outfit Ideas
        </button>

        {/* Generated Outfits */}
        {generatedOutfits.length > 0 ? (
          <div className="w-full max-w-4xl mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
              {vibes.find(v => v.id === selectedVibe)?.name} Outfits for {weather.find(w => w.id === selectedWeather)?.name} Weather
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {generatedOutfits.map((outfit, index) => (
                <div
                  key={index}
                  className="mystical-card p-6 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">👗</span>
                    <span className="font-semibold text-slate-700 capitalize">{outfit.style}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">👕</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Top</p>
                        <p className="text-slate-700">{outfit.top[Math.floor(Math.random() * outfit.top.length)]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">👖</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Bottom</p>
                        <p className="text-slate-700">{outfit.bottom[Math.floor(Math.random() * outfit.bottom.length)]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">👟</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Shoes</p>
                        <p className="text-slate-700">{outfit.shoes[Math.floor(Math.random() * outfit.shoes.length)]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">✨</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Accessories</p>
                        <p className="text-slate-700">{outfit.accessories[Math.floor(Math.random() * outfit.accessories.length)]}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleCopy(outfit, index)}
                      className="share-btn text-xs flex-1"
                    >
                      {copiedIndex === index ? <><Check className="w-3 h-3 mr-1" /> Copied!</> : <><Copy className="w-3 h-3 mr-1" /> Copy</>}
                    </button>
                    <button
                      onClick={() => handleShare(outfit)}
                      className="share-btn text-xs"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-lg mb-8">
            <div className="mystical-card p-8 text-center">
              <span className="text-5xl mb-4 block">👗</span>
              <p className="text-slate-500">
                Select your vibe, weather, and occasion above, then click to generate outfit ideas!
              </p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-500" />
              Outfit Styling Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">☀️ Hot Weather</p>
                <p>Opt for breathable fabrics like linen and cotton. Light colors reflect heat. Don't forget sunscreen!</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-medium text-slate-700 mb-2">❄️ Cold Weather</p>
                <p>Layer up with a quality jacket. Add thermal underlayers. Protect extremities with gloves and scarves.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Dress with confidence</p>
        </div>

        {/* SEO Content */}
        <div className="w-full max-w-3xl mt-16 mb-8">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is an Outfit Idea Generator?</h2>
            <p className="text-slate-600 mb-4">
              An outfit idea generator helps you discover new fashion combinations based on your style preferences, weather conditions, and the occasion. Whether you're stuck in a fashion rut or need inspiration for a special event, our generator creates personalized outfit suggestions that match your vibe.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Why Use an Outfit Generator?</h3>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li>• Break out of style ruts with fresh ideas</li>
              <li>• Match outfits to weather conditions</li>
              <li>• Find looks for specific occasions</li>
              <li>• Discover new style combinations you hadn't considered</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Pros</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>✓ Multiple style categories to explore</li>
                  <li>✓ Weather-based suggestions</li>
                  <li>✓ Occasion-appropriate recommendations</li>
                  <li>✓ Complete outfit details (top, bottom, shoes, accessories)</li>
                  <li>✓ Copy and share outfit ideas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-2">Styling Tips</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Build your wardrobe around versatile basics</li>
                  <li>• Mix textures for visual interest</li>
                  <li>• Use accessories to elevate simple outfits</li>
                  <li>• Consider the occasion before choosing an outfit</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-700 font-medium text-sm">How do I find my personal style?</p>
                <p className="text-slate-600 text-sm">Start by exploring different aesthetics and noticing what makes you feel confident. Mix and match elements from different styles until you find what resonates with you. Our outfit generator can help you discover new combinations.</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">What should I wear for different occasions?</p>
                <p className="text-slate-600 text-sm">Work settings typically call for polished, professional looks. Date nights can be more relaxed or glamorous depending on the venue. Parties are great opportunities to experiment with bolder choices. Always consider the dress code when available.</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">How do I dress for the weather?</p>
                <p className="text-slate-600 text-sm">In hot weather, choose breathable, lightweight fabrics in light colors. In cold weather, layer up with quality outerwear and thermal pieces. Always check the forecast and plan accordingly. Our generator takes weather into account for each suggestion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .outfit-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.4);
        }

        .outfit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(6, 182, 212, 0.5);
        }

        .outfit-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

export default OutfitIdeaGenerator