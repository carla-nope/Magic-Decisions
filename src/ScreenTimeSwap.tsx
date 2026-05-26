import { useState, useCallback } from 'react'
import { Monitor, Clock, ArrowRight, RotateCcw, Sparkles, ChevronRight, Info, AlertCircle, Lightbulb } from 'lucide-react'
import { useTheme } from './contexts/ThemeContext'
import { playMagicChime } from './lib/sounds'
import './index.css'

interface ScreenSwapOption {
  id: string
  title: string
  icon: string
  description: string
  kidDefinition: string
  examples: string[]
}

const screenSwapOptions: ScreenSwapOption[] = [
  {
    id: 'walk',
    title: 'Nature Walk',
    icon: '🌳',
    description: 'Explore outdoors and discover something new',
    kidDefinition: 'A walk outside where you look at trees, bugs, birds, and interesting things in nature — without a screen in your hand!',
    examples: [
      'Walk around your yard or a nearby park and find 5 different leaves',
      'Count how many birds you can spot in 15 minutes',
      'Look for interesting rocks, sticks, or flowers to collect'
    ]
  },
  {
    id: 'read',
    title: 'Reading Time',
    icon: '📚',
    description: 'Cozy up with a favorite book',
    kidDefinition: 'Sitting quietly with a book, graphic novel, or magazine — using your imagination to picture the story!',
    examples: [
      'Read a chapter of your current book or start a new adventure',
      'Find a book about something you love — dinosaurs, space, animals, sports',
      'Read aloud to a parent or sibling for extra fun'
    ]
  },
  {
    id: 'boardgame',
    title: 'Board Game',
    icon: '🎲',
    description: 'Fun for the whole family',
    kidDefinition: 'Playing a tabletop game with pieces you move around a board — takes turns, follows rules, and tries to win!',
    examples: [
      'Play Candy Land, UNO, or Monopoly Junior with family',
      'Try a strategy game like Connect 4 or chess',
      'Make up your own board game with paper and crayons'
    ]
  },
  {
    id: 'art',
    title: 'Art & Crafts',
    icon: '🎨',
    description: 'Get creative with art supplies',
    kidDefinition: 'Making something with your hands — drawing, painting, building, cutting, gluing — whatever your imagination wants!',
    examples: [
      'Draw a picture of your favorite animal or place',
      'Make a craft from things you find around the house',
      'Create a card or gift for someone in your family'
    ]
  },
  {
    id: 'cooking',
    title: 'Cook Together',
    icon: '🍳',
    description: 'Make a delicious snack or meal',
    kidDefinition: 'Helping in the kitchen to prepare food — stirring, mixing, chopping (with help!), and tasting what you make!',
    examples: [
      'Make a peanut butter sandwich or trail mix',
      'Help a parent make dinner — stir the pot or wash veggies',
      'Bake cookies and decorate them when they cool'
    ]
  },
  {
    id: 'puzzle',
    title: 'Puzzle Time',
    icon: '🧩',
    description: 'Solve a puzzle together',
    kidDefinition: 'Putting together a jigsaw puzzle or solving a brain teaser — fits pieces together until the picture is complete!',
    examples: [
      'Work on a 100-piece puzzle at the kitchen table',
      'Try a 3D puzzle or a Rubik\'s cube',
      'Do a crossword or word search puzzle from a book'
    ]
  },
  {
    id: 'music',
    title: 'Music Jam',
    icon: '🎵',
    description: 'Dance, sing, or play instruments',
    kidDefinition: 'Making or listening to music — singing songs, dancing around, or playing a musical instrument!',
    examples: [
      'Have a dance party with your favorite songs',
      'Play an instrument like a keyboard, guitar, or drums',
      'Sing along to music and make up silly dance moves'
    ]
  },
  {
    id: 'garden',
    title: 'Garden Time',
    icon: '🌱',
    description: 'Tend to plants or flowers',
    kidDefinition: 'Taking care of plants — watering flowers, planting seeds, digging in dirt, or watching things grow!',
    examples: [
      'Water the houseplants or tend a backyard garden',
      'Plant a seed in a cup and watch it sprout over time',
      'Pull weeds or help a parent in the yard'
    ]
  },
  {
    id: 'playground',
    title: 'Playground',
    icon: '🛝',
    description: 'Run, climb, and have fun',
    kidDefinition: 'Playing at a playground with swings, slides, climbing walls, and open space to run and move your body!',
    examples: [
      'Go to a local park and try every piece of equipment',
      'Play tag or freeze tag with friends',
      'Climb, swing, and race around to burn energy'
    ]
  },
  {
    id: 'cards',
    title: 'Card Games',
    icon: '🃏',
    description: 'Classic card game fun',
    kidDefinition: 'Playing games using a deck of cards — like War, Go Fish, Crazy Eights, or making up your own rules!',
    examples: [
      'Play War or Go Fish with a sibling or parent',
      'Learn a new card game like Slapjack or Speed',
      'Use cards to practice math — add, subtract, or multiply!'
    ]
  },
  {
    id: 'lego',
    title: 'Build with LEGO',
    icon: '🏗️',
    description: 'Build something amazing',
    kidDefinition: 'Using LEGO bricks to build anything you can imagine — towers, cars, creatures, whole worlds made from tiny pieces!',
    examples: [
      'Follow the instructions for a LEGO set you haven\'t built yet',
      'Build the tallest tower you can and try to balance things on top',
      'Create a scene from a movie or book you love'
    ]
  },
  {
    id: 'biking',
    title: 'Bike Ride',
    icon: '🚴',
    description: 'Get some exercise together',
    kidDefinition: 'Riding a bicycle — feel the wind, go fast, explore your neighborhood, and get exercise at the same time!',
    examples: [
      'Ride around the block or on a bike path nearby',
      'Race a sibling or parent to the end of the street',
      'Explore a new trail or path you haven\'t tried before'
    ]
  },
  {
    id: 'stargaze',
    title: 'Stargazing',
    icon: '🌟',
    description: 'Look at the night sky',
    kidDefinition: 'Looking up at the stars and sky — spotting constellations, watching for satellites, or just noticing how beautiful the night is!',
    examples: [
      'Find the Big Dipper and Little Dipper constellations',
      'Watch for shooting stars during a meteor shower',
      'Notice the moon\'s shape and any bright planets'
    ]
  },
  {
    id: 'science',
    title: 'Science Fun',
    icon: '🔬',
    description: 'Do a simple experiment',
    kidDefinition: 'Doing hands-on science activities — mixing things, building machines, or testing ideas to see what happens!',
    examples: [
      'Make a volcano with baking soda and vinegar',
      'Build a paper bridge and test how much weight it holds',
      'Grow crystals on a string or watch how plants drink water'
    ]
  },
  {
    id: 'dramatic',
    title: 'Pretend Play',
    icon: '🎭',
    description: 'Act out a story together',
    kidDefinition: 'Making up stories and acting them out — pretend to be characters, use costumes, build forts, and let your imagination run!',
    examples: [
      'Put on a play with stuffed animals as the audience',
      'Build a blanket fort and put on a show inside',
      'Pretend to be astronauts, doctors, explorers, or favorite characters'
    ]
  },
  {
    id: 'outdoor',
    title: 'Scavenger Hunt',
    icon: '🔍',
    description: 'Find hidden treasures',
    kidDefinition: 'Searching for specific things in nature or around the house — like a detective looking for clues!',
    examples: [
      'Find 10 different colored leaves in your neighborhood',
      'Search for things that start with each letter of the alphabet',
      'Look for specific bugs, birds, or flowers on a nature walk'
    ]
  },
]

const screenTimeAmounts = [
  { minutes: 15, label: '15 min' },
  { minutes: 30, label: '30 min' },
  { minutes: 45, label: '45 min' },
  { minutes: 60, label: '1 hour' },
  { minutes: 90, label: '1.5 hours' },
  { minutes: 120, label: '2 hours' },
]

// Use cases
const USE_CASES = [
  { icon: <Monitor className="w-5 h-5" />, title: 'Screen Time Balance', description: 'Help kids swap passive screen time for active, creative, or social experiences.' },
  { icon: <Lightbulb className="w-5 h-5" />, title: 'New Activity Discovery', description: 'Introduce kids to hobbies and activities they might not try on their own.' },
  { icon: <Info className="w-5 h-5" />, title: 'Parenting Made Easier', description: 'When kids are bickering over "what to do," let the wheel pick and remove the negotiation.' },
]

// Related tools
const RELATED_TOOLS = [
  { name: 'Spin Wheel', description: 'Create a custom wheel for any decision', id: 'spin', emoji: '🎡' },
  { name: 'Activity Picker', description: 'Find your next fun activity', id: 'activity', emoji: '💡' },
  { name: 'Magic Chores', description: 'Gamify tasks with magical rewards', id: 'chores', emoji: '🔥' },
  { name: 'Random Picker', description: 'Add your own options and pick one randomly', id: 'picker', emoji: '🎯' },
]

interface ScreenTimeSwapProps {
  onNavigate: (toolId: string) => void
}

export default function ScreenTimeSwap({ onNavigate }: ScreenTimeSwapProps) {
  const { soundEnabled } = useTheme()
  const [selectedMinutes, setSelectedMinutes] = useState(screenTimeAmounts[1])
  const [currentSwap, setCurrentSwap] = useState<ScreenSwapOption | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [swapHistory, setSwapHistory] = useState<{ option: ScreenSwapOption; minutes: number }[]>([])
  const [showExamples, setShowExamples] = useState(false)

  const handleSpin = useCallback(() => {
    if (isSpinning) return

    setIsSpinning(true)
    setCurrentSwap(null)
    setShowExamples(false)

    if (soundEnabled) {
      playMagicChime()
    }

    const spinDuration = 1500
    const spinInterval = 100
    let elapsed = 0

    const interval = setInterval(() => {
      elapsed += spinInterval
      const randomOption = screenSwapOptions[Math.floor(Math.random() * screenSwapOptions.length)]
      setCurrentSwap(randomOption)

      if (elapsed >= spinDuration) {
        clearInterval(interval)
        const finalOption = screenSwapOptions[Math.floor(Math.random() * screenSwapOptions.length)]
        setCurrentSwap(finalOption)
        setIsSpinning(false)
        setSwapHistory(prev => [{ option: finalOption, minutes: selectedMinutes.minutes }, ...prev].slice(0, 10))
      }
    }, spinInterval)
  }, [isSpinning, soundEnabled, selectedMinutes])

  const clearHistory = () => setSwapHistory([])

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#A09080] mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-highlight-500 transition-colors">Home</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-ink-800 font-medium">Screen Time Swap</span>
        </div>

        {/* Hero Section */}
        <div className="w-full max-w-2xl mb-12">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
              <Monitor className="w-4 h-4" />
              Screen Time Manager
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
              Screen Time Swap
            </h1>
            <p className="text-[#6B5E4E] max-w-md mx-auto text-center">
              Trade screen time for real-world adventures! Pick how much time and spin for an activity.
            </p>
          </div>

          {/* Tool Card */}
          <div className="mystical-card p-8 text-center">
            <p className="text-[#6B5E4E] text-sm mb-6">
              Can't decide what to do instead of screens? Pick how much screen time you want to swap and let the magic choose a fun activity for you!
            </p>

            {/* Amount Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-ink-800 mb-3">
                How much screen time are you swapping?
              </label>
              <div className="flex flex-wrap justify-center gap-2">
                {screenTimeAmounts.map((amount) => (
                  <button
                    key={amount.minutes}
                    onClick={() => setSelectedMinutes(amount)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm font-medium ${
                      selectedMinutes.minutes === amount.minutes
                        ? 'border-secondary-400 bg-secondary/10 text-secondary-400'
                        : 'border-cream-300 bg-cream-50 text-[#6B5E4E] hover:border-secondary-400'
                    }`}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Display */}
            <div className="relative mb-8">
              <div className={`w-64 h-64 rounded-full bg-secondary/10 border-4 border-cream-300 flex items-center justify-center mx-auto ${isSpinning ? 'animate-pulse' : ''}`}>
                {currentSwap ? (
                  <div className="text-center animate-fade-in">
                    <span className="text-6xl mb-2 block">{currentSwap.icon}</span>
                    <h3 className="font-bold font-display text-ink-800 text-lg">{currentSwap.title}</h3>
                  </div>
                ) : (
                  <div className="text-center text-[#A09080]">
                    <Clock className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Spin to pick an activity</p>
                  </div>
                )}
              </div>

              {currentSwap && !isSpinning && (
                <div className="absolute inset-0 rounded-full bg-secondary-400/20 blur-xl -z-10 animate-pulse" />
              )}
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="mystical-btn flex items-center gap-2 mx-auto disabled:opacity-70"
            >
              {isSpinning ? (
                <>
                  <RotateCcw className="w-5 h-5 animate-spin" />
                  Swapping...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {currentSwap ? 'Swap Again' : `Swap ${selectedMinutes.minutes} Min for an Activity`}
                </>
              )}
            </button>

            {/* Kid-Friendly Definition & Examples */}
            {currentSwap && !isSpinning && (
              <div className="mt-8 space-y-4 animate-fade-in">
                {/* What is this? */}
                <div className="p-4 bg-cream-100 border border-cream-300 rounded-2xl text-left">
                  <p className="text-ink-800 text-sm">
                    <span className="font-semibold text-secondary-400">What is it?</span> {currentSwap.kidDefinition}
                  </p>
                </div>

                {/* Examples Toggle */}
                <div className="text-left">
                  <button
                    onClick={() => setShowExamples(!showExamples)}
                    className="text-sm text-secondary-400 hover:text-secondary-400 font-medium flex items-center gap-1"
                  >
                    {showExamples ? 'Hide examples' : 'Show examples of what this looks like'}
                    <ChevronRight className={`w-4 h-4 transition-transform ${showExamples ? 'rotate-90' : ''}`} />
                  </button>
                  {showExamples && (
                    <ul className="mt-3 space-y-2">
                      {currentSwap.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#6B5E4E] text-sm">
                          <span className="text-highlight-500 mt-0.5">→</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Swap Summary */}
                <div className="mystical-card p-5 bg-cream-50 border border-cream-300">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Monitor className="w-6 h-6 text-secondary-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-[#6B5E4E]">Instead of</p>
                      <p className="font-semibold text-ink-800">{selectedMinutes.label} screen time</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center my-2">
                    <ArrowRight className="w-5 h-5 text-highlight-500" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-3xl">
                      {currentSwap.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm text-[#6B5E4E]">Try this instead</p>
                      <p className="font-semibold text-ink-800">{currentSwap.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* History */}
          {swapHistory.length > 0 && (
            <div className="w-full max-w-md mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold font-display text-ink-800">Recent Swaps</h3>
                <button
                  onClick={clearHistory}
                  className="text-sm text-[#A09080] hover:text-[#6B5E4E]"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2">
                {swapHistory.map((item, idx) => (
                  <div key={idx} className="mystical-card p-3 flex items-center gap-3">
                    <span className="text-2xl">{item.option.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-ink-800">{item.option.title}</p>
                      <p className="text-xs text-[#A09080]">{item.minutes} min traded</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Use Cases Section */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold font-display text-ink-800 mb-6 text-center">
            Why Use Screen Time Swap?
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {USE_CASES.map((useCase, index) => (
              <div key={index} className="mystical-card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary-400">{useCase.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-800 mb-1">{useCase.title}</h3>
                    <p className="text-[#6B5E4E] text-sm">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips for Parents Section */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-8 bg-cream-50 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Tips for Screen Time Swaps
            </h2>
            <ul className="space-y-2 text-[#6B5E4E] text-sm">
              <li className="flex items-start gap-2">
                <span className="text-highlight-500">✨</span>
                <span>Let kids pick from the wheel themselves — ownership increases cooperation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight-500">✨</span>
                <span>Make the swap feel like an exciting trade, not a punishment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight-500">✨</span>
                <span>Join in! Parents who participate create stronger family bonds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-highlight-500">✨</span>
                <span>Build up to longer activities gradually — start with 15 minutes</span>
              </li>
            </ul>
            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-cream-300 rounded-xl mt-4">
              <AlertCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <p className="text-[#6B5E4E] text-sm">
                The goal isn't to take away fun — it's to add more fun! Screen time and real-world activities can both be part of a healthy day.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold font-display text-ink-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="mystical-card p-4 text-center transition-all cursor-pointer bg-transparent"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#6B5E4E] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-8 text-center bg-cream-50 border border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
              Want Help Balancing Screen Time?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Screen Time Balance Guide with tips, age-appropriate guidelines, and swap ideas the whole family will love.
            </p>
            <a
              href="https://go.magicdecisions.com/st1"
              target="_blank"
              rel="noopener noreferrer"
              className="mystical-btn inline-flex items-center gap-2"
            >
              Get the Free Screen Time Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="h-24" />
      </div>
    </div>
  )
}
