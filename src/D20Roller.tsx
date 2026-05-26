import { useState, useCallback } from 'react'
import { Dices, RefreshCw, Sparkles, ArrowRight, Lightbulb, Users, BookOpen, PenTool, Home, AlertCircle } from 'lucide-react'
import SEOContent from './SEOContent'
import { playD20Roll, playFanfare } from './lib/sounds'
import './index.css'

// Decision prompts mapped to 1-20
const DECISION_PROMPTS: Record<number, string> = {
  1: 'Pick the option that is easiest to start.',
  2: 'Choose the option that takes less than 10 minutes.',
  3: 'Ask: "What would make this choice feel smaller?"',
  4: 'Choose the option that helps someone else.',
  5: 'Pick the option that sounds more fun right now.',
  6: 'Choose the option you would be proud to finish.',
  7: 'Try the choice that teaches you something new.',
  8: 'Pick the option that future-you might appreciate.',
  9: 'Choose the calmer option if both choices are okay.',
  10: 'Flip the question: what would you not choose?',
  11: 'Pick the option that gets you moving.',
  12: 'Choose the option that uses what you already have.',
  13: 'Ask someone to give you two choices, then pick one.',
  14: 'Choose the brave-but-small option.',
  15: 'Pick the option you can explain in one sentence.',
  16: 'Choose the option that makes the next step clearer.',
  17: 'Try the option you have been avoiding, if it is safe and low-stakes.',
  18: 'Pick the option that feels most like practice, not pressure.',
  19: 'Choose the option that helps you learn what you like.',
  20: 'Make the choice, celebrate it, and move forward.',
}

// Use cases for the page
const USE_CASES = [
  { icon: <Dices className="w-5 h-5" />, title: 'Tabletop Games', description: 'Roll for initiative, skill checks, or any game that needs a D20.' },
  { icon: <Users className="w-5 h-5" />, title: 'Family Game Night', description: 'Add playful randomness to board games and family activities.' },
  { icon: <BookOpen className="w-5 h-5" />, title: 'Classroom Activities', description: 'Make learning engaging with dice-based activities and random selection.' },
  { icon: <Sparkles className="w-5 h-5" />, title: 'Homeschool Decision Practice', description: 'Help kids practice making choices with low-pressure prompts.' },
  { icon: <PenTool className="w-5 h-5" />, title: 'Writing and Drawing Prompts', description: 'Use the number as a creative spark for stories, art, or challenges.' },
  { icon: <Home className="w-5 h-5" />, title: 'Chore or Activity Picking', description: 'Let the dice decide who does what, making tasks feel more playful.' },
]

// Related tools for the page
const RELATED_TOOLS = [
  { name: 'Coin Flip', description: 'Heads or tails? Let fate decide', id: 'coin', emoji: '🪙' },
  { name: 'Spin Wheel', description: 'Create a custom wheel for multi-option decisions', id: 'spin', emoji: '🎡' },
  { name: 'Magic Chores', description: 'Gamify your tasks with magical rewards', id: 'chores', emoji: '🔥' },
  { name: 'Random Picker', description: 'Add your own options and pick one randomly', id: 'picker', emoji: '🎯' },
]

interface D20RollerProps {
  onNavigate: (toolId: string) => void
}

export default function D20Roller({ onNavigate }: D20RollerProps) {
  const [result, setResult] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [hasRolled, setHasRolled] = useState(false)

  const rollD20 = useCallback(() => {
    setIsRolling(true)
    setHasRolled(true)

    // Play dice roll sound
    playD20Roll()

    // Quick animation cycle through numbers
    let cycles = 0
    const maxCycles = 8
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 20) + 1)
      cycles++
      if (cycles >= maxCycles) {
        clearInterval(interval)
        const finalResult = Math.floor(Math.random() * 20) + 1
        setResult(finalResult)
        setIsRolling(false)
        // Play fanfare for natural 20
        if (finalResult === 20) {
          playFanfare()
        }
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const getPrompt = (num: number): string => {
    return DECISION_PROMPTS[num] || ''
  }

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Hero Section with Tool */}
        <div className="w-full max-w-2xl mb-12">
          {/* Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cream-300 text-primary-400 text-sm mb-4">
              <Dices className="w-4 h-4" />
              Free Online Tool
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
              D20 Roller
            </h1>
            <p className="text-[#A09080] max-w-md mx-auto text-center">
              Roll a free online D20 for games, classroom activities, creative prompts, family fun, and playful decisions.
            </p>
          </div>

          {/* Tool Card */}
          <div className="mystical-card p-8 text-center">
            <p className="text-[#6B5E4E] text-sm mb-6">
              Use this 20-sided dice roller when you need a quick number, a game roll, a prompt, or a playful nudge. Click Roll D20 and let the number give you a simple next step.
            </p>

            {/* Dice Display */}
            <div className="mb-8">
              <div className={`dice-result ${isRolling ? 'rolling' : ''}`}>
                {result ? (
                  <span className="result-number">{result}</span>
                ) : (
                  <span className="text-[#A09080] text-2xl">?</span>
                )}
              </div>
              {result && !isRolling && (
                <p className="text-primary-400 font-medium mt-3">
                  Roll: {result}
                </p>
              )}
            </div>

            {/* Roll Button */}
            <button
              onClick={rollD20}
              disabled={isRolling}
              className="mystical-btn flex items-center gap-2 mx-auto disabled:opacity-70"
            >
              {isRolling ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Rolling...
                </>
              ) : (
                <>
                  <Dices className="w-5 h-5" />
                  {hasRolled ? 'Roll Again' : 'Roll D20'}
                </>
              )}
            </button>

            {/* Decision Prompt */}
            {result && !isRolling && (
              <div className="mt-8 p-4 bg-secondary/10 border border-cream-300 rounded-2xl animate-fade-in">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" />
                  <p className="text-ink-800 text-left">
                    <span className="font-semibold">Decision Prompt:</span> {getPrompt(result)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-bold font-display text-ink-800 mb-6 text-center">
            Ways to Use This D20 Roller
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((useCase, index) => (
              <div key={index} className="mystical-card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-400">{useCase.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-ink-800 mb-1">{useCase.title}</h3>
                    <p className="text-[#A09080] text-sm">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Parent/Family Angle Section */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-8 bg-secondary/10 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use the D20 to Make Small Choices Feel Easier
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              Sometimes a random roll can make a small decision feel lighter. Use the D20 when the choice is low-stakes, safe, and flexible — like choosing a family activity, picking a writing prompt, deciding chore order, or practicing quick choices. The goal is not to let the dice make every decision. The goal is to make decision-making feel more playful and less stuck.
            </p>
            <div className="flex items-start gap-2 p-3 bg-primary/10 border border-cream-300 rounded-lg">
              <AlertCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <p className="text-[#6B5E4E] text-sm text-left">
                For big, personal, financial, medical, or safety-related decisions, use thoughtful judgment and trusted guidance instead of a randomizer.
              </p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-bold font-display text-ink-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="mystical-card p-4 text-center hover:border-cream-300 transition-all cursor-pointer bg-transparent"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-bold font-display text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#A09080] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-8 text-center bg-secondary/10 border border-cream-300">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-cream-50 rounded-full font-semibold transition-all shadow-lg hover:shadow-primary/30"
            >
              Get the Free Decision Traps Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-24" />
      </div>

      {/* Inline styles for dice animation */}
      <style>{`
        .dice-result {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 160px;
          height: 160px;
          margin: 0 auto;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          border-radius: 24px;
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.2),
            inset 0 2px 4px rgba(255, 255, 257, 0.1),
            inset 0 -2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.1s ease;
        }

        .dice-result.rolling {
          animation: diceShake 0.1s ease-in-out infinite;
        }

        .dice-result .result-number {
          font-size: 4rem;
          font-weight: 800;
          color: #fbbf24;
          text-shadow:
            0 2px 4px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(251, 191, 36, 0.5);
        }

        @keyframes diceShake {
          0%, 100% { transform: rotate(-2deg) scale(1.02); }
          50% { transform: rotate(2deg) scale(0.98); }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
