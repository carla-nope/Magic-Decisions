import { useState, useCallback } from 'react'
import { User, Plus, Trash2, RefreshCw, Copy, Check, Share2, Shuffle, Users, Sparkles, ArrowRight } from 'lucide-react'
import './index.css'

interface NamePickerProps {
  onNavigate?: (toolId: string) => void
}

function NamePicker({ onNavigate }: NamePickerProps) {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState('');
  const [isPicking, setIsPicking] = useState(false);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [pickedNames, setPickedNames] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mode, setMode] = useState<'pick-one' | 'assign-teams'>('pick-one');
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<Record<string, string[]>>({});

  // Add name
  const addName = useCallback(() => {
    if (!newName.trim()) return;
    if (names.includes(newName.trim())) {
      setNewName('');
      return;
    }
    setNames([...names, newName.trim()]);
    setNewName('');
  }, [newName, names]);

  // Add multiple names (from paste)
  const addMultipleNames = (text: string) => {
    const newNames = text
      .split(/[\n,]+/)
      .map(n => n.trim())
      .filter(n => n && !names.includes(n));
    if (newNames.length > 0) {
      setNames([...names, ...newNames]);
    }
  };

  // Remove name
  const removeName = (name: string) => {
    setNames(names.filter(n => n !== name));
  };

  // Pick random name
  const pickRandom = useCallback(() => {
    if (isPicking || names.length < 1) return;

    setIsPicking(true);
    setSelectedName(null);
    setShowConfetti(false);

    // Animation
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Random selection during animation
      const randomIndex = Math.floor(Math.random() * names.length);
      setSelectedName(names[randomIndex]);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Final selection
        const finalName = names[Math.floor(Math.random() * names.length)];
        setSelectedName(finalName);
        setPickedNames([...pickedNames, finalName]);
        setIsPicking(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    };

    requestAnimationFrame(animate);
  }, [isPicking, names, pickedNames]);

  // Assign teams
  const assignTeams = useCallback(() => {
    if (names.length < 2 || teamCount < 2) return;

    setIsPicking(true);

    // Shuffle names
    const shuffled = [...names].sort(() => Math.random() - 0.5);

    // Distribute to teams
    const newTeams: Record<string, string[]> = {};
    for (let i = 0; i < teamCount; i++) {
      newTeams[`Team ${String.fromCharCode(65 + i)}`] = [];
    }

    shuffled.forEach((name, index) => {
      const teamIndex = index % teamCount;
      const teamName = `Team ${String.fromCharCode(65 + teamIndex)}`;
      newTeams[teamName].push(name);
    });

    // Animate distribution
    setTimeout(() => {
      setTeams(newTeams);
      setIsPicking(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  }, [names, teamCount]);

  // Reset
  const resetAll = () => {
    setNames([]);
    setSelectedName(null);
    setPickedNames([]);
    setTeams({});
  };

  // Copy result
  const handleCopyResult = async () => {
    if (!selectedName) return;
    const text = `🎯 Random Name Picker chose: "${selectedName}"`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share result
  const handleShare = () => {
    if (!selectedName) return;
    const text = `🎯 Random Name Picker just picked "${selectedName}"!`;
    if (navigator.share) {
      navigator.share({ title: 'Random Name Picker', text });
    } else {
      handleCopyResult();
    }
  };

  // Copy teams
  const handleCopyTeams = async () => {
    let text = 'Team Assignment:\n';
    Object.entries(teams).forEach(([team, members]) => {
      text += `${team}: ${members.join(', ')}\n`;
    });
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="fixed inset-0 stars pointer-events-none opacity-50" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-sm mb-4">
            <User className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-2 text-ink-800">
            Pick a Random Name!
          </h1>
          <p className="text-[#6B5E4E] max-w-md mx-auto">
            Perfect for giveaways, classrooms, teams, and making fair decisions!
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('pick-one'); setTeams({}); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === 'pick-one'
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 inline mr-1" /> Pick One
          </button>
          <button
            onClick={() => { setMode('assign-teams'); setSelectedName(null); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === 'assign-teams'
                ? 'bg-rose-100 text-rose-700 border border-rose-200'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 inline mr-1" /> Teams
          </button>
        </div>

        {/* Main Display */}
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
                    backgroundColor: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#a855f7'][i % 5],
                    borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Pick One Result */}
          {mode === 'pick-one' && (
            <div className={`mystical-card p-8 text-center transition-all duration-300 ${isPicking ? 'animate-pulse' : ''}`}>
              {selectedName ? (
                <div className="animate-bounce-in">
                  <span className="text-5xl mb-4 block">🎯</span>
                  <p className="text-sm text-gray-400 mb-2">The picker chose...</p>
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    {selectedName}
                  </p>
                  {!isPicking && (
                    <p className="text-sm text-rose-400 mt-2">
                      {names.length - pickedNames.length} names remaining
                    </p>
                  )}
                </div>
              ) : isPicking ? (
                <div className="py-8">
                  <div className="w-16 h-16 mx-auto border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
                  <p className="text-gray-400 mt-4">Picking...</p>
                </div>
              ) : (
                <div className="py-8">
                  <span className="text-5xl mb-4 block">👆</span>
                  <p className="text-gray-400">
                    {names.length > 0 ? 'Click "Pick Winner" to choose!' : 'Add some names first!'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Teams Display */}
          {mode === 'assign-teams' && (
            <div className="mystical-card p-6">
              {Object.keys(teams).length > 0 ? (
                <div className="animate-bounce-in">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">Teams Assigned!</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(teams).map(([team, members]) => (
                      <div key={team} className="bg-white/5 rounded-xl p-3">
                        <h4 className="font-bold text-rose-400 mb-2">{team}</h4>
                        <ul className="space-y-1">
                          {members.map((member, i) => (
                            <li key={i} className="text-gray-300 text-sm">• {member}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ) : isPicking ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 mx-auto border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
                  <p className="text-gray-400 mt-4">Assigning teams...</p>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <span className="text-5xl mb-4 block">👥</span>
                  <p className="text-gray-400">
                    {names.length >= 2 ? 'Click "Assign Teams" to shuffle!' : 'Add at least 2 names!'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Result Actions */}
          {selectedName && !isPicking && mode === 'pick-one' && (
            <div className="flex items-center gap-3 justify-center mt-4 animate-fade-in">
              <button onClick={handleShare} className="share-btn">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button onClick={handleCopyResult} className="share-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={pickRandom} className="share-btn">
                <Shuffle className="w-4 h-4" />
                Pick Again
              </button>
            </div>
          )}

          {Object.keys(teams).length > 0 && !isPicking && (
            <div className="flex items-center gap-3 justify-center mt-4 animate-fade-in">
              <button onClick={handleCopyTeams} className="share-btn">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Teams'}
              </button>
              <button onClick={assignTeams} className="share-btn">
                <Shuffle className="w-4 h-4" />
                Re-shuffle
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {mode === 'pick-one' ? (
          <button
            onClick={pickRandom}
            disabled={isPicking || names.length < 1}
            className="name-btn flex items-center gap-2 mb-6"
          >
            <User className={`w-5 h-5 ${isPicking ? 'animate-pulse' : ''}`} />
            {isPicking ? 'Picking...' : 'Pick Winner'}
          </button>
        ) : (
          <div className="flex gap-3 mb-6">
            <select
              value={teamCount}
              onChange={(e) => setTeamCount(Number(e.target.value))}
              className="mystical-input text-sm px-3 py-2"
              disabled={isPicking}
            >
              {[2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n} Teams</option>
              ))}
            </select>
            <button
              onClick={assignTeams}
              disabled={isPicking || names.length < 2}
              className="name-btn flex items-center gap-2"
            >
              <Users className={`w-5 h-5 ${isPicking ? 'animate-pulse' : ''}`} />
              {isPicking ? 'Assigning...' : 'Assign Teams'}
            </button>
          </div>
        )}

        {/* Names Input */}
        <div className="w-full max-w-lg">
          <div className="mystical-card p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
              <span>Names ({names.length})</span>
              {names.length > 0 && (
                <button
                  onClick={resetAll}
                  className="text-sm text-rose-400 hover:text-rose-300"
                >
                  Clear All
                </button>
              )}
            </h3>

            {/* Add single name */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addName()}
                placeholder="Enter a name..."
                className="mystical-input flex-1 text-sm"
              />
              <button onClick={addName} className="name-btn px-4 text-sm">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Bulk add */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Or paste multiple names (one per line):</p>
              <textarea
                onBlur={(e) => addMultipleNames(e.target.value)}
                placeholder="Name 1&#10;Name 2&#10;Name 3..."
                className="mystical-input w-full h-20 text-sm resize-none"
              />
            </div>

            {/* Names grid */}
            {names.length > 0 && (
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {names.map((name, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
                      pickedNames.includes(name) && mode === 'pick-one'
                        ? 'bg-gray-500/30 text-gray-500 line-through'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {name}
                    <button
                      onClick={() => removeName(name)}
                      className="hover:text-red-400 ml-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {names.length === 0 && (
              <p className="text-center text-gray-500 text-sm">
                No names added yet. Add some above!
              </p>
            )}
          </div>
        </div>

        {/* Content Section for SEO */}
        <div className="w-full max-w-3xl mt-8 pb-24">
          <div className="mystical-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">What is a Name Picker?</h2>
            <p className="text-gray-400 mb-4">
              A Name Picker is a versatile tool for randomly selecting names from a list. It can pick a single winner or randomly assign people to teams. Perfect for classrooms, offices, game nights, or anywhere you need a fair selection without bias. Add names manually or paste a whole list at once.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">When to Use the Name Picker</h3>
            <ul className="text-gray-400 space-y-2 mb-4">
              <li>• Selecting winners for giveaways or raffles</li>
              <li>• Randomly assigning people to teams</li>
              <li>• Choosing who goes first in games</li>
              <li>• Classroom activities or group projects</li>
              <li>• Office decisions where everyone deserves equal chance</li>
            </ul>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Pros</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>✓ Pick single names or assign to teams</li>
                  <li>✓ Add names one-by-one or bulk paste</li>
                  <li>✓ Automatically removes picked names (optional)</li>
                  <li>✓ Copy results or share with friends</li>
                  <li>✓ Fair and unbiased selection every time</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-rose-400 mb-2">Considerations</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Need to add names before picking</li>
                  <li>• Team assignment is random, not balanced</li>
                  <li>• Duplicate names are automatically ignored</li>
                  <li>• Best for smaller groups (under 50 names)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h3>
            <div className="space-y-3">
              <div>
                <p className="text-rose-300 font-medium text-sm">How do I add multiple names at once?</p>
                <p className="text-gray-400 text-sm">Use the "paste multiple names" text area. Enter names separated by commas or new lines, then click outside the box to add them all at once.</p>
              </div>
              <div>
                <p className="text-rose-300 font-medium text-sm">Can I use this for team assignments?</p>
                <p className="text-gray-400 text-sm">Yes! Switch to "Teams" mode, select how many teams you want (2-8), and click "Assign Teams". Names will be randomly shuffled and distributed across all teams.</p>
              </div>
              <div>
                <p className="text-rose-300 font-medium text-sm">How does the picked names feature work?</p>
                <p className="text-gray-400 text-sm">In "Pick One" mode, names that have been selected are grayed out and crossed off. This helps you keep track of who has already been picked, especially useful for multiple rounds.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12">
          <div className="mystical-card p-6 bg-cream-50 border-cream-300">
            <h2 className="text-xl font-bold font-display text-ink-800 mb-4 text-center">
              Use the Name Picker to Teach Fairness and Equity
            </h2>
            <p className="text-[#6B5E4E] text-center mb-4">
              The Name Picker demonstrates what true fairness looks like: each name has an equal chance of being selected, with no manipulation or bias. When kids use this tool for choosing teams or picking partners, they're experiencing randomization as a fairness mechanism. This builds understanding that some decisions should be left to chance not because it's arbitrary, but because it's the most equitable approach. Adults can extend this by discussing how randomization is used in lottery systems,公平的 randomized selection in hiring, and democratic processes.
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
              { name: 'Random Picker', description: 'Pick from any list of options', id: 'picker', emoji: '🎯' },
              { name: 'D20 Roller', description: 'Roll for creative prompts and games', id: 'd20', emoji: '🎲' },
              { name: 'Spin Wheel', description: 'Visual wheel for multi-option choices', id: 'spin', emoji: '🎡' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate?.(tool.id)}
                className="mystical-card p-4 text-center hover:shadow-md transition-all hover:border-rose-400 cursor-pointer bg-transparent"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold text-slate-800 mb-1">{tool.name}</h3>
                <p className="text-slate-500 text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8">
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              Want to Help Kids Understand Fair Decision-Making?
            </h2>
            <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-rose-500/30"
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
        .name-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #f43f5e 0%, #ec4899 100%);
          border: none;
          border-radius: 2rem;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'Quicksand', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(244, 63, 94, 0.4);
        }

        .name-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 30px rgba(244, 63, 94, 0.5);
        }

        .name-btn:active {
          transform: translateY(0);
        }

        .name-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default NamePicker;
