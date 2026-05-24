import { useState, useCallback } from 'react';
import { Monitor, Clock, ArrowRight, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import { playMagicChime } from './lib/sounds';

interface ScreenSwapOption {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const screenSwapOptions: ScreenSwapOption[] = [
  { id: 'walk', title: 'Nature Walk', icon: '🌳', description: 'Explore outdoors and discover something new' },
  { id: 'read', title: 'Reading Time', icon: '📚', description: 'Cozy up with a favorite book' },
  { id: 'boardgame', title: 'Board Game', icon: '🎲', description: 'Fun for the whole family' },
  { id: 'art', title: 'Art & Crafts', icon: '🎨', description: 'Get creative with art supplies' },
  { id: 'cooking', title: 'Cook Together', icon: '🍳', description: 'Make a delicious snack or meal' },
  { id: 'puzzle', title: 'Puzzle Time', icon: '🧩', description: 'Solve a puzzle together' },
  { id: 'music', title: 'Music Jam', icon: '🎵', description: 'Dance, sing, or play instruments' },
  { id: 'garden', title: 'Garden Time', icon: '🌱', description: 'Tend to plants or flowers' },
  { id: 'playground', title: 'Playground', icon: '🛝', description: 'Run, climb, and have fun' },
  { id: 'cards', title: 'Card Games', icon: '🃏', description: 'Classic card game fun' },
  { id: 'lego', title: 'Build with LEGO', icon: '🏗️', description: 'Build something amazing' },
  { id: 'biking', title: 'Bike Ride', icon: '🚴', description: 'Get some exercise together' },
  { id: 'stargaze', title: 'Stargazing', icon: '🌟', description: 'Look at the night sky' },
  { id: 'science', title: 'Science Fun', icon: '🔬', description: 'Do a simple experiment' },
  { id: 'dramatic', title: 'Pretend Play', icon: '🎭', description: 'Act out a story together' },
  { id: 'outdoor', title: 'Scavenger Hunt', icon: '🔍', description: 'Find hidden treasures' },
];

const screenTimeAmounts = [
  { minutes: 15, label: '15 min' },
  { minutes: 30, label: '30 min' },
  { minutes: 45, label: '45 min' },
  { minutes: 60, label: '1 hour' },
  { minutes: 90, label: '1.5 hours' },
  { minutes: 120, label: '2 hours' },
];

export default function ScreenTimeSwap() {
  const { soundEnabled } = useTheme();
  const [selectedMinutes, setSelectedMinutes] = useState(screenTimeAmounts[1]); // 30 min default
  const [currentSwap, setCurrentSwap] = useState<ScreenSwapOption | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [swapHistory, setSwapHistory] = useState<{ option: ScreenSwapOption; minutes: number }[]>([]);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentSwap(null);

    if (soundEnabled) {
      playMagicChime();
    }

    // Spinning animation
    const spinDuration = 1500;
    const spinInterval = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += spinInterval;
      const randomOption = screenSwapOptions[Math.floor(Math.random() * screenSwapOptions.length)];
      setCurrentSwap(randomOption);

      if (elapsed >= spinDuration) {
        clearInterval(interval);
        const finalOption = screenSwapOptions[Math.floor(Math.random() * screenSwapOptions.length)];
        setCurrentSwap(finalOption);
        setIsSpinning(false);
        setSwapHistory(prev => [{ option: finalOption, minutes: selectedMinutes.minutes }, ...prev].slice(0, 10));
      }
    }, spinInterval);
  }, [isSpinning, soundEnabled, selectedMinutes]);

  const clearHistory = () => setSwapHistory([]);

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm mb-4">
            <Monitor className="w-4 h-4" />
            Screen Time Manager
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Screen Time Swap
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Trade screen time for real-world adventures! Pick how much time and spin for an activity.
          </p>
        </div>

        {/* Amount Selector */}
        <div className="w-full max-w-md mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
            How much screen time?
          </label>
          <div className="flex flex-wrap justify-center gap-2">
            {screenTimeAmounts.map((amount) => (
              <button
                key={amount.minutes}
                onClick={() => setSelectedMinutes(amount)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  selectedMinutes.minutes === amount.minutes
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                }`}
              >
                {amount.label}
              </button>
            ))}
          </div>
        </div>

        {/* Swap Display */}
        <div className="relative mb-8">
          {/* Spinning indicator */}
          <div className={`w-64 h-64 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-emerald-200 flex items-center justify-center ${isSpinning ? 'animate-pulse' : ''}`}>
            {currentSwap ? (
              <div className="text-center animate-fade-in">
                <span className="text-6xl mb-2 block">{currentSwap.icon}</span>
                <h3 className="font-bold text-slate-800 text-lg">{currentSwap.title}</h3>
                <p className="text-slate-500 text-sm mt-1">{currentSwap.description}</p>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <Clock className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Spin to find an activity</p>
              </div>
            )}
          </div>

          {/* Glow effect when result shown */}
          {currentSwap && !isSpinning && (
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-xl -z-10 animate-pulse" />
          )}
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="mystical-btn flex items-center gap-2 mb-8"
        >
          <Sparkles className="w-5 h-5" />
          {isSpinning ? 'Swapping...' : `Swap ${selectedMinutes.minutes} min for an Activity`}
        </button>

        {/* Swap Summary */}
        {currentSwap && !isSpinning && (
          <div className="mystical-card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 w-full max-w-md animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Instead of</p>
                <p className="font-semibold text-slate-800">{selectedMinutes.label} screen time</p>
              </div>
            </div>
            <div className="flex items-center justify-center my-4">
              <ArrowRight className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-4xl">
                {currentSwap.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-500">Try this instead</p>
                <p className="font-semibold text-slate-800">{currentSwap.title}</p>
              </div>
            </div>
          </div>
        )}

        {/* History */}
        {swapHistory.length > 0 && (
          <div className="w-full max-w-md mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-700">Recent Swaps</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            </div>
            <div className="space-y-2">
              {swapHistory.map((item, idx) => (
                <div key={idx} className="mystical-card p-3 flex items-center gap-3">
                  <span className="text-2xl">{item.option.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{item.option.title}</p>
                    <p className="text-xs text-slate-500">{item.minutes} min traded</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips for Parents */}
        <div className="w-full max-w-2xl mt-12 px-4">
          <div className="mystical-card p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
              Tips for Screen Time Swaps
            </h2>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✨</span>
                <span>Let kids pick from the wheel themselves — ownership increases cooperation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✨</span>
                <span>Make the swap feel like an exciting trade, not a punishment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✨</span>
                <span>Join in! Parents who participate create stronger family bonds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500">✨</span>
                <span>Build up to longer activities gradually — start with 15 minutes</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-24" />
      </div>
    </div>
  );
}