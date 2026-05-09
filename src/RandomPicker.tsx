import { useState, useEffect, useCallback, useRef } from 'react'
import { Plus, Trash2, Shuffle, Copy, Check, Share2, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react'
import './index.css'

interface RandomPickerProps {
  onNavigate?: (toolId: string) => void
}

function RandomPicker({ onNavigate }: RandomPickerProps) {
  const [items, setItems] = useState<string[]>([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4'
  ]);
  const [newItem, setNewItem] = useState('');
  const [isPicking, setIsPicking] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Pick animation
  const pickRandom = useCallback(() => {
    if (isPicking || items.length < 2) return;

    setIsPicking(true);
    setSelectedIndex(null);
    setShowConfetti(false);

    const duration = 2000;
    const startTime = Date.now();
    let highlightCount = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Speed up and slow down
      const eased = progress < 0.8
        ? progress / 0.8
        : 1 - Math.pow((1 - progress) / 0.2, 2);

      const currentHighlight = Math.floor(eased * items.length * 3) % items.length;
      setSelectedIndex(currentHighlight);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPicking(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [isPicking, items]);

  // Add item
  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem.trim()]);
    setNewItem('');
  };

  // Remove item
  const removeItem = (index: number) => {
    if (items.length <= 2) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Update item
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  // Copy result
  const handleCopyResult = async () => {
    if (selectedIndex === null) return;
    const text = `🎯 Random Picker chose: "${items[selectedIndex]}"`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share result
  const handleShare = () => {
    if (selectedIndex === null) return;
    const text = `🎯 Random Picker just chose "${items[selectedIndex]}"!`;
    if (navigator.share) {
      navigator.share({
        title: 'Random Picker',
        text
      });
    } else {
      handleCopyResult();
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm mb-4">
            <Shuffle className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Pick Randomly!
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Add your options and let the picker choose. Great for teams, lists, and making decisions!
          </p>
        </div>

        {/* Items Display */}
        <div className="relative mb-6 w-full max-w-lg">
          {/* Confetti */}
          {showConfetti && selectedIndex !== null && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-confetti"
                  style={{
                    left: `${50 + (Math.random() - 0.5) * 40}%`,
                    top: `${50 + (Math.random() - 0.5) * 40}%`,
                    backgroundColor: ['#10b981', '#14b8a6', '#06b6d4', '#22d3ee', '#84cc16'][i % 5],
                    animationDelay: `${i * 0.03}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Items Grid */}
          <div
            ref={containerRef}
            className="mystical-card p-6 min-h-[200px]"
          >
            <div className="grid grid-cols-2 gap-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`relative p-4 rounded-xl transition-all duration-100 ${
                    selectedIndex === index
                      ? isPicking
                        ? 'bg-emerald-500/50 scale-105 ring-2 ring-emerald-400'
                        : 'bg-emerald-500/80 scale-105 ring-4 ring-emerald-400 shadow-lg shadow-emerald-500/50'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    className="w-full bg-transparent border-none text-white focus:outline-none text-center font-medium"
                    disabled={isPicking}
                  />
                  <button
                    onClick={() => removeItem(index)}
                    disabled={items.length <= 2 || isPicking}
                    className={`absolute -top-2 -right-2 p-1 rounded-full transition-all ${
                      items.length <= 2
                        ? 'opacity-30 cursor-not-allowed bg-gray-700'
                        : 'opacity-0 group-hover:opacity-100 hover:bg-red-500/80 bg-red-500/80'
                    }`}
                    style={{ opacity: selectedIndex === index && !isPicking ? 100 : undefined }}
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </button>
                  {selectedIndex === index && !isPicking && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">🎯</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {!isPicking && selectedIndex === null && (
            <p className="text-center text-slate-400 text-sm mt-4">
              Click "Pick Random" to choose!
            </p>
          )}
        </div>

        {/* Result */}
        {selectedIndex !== null && !isPicking && (
          <div className="text-center mb-6 animate-bounce-in">
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200">
              <p className="text-sm text-slate-500 mb-1">The picker chose...</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-800">
                {items[selectedIndex]}
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center mt-4">
              <button onClick={handleShare} className="share-btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button onClick={handleCopyResult} className="share-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={pickRandom} className="share-btn">
                <Shuffle className="w-4 h-4" />
                Pick Again
              </button>
            </div>
          </div>
        )}

        {/* Pick Button */}
        <button
          onClick={pickRandom}
          disabled={isPicking || items.length < 2}
          className="picker-btn flex items-center gap-2 mb-8"
        >
          <Shuffle className={`w-5 h-5 ${isPicking ? 'animate-spin' : ''}`} />
          {isPicking ? 'Picking...' : 'Pick Random'}
        </button>

        {/* Add Options */}
        <div className="w-full max-w-md">
          <div className="mystical-card p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center justify-between">
              <span>Options ({items.length})</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5 text-slate-500" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
              </button>
            </h3>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                placeholder="Add a new option..."
                className="mystical-input flex-1 text-sm"
              />
              <button onClick={addItem} className="picker-btn px-4 text-sm">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm font-medium">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    className="flex-1 bg-transparent border-none text-slate-700 focus:outline-none text-sm"
                  />
                  <button
                    onClick={() => removeItem(index)}
                    disabled={items.length <= 2}
                    className={`p-1.5 rounded-lg transition-colors ${
                      items.length <= 2
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-red-100 text-red-500 opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ opacity: items.length <= 2 ? 0.3 : undefined }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {items.length < 2 && (
              <p className="text-center text-amber-600 text-sm mt-3">
                Add at least 2 options to pick
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Let the picker guide your decisions</p>
        </div>

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
              Use the Random Picker to Teach Decision Confidence
            </h2>
            <p className="text-slate-600 text-center mb-4">
              The Random Picker teaches kids that it's okay to not know what you want—and that delegation to chance is a valid decision-making strategy. When kids are overwhelmed by choice, let them add all options and let the picker decide. This reduces anxiety around "getting it wrong" and builds comfort with uncertainty. It's a low-stakes way to practice that not every decision needs deep analysis.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'D20 Roller', description: 'Roll for games, prompts, and playful choices', id: 'd20', emoji: '🎲' },
              { name: 'Spin Wheel', description: 'Visual wheel for multi-option choices', id: 'spin', emoji: '🎡' },
              { name: 'Coin Flip', description: 'Binary 50/50 decisions', id: 'coin', emoji: '🪙' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="mystical-card p-4 text-center hover:shadow-md transition-all hover:border-emerald-400 cursor-pointer bg-transparent"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold text-slate-800 mb-1">{tool.name}</h3>
                <p className="text-slate-500 text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              Want to Help Kids Practice Confident Choices?
            </h2>
            <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-500/30"
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
        .picker-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        }

        .picker-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5);
        }

        .picker-btn:active {
          transform: translateY(0);
        }

        .picker-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}

export default RandomPicker;
