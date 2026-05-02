import { Sparkles, RefreshCw, Circle, CircleDot, Lightbulb, UtensilsCrossed, Hand, User, Star, ArrowRight, Zap, Globe, Wand2, FileText, Shirt, Brain, Target, CreditCard } from 'lucide-react'
import './index.css'

const tools = [
  {
    id: 'oracle',
    name: 'Yes No Oracle',
    icon: Sparkles,
    color: 'purple',
    emoji: '🔮',
    description: 'Ask the mystical crystal ball for yes or no answers',
    keyword: 'magic 8 ball online'
  },
  {
    id: 'spin',
    name: 'Spin Wheel',
    icon: RefreshCw,
    color: 'amber',
    emoji: '🎡',
    description: 'Create a custom wheel and let it decide for you',
    keyword: 'wheel spinner'
  },
  {
    id: 'coin',
    name: 'Coin Flip',
    icon: Circle,
    color: 'blue',
    emoji: '🪙',
    description: 'Heads or tails? Let fate decide',
    keyword: 'coin flip simulator'
  },
  {
    id: 'picker',
    name: 'Random Picker',
    icon: CircleDot,
    color: 'emerald',
    emoji: '🎯',
    description: 'Add options and pick one randomly',
    keyword: 'decision maker'
  },
  {
    id: 'activity',
    name: 'Activity Picker',
    icon: Lightbulb,
    color: 'yellow',
    emoji: '💡',
    description: 'Find your next activity or hobby',
    keyword: 'what should I do today'
  },
  {
    id: 'dinner',
    name: 'Dinner Decider',
    icon: UtensilsCrossed,
    color: 'orange',
    emoji: '🍽️',
    description: 'Decide what to eat for your next meal',
    keyword: 'what should I eat'
  },
  {
    id: 'rps',
    name: 'Rock Paper Scissors',
    icon: Hand,
    color: 'cyan',
    emoji: '✂️',
    description: 'Battle the computer in classic RPS',
    keyword: 'rock paper scissors game'
  },
  {
    id: 'names',
    name: 'Name Picker',
    icon: User,
    color: 'rose',
    emoji: '👤',
    description: 'Randomly pick names or assign teams',
    keyword: 'random name picker'
  },
  {
    id: 'username',
    name: 'Username Generator',
    icon: Wand2,
    color: 'purple',
    emoji: '✨',
    description: 'Generate unique handles for TikTok, gaming, social',
    keyword: 'username generator'
  },
  {
    id: 'bio',
    name: 'Bio Generator',
    icon: FileText,
    color: 'rose',
    emoji: '📝',
    description: 'Create catchy bios for Instagram & dating apps',
    keyword: 'bio generator'
  },
  {
    id: 'outfit',
    name: 'Outfit Ideas',
    icon: Shirt,
    color: 'cyan',
    emoji: '👗',
    description: 'Get outfit inspiration by vibe & weather',
    keyword: 'outfit generator'
  },
  {
    id: 'maximizer',
    name: 'Decision Style Quiz',
    icon: Brain,
    color: 'purple',
    emoji: '🧠',
    description: 'Are you a Maximizer or Satisficer?',
    keyword: 'decision making style quiz'
  },
  {
    id: 'bias',
    name: 'Cognitive Bias Test',
    icon: Target,
    color: 'amber',
    emoji: '🎯',
    description: 'Test your awareness of mental shortcuts',
    keyword: 'cognitive bias test'
  },
  {
    id: 'buyit',
    name: 'Should I Buy It?',
    icon: CreditCard,
    color: 'emerald',
    emoji: '🛒',
    description: 'Make smarter purchasing decisions',
    keyword: 'should I buy it calculator'
  },
];

function LandingPage({ onSelectTool }: { onSelectTool: (toolId: any) => void }) {
  const scrollToContent = () => {
    const contentSection = document.getElementById('how-it-helps');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      purple: { bg: 'bg-purple-100', border: 'border-purple-200', text: 'text-purple-700', hover: 'hover:border-purple-400 hover:bg-purple-50' },
      amber: { bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-700', hover: 'hover:border-amber-400 hover:bg-amber-50' },
      blue: { bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-700', hover: 'hover:border-blue-400 hover:bg-blue-50' },
      emerald: { bg: 'bg-emerald-100', border: 'border-emerald-200', text: 'text-emerald-700', hover: 'hover:border-emerald-400 hover:bg-emerald-50' },
      yellow: { bg: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700', hover: 'hover:border-yellow-400 hover:bg-yellow-50' },
      orange: { bg: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700', hover: 'hover:border-orange-400 hover:bg-orange-50' },
      cyan: { bg: 'bg-cyan-100', border: 'border-cyan-200', text: 'text-cyan-700', hover: 'hover:border-cyan-400 hover:bg-cyan-50' },
      rose: { bg: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-700', hover: 'hover:border-rose-400 hover:bg-rose-50' },
    };
    return colors[color] || colors.purple;
  };

  return (
    <>
      <div className="min-h-screen relative">
        <div className="stars-bg" />

        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-5xl">🔮</span>
                <span className="text-4xl font-bold text-slate-800">Magic Decisions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-slate-800">
                Decide Anything in Seconds
              </h1>
              <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto mb-6">
                Free online decision-making tools. Spins, picks, and choices - all in one place.
              </p>
              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>15 free tools</span>
                <span>•</span>
                <Globe className="w-4 h-4" />
                <span>Works everywhere</span>
                <span>•</span>
                <Star className="w-4 h-4 text-amber-500" />
                <span>No signup needed</span>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="w-full max-w-5xl">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
              Choose a Tool
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const colors = getColorClasses(tool.color);
                return (
                  <button
                    key={tool.id}
                    onClick={() => onSelectTool(tool.id as any)}
                    className={`mystical-card p-6 text-left transition-all duration-300 border ${colors.border} ${colors.hover} group`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <span className="text-2xl">{tool.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-slate-800 mb-1`}>
                          {tool.name}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                          {tool.description}
                        </p>
                        <div className={`inline-flex items-center gap-1 text-xs ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <span className="capitalize">{tool.keyword}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToContent}
            className="mt-12 mb-8 px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/30"
          >
            Start Making Decisions
          </button>
        </div>

        {/* How Magic Decisions Helps Section */}
        <div id="how-it-helps" className="w-full max-w-5xl px-4 py-16 scroll-mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
              How Magic Decisions Helps You Choose
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We all face decision fatigue. When daily choices pile up—from what to eat to what activity to try—our ability to make good decisions decreases. Magic Decisions exists to lift that burden.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* What is Decision Fatigue */}
            <div className="mystical-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-100 flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">What is Decision Fatigue?</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Every day, you make thousands of choices. Research shows that after making many decisions, your brain gets tired and starts taking shortcuts—leading to impulsive or poor choices. That's why "I don't know what to eat" feels so exhausting.
              </p>
            </div>

            {/* When to Use Random Tools */}
            <div className="mystical-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <span className="text-3xl">🎲</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">When to Use Random Tools</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Not every decision needs deep analysis. For low-stakes choices like "what game to play" or "which restaurant to try," randomization can break analysis paralysis. The goal isn't perfect choices—it's freeing your mental energy for decisions that really matter.
              </p>
            </div>

            {/* Our Approach */}
            <div className="mystical-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Our Approach</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We combine randomization with smart categorization. Whether it's 10 cuisine types for dinner or 80 activities for fun, our tools help you explore options without the stress. No account needed, no data stored—just instant decisions.
              </p>
            </div>
          </div>

          {/* Real Examples */}
          <div className="mystical-card p-8 mb-8 mx-auto max-w-3xl">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Real Examples of When to Use Magic Decisions</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🍽️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Food Decisions</h4>
                  <p className="text-slate-600 text-sm">"I want pizza tonight but also sushi..." Use the Dinner Decider to pick from 10 cuisines, or add your own favorites. No more food paralysis at 6pm.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Activity Ideas</h4>
                  <p className="text-slate-600 text-sm">"I'm bored but I don't know what to do..." Browse 80+ activities across 8 categories. Perfect for rainy days, family time, or finding a new hobby.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Group Fairness</h4>
                  <p className="text-slate-600 text-sm">"Who goes first?" or "How do we split teams?" Use the Name Picker to randomly assign or the Spin Wheel to let fate decide. Everyone sees it's fair.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎮</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Quick Games</h4>
                  <p className="text-slate-600 text-sm">"Let's settle this with Rock Paper Scissors!" Go beyond paper—use the Coin Flip for binary choices or build custom wheels for game night.</p>
                </div>
              </div>
            </div>
          </div>

          {/* When to Use Each Tool */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">When to Use Each Tool</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto max-w-5xl">
              {[
                { emoji: '🔮', name: 'Yes No Oracle', use: 'Simple yes/no decisions with mystical flair' },
                { emoji: '🎡', name: 'Spin Wheel', use: 'Multi-option choices with visual excitement' },
                { emoji: '🪙', name: 'Coin Flip', use: 'Binary 50/50 decisions' },
                { emoji: '🎯', name: 'Random Picker', use: 'Pick one from your custom list' },
                { emoji: '💡', name: 'Activity Picker', use: 'Find something fun to do' },
                { emoji: '🍽️', name: 'Dinner Decider', use: 'Decide what to eat' },
                { emoji: '✂️', name: 'Rock Paper Scissors', use: 'Settle disputes with game' },
                { emoji: '👤', name: 'Name Picker', use: 'Random selection or team assignment' },
                { emoji: '✨', name: 'Username Generator', use: 'Create unique handles for social' },
                { emoji: '📝', name: 'Bio Generator', use: 'Craft catchy social media bios' },
                { emoji: '👗', name: 'Outfit Ideas', use: 'Get outfit inspiration by vibe' },
                { emoji: '🧠', name: 'Decision Style Quiz', use: 'Discover your decision style' },
                { emoji: '🎯', name: 'Cognitive Bias Test', use: 'Test your mental shortcuts' },
                { emoji: '🛒', name: 'Should I Buy It', use: 'Make smarter purchases' },
                { emoji: '🔥', name: 'Magic Chores', use: 'Gamify tasks with magic rewards' },
              ].map((tool) => (
                <div key={tool.name} className="mystical-card p-4 text-center">
                  <span className="text-2xl mb-2 block">{tool.emoji}</span>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{tool.name}</h4>
                  <p className="text-slate-500 text-xs">{tool.use}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 py-6 border-y border-slate-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">15</p>
              <p className="text-slate-500 text-sm">Decision Tools</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-600">500+</p>
              <p className="text-slate-500 text-sm">Options to Choose From</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-600">100%</p>
              <p className="text-slate-500 text-sm">Free to Use</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-600">0</p>
              <p className="text-slate-500 text-sm">Sign-up Required</p>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-4">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['magic 8 ball', 'spin wheel', 'yes no oracle', 'random picker', 'coin flip'].map((term) => (
                <span
                  key={term}
                  className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-6 text-center text-slate-400 text-sm border-t border-slate-200">
          <p>Let the magic guide your decisions • Free forever</p>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

export default LandingPage;