import { useState, useCallback } from 'react'
import { UtensilsCrossed, RefreshCw, Copy, Check, Share2, Clock, Flame, Leaf, Plus, Trash2, Info, BookOpen } from 'lucide-react'
import './index.css'

const foodCategories = {
  '🍕 Italian': {
    emoji: '🍕',
    name: 'Italian',
    foods: [
      { name: 'Pizza', desc: 'Classic flatbread topped with sauce, cheese, and various toppings' },
      { name: 'Pasta', desc: 'Italian noodles made from wheat, served with sauces' },
      { name: 'Lasagna', desc: 'Layered pasta dish with meat sauce, cheese, and béchamel' },
      { name: 'Risotto', desc: 'Creamy Italian rice dish cooked slowly with broth and cheese' },
      { name: 'Tiramisu', desc: 'Coffee-flavored layered dessert with mascarpone and cocoa' },
      { name: 'Carbonara', desc: 'Pasta with eggs, cheese, pancetta, and black pepper' },
      { name: 'Bruschetta', desc: 'Toasted bread topped with tomatoes, garlic, and basil' },
      { name: 'Gnocchi', desc: 'Small Italian dumplings made from potato or ricotta' },
      { name: 'Minestrone', desc: 'Hearty Italian vegetable soup with beans and pasta' },
      { name: 'Caprese Salad', desc: 'Fresh mozzarella, tomatoes, and basil with balsamic' },
    ],
  },
  '🍜 Asian': {
    emoji: '🍜',
    name: 'Asian',
    foods: [
      { name: 'Pad Thai', desc: 'Stir-fried rice noodles with eggs, peanuts, and tamarind' },
      { name: 'Fried Rice', desc: 'Wok-fried rice with vegetables, eggs, and soy sauce' },
      { name: 'Teriyaki Chicken', desc: 'Grilled chicken glazed with sweet teriyaki sauce' },
      { name: 'Ramen', desc: 'Japanese noodle soup with broth, meat, and toppings' },
      { name: 'Pho', desc: 'Vietnamese noodle soup with beef, herbs, and rice noodles' },
      { name: 'Spring Rolls', desc: 'Crispy fried rolls filled with vegetables or meat' },
      { name: 'Kung Pao Chicken', desc: 'Spicy stir-fry with peanuts and chilies' },
      { name: 'Curry', desc: 'Aromatic dish with spices, coconut milk, and protein' },
      { name: 'Bibimbap', desc: 'Korean rice bowl with vegetables, egg, and gochujang' },
      { name: 'Dim Sum', desc: 'Chinese small dishes like dumplings and buns' },
    ],
  },
  '🌮 Mexican': {
    emoji: '🌮',
    name: 'Mexican',
    foods: [
      { name: 'Tacos', desc: 'Folded tortillas with meat, cheese, and toppings' },
      { name: 'Burritos', desc: 'Large flour tortilla wrapped around filling and rice' },
      { name: 'Quesadilla', desc: 'Grilled tortilla filled with melted cheese' },
      { name: 'Enchiladas', desc: 'Rolled tortillas filled with meat and covered in sauce' },
      { name: 'Nachos', desc: 'Tortilla chips topped with cheese and toppings' },
      { name: 'Guacamole', desc: 'Mashed avocado dip with lime, onion, and cilantro' },
      { name: 'Churros', desc: 'Fried dough pastry rolled in cinnamon sugar' },
      { name: 'Tamales', desc: 'Corn dough filled with meat, steamed in husks' },
      { name: 'Chimichanga', desc: 'Deep-fried burrito with cheese and sauce' },
      { name: 'Fajitas', desc: 'Grilled meat with peppers and onions, served with tortillas' },
    ],
  },
  '🍔 American': {
    emoji: '🍔',
    name: 'American',
    foods: [
      { name: 'Burger', desc: 'Ground beef patty in a bun with various toppings' },
      { name: 'Hot Dog', desc: 'Grilled sausage in a elongated bun' },
      { name: 'BBQ Ribs', desc: 'Slow-cooked pork ribs with barbecue sauce' },
      { name: 'Mac & Cheese', desc: 'Pasta in creamy cheese sauce' },
      { name: 'Fried Chicken', desc: 'Crispy battered chicken, often Southern-style' },
      { name: 'Philly Cheesesteak', desc: 'Sliced beef with cheese on a hoagie roll' },
      { name: 'Buffalo Wings', desc: 'Crispy wings tossed in spicy buffalo sauce' },
      { name: 'Meatloaf', desc: 'Baked ground meat dish, often with breadcrumbs' },
      { name: 'Corn Dogs', desc: 'Hot dog on a stick coated in cornmeal batter' },
      { name: 'Pulled Pork', desc: 'Slow-cooked shredded pork with BBQ sauce' },
    ],
  },
  '🥗 Healthy': {
    emoji: '🥗',
    name: 'Healthy',
    foods: [
      { name: 'Salad', desc: 'Mixed greens and vegetables with dressing' },
      { name: 'Buddha Bowl', desc: 'Grain bowl with veggies, protein, and healthy fats' },
      { name: 'Avocado Toast', desc: 'Mashed avocado on toasted bread' },
      { name: 'Smoothie Bowl', desc: 'Thick blended fruit bowl topped with granola' },
      { name: 'Quinoa Bowl', desc: 'Protein-rich grain with vegetables and dressing' },
      { name: 'Grilled Salmon', desc: 'Omega-3 rich fish with herbs and lemon' },
      { name: 'Greek Salad', desc: 'Tomatoes, cucumber, feta, olives with olive oil' },
      { name: 'Hummus Plate', desc: 'Chickpea dip with pita bread and veggies' },
      { name: 'Stir-Fry', desc: 'Quick-cooked vegetables and protein in wok' },
      { name: 'Veggie Wrap', desc: 'Tortilla filled with fresh vegetables' },
    ],
  },
  '🍣 Japanese': {
    emoji: '🍣',
    name: 'Japanese',
    foods: [
      { name: 'Sushi', desc: 'Vinegared rice with raw fish and vegetables' },
      { name: 'Tempura', desc: 'Lightly battered and fried seafood or vegetables' },
      { name: 'Teriyaki', desc: 'Meat glazed with sweet soy-based teriyaki sauce' },
      { name: 'Udon', desc: 'Thick wheat noodles in savory broth' },
      { name: 'Yakitori', desc: 'Grilled chicken skewers with sauce or salt' },
      { name: 'Miso Soup', desc: 'Traditional soup with tofu, seaweed, and miso paste' },
      { name: 'TonKatsu', desc: 'Breaded and fried pork cutlet with sauce' },
      { name: 'Ramen', desc: 'Rich noodle soup with meat broth and toppings' },
      { name: 'Edamame', desc: 'Steamed soybeans in the pod, salted' },
      { name: 'Gyoza', desc: 'Pan-fried dumplings with meat and vegetable filling' },
    ],
  },
  '🍲 Comfort': {
    emoji: '🍲',
    name: 'Comfort',
    foods: [
      { name: 'Chicken Soup', desc: 'Warming broth with chicken, vegetables, and noodles' },
      { name: 'Beef Stew', desc: 'Slow-cooked beef with root vegetables in gravy' },
      { name: 'Mac & Cheese', desc: 'Creamy pasta with melted cheddar cheese' },
      { name: 'Pot Roast', desc: 'Slow-braised beef with potatoes and carrots' },
      { name: "Shepherd's Pie", desc: 'Ground meat with mashed potatoes on top' },
      { name: 'Meatballs', desc: 'Ground meat balls in tomato or cream sauce' },
      { name: 'Cottage Pie', desc: "Like shepherd's pie but with beef and mashed potatoes" },
      { name: 'Chili', desc: 'Spicy beef and bean stew with peppers' },
      { name: 'Sloppy Joes', desc: 'Seasoned ground beef on toasted buns' },
      { name: 'Mashed Potatoes', desc: 'Creamy whipped potatoes with butter and cream' },
    ],
  },
  '🌿 Vegetarian': {
    emoji: '🌿',
    name: 'Vegetarian',
    foods: [
      { name: 'Veggie Burger', desc: 'Plant-based patty on a bun with toppings' },
      { name: 'Falafel', desc: 'Deep-fried chickpea fritters with herbs' },
      { name: 'Veggie Stir-Fry', desc: 'Wok-cooked vegetables with sauce' },
      { name: 'Mushroom Risotto', desc: 'Creamy rice with mushrooms and parmesan' },
      { name: 'Veggie Curry', desc: 'Aromatic dish with vegetables in coconut curry sauce' },
      { name: 'Stuffed Peppers', desc: 'Bell peppers filled with rice, beans, and cheese' },
      { name: 'Veggie Tacos', desc: 'Corn tortillas with plant-based fillings' },
      { name: 'Paneer Tikka', desc: 'Indian grilled cheese with spices and yogurt' },
      { name: 'Eggplant Parmesan', desc: 'Breaded eggplant with marinara and cheese' },
      { name: 'Veggie Lasagna', desc: 'Layered pasta with vegetables and cheese' },
    ],
  },
  '🥘 Mediterranean': {
    emoji: '🥘',
    name: 'Mediterranean',
    foods: [
      { name: 'Hummus & Pita', desc: 'Chickpea dip with warm pita bread for dipping' },
      { name: 'Shawarma', desc: 'Seasoned meat wrapped in flatbread with veggies' },
      { name: 'Falafel Wrap', desc: 'Crispy falafel in flatbread with tahini sauce' },
      { name: 'Greek Salad', desc: 'Fresh tomatoes, cucumber, feta, olives, and olive oil' },
      { name: 'Lamb Kebab', desc: 'Grilled seasoned lamb cubes on skewers' },
      { name: 'Baba Ganoush', desc: 'Smoky roasted eggplant dip with tahini' },
      { name: 'Tzatziki', desc: 'Cool cucumber yogurt sauce with garlic' },
      { name: 'Dolmas', desc: 'Grape leaves stuffed with rice and herbs' },
      { name: 'Baklava', desc: 'Sweet pastry with layers of phyllo, nuts, and honey' },
      { name: 'Fattoush', desc: 'Crisp bread salad with vegetables and sumac' },
    ],
  },
  '🍰 Desserts': {
    emoji: '🍰',
    name: 'Desserts',
    foods: [
      { name: 'Ice Cream', desc: 'Frozen dessert in various flavors' },
      { name: 'Chocolate Cake', desc: 'Rich cake made with cocoa and chocolate frosting' },
      { name: 'Brownies', desc: 'Fudgy chocolate squares, often with nuts' },
      { name: 'Cheesecake', desc: 'Creamy dessert with cream cheese on a crust' },
      { name: 'Apple Pie', desc: 'Warm spiced apples in a flaky pastry crust' },
      { name: 'Pudding', desc: 'Sweet custard dessert, often vanilla or chocolate' },
      { name: 'Cookies', desc: 'Baked sweet treats, often with chocolate chips' },
      { name: 'Mousse', desc: 'Light and airy chocolate or fruit dessert' },
      { name: 'Fruit Tart', desc: 'Pastry shell filled with custard and fresh fruit' },
      { name: 'Donuts', desc: 'Fried dough rings, glazed or filled' },
    ],
  },
};

interface FoodItem {
  name: string;
  desc: string;
}

function DinnerDecider() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['🍕 Italian', '🍔 American', '🍜 Asian']);
  const [currentDish, setCurrentDish] = useState<FoodItem | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customDish, setCustomDish] = useState('');
  const [customDishes, setCustomDishes] = useState<FoodItem[]>([]);

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
    const allDishes: FoodItem[] = [];

    selectedCategories.forEach(cat => {
      const foods = foodCategories[cat as keyof typeof foodCategories]?.foods || [];
      allDishes.push(...foods);
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
    setCustomDishes([...customDishes, { name: customDish.trim(), desc: 'A custom dish you added!' }]);
    setCustomDish('');
  };

  const removeCustomDish = (index: number) => {
    setCustomDishes(customDishes.filter((_, i) => i !== index));
  };

  const handleCopyResult = async () => {
    if (!currentDish) return;
    const text = `🍽️ Tonight's dinner: "${currentDish.name}" - ${currentDish.desc} - decided by MagicDecisions!`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!currentDish) return;
    const text = `🍽️ I just got "${currentDish.name}" for dinner! ${currentDish.desc} What will you pick?`;
    if (navigator.share) {
      navigator.share({ title: 'Dinner Decider', text });
    } else {
      handleCopyResult();
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-sm mb-4">
            <UtensilsCrossed className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            What's for Dinner?
          </h1>
          <p className="text-slate-600 max-w-md mx-auto">
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
                <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                  {currentDish.name}
                </p>
                <p className="text-slate-600 text-sm mb-4 italic">
                  "{currentDish.desc}"
                </p>
                <div className="flex items-center justify-center gap-4 text-slate-500">
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
                <p className="text-slate-500 mt-4">Choosing something delicious...</p>
              </div>
            ) : (
              <div className="py-8">
                <span className="text-6xl mb-4 block">🤔</span>
                <p className="text-slate-500">Pick your cuisines and let us decide!</p>
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
          <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
            Select Your Cuisines ({selectedCategories.length} selected)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {Object.entries(foodCategories).map(([category, data]) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`p-3 rounded-xl text-center transition-all ${
                  selectedCategories.includes(category)
                    ? 'bg-orange-500 text-white shadow-lg ring-2 ring-orange-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="text-2xl mb-1">{data.emoji}</div>
                <span className="text-xs font-medium">
                  {data.name}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Dishes */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-md font-semibold text-white mb-1 flex items-center gap-2">
                  Add Custom Options
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">Pro Tip</span>
                </h4>
                <p className="text-slate-400 text-sm">
                  Add your own favorites! Type any dish and click Add. Your custom dishes will be mixed in with the cuisines you selected.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customDish}
                onChange={(e) => setCustomDish(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomDish()}
                placeholder="Try: Homemade pizza, Sushi night..."
                className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none"
              />
              <button onClick={addCustomDish} className="dinner-btn px-6 text-sm">
                Add
              </button>
            </div>
            {customDishes.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700">
                <span className="text-xs text-slate-400 w-full mb-2">Your custom dishes:</span>
                {customDishes.map((dish, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-sm border border-orange-500/30"
                  >
                    <span className="text-orange-400">🍴</span>
                    {dish.name}
                    <button
                      onClick={() => removeCustomDish(index)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* How It Works Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">How It Works</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Select one or more cuisines by clicking them</li>
                  <li>• Add your own dishes using the form above</li>
                  <li>• Click "Decide My Dinner" to randomly pick</li>
                  <li>• Each cuisine has 10 dish options + your custom ones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-8 pb-24">
          <div className="bg-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">What is a Dinner Decider?</h2>
            <p className="text-slate-300 mb-4">
              A Dinner Decider is your answer to the eternal question: "What's for dinner?" With 100+ dishes across 10 cuisine categories, plus the ability to add your own favorites, it takes the stress out of meal planning. Whether you're in the mood for Italian, Asian, Mexican, or just need inspiration, we've got delicious options waiting.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">When to Use the Dinner Decider</h3>
            <ul className="text-slate-300 space-y-2 mb-4">
              <li>• Daily meal planning when you can't decide</li>
              <li>• Trying new cuisines or restaurants</li>
              <li>• Family dinner discussions where everyone's indecisive</li>
              <li>• Meal prep inspiration for the week</li>
              <li>• Late-night snack decisions</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-700/50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Pros</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>✓ 10 cuisine categories with 100+ dishes</li>
                  <li>✓ Add custom dishes to the mix</li>
                  <li>✓ Browse categories to explore cuisines</li>
                  <li>✓ Perfect for restaurant planning too</li>
                  <li>✓ Takes the stress out of meal decisions</li>
                </ul>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-rose-400 mb-2">Considerations</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• Results may not match your dietary needs</li>
                  <li>• Consider what's in your fridge/pantry</li>
                  <li>• Factor in cooking time and skill level</li>
                  <li>• Budget may influence final choice</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-orange-400 font-medium text-sm">What cuisines are available?</p>
                <p className="text-slate-300 text-sm mt-1">We have Italian, Asian, Mexican, American, Healthy, Japanese, Comfort Food, Vegetarian, Mediterranean, and Desserts. Select multiple cuisines to mix them all together!</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-orange-400 font-medium text-sm">Can I add my own dishes?</p>
                <p className="text-slate-300 text-sm mt-1">Yes! Use the "Add Custom Options" section to type in any dish you like. Your custom dishes will be included alongside our built-in options for a truly personalized decision.</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <p className="text-orange-400 font-medium text-sm">How does the randomization work?</p>
                <p className="text-slate-300 text-sm mt-1">The tool randomly selects from all dishes in your selected categories (plus any custom dishes). Each dish has an equal chance of being selected.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-500 text-sm">
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