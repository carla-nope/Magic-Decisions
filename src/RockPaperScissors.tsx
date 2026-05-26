import { useState, useCallback } from 'react'
import { Hand, RefreshCw, Copy, Check, Share2, Trophy, Target, Zap, Sparkles, ArrowRight } from 'lucide-react'
import './index.css'

interface RockPaperScissorsProps {
  onNavigate?: (toolId: string) => void
}

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw' | null;

const choices: { id: Choice; emoji: string; beats: Choice }[] = [
  { id: 'rock', emoji: '🪨', beats: 'scissors' },
  { id: 'paper', emoji: '📄', beats: 'rock' },
  { id: 'scissors', emoji: '✂️', beats: 'paper' },
];

const resultMessages = {
  win: ['You Win!', 'Victory!', 'Amazing!', 'You got this!'],
  lose: ['You Lose!', 'Try Again!', 'So Close!', 'Next time!'],
  draw: ['Draw!', 'Tie!', 'Again!', 'Rematch!'],
};

function RockPaperScissors({ onNavigate }: RockPaperScissorsProps) {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);

  // Load scores from localStorage
  const loadScores = useCallback(() => {
    const saved = localStorage.getItem('rpsScores');
    if (saved) {
      try {
        setScore(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load scores');
      }
    }
  }, []);

  // Save scores to localStorage
  const saveScores = useCallback((newScore: typeof score) => {
    localStorage.setItem('rpsScores', JSON.stringify(newScore));
  }, []);

  // Handle player choice
  const play = useCallback((choice: Choice) => {
    if (isPlaying) return;

    setIsPlaying(true);
    setPlayerChoice(choice);
    setResult(null);
    setResultMessage('');
    setShowConfetti(false);

    // Animate computer choice
    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 3);
      setComputerChoice(choices[randomIndex].id);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);

        // Final computer choice
        const computerIndex = Math.floor(Math.random() * 3);
        const finalChoice = choices[computerIndex].id;
        setComputerChoice(finalChoice);

        // Determine result
        setTimeout(() => {
          if (choice === finalChoice) {
            setResult('draw');
            setResultMessage(resultMessages.draw[Math.floor(Math.random() * resultMessages.draw.length)]);
            setScore(prev => {
              const newScore = { ...prev, draw: prev.draw + 1 };
              saveScores(newScore);
              return newScore;
            });
            setStreak(0);
          } else if (choices.find(c => c.id === choice)?.beats === finalChoice) {
            setResult('win');
            setResultMessage(resultMessages.win[Math.floor(Math.random() * resultMessages.win.length)]);
            setScore(prev => {
              const newScore = { ...prev, player: prev.player + 1 };
              saveScores(newScore);
              return newScore;
            });
            setStreak(prev => prev + 1);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          } else {
            setResult('lose');
            setResultMessage(resultMessages.lose[Math.floor(Math.random() * resultMessages.lose.length)]);
            setScore(prev => {
              const newScore = { ...prev, computer: prev.computer + 1 };
              saveScores(newScore);
              return newScore;
            });
            setStreak(0);
          }
          setIsPlaying(false);
        }, 200);
      }
    }, 60);
  }, [isPlaying, saveScores]);

  // Reset game
  const resetGame = () => {
    setScore({ player: 0, computer: 0, draw: 0 });
    setStreak(0);
    localStorage.removeItem('rpsScores');
  };

  // Copy result
  const handleCopyResult = async () => {
    if (!result || !playerChoice) return;
    const text = `🎮 Rock Paper Scissors: I chose ${playerChoice}! ${result === 'win' ? 'I WON!' : result === 'lose' ? 'I lost...' : 'It\'s a draw!'}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share result
  const handleShare = () => {
    if (!result || !playerChoice) return;
    const text = `🎮 Rock Paper Scissors! I chose ${playerChoice} and ${result === 'win' ? 'WON!' : result === 'lose' ? 'lost...' : 'it\'s a draw!'} Can you beat me?`;
    if (navigator.share) {
      navigator.share({ title: 'Rock Paper Scissors', text });
    } else {
      handleCopyResult();
    }
  };

  const getResultColor = () => {
    if (result === 'win') return 'text-primary-400';
    if (result === 'lose') return 'text-highlight-500';
    return 'text-primary-400';
  };

  const getResultEmoji = () => {
    if (result === 'win') return '🏆';
    if (result === 'lose') return '😅';
    return '🤝';
  };

  return (
    <div className="min-h-screen relative bg-cream-50">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-cream-300 text-secondary-400 text-sm mb-4">
            <Hand className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
            Rock Paper Scissors!
          </h1>
          <p className="text-[#6B5E4E] max-w-md mx-auto">
            Classic game, instant play! Choose your weapon and battle the computer.
          </p>
        </div>

        {/* Scoreboard */}
        <div className="mystical-card p-4 mb-6 w-full max-w-sm">
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <p className="text-[#6B5E4E] text-sm mb-1">You</p>
              <p className="text-3xl font-bold font-display text-primary-400">{score.player}</p>
            </div>
            <div className="px-4">
              <p className="text-[#A09080] text-sm">Draws: {score.draw}</p>
              {streak >= 2 && (
                <p className="text-primary-400 text-xs flex items-center gap-1 justify-center mt-1">
                  <Zap className="w-3 h-3" /> {streak} streak!
                </p>
              )}
            </div>
            <div className="flex-1">
              <p className="text-[#6B5E4E] text-sm mb-1">CPU</p>
              <p className="text-3xl font-bold font-display text-highlight-500">{score.computer}</p>
            </div>
          </div>
        </div>

        {/* Battle Arena */}
        <div className="relative mb-6 w-full max-w-lg">
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
                    width: '10px',
                    height: '10px',
                    backgroundColor: ['#E8B86D', '#D4A574', '#C4956A', '#B8860B', '#A67C52'][i % 5],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Choices Display */}
          <div className="flex items-center justify-center gap-8 mb-6">
            {/* Player Choice */}
            <div className="text-center">
              <div className={`w-24 h-24 rounded-2xl bg-cream-100 flex items-center justify-center mb-2 transition-all duration-300 ${
                isPlaying ? 'animate-pulse' : ''
              }`}>
                {playerChoice ? (
                  <span className="text-5xl">{choices.find(c => c.id === playerChoice)?.emoji}</span>
                ) : (
                  <span className="text-[#A09080] text-2xl">?</span>
                )}
              </div>
              <p className="text-[#A09080] text-sm">Your Choice</p>
            </div>

            {/* VS */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="text-2xl font-bold font-display text-ink-800">VS</span>
              </div>
            </div>

            {/* Computer Choice */}
            <div className="text-center">
              <div className={`w-24 h-24 rounded-2xl bg-cream-100 flex items-center justify-center mb-2 transition-all duration-300 ${
                isPlaying ? 'animate-bounce' : ''
              }`}>
                {computerChoice ? (
                  <span className="text-5xl">{choices.find(c => c.id === computerChoice)?.emoji}</span>
                ) : (
                  <span className="text-[#A09080] text-2xl">?</span>
                )}
              </div>
              <p className="text-[#A09080] text-sm">CPU Choice</p>
            </div>
          </div>

          {/* Result */}
          {result && !isPlaying && (
            <div className="text-center mb-6 animate-bounce-in">
              <span className="text-5xl mb-2 block">{getResultEmoji()}</span>
              <p className={`text-3xl font-bold font-display ${getResultColor()}`}>
                {resultMessage}
              </p>
              <div className="flex items-center gap-3 justify-center mt-4">
                <button onClick={handleShare} className="share-btn">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <button onClick={handleCopyResult} className="share-btn">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Choice Buttons */}
        <div className="flex gap-4 mb-6">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => play(choice.id)}
              disabled={isPlaying}
              className={`mystical-btn w-20 h-20 rounded-2xl flex flex-col items-center justify-center transition-all ${
                isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
            >
              <span className="text-3xl mb-1">{choice.emoji}</span>
              <span className="text-xs text-[#6B5E4E]/80 capitalize">{choice.id}</span>
            </button>
          ))}
        </div>

        {/* Instructions */}
        {!playerChoice && !isPlaying && (
          <p className="text-[#A09080] text-sm text-center animate-pulse">
            Choose your weapon above!
          </p>
        )}

        {/* Reset */}
        {(score.player > 0 || score.computer > 0) && !isPlaying && (
          <button
            onClick={resetGame}
            className="mt-6 text-[#A09080] hover:text-[#6B5E4E] text-sm flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Scores
          </button>
        )}

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-8 pb-24">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4">What is Rock Paper Scissors?</h2>
            <p className="text-[#6B5E4E] mb-4">
              Rock Paper Scissors is a classic hand game played worldwide for making decisions and settling disputes. Our online version lets you play against the computer with beautiful animations, score tracking, and streak bonuses. It's a fun way to add excitement to any decision that needs a random outcome.
            </p>

            <h3 className="text-lg font-semibold font-display text-ink-800 mb-3">When to Play Rock Paper Scissors</h3>
            <ul className="text-[#6B5E4E] space-y-2 mb-4">
              <li>• Settling minor disputes or choosing who goes first</li>
              <li>• Making quick decisions with a fun twist</li>
              <li>• Playing against friends (take turns on one device)</li>
              <li>• Wasting time when bored</li>
              <li>• Testing your prediction skills against AI</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold font-display text-primary-400 mb-2">Pros</h3>
                <ul className="text-[#6B5E4E] text-sm space-y-1">
                  <li>✓ Instant fun with no setup required</li>
                  <li>✓ Score tracking to compete with yourself</li>
                  <li>✓ Streak bonuses for consecutive wins</li>
                  <li>✓ Beautiful animated gameplay</li>
                  <li>✓ Share your results with friends</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-display text-highlight-500 mb-2">Considerations</h3>
                <ul className="text-[#6B5E4E] text-sm space-y-1">
                  <li>• Computer opponent uses true randomization</li>
                  <li>• Cannot predict or influence outcomes</li>
                  <li>• Results are purely based on chance</li>
                  <li>• Best for quick games, not serious decisions</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold font-display text-ink-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-secondary-400 font-medium text-sm">Is the computer's choice random?</p>
                <p className="text-[#6B5E4E] text-sm">Yes, the computer randomly selects rock, paper, or scissors with equal probability (33.3% each). You cannot predict or outsmart the AI—it truly is random.</p>
              </div>
              <div>
                <p className="text-secondary-400 font-medium text-sm">How does scoring work?</p>
                <p className="text-[#6B5E4E] text-sm">You get 1 point for winning, the computer gets 1 point for winning, and ties don't count. Your score is saved locally so you can keep track across sessions.</p>
              </div>
              <div>
                <p className="text-secondary-400 font-medium text-sm">What are the streak bonuses?</p>
                <p className="text-[#6B5E4E] text-sm">If you win 2+ times in a row, a streak indicator appears showing your consecutive wins. This adds excitement but doesn't change the gameplay or scoring.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-[#6B5E4E] text-sm">
          <p>Test your luck against the computer</p>
        </div>

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 bg-cream-50 border border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use Rock Paper Scissors to Teach Fairness and Accepting Outcomes
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              Rock Paper Scissors is a classic tool for teaching kids about fair decision-making and graceful acceptance of outcomes. When siblings can't agree, let RPS decide. This teaches that some decisions don't need to be argued about, and that accepting a loss gracefully is as important as winning. The random element removes bias and teaches kids that sometimes chance, not skill, determines outcomes.
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
              { name: 'Coin Flip', description: 'Binary 50/50 decisions', id: 'coin', emoji: '🪙' },
              { name: 'D20 Roller', description: 'Roll for games, prompts, and playful choices', id: 'd20', emoji: '🎲' },
              { name: 'Name Picker', description: 'Pick names randomly for teams', id: 'names', emoji: '👤' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="tool-card p-4 text-center cursor-pointer"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold font-display text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#6B5E4E] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-8 text-center bg-cream-50 border border-cream-300">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-400" />
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
              className="mystical-btn inline-flex items-center gap-2 px-6 py-3"
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
        .rps-btn {
          background: linear-gradient(135deg, #FFFBF7 0%, rgba(255,251,247,0.05) 100%);
          border: 2px solid rgba(255,251,247,0.1);
          box-shadow: 0 4px 20px rgba(232, 184, 109, 0.2);
        }

        .rps-btn:hover {
          background: linear-gradient(135deg, rgba(232, 184, 109, 0.2) 0%, rgba(232, 184, 109, 0.1) 100%);
          border-color: rgba(232, 184, 109, 0.5);
          box-shadow: 0 6px 30px rgba(232, 184, 109, 0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-bounce-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default RockPaperScissors;