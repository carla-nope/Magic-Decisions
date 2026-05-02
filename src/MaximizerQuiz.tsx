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

function MaximizerQuiz() {
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

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm mb-4">
            <Brain className="w-4 h-4" />
            Decision Style Quiz
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Maximizer or Satisficer?
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Discover your decision-making style based on Barry Schwartz's psychology research
          </p>
        </div>

        {/* Progress Bar */}
        {!showResult && (
          <div className="w-full max-w-2xl mb-6">
            <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {!showResult ? (
          <div className="w-full max-w-2xl">
            <div className="mystical-card p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
                {questions[currentQuestion].text}
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer(true)}
                  className="w-full p-4 text-left rounded-xl border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <p className="text-slate-700 flex-1">{questions[currentQuestion].maximizerOption}</p>
                  </div>
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="w-full p-4 text-left rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200">
                      <Target className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-slate-700 flex-1">{questions[currentQuestion].satisficerOption}</p>
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
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{result.title}</h2>
              </div>

              {/* Score Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-purple-600 font-medium">Maximizer {maximizerPercent}%</span>
                  <span className="text-emerald-600 font-medium">Satisficer {satisficerPercent}%</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden bg-slate-200">
                  <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500" style={{ width: '100%' }} />
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: `${maximizerPercent}%`, marginTop: '-16px' }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-6 text-center leading-relaxed">
                {result.description}
              </p>

              {/* Insights */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-purple-700 mb-1">Your Strength</p>
                  <p className="text-sm text-slate-600">{result.strength}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-amber-700 mb-1">Watch Out For</p>
                  <p className="text-sm text-slate-600">{result.weakness}</p>
                </div>
              </div>

              {/* Tip */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-purple-800 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Quick Tip
                </p>
                <p className="text-sm text-slate-600">{result.tip}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retake Quiz
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-purple-500/30"
                >
                  <Share2 className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Share Results'}
                </button>
              </div>
            </div>

            {/* More About Maximizers */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                About This Quiz
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                The Maximizer vs Satisficer concept comes from psychologist Barry Schwartz's research on decision-making. Maximizers seek the absolute best option, while Satisficers look for options that meet their criteria—regardless of whether better ones exist.
              </p>
              <p className="text-slate-600 text-sm">
                Research shows that while maximizers often achieve objectively better outcomes, they tend to be less happy with their choices and more prone to decision fatigue. Satificers, on the other hand, report higher satisfaction and less regret.
              </p>
            </div>

            {/* Related Tools */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-emerald-500" />
                Try Another Tool
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors">
                  <p className="font-medium text-slate-700 text-sm">Cognitive Bias Test</p>
                  <p className="text-xs text-slate-500">Discover your mental shortcuts</p>
                </button>
                <button className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors">
                  <p className="font-medium text-slate-700 text-sm">Yes No Oracle</p>
                  <p className="text-xs text-slate-500">Can't decide? Ask the crystal ball</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Understand your decision-making style</p>
        </div>
      </div>
    </div>
  )
}

export default MaximizerQuiz