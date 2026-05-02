import { useState, useCallback } from 'react'
import { UtensilsCrossed, RefreshCw, Copy, Check, Share2, Clock, Flame, Leaf, Plus, Trash2 } from 'lucide-react'
import './index.css'

const foodCategories = {
  '🍕 Italian': ['Pizza', 'Pasta', 'Lasagna', 'Risotto', 'Tiramisu', 'Carbonara', 'Bruschetta', 'Gnocchi', 'Minestrone', 'Caprese Salad'],
  '🍜 Asian': ['Pad Thai', 'Fried Rice', 'Teriyaki Chicken', 'Ramen', 'Pho', 'Spring Rolls', 'Kung Pao Chicken', 'Curry', 'Bibimbap', 'Dim Sum'],
  '🌮 Mexican': ['Tacos', 'Burritos', 'Quesadilla', 'Enchiladas', 'Nachos', 'Guacamole', 'Churros', 'Tamales', 'Chimichanga', 'Fajitas'],
  '🍔 American': ['Burger', 'Hot Dog', 'BBQ Ribs', 'Mac & Cheese', 'Fried Chicken', 'Philly Cheesesteak', 'Buffalo Wings', 'Meatloaf', 'Corn Dogs', 'Pulled Pork'],
  '🥗 Healthy': ['Salad', 'Buddha Bowl', 'Avocado Toast', 'Smoothie Bowl', 'Quinoa Bowl', 'Grilled Salmon', 'Greek Salad', 'Hummus Plate', 'Stir-Fry', 'Veggie Wrap'],
  '🍣 Japanese': ['Sushi', 'Tempura', 'Teriyaki', 'Udon', 'Yakitori', 'Miso Soup', 'TonKatsu', 'Ramen', 'Edamame', 'Gyoza'],
  '🍲 Comfort': ['Chicken Soup', 'Beef Stew', 'Mac & Cheese', 'Pot Roast', 'Shepherd\'s Pie', 'Meatballs', 'Cottage Pie', 'Chili', 'Sloppy Joes', 'Mashed Potatoes'],
  '🌿 Vegetarian': ['Veggie Burger', 'Falafel', 'Veggie Stir-Fry', 'Mushroom Risotto', 'Veggie Curry', 'Stuffed Peppers', 'Veggie Tacos', 'Paneer Tikka', 'Eggplant Parmesan', 'Veggie Lasagna'],
  '🥘 Mediterranean': ['Hummus & Pita', 'Shawarma', 'Falafel Wrap', 'Greek Salad', 'Lamb Kebab', 'Baba Ganoush', 'Tzatziki', 'Dolmas', 'Baklava', 'Fattoush'],
  '🍰 Desserts': ['Ice Cream', 'Chocolate Cake', 'Brownies', 'Cheesecake', 'Apple Pie', 'Pudding', 'Cookies', 'Mousse', 'Fruit Tart', 'Donuts'],
};

function DinnerDecider() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['🍕 Italian', '🍔 American', '🍜 Asian']);
  const [currentDish, setCurrentDish] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customDish, setCustomDish] = useState('');
  const [customDishes, setCustomDishes] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const getRandomDish = useCallback(() => {
    setIsRevealing(true);
    setCurrentDish(null);
    setShowConfetti(false);

    // Combine selected categories with custom dishes
    const allDishes: string[] = [];

    selectedCategories.forEach(cat => {
      const dishes = foodCategories[cat as keyof typeof foodCategories] || [];
      allDishes.push(...dishes);
    });

    allDishes.push(...customDishes);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * allDishes.length);
      setCurrentDish(allDishes[randomIndex]);
      setIsRevealing(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  }, [selectedCategories, customDishes]);

  const addCustomDish = () => {
    if (!customDish.trim()) return;
    setCustomDishes([...customDishes, customDish.trim()]);
    setCustomDish('');
  };

  const removeCustomDish = (index: number) => {
    setCustomDishes(customDishes.filter((_, i) => i !== index));
  };

  const handleCopyResult = async () => {
    if (!currentDish) return;
    const text = `🍽️ Tonight's dinner: "${currentDish}" - decided by MagicDecisions!`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!currentDish) return;
    const text = `🍽️ I just used MagicDecisions and got "${currentDish}" for dinner! What will you pick?`;
    if (navigator.share) {
      navigator.share({ title: 'Dinner Decider', text });
    } else {
      handleCopyResult();
    }
  };

  const categoryIcons: Record<string, JSX.Element> = {
    '🍕 Italian': <span className="text-2xl">🍕</span>,
    '🍜 Asian': <span className="text-2xl">🍜</span>,
    '🌮 Mexican': <span className="text-2xl">🌮</span>,
    '🍔 American': <span className="text-2xl">🍔</span>,
    '🥗 Healthy': <span className="text-2xl">🥗</span>,
    '🍣 Japanese': <span className="text-2xl">🍣</span>,
    '🍲 Comfort': <span className="text-2xl">🍲</span>,
    '🌿 Vegetarian': <span className="text-2xl">🌿</span>,
    '🥘 Mediterranean': <span className="text-2xl">🥘</span>,
    '🍰 Desserts': <span className="text-2xl">🍰</span>,
  };

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-sm mb-4">
            <UtensilsCrossed className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            What's for Dinner?
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Can't decide? Let us pick your next meal! Select your favorite cuisines and spin for deliciousness.
          </p>
        </div>

        {/* Main Display */}
        <div className="relative mb-6 w-full max-w-lg">
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: '10px',
                    height: '10px',
                    backgroundColor: ['#f97316', '#ef4444', '#fbbf24', '#22c55e', '#ec4899'][i % 5],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Dish Display */}
          <div className={`mystical-card p-8 text-center transition-all duration-300 ${isRevealing ? 'animate-pulse' : ''}`}>
            {currentDish ? (
              <div className="animate-bounce-in">
                <span className="text-6xl mb-4 block">🍽️</span>
                <p className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {currentDish}
                </p>
                <div className="flex items-center justify-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1 text-sm">
                    <Flame className="w-4 h-4" /> Yummy!
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" /> Time to eat!
                  </span>
                </div>
              </div>
            ) : isRevealing ? (
              <div className="py-8">
                <div className="w-16 h-16 mx-auto border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                <p className="text-gray-400 mt-4">Choosing something delicious...</p>
              </div>
            ) : (
              <div className="py-8">
                <span className="text-6xl mb-4 block">🤔</span>
                <p className="text-gray-400">Pick your cuisines and let us decide!</p>
              </div>
            )}
          </div>

          {/* Result Actions */}
          {currentDish && !isRevealing && (
            <div className="flex items-center gap-3 justify-center mt-4 animate-fade-in">
              <button onClick={handleShare} className="share-btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button onClick={handleCopyResult} className="share-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={getRandomDish} className="share-btn">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Decider Button */}
        <button
          onClick={getRandomDish}
          disabled={isRevealing || (selectedCategories.length === 0 && customDishes.length === 0)}
          className="dinner-btn flex items-center gap-2 mb-8"
        >
          <UtensilsCrossed className={`w-5 h-5 ${isRevealing ? 'animate-pulse' : ''}`} />
          {isRevealing ? 'Deciding...' : 'Decide My Dinner'}
        </button>

        {/* Categories Grid */}
        <div className="w-full max-w-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Select Your Cuisines ({selectedCategories.length} selected)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {Object.keys(foodCategories).map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`mystical-card p-3 text-center transition-all ${
                  selectedCategories.includes(category)
                    ? 'ring-2 ring-orange-500 bg-orange-500/20'
                    : 'opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{category.split(' ')[0]}</div>
                <span className="text-xs font-medium text-white">
                  {category.split(' ')[1]}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Dishes */}
          <div className="mystical-card p-4">
            <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Custom Options
            </h4>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={customDish}
                onChange={(e) => setCustomDish(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomDish()}
                placeholder="Add a custom dish..."
                className="mystical-input flex-1 text-sm"
              />
              <button onClick={addCustomDish} className="dinner-btn px-4 text-sm">
                Add
              </button>
            </div>
            {customDishes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {customDishes.map((dish, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-sm"
                  >
                    {dish}
                    <button
                      onClick={() => removeCustomDish(index)}
                      className="hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-8 pb-24">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">What is a Dinner Decider?</h2>
            <p className="text-gray-400 mb-4">
              A Dinner Decider is your answer to the eternal question: "What's for dinner?" With 100+ dishes across 10 cuisine categories, plus the ability to add your own favorites, it takes the stress out of meal planning. Whether you're in the mood for Italian, Asian, Mexican, or just need inspiration, we've got delicious options waiting.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">When to Use the Dinner Decider</h3>
            <ul className="text-gray-400 space-y-2 mb-4">
              <li>• Daily meal planning when you can't decide</li>
              <li>• Trying new cuisines or restaurants</li>
              <li>• Family dinner discussions where everyone's indecisive</li>
              <li>• Meal prep inspiration for the week</li>
              <li>• Late-night snack decisions</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Pros</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>✓ 10 cuisine categories with 100+ dishes</li>
                  <li>✓ Add custom dishes to the mix</li>
                  <li>✓ Browse categories to explore cuisines</li>
                  <li>✓ Perfect for restaurant planning too</li>
                  <li>✓ Takes the stress out of meal decisions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-rose-400 mb-2">Considerations</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Results may not match your dietary needs</li>
                  <li>• Consider what's in your fridge/pantry</li>
                  <li>• Factor in cooking time and skill level</li>
                  <li>• Budget may influence final choice</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-orange-300 font-medium text-sm">What cuisines are available?</p>
                <p className="text-gray-400 text-sm">We have Italian, Asian, Mexican, American, Healthy, Japanese, Comfort Food, Vegetarian, Mediterranean, and Desserts. Select multiple cuisines to mix them all together!</p>
              </div>
              <div>
                <p className="text-orange-300 font-medium text-sm">Can I add my own dishes?</p>
                <p className="text-gray-400 text-sm">Yes! Use the "Add Custom Options" section to type in any dish you like. Your custom dishes will be included alongside our built-in options for a truly personalized decision.</p>
              </div>
              <div>
                <p className="text-orange-300 font-medium text-sm">How does the randomization work?</p>
                <p className="text-gray-400 text-sm">The tool randomly selects from all dishes in your selected categories (plus any custom dishes). Each dish has an equal chance of being selected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-gray-600 text-sm">
          <p>Let deliciousness guide your evening</p>
        </div>
      </div>

      <style>{`
        .dinner-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #f97316 0%, #ef4444 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
        }

        .dinner-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(249, 115, 22, 0.5);
        }

        .dinner-btn:active {
          transform: translateY(0);
        }

        .dinner-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default DinnerDecider;
