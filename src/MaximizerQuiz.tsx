import { useState, useCallback } from 'react'
import { Brain, Sparkles, RefreshCw, Share2, Copy, Check, Target, ArrowRight, TrendingUp } from 'lucide-react'
import './index.css'

interface Question {
  id: number;
  text: string;
  maximizerOption: string;
  satisficerOption: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "You're buying a new laptop. What do you do?",
    maximizerOption: "Spend weeks researching every model, reading reviews, comparing specs across 20+ options",
    satisficerOption: "Find one that meets your needs, has good reviews, and buy it"
  },
  {
    id: 2,
    text: "Your friend asks where to eat. You...",
    maximizerOption: "Research all nearby restaurants, check ratings, menus, and wait times to find the 'best' option",
    satisficerOption: "Suggest your usual spot or pick somewhere that looks good nearby"
  },
  {
    id: 3,
    text: "How do you choose a movie to watch?",
    maximizerOption: "Scroll through streaming services for an hour trying to find the 'perfect' movie",
    satisficerOption: "Pick something that looks decent and start watching"
  },
  {
    id: 4,
    text: "When shopping for clothes, you...",
    maximizerOption: "Visit multiple stores, try on many options, and search for the ideal piece",
    satisficerOption: "Grab what looks good and fits, then move on"
  },
  {
    id: 5,
    text: "You're planning a weekend trip. You...",
    maximizerOption: "Research extensively, compare prices, read dozens of reviews, plan every detail",
    satisficerOption: "Book somewhere that looks good and figure out details later"
  },
  {
    id: 6,
    text: "At a restaurant, you...",
    maximizerOption: "Read the entire menu carefully, ask questions, sometimes change your mind mid-order",
    satisficerOption: "Have a go-to order or pick something quickly based on your usual preferences"
  },
  {
    id: 7,
    text: "How do you pick a Netflix show?",
    maximizerOption: "Spend 20+ minutes browsing, reading descriptions, checking ratings before committing",
    satisficerOption: "Pick something within 5 minutes and commit to it"
  },
  {
    id: 8,
    text: "When making a purchase decision, you...",
    maximizerOption: "Need to be confident this is the best option available before buying",
    satisficerOption: "Need only to be confident this option will work well enough"
  },
]

interface MaximizerQuizProps {
  onNavigate?: (toolId: string) => void
}

function MaximizerQuiz({ onNavigate }: MaximizerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAnswer = useCallback((isMaximizer: boolean) => {
    const newAnswers = [...answers, isMaximizer ? 1 : 0]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }, [answers, currentQuestion])

  const maximizerScore = answers.reduce((sum, a) => sum + a, 0)
  const satisficerScore = answers.length - maximizerScore
  const totalQuestions = questions.length
  const maximizerPercent = Math.round((maximizerScore / totalQuestions) * 100)
  const satisficerPercent = Math.round((satisficerScore / totalQuestions) * 100)

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const handleShare = async () => {
    const text = `🔮 I took the Maximizer vs Satisficer Quiz on MagicDecisions.com!\n\nI'm ${maximizerPercent}% Maximizer and ${satisficerPercent}% Satisficer.\n\nFind out your decision-making style!`
    if (navigator.share) {
      navigator.share({ title: 'Maximizer vs Satisficer Quiz', text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getResultType = () => {
    if (maximizerPercent >= 70) return 'maximizer-strong'
    if (maximizerPercent >= 55) return 'maximizer-light'
    if (satisficerPercent >= 70) return 'satisficer-strong'
    if (satisficerPercent >= 55) return 'satisficer-light'
    return 'balanced'
  }

  const resultType = getResultType()

  const resultContent = {
    'maximizer-strong': {
      title: "The Ultimate Maximizer",
      emoji: "🔍",
      description: "You research everything thoroughly before making decisions. You want to be sure you've found the absolute best option. This can lead to better choices but also to decision fatigue and analysis paralysis.",
      strength: "Your thoroughness often leads to excellent decisions",
      weakness: "You might miss out on good opportunities while searching for perfect ones",
      tip: "Try setting a time limit on decisions or using the 'good enough' rule"
    },
    'maximizer-light': {
      title: "Mostly Maximizer",
      emoji: "⚖️",
      description: "You lean toward maximizing but can recognize when good enough is... good enough. You balance thorough research with practical decision-making.",
      strength: "You find great options without getting stuck forever",
      weakness: "Sometimes the search for perfection delays action",
      tip: "Track your decision outcomes to build confidence in 'good enough' choices"
    },
    'satisficer-strong': {
      title: "The Peaceful Satisficer",
      emoji: "🧘",
      description: "You're comfortable with options that meet your criteria without needing to find the absolute best. You save time and mental energy while still making solid decisions.",
      strength: "Quick decisions, less stress, more action",
      weakness: "You might settle for less than what's actually available",
      tip: "Occasionally push yourself to explore more options—you might be surprised"
    },
    'satisficer-light': {
      title: "Mostly Satisficer",
      emoji: "🎯",
      description: "You generally go with what works but can shift into maximize mode when it really matters. You have a healthy approach to most decisions.",
      strength: "Flexible approach to different decision sizes",
      weakness: "Might miss optimization opportunities on smaller decisions",
      tip: "Identify which decisions truly deserve extra research"
    },
    'balanced': {
      title: "The Adaptive Decider",
      emoji: "⚡",
      description: "You naturally adjust your decision-making style based on what's at stake. You can be thorough when needed and quick when appropriate.",
      strength: "Flexible and aware of what each decision requires",
      weakness: "Might overthink whether to maximize or satisfice",
      tip: "Trust your instincts more—you've clearly got good judgment"
    }
  }

  const result = resultContent[resultType]

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8 bg-cream-50">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Brain className="w-4 h-4" />
            Decision Style Quiz
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
            Maximizer or Satisficer?
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Discover your decision-making style based on Barry Schwartz's psychology research
          </p>
        </div>

        {/* Progress Bar */}
        {!showResult && (
          <div className="w-full max-w-2xl mb-6">
            <div className="flex items-center justify-between text-sm text-[#A09080] mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-cream-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-highlight transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {!showResult ? (
          <div className="w-full max-w-2xl">
            <div className="mystical-card p-6">
              <h2 className="text-xl font-semibold font-display text-ink-800 mb-6 text-center">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full p-4 text-left rounded-2xl border-2 border-cream-300 hover:border-secondary-400 hover:bg-secondary/10 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20">
                      <TrendingUp className="w-4 h-4 text-secondary-400" />
                    </div>
                    <p className="text-ink-800 flex-1">{questions[currentQuestion].maximizerOption}</p>
                  </div>
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full p-4 text-left rounded-2xl border-2 border-cream-300 hover:border-secondary-400 hover:bg-secondary/10 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20">
                      <Target className="w-4 h-4 text-secondary-400" />
                    </div>
                    <p className="text-ink-800 flex-1">{questions[currentQuestion].satisficerOption}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="w-full max-w-2xl animate-fade-in">
            <div className="mystical-card p-6">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">{result.emoji}</span>
                <h2 className="text-2xl font-bold font-display text-ink-800 mb-2">{result.title}</h2>
              </div>

              {/* Score Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-secondary-400 font-medium">Maximizer {maximizerPercent}%</span>
                  <span className="text-secondary-400 font-medium">Satisficer {satisficerPercent}%</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden bg-cream-100">
                  <div className="h-full bg-gradient-to-r from-primary via-highlight to-secondary-400" style={{ width: '100%' }} />
                  <div
                    className="h-full bg-secondary-400"
                    style={{ width: `${maximizerPercent}%`, marginTop: '-16px' }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-[#6B5E4E] mb-6 text-center leading-relaxed">
                {result.description}
              </p>

              {/* Insights */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/10 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-secondary-400 mb-1">Your Strength</p>
                  <p className="text-sm text-[#6B5E4E]">{result.strength}</p>
                </div>
                <div className="bg-primary/10 rounded-2xl p-4">
                  <p className="text-sm font-semibold text-primary-400 mb-1">Watch Out For</p>
                  <p className="text-sm text-[#6B5E4E]">{result.weakness}</p>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-gradient-to-r from-secondary/10 to-highlight/10 rounded-2xl p-4 mb-6">
                <p className="text-sm font-semibold text-secondary-500 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Quick Tip
                </p>
                <p className="text-sm text-[#6B5E4E]">{result.tip}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="mystical-btn flex items-center gap-2 px-6 py-3"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retake Quiz
                </button>
                <button
                  onClick={handleShare}
                  className="mystical-btn flex items-center gap-2 px-6 py-3"
                >
                  <Share2 className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Share Results'}
                </button>
              </div>
            </div>

            {/* More About Maximizers */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-semibold font-display text-ink-800 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-secondary-400" />
                About This Quiz
              </h3>
              <p className="text-[#6B5E4E] text-sm mb-3">
                The Maximizer vs Satisficer concept comes from psychologist Barry Schwartz's research on decision-making. Maximizers seek the absolute best option, while Satisficers look for options that meet their criteria—regardless of whether better ones exist.
              </p>
              <p className="text-[#6B5E4E] text-sm">
                Research shows that while maximizers often achieve objectively better outcomes, they tend to be less happy with their choices and more prone to decision fatigue. Satificers, on the other hand, report higher satisfaction and less regret.
              </p>
            </div>

            {/* Related Tools */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-semibold font-display text-ink-800 mb-3 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-secondary-400" />
                Try Another Tool
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="tool-card p-3 rounded-2xl bg-cream-100 hover:bg-cream-50 text-left transition-colors">
                  <p className="font-semibold text-ink-800 text-sm">Cognitive Bias Test</p>
                  <p className="text-[#A09080] text-xs">Discover your mental shortcuts</p>
                </button>
                <button className="tool-card p-3 rounded-2xl bg-cream-100 hover:bg-cream-50 text-left transition-colors">
                  <p className="font-semibold text-ink-800 text-sm">Yes No Oracle</p>
                  <p className="text-[#A09080] text-xs">Can't decide? Ask the crystal ball</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer spacer */}
        <div className="h-24" />

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 bg-gradient-to-br from-secondary/10 to-highlight/10 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use the Maximizer vs Satisficer Quiz to Teach Decision Quality Awareness
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              This quiz helps kids understand that different decision-making styles exist and neither is "wrong." Maximizers (who seek the best option) and Satisficers (who seek good-enough options) both can make great decisions. Talk about when each approach makes sense—low-stakes daily decisions might not need maximum research, while bigger decisions might benefit from more analysis. This builds metacognitive awareness about their own thinking patterns.
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
              { name: 'Cognitive Bias Test', description: 'Discover your mental shortcuts', id: 'bias', emoji: '🧠' },
              { name: 'Yes No Oracle', description: "Can't decide? Ask the crystal ball", id: 'oracle', emoji: '🔮' },
              { name: 'Should I Buy It?', description: 'Evaluate purchase decisions', id: 'buyit', emoji: '🛒' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="mystical-card p-4 text-center hover:shadow-md transition-all hover:border-secondary-400 cursor-pointer bg-transparent"
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
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-secondary/10 to-highlight/10 border border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
              Want to Help Kids Make Better Decisions?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="mystical-btn inline-flex items-center gap-2 px-6 py-3"
            >
              Get the Free Decision Traps Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaximizerQuiz
