import { useState, useCallback } from 'react'
import { CreditCard, Calculator, Sparkles, RefreshCw, Share2, Copy, Check, AlertTriangle, CheckCircle, XCircle, TrendingDown, DollarSign, Heart, Brain } from 'lucide-react'
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

function ShouldIBuyItCalculator() {
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
      ? { text: 'Go For It!', emoji: '✅', color: 'emerald', description: 'This looks like a solid purchase. The factors align well.' }
      : score >= 55
      ? { text: 'Consider It', emoji: '⚠️', color: 'amber', description: 'There are some good reasons to buy, but also some concerns. Think it through.' }
      : score >= 40
      ? { text: 'Think Twice', emoji: '🤔', color: 'orange', description: 'The cons might outweigh the pros. Give it more time before buying.' }
      : { text: 'Probably Not', emoji: '❌', color: 'rose', description: 'This doesn\'t look like a wise purchase right now. Consider waiting.' }

    const Icon = questions[currentQuestion].icon

    return (
      <div className="min-h-screen relative">
        <div className="stars-bg" />
        <div className="fixed inset-0 stars pointer-events-none opacity-50" />

        <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm mb-4">
              <Calculator className="w-4 h-4" />
              Purchase Decision
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
              Your Purchase Score
            </h1>
          </div>

          <div className="w-full max-w-2xl">
            <div className="mystical-card p-6">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">{verdict.emoji}</span>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{verdict.text}</h2>
                <p className="text-4xl font-bold mb-2">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${verdict.color}-500 to-${verdict.color}-600`}>{score}</span>
                  <span className="text-xl text-slate-400">/100</span>
                </p>
              </div>

              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                {verdict.description}
              </p>

              {/* Score gauge */}
              <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-6">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${
                    score >= 70 ? 'from-emerald-500 to-emerald-400' :
                    score >= 55 ? 'from-amber-500 to-amber-400' :
                    score >= 40 ? 'from-orange-500 to-orange-400' :
                    'from-rose-500 to-rose-400'
                  } transition-all duration-1000`}
                  style={{ width: `${score}%` }}
                />
              </div>

              {/* Factor breakdown */}
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Factor Analysis</h3>
              <div className="space-y-3 mb-6">
                {factors.map((factor, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      factor.score >= 3 ? 'bg-emerald-100' :
                      factor.score >= 2 ? 'bg-amber-100' :
                      'bg-rose-100'
                    }`}>
                      {factor.score >= 3 ? (
                        <CheckCircle className={`w-4 h-4 text-emerald-600`} />
                      ) : factor.score >= 2 ? (
                        <AlertTriangle className={`w-4 h-4 text-amber-600`} />
                      ) : (
                        <XCircle className={`w-4 h-4 text-rose-600`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700">{factor.name}</p>
                      <p className="text-xs text-slate-500">{factor.advice}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Advice */}
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-purple-800 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Final Verdict
                </p>
                <p className="text-sm text-slate-600">
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
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Another
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full text-white font-medium transition-all shadow-lg hover:shadow-purple-500/30"
                >
                  <Share2 className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Share Result'}
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-500" />
                Smart Buying Tips
              </h3>
              <ul className="text-slate-600 text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span><strong>Use the 24-hour rule:</strong> For purchases over $50, wait 24 hours before buying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span><strong>Watch for emotional spending:</strong> Don't buy when feeling sad, stressed, or bored</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span><strong>Consider cost-per-use:</strong> Divide price by expected uses to assess value</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm mb-4">
            <CreditCard className="w-4 h-4" />
            Purchase Decision Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Should I Buy It?
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Answer a few questions to help you decide if this purchase is worth it
          </p>
        </div>

        {/* Progress */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="w-full max-w-2xl">
          <div className="mystical-card p-6">
            <div className="mb-6">
              <div className={`w-14 h-14 rounded-2xl ${
                question.type === 'scale' ? 'bg-purple-100' : 'bg-amber-100'
              } flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-7 h-7 ${
                  question.type === 'scale' ? 'text-purple-600' : 'text-amber-600'
                }`} />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 text-center">
                {question.text}
              </h2>
            </div>

            {question.type === 'scale' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                  <span>Easy to afford</span>
                  <span>Very expensive</span>
                </div>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleScaleAnswer(value)}
                      className={`w-14 h-14 rounded-xl font-semibold transition-all ${
                        'bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-700 border-2 border-transparent hover:border-purple-300'
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
                  className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                  <span className="font-medium text-slate-700">Yes</span>
                </button>
                <button
                  onClick={() => handleYesNoAnswer('no')}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-rose-400 hover:bg-rose-50 transition-all flex items-center justify-center gap-3"
                >
                  <XCircle className="w-6 h-6 text-rose-500" />
                  <span className="font-medium text-slate-700">No</span>
                </button>
              </div>
            )}
          </div>

          {/* Scale guide for scale questions */}
          {question.type === 'scale' && (
            <div className="mt-4 text-center text-sm text-slate-500">
              <p>Rate from 1 (strongly disagree) to 5 (strongly agree)</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Make smarter purchasing decisions</p>
        </div>
      </div>
    </div>
  )
}

export default ShouldIBuyItCalculator