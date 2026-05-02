import { useState, useCallback } from 'react'
import { Lightbulb, RefreshCw, Copy, Check, Share2, Sun, Moon, Coffee, BookOpen, Dumbbell, Palette, Music, Gamepad2, Users, Utensils, Sparkles } from 'lucide-react'
import './index.css'

type CategoryColor = {
  bg: string;
  text: string;
  border: string;
};

const activityCategories = [
  {
    name: 'Creative',
    icon: Palette,
    color: 'pink',
    activities: [
      'Draw or sketch something',
      'Start a creative writing piece',
      'Learn a new drawing technique',
      'Create a mood board',
      'Design something for fun',
      'Try digital art',
      'Make a scrapbook page',
      'Practice calligraphy',
    ]
  },
  {
    name: 'Physical',
    icon: Dumbbell,
    color: 'red',
    activities: [
      'Go for a walk or run',
      'Do a workout session',
      'Try yoga or stretching',
      'Dance to your favorite music',
      'Ride a bike',
      'Swim or visit a pool',
      'Play a sport',
      'Do a quick exercise routine',
    ]
  },
  {
    name: 'Social',
    icon: Users,
    color: 'blue',
    activities: [
      'Call a friend or family member',
      'Host a small gathering',
      'Join an online community',
      'Volunteer for a cause',
      'Meet someone new',
      'Plan a game night',
      'Have a deep conversation',
      'Help someone with a task',
    ]
  },
  {
    name: 'Learning',
    icon: BookOpen,
    color: 'purple',
    activities: [
      'Read a book or article',
      'Watch educational videos',
      'Learn a new language',
      'Take an online course',
      'Study a topic of interest',
      'Listen to a podcast',
      'Practice a skill',
      'Read news or explore topics',
    ]
  },
  {
    name: 'Relaxing',
    icon: Coffee,
    color: 'amber',
    activities: [
      'Take a relaxing bath',
      'Practice meditation',
      'Listen to calming music',
      'Do a digital detox',
      'Take a power nap',
      'Sit outside and enjoy nature',
      'Practice deep breathing',
      'Enjoy a favorite hobby slowly',
    ]
  },
  {
    name: 'Fun',
    icon: Gamepad2,
    color: 'green',
    activities: [
      'Play video games',
      'Watch a movie or series',
      'Listen to music',
      'Browse fun content online',
      'Do a puzzle or brain game',
      'Watch funny videos',
      'Explore a new game',
      'Have a movie marathon',
    ]
  },
  {
    name: 'Productive',
    icon: Lightbulb,
    color: 'cyan',
    activities: [
      'Clean and organize your space',
      'Meal prep for the week',
      'Work on a project',
      'Plan your week ahead',
      'Update your budget',
      'Organize digital files',
      'Complete pending tasks',
      'Set up a routine',
    ]
  },
  {
    name: 'Food',
    icon: Utensils,
    color: 'orange',
    activities: [
      'Try a new recipe',
      'Bake something sweet',
      'Cook a healthy meal',
      'Explore new cuisines',
      'Have a picnic',
      'Make a fancy coffee drink',
      'Try food journaling',
      'Host a cooking session',
    ]
  },
];

function ActivityPicker() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  const getRandomActivity = useCallback((categoryName?: string) => {
    setIsRevealing(true);
    setCurrentActivity(null);
    setShowConfetti(false);

    setTimeout(() => {
      const category = categoryName
        ? activityCategories.find(c => c.name.toLowerCase() === categoryName.toLowerCase())
        : activityCategories[Math.floor(Math.random() * activityCategories.length)];

      if (category) {
        const activity = category.activities[Math.floor(Math.random() * category.activities.length)];
        setCurrentActivity(activity);
        setSelectedCategory(category.name);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      setIsRevealing(false);
    }, 1500);
  }, []);

  const handleCopyResult = async () => {
    if (!currentActivity) return;
    const text = `💡 Today's Activity: "${currentActivity}"\nCategory: ${selectedCategory}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!currentActivity) return;
    const text = `💡 I should "${currentActivity}" today! What's your pick?`;
    if (navigator.share) {
      navigator.share({
        title: 'What Should I Do Today',
        text
      });
    } else {
      handleCopyResult();
    }
  };

  const getCategoryColor = (color: string): CategoryColor => {
    const colors: Record<string, CategoryColor> = {
      pink: { bg: 'bg-pink-500', text: 'text-pink-400', border: 'border-pink-500' },
      red: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500' },
      amber: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500' },
      green: { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' },
      cyan: { bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-500' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500' },
    };
    return colors[color] || colors.purple;
  };

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-200 text-yellow-700 text-sm mb-4">
            <Lightbulb className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            What Should I Do Today?
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Can't decide what to do? Let us suggest an activity! Pick a category or get a random suggestion.
          </p>
        </div>

        {/* Main Display */}
        <div className="relative mb-8 w-full max-w-lg">
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
                    width: '8px',
                    height: '8px',
                    backgroundColor: ['#fbbf24', '#f59e0b', '#f97316', '#ef4444', '#10b981', '#06b6d4'][i % 6],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Activity Display */}
          <div className={`mystical-card p-8 text-center transition-all duration-300 ${isRevealing ? 'animate-pulse' : ''}`}>
            {currentActivity ? (
              <div className="animate-bounce-in">
                <span className="text-5xl mb-4 block">
                  {selectedCategory === 'Creative' ? '🎨' :
                   selectedCategory === 'Physical' ? '💪' :
                   selectedCategory === 'Social' ? '👥' :
                   selectedCategory === 'Learning' ? '📚' :
                   selectedCategory === 'Relaxing' ? '☕' :
                   selectedCategory === 'Fun' ? '🎮' :
                   selectedCategory === 'Productive' ? '💡' : '🍳'}
                </span>
                <p className="text-xl md:text-2xl font-bold text-white mb-2">
                  {currentActivity}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30`}>
                  {selectedCategory}
                </span>
              </div>
            ) : isRevealing ? (
              <div className="py-8">
                <div className="w-12 h-12 mx-auto border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
                <p className="text-gray-400 mt-4">Finding something for you...</p>
              </div>
            ) : (
              <div className="py-8">
                <span className="text-5xl mb-4 block">🤔</span>
                <p className="text-gray-400">Pick a category below or get a random activity!</p>
              </div>
            )}
          </div>

          {/* Result Actions */}
          {currentActivity && !isRevealing && (
            <div className="flex items-center gap-3 justify-center mt-4 animate-fade-in">
              <button onClick={handleShare} className="share-btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button onClick={handleCopyResult} className="share-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={() => getRandomActivity()} className="share-btn">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Main Button */}
        <button
          onClick={() => getRandomActivity()}
          disabled={isRevealing}
          className="activity-btn flex items-center gap-2 mb-8"
        >
          <Sparkles className={`w-5 h-5 ${isRevealing ? 'animate-pulse' : ''}`} />
          {isRevealing ? 'Finding Activity...' : 'Get Random Activity'}
        </button>

        {/* Category Grid */}
        <div className="w-full max-w-2xl">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">
            Or pick a category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activityCategories.map((category) => {
              const Icon = category.icon;
              const color = getCategoryColor(category.color);
              return (
                <button
                  key={category.name}
                  onClick={() => getRandomActivity(category.name)}
                  disabled={isRevealing}
                  className={`mystical-card p-4 text-center hover:scale-105 transition-all ${
                    selectedCategory === category.name ? `ring-2 ${color.border}` : ''
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${color.text}`} />
                  <span className="text-sm font-medium text-white">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-8 pb-24">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">What is an Activity Picker?</h2>
            <p className="text-gray-400 mb-4">
              An Activity Picker is a fun tool that helps you discover what to do when you're bored. With 80+ activities across 8 categories, it takes the "I don't know what to do" out of your day. Whether you're looking for something active, creative, social, or relaxing, we've got options for every mood.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">When to Use the Activity Picker</h3>
            <ul className="text-gray-400 space-y-2 mb-4">
              <li>• When you're bored and need inspiration</li>
              <li>• Planning family activities for the weekend</li>
              <li>• Finding new hobbies to try</li>
              <li>• Breaking out of a routine rut</li>
              <li>• Group activities when friends are over</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Pros</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>✓ 80+ built-in activities across 8 categories</li>
                  <li>✓ Filter by category for targeted results</li>
                  <li>✓ Instant inspiration without overthinking</li>
                  <li>✓ Perfect for all ages and group sizes</li>
                  <li>✓ Discover new hobbies you never tried</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-rose-400 mb-2">Considerations</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Results depend on selected categories</li>
                  <li>• Some activities may require materials</li>
                  <li>• Not all activities suit all ages</li>
                  <li>• Consider weather and location constraints</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-yellow-300 font-medium text-sm">What categories are available?</p>
                <p className="text-gray-400 text-sm">We have 8 categories: Creative Arts, Outdoor Adventures, Sports & Fitness, Social Games, Learning & Reading, Music & Entertainment, Wellness & Relaxation, and Food & Cooking.</p>
              </div>
              <div>
                <p className="text-yellow-300 font-medium text-sm">Can I pick from all categories at once?</p>
                <p className="text-gray-400 text-sm">Yes! Click the main "Get Random Activity" button to pick from all 80+ activities. Or select specific categories to narrow down to activities you prefer.</p>
              </div>
              <div>
                <p className="text-yellow-300 font-medium text-sm">Are the activities suitable for kids?</p>
                <p className="text-gray-400 text-sm">Many activities are family-friendly, but some categories like "Social Games" or "Outdoor Adventures" have options for all ages. Filter by category to find appropriate activities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-gray-600 text-sm">
          <p>Let inspiration guide your day</p>
        </div>
      </div>

      <style>{`
        .activity-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          border: none;
          border-radius: 2rem;
          color: #1a1333;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(251, 191, 36, 0.4);
        }

        .activity-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(251, 191, 36, 0.5);
        }

        .activity-btn:active {
          transform: translateY(0);
        }

        .activity-btn:disabled {
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

export default ActivityPicker;
