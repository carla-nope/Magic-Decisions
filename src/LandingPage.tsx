import { Sparkles, RefreshCw, Circle, CircleDot, Lightbulb, UtensilsCrossed, Hand, User, Star, ArrowRight, Zap, Globe, Wand2, Shirt, Brain, Target, CreditCard, Flame, Dices, Monitor } from 'lucide-react'
import './index.css'

const tools = [
  { id: 'oracle',  name: 'Yes No Oracle',        icon: Sparkles,       color: 'teal',    emoji: '🔮', description: 'Ask the mystical crystal ball for yes or no answers',          keyword: 'magic 8 ball online' },
  { id: 'd20',     name: 'D20 Roller',            icon: Dices,          color: 'gold',    emoji: '🎲', description: 'Roll a 20-sided die for games, prompts, and playful decisions', keyword: 'D20 roller online' },
  { id: 'spin',    name: 'Spin Wheel',            icon: RefreshCw,     color: 'gold',    emoji: '🎡', description: 'Create a custom wheel and let it decide for you',                 keyword: 'wheel spinner' },
  { id: 'rps',     name: 'Rock Paper Scissors',   icon: Hand,           color: 'coral',   emoji: '✂️', description: 'Battle the computer in classic RPS',                             keyword: 'rock paper scissors game' },
  { id: 'coin',    name: 'Coin Flip',             icon: Circle,         color: 'teal',    emoji: '🪙', description: 'Heads or tails? Let fate decide',                                  keyword: 'coin flip simulator' },
  { id: 'picker',  name: 'Random Picker',         icon: CircleDot,      color: 'teal',    emoji: '🎯', description: 'Add options and pick one randomly',                                  keyword: 'decision maker' },
  { id: 'activity',name: 'Activity Picker',       icon: Lightbulb,      color: 'gold',    emoji: '💡', description: 'Find your next activity or hobby',                                keyword: 'what should I do today' },
  { id: 'dinner',  name: 'Dinner Decider',        icon: UtensilsCrossed,color: 'coral',   emoji: '🍽️', description: 'Decide what to eat for your next meal',                               keyword: 'what should I eat' },
  { id: 'username',name: 'Username Picker',       icon: Wand2,          color: 'teal',    emoji: '✨', description: "Can't decide on a username? Let fate choose for you!",               keyword: 'username picker' },
  { id: 'outfit',  name: 'Outfit Picker',         icon: Shirt,          color: 'coral',   emoji: '👗', description: "Can't decide what to wear? Let the magic choose!",                 keyword: 'outfit picker' },
  { id: 'names',   name: 'Name Picker',           icon: User,           color: 'coral',   emoji: '👤', description: 'Randomly pick names or assign teams',                             keyword: 'random name picker' },
  { id: 'chores',  name: 'Magic Chores',          icon: Flame,          color: 'coral',   emoji: '🔥', description: 'Gamify your tasks with magical rewards',                         keyword: 'chore tracker' },
  { id: 'screentime',name: 'Screen Time Swap',     icon: Monitor,        color: 'teal',    emoji: '🖥️', description: 'Trade screen time for real-world adventures',                      keyword: 'screen time swap' },
  { id: 'maximizer',name: 'Decision Style Quiz',  icon: Brain,          color: 'teal',    emoji: '🧠', description: 'Are you a Maximizer or Satisficer?',                             keyword: 'decision making style quiz' },
  { id: 'bias',    name: 'Cognitive Bias Test',   icon: Target,         color: 'gold',    emoji: '🎯', description: 'Test your awareness of mental shortcuts',                        keyword: 'cognitive bias test' },
  { id: 'buyit',   name: 'Should I Buy It?',       icon: CreditCard,     color: 'teal',    emoji: '🛒', description: 'Make smarter purchasing decisions',                              keyword: 'should I buy it calculator' },
]

// Warm color mapping for tool cards
const toolColors: Record<string, { bg: string; border: string; text: string; hover: string; icon: string }> = {
  teal:  { bg: 'bg-secondary/10',   border: 'border-secondary/20',   text: 'text-secondary-600', hover: 'hover:border-secondary-400 hover:bg-secondary/10', icon: 'bg-secondary/10' },
  gold:  { bg: 'bg-primary/10',     border: 'border-primary/20',     text: 'text-primary-600',   hover: 'hover:border-primary-400 hover:bg-primary/10',   icon: 'bg-primary/10' },
  coral: { bg: 'bg-highlight/10',   border: 'border-highlight/20',   text: 'text-highlight-500', hover: 'hover:border-highlight-400 hover:bg-highlight/10', icon: 'bg-highlight/10' },
}

function LandingPage({ onSelectTool }: { onSelectTool: (toolId: any) => void }) {

  const toolMapping: Record<string, string> = {
    'Yes No Oracle': 'oracle', 'D20 Roller': 'd20', 'Spin Wheel': 'spin',
    'Rock Paper Scissors': 'rps', 'Coin Flip': 'coin', 'Random Picker': 'picker',
    'Activity Picker': 'activity', 'Dinner Decider': 'dinner', 'Username Picker': 'username',
    'Outfit Picker': 'outfit', 'Name Picker': 'names', 'Magic Chores': 'chores',
    'Screen Time Swap': 'screentime', 'Decision Style Quiz': 'maximizer',
    'Cognitive Bias Test': 'bias', 'Should I Buy It': 'buyit',
  }

  return (
    <>
      <div className="min-h-screen relative">
        <div className="stars-bg" />
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-5xl">🔮</span>
                <span className="text-4xl font-bold font-display text-ink-800">Magic Decisions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4 text-ink-800">
                Decide Anything in Seconds
              </h1>
              <p className="text-[#6B5E4E] text-lg md:text-xl max-w-2xl mx-auto mb-6">
                Free online decision-making tools. Spins, picks, and choices — all in one place.
              </p>
              <div className="flex items-center justify-center gap-2 text-[#A09080] text-sm">
                <Zap className="w-4 h-4 text-primary-400" />
                <span>16 free tools</span>
                <span>•</span>
                <Globe className="w-4 h-4" />
                <span>Works everywhere</span>
                <span>•</span>
                <Star className="w-4 h-4 text-primary-400" />
                <span>No signup needed</span>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="w-full max-w-5xl">
              <h2 className="text-xl font-semibold font-display text-ink-800 mb-6 text-center">
                Choose a Tool
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => {
                  const Icon = tool.icon
                  const c = toolColors[tool.color]
                  return (
                    <button
                      key={tool.id}
                      onClick={() => onSelectTool(tool.id as any)}
                      className={`tool-card text-left group`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${c.icon} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <span className="text-2xl">{tool.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold font-display text-ink-800 mb-1">{tool.name}</h3>
                          <p className="text-[#6B5E4E] text-sm line-clamp-2 mb-3">{tool.description}</p>
                          <div className={`inline-flex items-center gap-1 text-xs ${c.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                            <span className="capitalize">{tool.keyword}</span>
                            <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="mt-16" />
        </div>

        {/* How It Helps Section */}
        <div id="how-it-helps" className="w-full px-4 py-16 scroll-mt-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-ink-800">
                How Magic Decisions Helps You Choose
              </h2>
              <p className="text-[#6B5E4E] max-w-2xl mx-auto">
                We all face decision fatigue. When daily choices pile up—from what to eat to what activity to try—our ability to make good decisions decreases. Magic Decisions exists to lift that burden.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { emoji: '🧠', color: 'teal',  title: 'What is Decision Fatigue?', body: 'Every day, you make thousands of choices. Research shows that after making many decisions, your brain gets tired and starts taking shortcuts—leading to impulsive or poor choices. That\'s why "I don\'t know what to eat" feels so exhausting.' },
                { emoji: '🎲', color: 'gold',  title: 'When to Use Random Tools', body: 'Not every decision needs deep analysis. For low-stakes choices like "what game to play" or "which restaurant to try," randomization can break analysis paralysis. The goal isn\'t perfect choices—it\'s freeing your mental energy for decisions that really matter.' },
                { emoji: '✨', color: 'teal',  title: 'Our Approach', body: 'We combine randomization with smart categorization. Whether it\'s 10 cuisine types for dinner or 80 activities for fun, our tools help you explore options without the stress. No account needed, no data stored—just instant decisions.' },
              ].map((card, i) => (
                <div key={i} className="mystical-card p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${toolColors[card.color].icon} flex items-center justify-center`}>
                    <span className="text-3xl">{card.emoji}</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-ink-800 mb-3">{card.title}</h3>
                  <p className="text-[#6B5E4E] text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Real Examples */}
            <div className="mystical-card p-8 mb-8 mx-auto max-w-3xl">
              <h3 className="text-xl font-bold font-display text-ink-800 mb-6 text-center">Real Examples of When to Use Magic Decisions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { emoji: '🍽️', color: 'coral', title: 'Food Decisions', body: '"I want pizza tonight but also sushi..." Use the Dinner Decider to pick from 10 cuisines, or add your own favorites. No more food paralysis at 6pm.' },
                  { emoji: '💡', color: 'gold',  title: 'Activity Ideas', body: '"I\'m bored but I don\'t know what to do..." Browse 80+ activities across 8 categories. Perfect for rainy days, family time, or finding a new hobby.' },
                  { emoji: '👥', color: 'coral', title: 'Group Fairness', body: '"Who goes first?" or "How do we split teams?" Use the Name Picker to randomly assign or the Spin Wheel to let fate decide. Everyone sees it\'s fair.' },
                  { emoji: '🎮', color: 'teal',  title: 'Quick Games', body: '"Let\'s settle this with Rock Paper Scissors!" Go beyond paper—use the Coin Flip for binary choices or build custom wheels for game night.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${toolColors[item.color].icon} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-2xl">{item.emoji}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold font-display text-ink-800 mb-1">{item.title}</h4>
                      <p className="text-[#6B5E4E] text-sm">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* When to Use Each Tool */}
            <div className="mb-8">
              <h3 className="text-xl font-bold font-display text-ink-800 mb-6 text-center">When to Use Each Tool</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto max-w-5xl">
                {[
                  { emoji: '🔮', name: 'Yes No Oracle',        use: 'Simple yes/no decisions with mystical flair' },
                  { emoji: '🎲', name: 'D20 Roller',           use: 'Games, prompts, and playful decisions' },
                  { emoji: '🎡', name: 'Spin Wheel',           use: 'Multi-option choices with visual excitement' },
                  { emoji: '✂️', name: 'Rock Paper Scissors',  use: 'Settle disputes with quick games' },
                  { emoji: '🪙', name: 'Coin Flip',            use: 'Binary 50/50 decisions' },
                  { emoji: '🎯', name: 'Random Picker',        use: 'Pick one from your custom list' },
                  { emoji: '💡', name: 'Activity Picker',      use: 'Find something fun to do' },
                  { emoji: '🍽️', name: 'Dinner Decider',       use: 'Decide what to eat' },
                  { emoji: '✨', name: 'Username Picker',      use: 'Pick unique handles for social' },
                  { emoji: '👗', name: 'Outfit Picker',       use: 'Decide what to wear' },
                  { emoji: '👤', name: 'Name Picker',         use: 'Random selection or team assignment' },
                  { emoji: '🔥', name: 'Magic Chores',        use: 'Gamify tasks with magic rewards' },
                  { emoji: '🖥️', name: 'Screen Time Swap',    use: 'Trade screen time for real-world fun' },
                  { emoji: '🧠', name: 'Decision Style Quiz',  use: 'Discover your decision style' },
                  { emoji: '🎯', name: 'Cognitive Bias Test', use: 'Test your mental shortcuts' },
                  { emoji: '🛒', name: 'Should I Buy It',      use: 'Make smarter purchases' },
                ].map((tool) => (
                  <button
                    key={tool.name}
                    onClick={() => onSelectTool(toolMapping[tool.name] as any)}
                    className="tool-card p-4 text-center hover:shadow-warm-gold transition-all cursor-pointer"
                  >
                    <span className="text-2xl mb-2 block">{tool.emoji}</span>
                    <h4 className="font-semibold font-display text-ink-800 text-sm mb-1">{tool.name}</h4>
                    <p className="text-[#6B5E4E] text-xs">{tool.use}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center gap-8 py-6 border-y border-cream-300 mt-12">
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-secondary-500">16</p>
              <p className="text-[#A09080] text-sm">Decision Tools</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-primary-500">500+</p>
              <p className="text-[#A09080] text-sm">Options to Choose From</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-primary-500">100%</p>
              <p className="text-[#A09080] text-sm">Free to Use</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold font-display text-secondary-500">0</p>
              <p className="text-[#A09080] text-sm">Sign-up Required</p>
            </div>
          </div>

          {/* Footer */}
          <div className="py-6 text-center text-[#A09080] text-sm border-t border-cream-300 mt-12">
            <p>Let the magic guide your decisions • Free forever</p>
          </div>
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
  )
}

export default LandingPage