import { useState, useCallback } from 'react'
import { Brain, Sparkles, RefreshCw, Share2, Copy, Check, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import './index.css'

interface BiasScenario {
  id: number;
  title: string;
  description: string;
  scenario: string;
  question: string;
  options: { text: string; isBias: boolean; explanation: string }[];
  biasName: string;
}

const biasScenarios: BiasScenario[] = [
  {
    id: 1,
    title: "The Investment Trap",
    description: "You bought a stock at $100. It dropped to $80, then rose to $90. What do you do?",
    scenario: "You've been watching your portfolio daily. The $20 dip stressed you out, and now that it's recovered to $90, you feel relieved.",
    question: "You decide to hold the stock because...",
    options: [
      { text: "You believe in the company's long-term potential", isBias: false, explanation: "Logical reasoning based on fundamentals" },
      { text: "You've already invested so much, you don't want to 'lose' that money", isBias: true, explanation: "Sunk Cost Fallacy - letting past costs influence present decisions" },
      { text: "You think it might drop again, so you sell", isBias: false, explanation: "Prudent risk management" },
    ],
    biasName: "Sunk Cost Fallacy"
  },
  {
    id: 2,
    title: "The Hiring Decision",
    description: "You're hiring for a position. Two candidates: one interviewed okay but mentioned they went to Harvard.",
    scenario: "The Harvard grad seemed nervous during the interview and struggled with some basic questions. The other candidate was confident and answered everything well.",
    question: "Despite the interview performance, you're leaning toward the Harvard grad because...",
    options: [
      { text: "The prestige of the school indicates quality education", isBias: true, explanation: "Halo Effect - letting one positive trait influence overall judgment" },
      { text: "You prefer candidates who answer questions well", isBias: false, explanation: "Using relevant criteria" },
      { text: "You have budget for only one position anyway", isBias: false, explanation: "Practical constraint-based reasoning" },
    ],
    biasName: "Halo Effect"
  },
  {
    id: 3,
    title: "The News Headline",
    description: "A headline reads: 'Research Shows Chocolate is Good for You!'",
    scenario: "You shared it immediately. A week later, you see another article: 'Study on Chocolate Was Flawed'. You didn't read that one.",
    question: "Why did you only share and remember the positive headline?",
    options: [
      { text: "The first headline came from a source I trust", isBias: false, explanation: "Source credibility is a valid consideration" },
      { text: "It confirmed what I already believed about chocolate", isBias: true, explanation: "Confirmation Bias - seeking information that supports existing beliefs" },
      { text: "The second article had a less catchy headline", isBias: false, explanation: "Noticing media framing differences" },
    ],
    biasName: "Confirmation Bias"
  },
  {
    id: 4,
    title: "The Restaurant Choice",
    description: "Your favorite restaurant had amazing food last year. You're recommending it to a visitor.",
    scenario: "You haven't been there in 6 months. Your memory is full of the incredible dishes you had, the warm atmosphere, the perfect service.",
    question: "Based on your recommendation, your visitor has a mediocre experience. What happened?",
    options: [
      { text: "The restaurant changed management", isBias: false, explanation: "Actual change in quality" },
      { text: "Your memory was probably better than the current reality", isBias: true, explanation: "Rosy Retrospection - remembering past experiences as better than they were" },
      { text: "Your visitor has different taste preferences", isBias: false, explanation: "Individual differences in preferences" },
    ],
    biasName: "Rosy Retrospection"
  },
  {
    id: 5,
    title: "The Project Estimate",
    description: "Your team estimated a project would take 4 weeks. It's now been 8 weeks.",
    scenario: "At the start, everything seemed straightforward. 'We've done similar projects before,' you thought. The actual complexity caught you off guard.",
    question: "What caused your estimate to be so wrong?",
    options: [
      { text: "We should have added more buffer time", isBias: false, explanation: "Reasonable risk assessment" },
      { text: "We assumed past success meant future ease", isBias: true, explanation: "Planning Fallacy - underestimating time based on ideal scenarios, not actual experience" },
      { text: "Scope creep added unexpected work", isBias: false, explanation: "External factor recognition" },
    ],
    biasName: "Planning Fallacy"
  },
  {
    id: 6,
    title: "The Coin Flip Memory",
    description: "You flipped a coin 10 times. It came up heads 7 times.",
    scenario: "Now you need to flip again. Your friend says, 'Heads is hot—let's do heads!'",
    question: "Is heads actually more likely this time?",
    options: [
      { text: "Yes! Heads is on a streak!", isBias: true, explanation: "Gambler's Fallacy - believing past randomness predicts future outcomes" },
      { text: "No, it's still 50/50", isBias: false, explanation: "Correct! Each flip is independent" },
      { text: "Maybe, if the coin is biased", isBias: false, explanation: "Considering actual probability factors" },
    ],
    biasName: "Gambler's Fallacy"
  },
  {
    id: 7,
    title: "The Group Decision",
    description: "Your team is choosing between three project directions. Everyone seems to favor Option A.",
    scenario: "You personally prefer Option B, but you stay quiet and agree with Option A. 'We should go with the group,' you think.",
    question: "Why did you agree with Option A despite preferring B?",
    options: [
      { text: "Option A might actually be the best choice", isBias: false, explanation: "Genuine agreement based on merit" },
      { text: "You didn't want to be the only voice of dissent", isBias: true, explanation: "Conformity Bias - following the group's direction to fit in or avoid conflict" },
      { text: "You weren't sure about Option B after discussion", isBias: false, explanation: "Openness to group reasoning" },
    ],
    biasName: "Conformity Bias"
  },
  {
    id: 8,
    title: "The Product Launch",
    description: "Your startup launched a new feature. Initial reviews are mixed—some love it, some hate it.",
    scenario: "You keep reading the negative reviews and feeling discouraged. The positive ones seem less impactful somehow.",
    question: "Why do the negative reviews feel more significant?",
    options: [
      { text: "The negative reviews had more detail", isBias: false, explanation: "Content quality evaluation" },
      { text: "Negative information carries more psychological weight", isBias: true, explanation: "Negativity Bias - giving more attention to negative information than positive" },
      { text: "The feedback was actionable", isBias: false, explanation: "Practical utility assessment" },
    ],
    biasName: "Negativity Bias"
  },
]

function CognitiveBiasTest() {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [answers, setAnswers] = useState<{ isCorrect: boolean; isBias: boolean }[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSelectAnswer = useCallback((index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)

    const option = biasScenarios[currentScenario].options[index]
    const newAnswers = [...answers, { isCorrect: option.isBias, isBias: option.isBias }]
    setAnswers(newAnswers)
  }, [answers, currentScenario])

  const handleNext = useCallback(() => {
    if (currentScenario < biasScenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowResult(true)
    }
  }, [currentScenario])

  const resetTest = () => {
    setCurrentScenario(0)
    setAnswers([])
    setSelectedAnswer(null)
    setShowExplanation(false)
    setShowResult(false)
  }

  const handleShare = async () => {
    const correctCount = answers.filter(a => a.isCorrect).length
    const total = biasScenarios.length
    const score = Math.round((correctCount / total) * 100)

    const text = `🧠 I took the Cognitive Bias Test on MagicDecisions.com!\n\nI scored ${score}% (${correctCount}/${total} bias scenarios identified)\n\nTest your awareness!`
    if (navigator.share) {
      navigator.share({ title: 'Cognitive Bias Test', text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const correctCount = answers.filter(a => a.isCorrect).length
  const total = biasScenarios.length
  const scorePercent = Math.round((correctCount / total) * 100)

  const getScoreCategory = () => {
    if (scorePercent >= 80) return {
      title: "Bias Awareness Expert",
      emoji: "🧠",
      color: "emerald",
      description: "You have excellent awareness of cognitive biases. Your critical thinking skills are strong, and you often catch yourself before falling for mental shortcuts."
    }
    if (scorePercent >= 60) return {
      title: "Bias Conscious",
      emoji: "💡",
      color: "blue",
      description: "You recognize many cognitive biases when pointed out. Keep practicing awareness, and you'll catch more biases in real-time."
    }
    if (scorePercent >= 40) return {
      title: "Bias Prone",
      emoji: "⚠️",
      color: "amber",
      description: "Like most people, you fall for some cognitive biases. This is completely normal—awareness is the first step to improvement."
    }
    return {
      title: "Bias Blind Spot",
      emoji: "🎭",
      color: "rose",
      description: "We all have blind spots! The good news is that understanding these biases is the first step to making better decisions."
    }
  }

  if (showResult) {
    const category = getScoreCategory()
    return (
      <div className="min-h-screen relative">
        <div className="stars-bg" />
        <div className="fixed inset-0 stars pointer-events-none opacity-50" />

        <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-sm mb-4">
              <Brain className="w-4 h-4" />
              Test Complete
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
              Your Bias Awareness Score
            </h1>
          </div>

          <div className="w-full max-w-2xl">
            <div className="mystical-card p-6">
              <div className="text-center mb-6">
                <span className="text-6xl mb-4 block">{category.emoji}</span>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{category.title}</h2>
                <p className="text-4xl font-bold mb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">{scorePercent}%</span>
                </p>
                <p className="text-slate-500">{correctCount} out of {total} correct</p>
              </div>

              <p className="text-slate-600 text-center mb-6 leading-relaxed">
                {category.description}
              </p>

              {/* Score breakdown */}
              <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${scorePercent}%` }}
                />
              </div>

              {/* Results summary */}
              <div className="space-y-3 mb-6">
                {biasScenarios.map((scenario, idx) => {
                  const answer = answers[idx]
                  const wasCorrect = answer?.isCorrect
                  return (
                    <div key={scenario.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      {wasCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{scenario.title}</p>
                        <p className="text-xs text-slate-500">{scenario.biasName}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetTest}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retake Test
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

            {/* About Cognitive Biases */}
            <div className="mystical-card p-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                What Are Cognitive Biases?
              </h3>
              <p className="text-slate-600 text-sm mb-3">
                Cognitive biases are systematic patterns of deviation from norm or rationality in judgment. They're mental shortcuts that help us process information quickly, but can lead to errors in thinking.
              </p>
              <p className="text-slate-600 text-sm">
                Research by Daniel Kahneman and Amos Tversky showed that these biases affect our decisions in predictable ways. Understanding them helps us make better choices and recognize when our thinking might be skewed.
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
                  <p className="font-medium text-slate-700 text-sm">Maximizer vs Satisficer</p>
                  <p className="text-xs text-slate-500">Discover your decision style</p>
                </button>
                <button className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-left transition-colors">
                  <p className="font-medium text-slate-700 text-sm">Yes No Oracle</p>
                  <p className="text-xs text-slate-500">Can't decide? Ask the crystal ball</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const scenario = biasScenarios[currentScenario]

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 border border-amber-200 text-amber-700 text-sm mb-4">
            <Brain className="w-4 h-4" />
            Bias Awareness Test
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Do You Fall for Cognitive Biases?
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Test your awareness of common mental shortcuts that affect our decisions
          </p>
        </div>

        {/* Progress */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>Scenario {currentScenario + 1} of {biasScenarios.length}</span>
            <span>{Math.round(((currentScenario + 1) / biasScenarios.length) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
              style={{ width: `${((currentScenario + 1) / biasScenarios.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Scenario */}
        <div className="w-full max-w-2xl">
          <div className="mystical-card p-6">
            <div className="mb-4">
              <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
                {scenario.biasName}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              {scenario.title}
            </h2>
            <p className="text-slate-600 mb-4 text-sm">
              {scenario.description}
            </p>
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-slate-500 italic">
                {scenario.scenario}
              </p>
            </div>
            <p className="text-slate-700 font-medium mb-4">
              {scenario.question}
            </p>

            <div className="space-y-3">
              {scenario.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const showResult = showExplanation && isSelected
                const isCorrect = option.isBias

                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && handleSelectAnswer(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                      showExplanation
                        ? isSelected
                          ? isCorrect
                            ? 'border-emerald-400 bg-emerald-50'
                            : 'border-rose-400 bg-rose-50'
                          : 'border-slate-200 bg-slate-50 opacity-50'
                        : isSelected
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        showExplanation && isSelected
                          ? isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                          : 'bg-slate-200'
                      }`}>
                        {showExplanation && isSelected ? (
                          isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-white" />
                          ) : (
                            <XCircle className="w-4 h-4 text-white" />
                          )
                        ) : (
                          <span className="text-xs text-slate-500">{String.fromCharCode(65 + index)}</span>
                        )}
                      </div>
                      <p className={`text-sm flex-1 ${isSelected && showExplanation ? 'font-medium' : ''} ${
                        showExplanation && isSelected
                          ? isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          : 'text-slate-700'
                      }`}>
                        {option.text}
                      </p>
                    </div>
                    {showExplanation && isSelected && (
                      <div className={`mt-3 p-3 rounded-lg ${
                        isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        <p className="text-sm">
                          {isCorrect ? '✓ ' : '✗ '}{option.explanation}
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <button
                onClick={handleNext}
                className="w-full mt-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-medium transition-all"
              >
                {currentScenario < biasScenarios.length - 1 ? 'Next Scenario →' : 'See My Results'}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Test your cognitive bias awareness</p>
        </div>
      </div>
    </div>
  )
}

export default CognitiveBiasTest