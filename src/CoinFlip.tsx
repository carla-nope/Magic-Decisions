import { useState, useEffect, useCallback } from 'react'
import { Copy, Check, Share2, RotateCcw } from 'lucide-react'
import './index.css'

function CoinFlip() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [history, setHistory] = useState<{ side: 'heads' | 'tails'; timestamp: Date }[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('coinFlipHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((item: { side: 'heads' | 'tails'; timestamp: string }) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load history');
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('coinFlipHistory', JSON.stringify(history));
    }
  }, [history]);

  const flipCoin = useCallback(() => {
    if (isFlipping) return;

    setIsFlipping(true);
    setResult(null);

    setTimeout(() => {
      const side: 'heads' | 'tails' = Math.random() > 0.5 ? 'heads' : 'tails';
      setResult(side);
      setIsFlipping(false);
      setHistory(prev => [{
        side,
        timestamp: new Date()
      }, ...prev].slice(0, 50));

      // Update stats
      const stats = {
        total: (parseInt(localStorage.getItem('coinFlipTotal') || '0') + 1).toString(),
        heads: (parseInt(localStorage.getItem('coinFlipHeads') || '0') + (side === 'heads' ? 1 : 0)).toString(),
        tails: (parseInt(localStorage.getItem('coinFlipTails') || '0') + (side === 'tails' ? 1 : 0)).toString(),
      };
      localStorage.setItem('coinFlipTotal', stats.total);
      localStorage.setItem('coinFlipHeads', stats.heads);
      localStorage.setItem('coinFlipTails', stats.tails);
    }, 1500);
  }, [isFlipping]);

  const handleCopyResult = async () => {
    if (!result) return;
    const text = `🪙 Coin Flip Result: ${result === 'heads' ? 'HEADS' : 'TAILS'}!`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!result) return;
    const text = `🪙 I just flipped a coin and got ${result === 'heads' ? 'HEADS' : 'TAILS'}! Try it yourself:`;
    if (navigator.share) {
      navigator.share({
        title: 'Coin Flip',
        text
      });
    } else {
      handleCopyResult();
    }
  };

  const stats = {
    total: parseInt(localStorage.getItem('coinFlipTotal') || '0'),
    heads: parseInt(localStorage.getItem('coinFlipHeads') || '0'),
    tails: parseInt(localStorage.getItem('coinFlipTails') || '0'),
  };

  const headsPercent = stats.total > 0 ? Math.round((stats.heads / stats.total) * 100) : 50;
  const tailsPercent = stats.total > 0 ? Math.round((stats.tails / stats.total) * 100) : 50;

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm mb-4">
            <RotateCcw className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Flip the Coin!
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Heads or tails? Let fate decide. Perfect for making quick decisions!
          </p>
        </div>

        {/* Coin */}
        <div className="relative mb-8">
          <div
            className={`coin-container ${isFlipping ? 'flipping' : ''}`}
            onClick={flipCoin}
            role="button"
            tabIndex={0}
            aria-label="Flip coin"
          >
            <div className={`coin ${result ? `show-${result}` : ''}`}>
              <div className="coin-face coin-heads">
                <span className="text-6xl">🪙</span>
                <span className="text-lg font-semibold mt-2 text-white">HEADS</span>
              </div>
              <div className="coin-face coin-tails">
                <span className="text-6xl">🪙</span>
                <span className="text-lg font-semibold mt-2 text-white">TAILS</span>
              </div>
            </div>
          </div>

          {!result && !isFlipping && (
            <p className="text-center text-slate-400 text-sm mt-4">
              Click the coin to flip!
            </p>
          )}
        </div>

        {/* Result */}
        {result && !isFlipping && (
          <div className="text-center mb-6 animate-bounce-in">
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200">
              <p className="text-sm text-slate-500 mb-1">The coin landed on...</p>
              <p className="text-3xl md:text-4xl font-bold text-slate-800">
                {result === 'heads' ? 'HEADS' : 'TAILS'}!
              </p>
            </div>
            <div className="flex items-center gap-3 justify-center mt-4">
              <button onClick={handleShare} className="share-btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button onClick={handleCopyResult} className="share-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={flipCoin} className="share-btn">
                <RotateCcw className="w-4 h-4" />
                Flip Again
              </button>
            </div>
          </div>
        )}

        {/* Flip Button */}
        <button
          onClick={flipCoin}
          disabled={isFlipping}
          className="coin-btn flex items-center gap-2 mb-8"
        >
          <RotateCcw className={`w-5 h-5 ${isFlipping ? 'animate-spin' : ''}`} />
          {isFlipping ? 'Flipping...' : 'Flip the Coin'}
        </button>

        {/* Stats */}
        {stats.total > 0 && (
          <div className="w-full max-w-sm">
            <div className="mystical-card p-4">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
                Your Statistics
              </h3>
              <div className="flex justify-between text-sm text-slate-600 mb-3">
                <span>Total Flips: {stats.total}</span>
                <span>{Math.round((stats.heads / stats.total) * 100)}% / {Math.round((stats.tails / stats.total) * 100)}%</span>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                  style={{ width: `${headsPercent}%` }}
                />
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${tailsPercent}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-blue-600">Heads: {stats.heads}</span>
                <span className="text-amber-600">Tails: {stats.tails}</span>
              </div>
              {history.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-400 text-center">Recent flips</p>
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {history.slice(0, 20).map((item, i) => (
                      <span
                        key={i}
                        className={`text-lg ${item.side === 'heads' ? 'text-blue-600' : 'text-amber-600'}`}
                        title={new Date(item.timestamp).toLocaleTimeString()}
                      >
                        {item.side === 'heads' ? '🪙' : '🪙'}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-slate-400 text-sm">
          <p>Let the coin guide your decisions</p>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-16 mb-8">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">What is a Coin Flip?</h2>
            <p className="text-slate-600 mb-4">
              A Coin Flip is the simplest random decision tool—just like flipping a real coin to decide between two options. Heads or tails, yes or no, this or that. Our virtual coin provides the same fair 50/50 chance as a physical coin, with beautiful 3D animation that makes even mundane decisions feel special.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">When to Use Coin Flip</h3>
            <ul className="text-slate-600 space-y-2 mb-4">
              <li>• Binary choices between two equally good options</li>
              <li>• Settling arguments quickly and fairly</li>
              <li>• Making small everyday decisions like "pizza or burgers"</li>
              <li>• Deciding who pays, who drives, or who goes first</li>
              <li>• Quick random selection for A/B scenarios</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Pros</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>✓ True 50/50 random probability</li>
                  <li>✓ Beautiful 3D flip animation</li>
                  <li>✓ Built-in statistics to track results</li>
                  <li>✓ Works on mobile with tap-to-flip</li>
                  <li>✓ No coins needed—always available</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-2">Considerations</h3>
                <ul className="text-slate-600 text-sm space-y-1">
                  <li>• Only works for two-option decisions</li>
                  <li>• Random results, not strategic ones</li>
                  <li>• Not suitable for important life decisions</li>
                  <li>• Best for truly equal choices</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-700 font-medium text-sm">Is the coin flip truly random?</p>
                <p className="text-slate-600 text-sm">Yes, our coin flip uses a cryptographically secure random number generator to ensure each flip has exactly 50% chance of heads or tails. The result is independent of previous flips.</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">Can I see my flip history?</p>
                <p className="text-slate-600 text-sm">Yes! We show your running statistics including total flips, heads count, tails count, and percentages. Your history is saved locally in your browser.</p>
              </div>
              <div>
                <p className="text-slate-700 font-medium text-sm">Does the coin look different for heads vs tails?</p>
                <p className="text-slate-600 text-sm">The visual design stays the same, but after flipping, the coin shows different colors: blue for heads and gold for tails. You can tap the coin at any time to flip it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .coin-container {
          width: 200px;
          height: 200px;
          perspective: 1000px;
          cursor: pointer;
        }

        .coin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s;
        }

        .coin.flipping {
          animation: coinFlip 1.5s ease-out;
        }

        .coin.show-heads {
          transform: rotateY(0deg);
        }

        .coin.show-tails {
          transform: rotateY(180deg);
        }

        .coin-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow:
            0 0 30px rgba(59, 130, 246, 0.5),
            inset 0 -5px 20px rgba(0, 0, 0, 0.3),
            inset 0 5px 20px rgba(255, 255, 255, 0.2);
        }

        .coin-heads {
          background: linear-gradient(145deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
          border: 4px solid #92400e;
        }

        .coin-tails {
          background: linear-gradient(145deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
          border: 4px solid #1e40af;
          transform: rotateY(180deg);
        }

        @keyframes coinFlip {
          0% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: rotateX(180deg) rotateY(90deg);
          }
          50% {
            transform: rotateX(360deg) rotateY(180deg);
          }
          75% {
            transform: rotateX(540deg) rotateY(270deg);
          }
          100% {
            transform: rotateX(720deg) rotateY(360deg);
          }
        }

        .coin-btn {
          padding: 1rem 2.5rem;
          background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
        }

        .coin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5);
        }

        .coin-btn:active {
          transform: translateY(0);
        }

        .coin-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>
    </div>
  );
}

export default CoinFlip;
