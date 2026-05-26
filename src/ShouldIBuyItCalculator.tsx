import { useState, useCallback } from 'react'
import { CreditCard, Calculator, Sparkles, RefreshCw, Share2, Copy, Check, AlertTriangle, CheckCircle, XCircle, TrendingDown, DollarSign, Heart, Brain, ArrowRight } from 'lucide-react'
import './index.css'

interface Question {
  id: string;
  text: string;
  type: 'scale' | 'yesno';
  icon: typeof DollarSign;
}

const questions: Question[] = [
  {
    id: 'price',
    text: 'How expensive is this purchase relative to your budget?',
    type: 'scale',
    icon: DollarSign,
  },
  {
    id: 'need',
    text: 'Do you actually need this item, or do you just want it?',
    type: 'scale',
    icon: Brain,
  },
  {
    id: 'utility',
    text: 'How often will you actually use this?',
    type: 'scale',
    icon: TrendingDown,
  },
  {
    id: 'regret',
    text: 'If you don\'t buy it, how much will you regret it later?',
    type: 'scale',
    icon: Heart,
  },
  {
    id: 'duplicate',
    text: 'Do you already own something similar?',
    type: 'yesno',
    icon: CheckCircle,
  },
  {
    id: 'research',
    text: 'Have you researched alternatives and compared prices?',
    type: 'yesno',
    icon: AlertTriangle,
  },
  {
    id: 'emotional',
    text: 'Are you buying this because you\'re feeling sad, stressed, or bored?',
    type: 'yesno',
    icon: Heart,
  },
]

interface ShouldIBuyItCalculatorProps {
  onNavigate?: (toolId: string) => void
}

function ShouldIBuyItCalculator({ onNavigate }: ShouldIBuyItCalculatorProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number | 'yes' | 'no'>>({})
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleScaleAnswer = useCallback((value: number) => {
    const question = questions[currentQuestion]
    setAnswers(prev => ({ ...prev, [question.id]: value }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }, [currentQuestion])

  const handleYesNoAnswer = useCallback((value: 'yes' | 'no') => {
    const question = questions[currentQuestion]
    setAnswers(prev => ({ ...prev, [question.id]: value }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }, [currentQuestion])

  const calculateResult = () => {
    let score = 0
    const factors: { name: string; score: number; advice: string }[] = []

    // Price (lower price = higher score, inverse scoring)
    const priceScore = (answers.price as number)
    score += priceScore
    factors.push({
      name: 'Price Impact',
      score: priceScore,
      advice: priceScore <= 2 ? 'Great price for your budget!' : priceScore >= 4 ? 'This is a significant expense for you' : 'Moderate price consideration'
    })

    // Need vs Want (higher need = higher score)
    const needScore = (answers.need as number)
    score += needScore
    factors.push({
      name: 'Need Factor',
      score: needScore,
      advice: needScore >= 4 ? 'You genuinely need this' : needScore <= 2 ? 'This is more of a want than a need' : 'Mixed need/want'
    })

    // Utility (higher usage = higher score)
    const utilityScore = (answers.utility as number)
    score += utilityScore
    factors.push({
      name: 'Practical Value',
      score: utilityScore,
      advice: utilityScore >= 4 ? 'You\'ll get lots of use from this!' : utilityScore <= 2 ? 'Might end up gathering dust' : 'Decent expected utility'
    })

    // Regret potential (higher regret = lower score, inverse scoring)
    const regretScore = (answers.regret as number)
    score += (5 - regretScore)
    factors.push({
      name: 'Regret Factor',
      score: 5 - regretScore,
      advice: regretScore >= 4 ? 'You\'ll definitely regret not buying' : regretScore <= 2 ? 'You\'d probably be fine without it' : 'Some potential for regret'
    })

    // Duplicate check (no duplicate = higher score)
    const duplicateScore = answers.duplicate === 'no' ? 3 : 1
    score += duplicateScore
    factors.push({
      name: 'Duplication Check',
      score: duplicateScore,
      advice: answers.duplicate === 'no' ? 'No duplicate found' : 'You already have something similar!'
    })

    // Research (done = higher score)
    const researchScore = answers.research === 'yes' ? 2 : 1
    score += researchScore
    factors.push({
      name: 'Research Done',
      score: researchScore,
      advice: answers.research === 'yes' ? 'Good research completed' : 'Do more research before buying'
    })

    // Emotional buying (not emotional = higher score)
    const emotionalScore = answers.emotional === 'no' ? 3 : 1
    score += emotionalScore
    factors.push({
      name: 'Emotional State',
      score: emotionalScore,
      advice: answers.emotional === 'no' ? 'Rational decision-making' : 'Emotional buying detected - be careful!'
    })

    // Normalize to 0-100
    const maxScore = 5 + 5 + 5 + 5 + 3 + 2 + 3 // 28
    const normalizedScore = Math.round((score / maxScore) * 100)

    return { score: normalizedScore, factors }
  }

  const resetCalculator = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const handleShare = async () => {
    const { score } = calculateResult()
    const verdict = score >= 70 ? 'Go for it!' : score >= 40 ? 'Think twice' : 'Probably not'

    const text = `🛒 Should I Buy It Calculator\n\nMy score: ${score}/100 - ${verdict}\n\nTry it yourself!`
    if (navigator.share) {
      navigator.share({ title: 'Should I Buy It Calculator', text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (showResult) {
    const { score, factors } = calculateResult()

    const verdict = score >= 70
      ? { text: 'Go For It!', emoji: '✅', color: 'secondary', description: 'This looks like a solid purchase. The factors align well.' }
      : score >= 55
      ? { text: 'Consider It', emoji: '⚠️', color: 'primary', description: 'There are some good reasons to buy, but also some concerns. Think it through.' }
      : score >= 40
      ? { text: 'Think Twice', emoji: '🤔', color: 'highlight', description: 'The cons might outweigh the pros. Give it more time before buying.' }
      : { text: 'Probably Not', emoji: '❌', color: 'highlight', description: 'This doesn\'t look like a wise purchase right now. Consider waiting.' }

    const Icon = questions[currentQuestion].icon

    return (
      <div className="min-h-screen relative">
        <div className="stars-bg" />
        <div className="fixed inset-0 stars pointer-events-none opacity-50" />

        <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cream-300 text-primary-400 text-sm mb-4">
              <Calculator className="w-4 h-4" />
              Purchase Decision
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
              Your Purchase Score
            </h1>
          </div>

          <div className="w-full max-w-2xl">
            <div className="mystical-card p-6">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">{verdict.emoji}</span>
                <h2 className="text-2xl font-bold font-display text-ink-800 mb-2">{verdict.text}</h2>
                <p className="text-4xl font-bold mb-2">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${verdict.color}-500 to-${verdict.color}-600`}>{score}</span>
                  <span className="text-xl text-[#A09080]">/100</span>
                </p>
              </div>

              <p className="text-[#6B5E4E] text-center mb-6 leading-relaxed">
                {verdict.description}
              </p>

              {/* Score gauge */}
              <div className="relative w-full h-4 bg-cream-200 rounded-full overflow-hidden mb-6">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                    score >= 70 ? 'from-secondary-500 to-secondary-400' :
                    score >= 55 ? 'from-primary-500 to-primary-400' :
                    score >= 40 ? 'from-highlight-500 to-highlight-400' :
                    'from-highlight-500 to-highlight-400'
                  } transition-all duration-1000`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Factor breakdown */}
              <h3 className="text-lg font-bold font-display text-ink-800 mb-4">Factor Analysis</h3>
              <div className="space-y-3 mb-6">
                {factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-cream-50 rounded-2xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      factor.score >= 3 ? 'bg-secondary/10' :
                      factor.score >= 2 ? 'bg-primary/10' :
                      'bg-highlight/10'
                    }`}>
                      {factor.score >= 3 ? (
                        <CheckCircle className={`w-4 h-4 text-secondary-400`} />
                      ) : factor.score >= 2 ? (
                        <AlertTriangle className={`w-4 h-4 text-primary-400`} />
                      ) : (
                        <XCircle className={`w-4 h-4 text-highlight-500`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-ink-800">{factor.name}</p>
                      <p className="text-xs text-[#A09080]">{factor.advice}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Advice */}
              <div className="bg-gradient-to-r from-secondary/10 to-highlight/10 rounded-2xl p-4 mb-6">
                <p className="text-sm font-bold text-secondary-400 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Final Verdict
                </p>
                <p className="text-sm text-[#6B5E4E]">
                  {score >= 70
                    ? 'Based on your answers, this appears to be a worthwhile purchase. If you\'ve been considering it for a while and have the budget, go for it!'
                    : score >= 55
                    ? 'This could be a good buy with some reservations. Try waiting 24 hours before purchasing to ensure you really want it.'
                    : score >= 40
                    ? 'There are more factors against this purchase than for it. Consider if there\'s a better alternative or if you could wait longer.'
                    : 'This purchase shows several red flags. Consider the 24-hour rule: if you still want it after 24 hours, revisit the decision.'
                  }
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetCalculator}
                  className="mystical-btn flex items-center gap-2 px-6 py-3 bg-cream-100 hover:bg-cream-200 rounded-full text-[#6B5E4E] font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Another
                </button>
                <button
                  onClick={handleShare}
                  className="mystical-btn flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-highlight-500 hover:from-secondary-600 hover:to-highlight-600 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-secondary-500/30"
                >
                  <Share2 className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Share Result'}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-bold font-display text-ink-800 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-secondary-400" />
                Smart Buying Tips
              </h3>
              <ul className="text-[#6B5E4E] text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-secondary-400">•</span>
                  <span><strong>Use the 24-hour rule:</strong> For purchases over $50, wait 24 hours before buying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary-400">•</span>
                  <span><strong>Watch for emotional spending:</strong> Don't buy when feeling sad, stressed, or bored</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary-400">•</span>
                  <span><strong>Consider cost-per-use:</strong> Divide price by expected uses to assess value</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary-400">•</span>
                  <span><strong>Research alternatives:</strong> Always check if there's a better option available</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const Icon = question.icon

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cream-300 text-primary-400 text-sm mb-4">
            <CreditCard className="w-4 h-4" />
            Purchase Decision Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
            Should I Buy It?
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Answer a few questions to help you decide if this purchase is worth it
          </p>
        </div>

        {/* Progress */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center justify-between text-sm text-[#A09080] mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="w-full max-w-2xl">
          <div className="mystical-card p-6">
            <div className="mb-6">
              <div className={`w-14 h-14 rounded-2xl ${
                question.type === 'scale' ? 'bg-secondary/10' : 'bg-primary/10'
              } flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-7 h-7 ${
                  question.type === 'scale' ? 'text-secondary-400' : 'text-primary-400'
                }`} />
              </div>
              <h2 className="text-xl font-bold font-display text-ink-800 text-center">
                {question.text}
              </h2>
            </div>

            {question.type === 'scale' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#A09080] px-2">
                  <span>Easy to afford</span>
                  <span>Very expensive</span>
                </div>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleScaleAnswer(value)}
                      className={`w-14 h-14 rounded-2xl font-semibold transition-all mystical-btn ${
                        'bg-cream-100 hover:bg-secondary/10 text-[#6B5E4E] hover:text-secondary-400 border-2 border-transparent hover:border-secondary-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => handleYesNoAnswer('yes')}
                  className="w-full p-4 rounded-2xl border-2 border-cream-300 hover:border-secondary-400 hover:bg-secondary/10 transition-all flex items-center justify-center gap-3 mystical-btn"
                >
                  <CheckCircle className="w-6 h-6 text-secondary-400" />
                  <span className="font-bold text-ink-800">Yes</span>
                </button>
                <button
                  onClick={() => handleYesNoAnswer('no')}
                  className="w-full p-4 rounded-2xl border-2 border-cream-300 hover:border-highlight-500 hover:bg-highlight/10 transition-all flex items-center justify-center gap-3 mystical-btn"
                >
                  <XCircle className="w-6 h-6 text-highlight-500" />
                  <span className="font-bold text-ink-800">No</span>
                </button>
              </div>
            )}
          </div>

          {/* Scale guide for scale questions */}
          {question.type === 'scale' && (
            <div className="mt-4 text-center text-sm text-[#A09080]">
              <p>Rate from 1 (strongly disagree) to 5 (strongly agree)</p>
            </div>
          )}
        </div>

        {/* Footer spacer */}
        <div className="h-24" />

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use the Should I Buy It Calculator to Teach Financial Awareness
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              This tool helps kids practice evaluating purchases before spending money. Walk through the questions together—why do we ask about emotional state? Why does it matter if we already own something similar? These questions build critical thinking about consumption. Even small decisions about treats or toys become learning opportunities when you discuss the reasoning behind choices.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-bold font-display text-ink-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Yes No Oracle', description: "Can't decide? Ask the crystal ball", id: 'oracle', emoji: '🔮' },
              { name: 'Cognitive Bias Test', description: 'Discover your mental shortcuts', id: 'bias', emoji: '🧠' },
              { name: 'Maximizer vs Satisficer', description: 'Discover your decision style', id: 'maximizer', emoji: '⚖️' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="tool-card mystical-card p-4 text-center hover:shadow-md transition-all hover:border-secondary-400 cursor-pointer bg-transparent"
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
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-primary/10 to-secondary/10 border border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
              Want to Help Kids Make Smarter Money Choices?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="mystical-btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-primary-500/30"
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

export default ShouldIBuyItCalculator
