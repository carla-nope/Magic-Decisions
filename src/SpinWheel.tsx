import { useState, useEffect, useCallback, useRef } from 'react'
import { Plus, Trash2, RefreshCw, Share2, Copy, Check, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react'
import './index.css'

interface SpinWheelProps {
  onNavigate?: (toolId: string) => void
}

interface WheelSegment {
  id: string;
  label: string;
  color: string;
}

const defaultColors = [
  '#8b5cf6', '#6366f1', '#a855f7', '#7c3aed', '#c084fc',
  '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#ec4899',
  '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'
];

function SpinWheel({ onNavigate }: SpinWheelProps) {
  const [segments, setSegments] = useState<WheelSegment[]>([
    { id: '1', label: 'Option 1', color: defaultColors[0] },
    { id: '2', label: 'Option 2', color: defaultColors[1] },
    { id: '3', label: 'Option 3', color: defaultColors[2] },
    { id: '4', label: 'Option 4', color: defaultColors[3] },
  ]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
  const [newOption, setNewOption] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Draw the wheel
  const drawWheel = useCallback((currentRotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const segmentAngle = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    segments.forEach((segment, index) => {
      const startAngle = currentRotation + index * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#1a1333';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Quicksand, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(segment.label.length > 15 ? segment.label.slice(0, 15) + '...' : segment.label, radius - 20, 5);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1333';
    ctx.fill();
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw pointer
    const pointerX = centerX;
    const pointerY = 15;
    ctx.beginPath();
    ctx.moveTo(pointerX - 15, pointerY);
    ctx.lineTo(pointerX, pointerY + 25);
    ctx.lineTo(pointerX + 15, pointerY);
    ctx.closePath();
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [segments]);

  // Initial draw
  useEffect(() => {
    drawWheel(rotation);
  }, [drawWheel, rotation]);

  // Spin animation
  const spin = useCallback(() => {
    if (isSpinning || segments.length < 2) return;

    setIsSpinning(true);
    setSelectedSegment(null);
    setShowConfetti(false);

    // Calculate spin
    const spinDuration = 4000 + Math.random() * 2000;
    const spinRotations = 5 + Math.random() * 3;
    const extraAngle = Math.random() * 360;
    const totalRotation = rotation + spinRotations * 2 * Math.PI + extraAngle;

    const startTime = Date.now();
    const startRotation = rotation;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);

      // Easing: cubic ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentRotation = startRotation + (totalRotation - startRotation) * easeOut;

      setRotation(currentRotation);
      drawWheel(currentRotation);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);

        // Determine winner - the segment at the TOP (pointer position at -PI/2)
        const segmentAngle = (2 * Math.PI) / segments.length;
        // Normalize rotation to 0-2PI range (clockwise positive)
        const normalizedRotation = ((currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Segment 0 starts at angle -PI/2 (top). After rotation, segment 0 is at (R - PI/2).
        // The pointer is at angle -PI/2 (top).
        // To find which segment is at -PI/2, we calculate how far the wheel has "passed" the top.
        // Each segment that passes the top adds segmentAngle.
        // winnerIndex = (segments.length - (normalizedRotation / segmentAngle)) % segments.length

        const segmentsPassed = normalizedRotation / segmentAngle;
        const winnerIndex = Math.floor((segments.length - segmentsPassed + 1000 * segments.length) % segments.length);
        const winner = segments[winnerIndex];

        setSelectedSegment(winner);
        setShowConfetti(true);

        setTimeout(() => setShowConfetti(false), 3000);
      }
    };

    // Play tick sound during spin
    if (soundEnabled) {
      let tickCount = 0;
      const tickInterval = setInterval(() => {
        tickCount++;
        if (tickCount > 30) clearInterval(tickInterval);
      }, spinDuration / 30);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isSpinning, segments, rotation, drawWheel, soundEnabled]);

  // Add new segment
  const addSegment = () => {
    if (!newOption.trim()) return;

    const newSegment: WheelSegment = {
      id: Date.now().toString(),
      label: newOption.trim(),
      color: defaultColors[segments.length % defaultColors.length]
    };

    setSegments([...segments, newSegment]);
    setNewOption('');
  };

  // Remove segment
  const removeSegment = (id: string) => {
    if (segments.length <= 2) return;
    setSegments(segments.filter(s => s.id !== id));
  };

  // Update segment label
  const updateSegmentLabel = (id: string, label: string) => {
    setSegments(segments.map(s => s.id === id ? { ...s, label } : s));
  };

  // Copy result
  const handleCopyResult = async () => {
    if (!selectedSegment) return;
    await navigator.clipboard.writeText(`🎡 The wheel chose: "${selectedSegment.label}"`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share result
  const handleShare = () => {
    if (!selectedSegment) return;
    const text = `🎡 Spin the wheel just chose: "${selectedSegment.label}"!`;
    if (navigator.share) {
      navigator.share({ title: 'Spin Wheel Results', text });
    } else {
      handleCopyResult();
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-cream-300 text-primary-500 text-sm mb-4">
            <RefreshCw className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-ink-800 font-display">
            Spin to Decide!
          </h1>
          <p className="text-[#A09080] max-w-md mx-auto">
            Add your options and let the wheel decide. Perfect for choices, giveaways, and picking winners!
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative mb-6">
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-20">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-confetti"
                  style={{
                    left: '50%',
                    top: '50%',
                    backgroundColor: defaultColors[i % defaultColors.length],
                    animationDelay: `${i * 0.05}s`,
                    transform: `rotate(${i * 30}deg)`
                  }}
                />
              ))}
            </div>
          )}

          {/* Canvas Wheel */}
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            className="max-w-full cursor-pointer"
            onClick={spin}
          />

          {/* Click hint */}
          {!isSpinning && !selectedSegment && (
            <p className="text-center text-[#A09080] text-sm mt-4">
              Click the wheel to spin!
            </p>
          )}
        </div>

        {/* Result Display */}
        {selectedSegment && !isSpinning && (
          <div className="text-center mb-6 animate-bounce-in">
            <div className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-highlight/10 border border-cream-300">
              <p className="text-sm text-[#A09080] mb-1">The wheel chose...</p>
              <p className="text-2xl md:text-3xl font-bold text-ink-800">
                {selectedSegment.label}
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
              <button onClick={() => { setSelectedSegment(null); spin(); }} className="share-btn">
                <RefreshCw className="w-4 h-4" />
                Spin Again
              </button>
            </div>
          </div>
        )}

        {/* Spin Button */}
        <button
          onClick={spin}
          disabled={isSpinning || segments.length < 2}
          className="mystical-btn flex items-center gap-2 mb-8"
        >
          <RefreshCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
        </button>

        {/* Options Editor */}
        <div className="w-full max-w-md">
          <div className="mystical-card p-4">
            <h3 className="text-lg font-semibold text-ink-800 mb-4 flex items-center gap-2">
              <span>Options ({segments.length})</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl hover:bg-secondary/10 transition-colors ml-auto"
                title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5 text-[#A09080]" /> : <VolumeX className="w-5 h-5 text-[#A09080]" />}
              </button>
            </h3>

            {/* Add new option */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSegment()}
                placeholder="Add a new option..."
                className="mystical-input flex-1 text-sm"
              />
              <button onClick={addSegment} className="mystical-btn px-4 text-sm">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Options list */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {segments.map((segment, index) => (
                <div
                  key={segment.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors"
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: segment.color }}
                  />
                  <input
                    type="text"
                    value={segment.label}
                    onChange={(e) => updateSegmentLabel(segment.id, e.target.value)}
                    className="flex-1 bg-transparent border-none text-[#5C5046] focus:outline-none text-sm"
                  />
                  <button
                    onClick={() => removeSegment(segment.id)}
                    disabled={segments.length <= 2}
                    className={`p-1.5 rounded-xl transition-colors ${
                      segments.length <= 2
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-highlight/10 text-highlight-500'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {segments.length < 2 && (
              <p className="text-center text-primary-400 text-sm mt-3">
                Add at least 2 options to spin
              </p>
            )}
          </div>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-16 mb-8">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-ink-800 mb-4 font-display">What is a Spin Wheel?</h2>
            <p className="text-[#6B5E4E] mb-4">
              A Spin Wheel is a customizable random selection tool that lets you create a wheel with any options you want. Just add your choices, give it a spin, and let fate decide. Perfect for making decisions fun and fair—whether you're picking a restaurant, choosing a game, or settling any debate.
            </p>

            <h3 className="text-lg font-semibold text-ink-800 mb-3">When to Use the Spin Wheel</h3>
            <ul className="text-[#6B5E4E] space-y-2 mb-4">
              <li>• Group decisions where everyone wants a fair chance</li>
              <li>• Choosing from multiple options without bias</li>
              <li>• Making boring decisions more exciting</li>
              <li>• Deciding who goes first in games or activities</li>
              <li>• Random selection for contests or giveaways</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-secondary-400 mb-2">Pros</h3>
                <ul className="text-[#6B5E4E] text-sm space-y-1">
                  <li>✓ Fully customizable with your own options</li>
                  <li>✓ Visual excitement makes decisions fun</li>
                  <li>✓ Fair and transparent selection process</li>
                  <li>✓ Works great for groups and parties</li>
                  <li>✓ Save and share your wheel configurations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-highlight-500 mb-2">Considerations</h3>
                <ul className="text-[#6B5E4E] text-sm space-y-1">
                  <li>• Results are random, not based on logic</li>
                  <li>• Best for low-stakes decisions</li>
                  <li>• May need to re-spin if same result repeats</li>
                  <li>• Works best with 3-12 options for visual clarity</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-ink-800 mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[#5C5046] font-medium text-sm">How do I create a custom wheel?</p>
                <p className="text-[#6B5E4E] text-sm">Type your option in the input field and click "Add" or press Enter. You can add as many options as you like. Each option will appear as a colored segment on the wheel.</p>
              </div>
              <div>
                <p className="text-[#5C5046] font-medium text-sm">Can I edit options after creating the wheel?</p>
                <p className="text-[#6B5E4E] text-sm">Yes! Click on any option text in the list to edit it. Changes will be reflected on the wheel immediately. You can also delete options by clicking the trash icon.</p>
              </div>
              <div>
                <p className="text-[#5C5046] font-medium text-sm">How fair is the spin?</p>
                <p className="text-[#6B5E4E] text-sm">The wheel uses a random spin animation that makes it difficult to predict the outcome. The final result is determined by where the wheel stops, which is influenced by the initial spin force and physics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-12 text-center text-[#A09080] text-sm">
          <p>Let the wheel guide your decisions</p>
        </div>

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 bg-gradient-to-br from-secondary/10 to-secondary/10 border border-cream-300 rounded-2xl">
            <h2 className="text-xl font-bold text-ink-800 mb-4 text-center font-display">
              Use the Spin Wheel to Teach Decision-Making
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              The Spin Wheel isn't just for decisions—it's a tool for teaching kids how to make choices. Let them add their own options, discuss why they chose them, and see what happens when choice is made for them. This builds flexibility, reduces decision fatigue, and makes the process less personal. When the wheel decides, it's not Mom's fault or Dad's preference—it's just chance. That's a valuable lesson in letting go of control.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12">
          <h2 className="text-xl font-semibold text-ink-800 mb-6 text-center font-display">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'D20 Roller', description: 'Roll for games, prompts, and playful choices', id: 'd20', emoji: '🎲' },
              { name: 'Coin Flip', description: 'Binary 50/50 decisions', id: 'coin', emoji: '🪙' },
              { name: 'Random Picker', description: 'Pick from your custom list', id: 'picker', emoji: '🎯' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="mystical-card p-4 text-center hover:shadow-md transition-all hover:border-secondary-400 cursor-pointer bg-transparent rounded-2xl"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold text-ink-800 mb-1">{tool.name}</h3>
                <p className="text-[#A09080] text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-secondary/10 to-secondary/10 border border-cream-300 rounded-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-secondary-400" />
            </div>
            <h2 className="text-xl font-bold text-ink-800 mb-3 font-display">
              Want to Help Kids Practice Confident Choices?
            </h2>
            <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-highlight-500 to-highlight-600 hover:from-highlight-600 hover:to-highlight-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-highlight-500/30"
            >
              Get the Free Decision Traps Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Footer spacer */}
        <div className="h-24" />
      </div>
    </div>
  );
}

export default SpinWheel;