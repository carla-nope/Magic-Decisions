import { useState, useCallback } from 'react'
import { Lightbulb, RefreshCw, Copy, Check, Share2, Sun, Moon, Coffee, BookOpen, Dumbbell, Palette, Music, Gamepad2, Users, Utensils, Sparkles, ArrowRight } from 'lucide-react'
import { playClick, playReveal } from './lib/sounds'
import './index.css'

interface ActivityPickerProps {
  onNavigate?: (toolId: string) => void
}

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

function ActivityPicker({ onNavigate }: ActivityPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);

  const getRandomActivity = useCallback((categoryName?: string) => {
    playClick();
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
        playReveal();
      }
      setIsRevealing(false);
    }, 1500);
  }, []);

  const handleCopyResult = async () => {
    if (!currentActivity) return;
    playClick();
    const text = `💡 Today's Activity: "${currentActivity}"\nCategory: ${selectedCategory}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!currentActivity) return;
    playClick();
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
      pink: { bg: 'bg-highlight/10', text: 'text-highlight-500', border: 'border-highlight-500' },
      red: { bg: 'bg-highlight/10', text: 'text-highlight-500', border: 'border-highlight-500' },
      blue: { bg: 'bg-secondary/10', text: 'text-secondary-400', border: 'border-secondary-400' },
      purple: { bg: 'bg-secondary/10', text: 'text-secondary-400', border: 'border-secondary-400' },
      amber: { bg: 'bg-primary/10', text: 'text-primary-400', border: 'border-primary-400' },
      green: { bg: 'bg-secondary/10', text: 'text-secondary-400', border: 'border-secondary-400' },
      cyan: { bg: 'bg-secondary/10', text: 'text-secondary-400', border: 'border-secondary-400' },
      orange: { bg: 'bg-highlight/10', text: 'text-highlight-500', border: 'border-highlight-500' },
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cream-300 text-[#6B5E4E] text-sm mb-4">
            <Lightbulb className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
            What Should I Do Today?
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
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
                    backgroundColor: ['#D4A574', '#C4956A', '#E8B87D', '#C97B5D', '#8B9D77', '#A4C3A2'][i % 6],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Activity Display */}
          <div className={`mystical-card rounded-2xl p-8 text-center transition-all duration-300 ${isRevealing ? 'animate-pulse' : ''}`}>
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
                <p className="text-xl md:text-2xl font-bold font-display text-ink-800 mb-2">
                  {currentActivity}
                </p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary-400 border border-primary-400/30`}>
                  {selectedCategory}
                </span>
              </div>
            ) : isRevealing ? (
              <div className="py-8">
                <div className="w-12 h-12 mx-auto border-4 border-primary-400/30 border-t-primary-400 rounded-full animate-spin" />
                <p className="text-[#A09080] mt-4">Finding something for you...</p>
              </div>
            ) : (
              <div className="py-8">
                <span className="text-5xl mb-4 block">🤔</span>
                <p className="text-[#A09080]">Pick a category below or get a random activity!</p>
              </div>
            )}
          </div>

          {/* Result Actions */}
          {currentActivity && !isRevealing && (
            <div className="flex items-center gap-3 justify-center mt-4 animate-fade-in">
              <button onClick={handleShare} className="mystical-btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button onClick={handleCopyResult} className="mystical-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={() => getRandomActivity()} className="mystical-btn">
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
          <h3 className="text-lg font-semibold font-display text-ink-800 mb-4 text-center">
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
                  className={`mystical-card rounded-2xl p-4 text-center hover:scale-105 transition-all ${
                    selectedCategory === category.name ? `ring-2 ${color.border}` : ''
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${color.text}`} />
                  <span className="text-sm font-medium text-ink-800">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-8 pb-24">
          <div className="mystical-card rounded-2xl p-6">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4">What is an Activity Picker?</h2>
            <p className="text-[#6B5E4E] mb-4">
              An Activity Picker is a fun tool that helps you discover what to do when you're bored. With 80+ activities across 8 categories, it takes the "I don't know what to do" out of your day. Whether you're looking for something active, creative, social, or relaxing, we've got options for every mood.
            </p>

            <h3 className="text-lg font-semibold font-display text-ink-800 mb-3">When to Use the Activity Picker</h3>
            <ul className="text-[#6B5E4E] space-y-2 mb-4">
              <li>• When you're bored and need inspiration</li>
              <li>• Planning family activities for the weekend</li>
              <li>• Finding new hobbies to try</li>
              <li>• Breaking out of a routine rut</li>
              <li>• Group activities when friends are over</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold font-display text-secondary-400 mb-2">Pros</h3>
                <ul className="text-[#6B5E4E] text-sm space-y-1">
                  <li>✓ 80+ built-in activities across 8 categories</li>
                  <li>✓ Filter by category for targeted results</li>
                  <li>✓ Instant inspiration without overthinking</li>
                  <li>✓ Perfect for all ages and group sizes</li>
                  <li>✓ Discover new hobbies you never tried</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-display text-highlight-500 mb-2">Considerations</h3>
                <ul className="text-[#6B5E4E] text-sm space-y-1">
                  <li>• Results depend on selected categories</li>
                  <li>• Some activities may require materials</li>
                  <li>• Not all activities suit all ages</li>
                  <li>• Consider weather and location constraints</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold font-display text-ink-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-primary-400 font-medium text-sm">What categories are available?</p>
                <p className="text-[#6B5E4E] text-sm">We have 8 categories: Creative Arts, Outdoor Adventures, Sports & Fitness, Social Games, Learning & Reading, Music & Entertainment, Wellness & Relaxation, and Food & Cooking.</p>
              </div>
              <div>
                <p className="text-primary-400 font-medium text-sm">Can I pick from all categories at once?</p>
                <p className="text-[#6B5E4E] text-sm">Yes! Click the main "Get Random Activity" button to pick from all 80+ activities. Or select specific categories to narrow down to activities you prefer.</p>
              </div>
              <div>
                <p className="text-primary-400 font-medium text-sm">Are the activities suitable for kids?</p>
                <p className="text-[#6B5E4E] text-sm">Many activities are family-friendly, but some categories like "Social Games" or "Outdoor Adventures" have options for all ages. Filter by category to find appropriate activities.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-[#A09080] text-sm">
          <p>Let inspiration guide your day</p>
        </div>

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card rounded-2xl p-6 bg-cream-50 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use the Activity Picker to Teach Exploration and Openness
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              The Activity Picker is perfect for teaching kids that trying new things doesn't have to be scary. When your child says "I don't know what to do," let the picker decide. This removes the pressure of choice and introduces the idea that exploration is valuable even when you don't know what you'll discover. It's great for reducing "I'm bored" syndrome and building a growth mindset around novelty.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold font-display text-ink-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'D20 Roller', description: 'Roll for games, prompts, and playful choices', id: 'd20', emoji: '🎲' },
              { name: 'Dinner Decider', description: 'Decide what to eat', id: 'dinner', emoji: '🍽️' },
              { name: 'Spin Wheel', description: 'Visual wheel for multi-option choices', id: 'spin', emoji: '🎡' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="mystical-card tool-card rounded-2xl p-4 text-center hover:border-secondary-400 cursor-pointer bg-cream-50"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold font-display text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#A09080] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card rounded-2xl p-8 text-center bg-cream-50 border border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
              Want to Help Kids Practice Confident Choices?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="mystical-btn inline-flex items-center gap-2"
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
        .activity-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #D4A574 0%, #C4956A 100%);
          border: none;
          border-radius: 2rem;
          color: #1a1333;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(212, 165, 116, 0.4);
        }

        .activity-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(212, 165, 116, 0.5);
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
