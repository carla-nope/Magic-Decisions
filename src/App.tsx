import { useState, useEffect, useCallback } from 'react'
import { Sparkles, History, Share2, Copy, Check, RefreshCw, Trash2, Circle, CircleDot, Lightbulb, UtensilsCrossed, Hand, User, Home, Shield, FileText, Info, Mail, BookOpen, Wand2, Shirt, Brain, Target, CreditCard, Flame, Dices, ArrowRight, Moon, Sun, Volume2, VolumeX, Monitor } from 'lucide-react'
import SpinWheel from './SpinWheel'
import CoinFlip from './CoinFlip'
import RandomPicker from './RandomPicker'
import ActivityPicker from './ActivityPicker'
import DinnerDecider from './DinnerDecider'
import RockPaperScissors from './RockPaperScissors'
import NamePicker from './NamePicker'
import LandingPage from './LandingPage'
import BlogPage from './BlogPage'
import BlogPost from './BlogPost'
import UsernameGenerator from './UsernameGenerator'
import OutfitIdeaGenerator from './OutfitIdeaGenerator'
import MaximizerQuiz from './MaximizerQuiz'
import CognitiveBiasTest from './CognitiveBiasTest'
import ShouldIBuyItCalculator from './ShouldIBuyItCalculator'
import MagicChores from './MagicChores'
import D20Roller from './D20Roller'
import ScreenTimeSwap from './ScreenTimeSwap'
import SEOContent from './SEOContent'
import { PrivacyPolicy, TermsConditions, AboutPage, ContactPage } from './LegalPages'
import { useTheme } from './contexts/ThemeContext'
import './index.css'

type Tool = 'home' | 'oracle' | 'spin' | 'coin' | 'picker' | 'activity' | 'dinner' | 'rps' | 'names' | 'username' | 'outfit' | 'maximizer' | 'bias' | 'buyit' | 'chores' | 'd20' | 'screentime' | 'blog' | 'blogpost' | 'privacy' | 'terms' | 'about' | 'contact'

interface HistoryItem {
  id: number;
  question: string;
  answer: 'yes' | 'no' | 'maybe';
  timestamp: Date;
}

const answers = ['yes', 'no', 'maybe'] as const;
const answerTexts = {
  yes: ['Yes!', 'Definitely Yes!', 'Absolutely!', 'The spirits say YES!'],
  no: ['No!', 'Definitely Not!', 'The spirits say NO!', 'Absolutely Not!'],
  maybe: ['Ask Again...', 'The spirits are uncertain...', 'Maybe...', 'The mists are unclear...']
};

function YesNoOracle() {
  const [question, setQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState<'yes' | 'no' | 'maybe' | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stars, setStars] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('yesNoOracleHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setHistory(parsed.map((item: HistoryItem) => ({
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
      localStorage.setItem('yesNoOracleHistory', JSON.stringify(history));
    }
  }, [history]);

  const getRandomAnswer = useCallback(() => {
    return answers[Math.floor(Math.random() * answers.length)];
  }, []);

  const getAnswerText = useCallback((answer: 'yes' | 'no' | 'maybe') => {
    const texts = answerTexts[answer];
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  const handleAskOracle = useCallback(() => {
    if (!question.trim()) return;

    setIsShaking(true);
    setCurrentAnswer(null);
    setIsRevealing(false);

    setTimeout(() => {
      setIsShaking(false);
      const answer = getRandomAnswer();
      setIsRevealing(true);

      const newItem: HistoryItem = {
        id: Date.now(),
        question: question.trim(),
        answer,
        timestamp: new Date()
      };
      setHistory(prev => [newItem, ...prev].slice(0, 20));

      setTimeout(() => {
        setCurrentAnswer(answer);
        setIsRevealing(false);
      }, 500);
    }, 600);
  }, [question, getRandomAnswer]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isShaking) {
      handleAskOracle();
    }
  }, [handleAskOracle, isShaking]);

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('yesNoOracleHistory');
  };

  const handleCopyResult = async () => {
    if (!currentAnswer || !question) return;
    const text = `🔮 Magic Oracle says: "${getAnswerText(currentAnswer)}"\nQuestion: "${question}"`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (!currentAnswer || !question) return;
    const text = `🔮 Magic Oracle says: "${getAnswerText(currentAnswer)}" to: "${question}"`;
    if (navigator.share) {
      navigator.share({
        title: 'Magic Yes No Oracle',
        text
      });
    } else {
      handleCopyResult();
    }
  };

  const answerClass = currentAnswer || '';

  return (
    <div className="min-h-screen relative">
      <div className="stars-bg" />
      <div className="stars">
        {stars.map((star, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            Decision Maker
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-slate-800">
            Ask the Crystal Ball
          </h1>
          <p className="text-slate-500 max-w-md mx-auto">
            Enter your question below, focus, and click the orb to reveal your answer.
          </p>
        </div>

        <div className="relative mb-8">
          <div className="particles">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>

          <div
            className={`crystal-orb ${isShaking ? 'shaking' : ''}`}
            onClick={handleAskOracle}
            role="button"
            tabIndex={0}
            onKeyPress={handleKeyPress}
            aria-label="Ask the oracle"
          >
            <div className="orb-inner">
              {currentAnswer && !isRevealing ? (
                <span className={`text-4xl z-10 ${answerClass === 'yes' ? 'text-emerald-400' : answerClass === 'no' ? 'text-red-400' : 'text-amber-400'}`}>
                  {answerClass === 'yes' ? '✨' : answerClass === 'no' ? '❌' : '🌫️'}
                </span>
              ) : (
                <span className="text-4xl z-10">🔮</span>
              )}
            </div>
          </div>

          {!currentAnswer && !isShaking && (
            <p className="text-center text-slate-400 text-sm mt-4">
              Click the orb to reveal your answer
            </p>
          )}
        </div>

        <div className="w-full max-w-md mb-6">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What do you want to know?"
            className="mystical-input text-center"
            disabled={isShaking}
          />
        </div>

        <button
          onClick={handleAskOracle}
          disabled={!question.trim() || isShaking}
          className="mystical-btn flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isShaking ? 'Consulting the Spirits...' : 'Ask the Oracle'}
        </button>

        {currentAnswer && !isRevealing && (
          <div className="answer-display mt-8 animate-fade-in">
            <div className={`answer-text ${answerClass} glow-pulse`}>
              {getAnswerText(currentAnswer)}
            </div>
          </div>
        )}

        {currentAnswer && !isRevealing && (
          <div className="flex items-center gap-3 mt-6 animate-fade-in">
            <button onClick={handleShare} className="share-btn">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button onClick={handleCopyResult} className="share-btn">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => {
                setCurrentAnswer(null);
                setQuestion('');
              }}
              className="share-btn"
            >
              <RefreshCw className="w-4 h-4" />
              New Question
            </button>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-12 w-full max-w-md">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mx-auto"
            >
              <History className="w-5 h-5" />
              <span>Previous Consultations ({history.length})</span>
            </button>

            {showHistory && (
              <div className="mystical-card p-4 mt-4 max-h-64 overflow-y-auto">
                {history.map((item) => (
                  <div key={item.id} className="history-item mb-2 last:mb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 truncate">{item.question}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`text-sm font-semibold flex-shrink-0 ${
                          item.answer === 'yes'
                            ? 'text-emerald-600'
                            : item.answer === 'no'
                            ? 'text-red-500'
                            : 'text-amber-500'
                        }`}
                      >
                        {item.answer === 'yes' ? 'YES' : item.answer === 'no' ? 'NO' : 'MAYBE'}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleClearHistory}
                  className="flex items-center gap-1 text-red-400/70 hover:text-red-500 text-sm mt-3 mx-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </button>
              </div>
            )}
          </div>
        )}

        {/* Parent/Family Teaching Moment */}
        <div className="w-full max-w-2xl mb-12 px-4">
          <div className="mystical-card p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4 text-center">
              Use the Crystal Ball to Teach Intuition and Reflection
            </h2>
            <p className="text-slate-600 text-center mb-4">
              The Yes No Oracle isn't just about random answers—it's a tool for reflection. Before asking, have kids notice what they hope the answer will be. If they're hoping for "yes" but get "no," that's valuable self-knowledge. This builds emotional awareness and helps kids recognize when they're seeking validation versus truly weighing options. The crystal ball creates space to explore intuition without judgment.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="w-full max-w-4xl mb-12 px-4">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
            Try More Free Decision Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'D20 Roller', description: 'Roll for games, prompts, and playful choices', id: 'd20', emoji: '🎲' },
              { name: 'Spin Wheel', description: 'Visual wheel for multi-option choices', id: 'spin', emoji: '🎡' },
              { name: 'Coin Flip', description: 'Binary 50/50 decisions', id: 'coin', emoji: '🪙' },
              { name: 'Magic Chores', description: 'Gamify tasks with rewards', id: 'chores', emoji: '🔥' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  const setActiveTool = (window as any).__setActiveTool;
                  if (setActiveTool) setActiveTool(tool.id);
                }}
                className="mystical-card p-4 text-center hover:shadow-md transition-all hover:border-emerald-400 cursor-pointer bg-transparent"
              >
                <span className="text-3xl mb-2 block">{tool.emoji}</span>
                <h3 className="font-semibold text-slate-800 mb-1">{tool.name}</h3>
                <p className="text-slate-500 text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Magnet CTA */}
        <div className="w-full max-w-2xl mb-8 px-4">
          <div className="mystical-card p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-3">
              Want to Help Kids Practice Confident Choices?
            </h2>
            <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
              Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
            </p>
            <a
              href="https://go.magicdecisions.com/dt1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-full font-semibold transition-all shadow-lg hover:shadow-emerald-500/30"
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

function App() {
  const { theme, toggleTheme, soundEnabled, toggleSound } = useTheme();
  const [activeTool, setActiveTool] = useState<Tool>('home');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [blogPostSlug, setBlogPostSlug] = useState<string | null>(null);

  // Sync activeTool from URL on mount and browser back/forward
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const initial = pathToTool[path] || 'home';
    setActiveTool(initial);
  }, []);

  // Update URL when activeTool changes
  useEffect(() => {
    const path = toolToPath[activeTool];
    if (path) {
      window.history.replaceState(null, '', '/' + path);
    } else {
      window.history.replaceState(null, '', '/');
    }
  }, [activeTool]);

  const toolCategories = [
    {
      id: 'simple',
      name: 'Quick Tools',
      icon: Sparkles,
      color: 'teal',
      tools: [
        { id: 'oracle' as Tool, name: 'Yes No Oracle', icon: Sparkles, color: 'teal' },
        { id: 'd20' as Tool, name: 'D20 Roller', icon: Dices, color: 'gold' },
        { id: 'spin' as Tool, name: 'Spin Wheel', icon: RefreshCw, color: 'gold' },
        { id: 'rps' as Tool, name: 'Rock Paper Scissors', icon: Hand, color: 'coral' },
        { id: 'coin' as Tool, name: 'Coin Flip', icon: Circle, color: 'teal' },
        { id: 'picker' as Tool, name: 'Random Picker', icon: CircleDot, color: 'teal' },
        { id: 'screentime' as Tool, name: 'Screen Swap', icon: Monitor, color: 'teal' },
      ]
    },
    {
      id: 'picks',
      name: 'Quick Picks',
      icon: Wand2,
      color: 'gold',
      tools: [
        { id: 'activity' as Tool, name: 'Activity Picker', icon: Lightbulb, color: 'gold' },
        { id: 'dinner' as Tool, name: 'Dinner Decider', icon: UtensilsCrossed, color: 'coral' },
        { id: 'outfit' as Tool, name: 'Outfit Picker', icon: Shirt, color: 'coral' },
        { id: 'username' as Tool, name: 'Username Picker', icon: Wand2, color: 'teal' },
        { id: 'names' as Tool, name: 'Name Picker', icon: User, color: 'coral' },
      ]
    },
    {
      id: 'chores',
      name: 'Magic Chores',
      icon: Flame,
      color: 'coral',
      tools: [
        { id: 'chores' as Tool, name: 'Magic Chores', icon: Flame, color: 'coral' },
        { id: 'screentime' as Tool, name: 'Screen Swap', icon: Monitor, color: 'teal' },
      ]
    },
    {
      id: 'psychology',
      name: 'Psychology',
      icon: Brain,
      color: 'teal',
      tools: [
        { id: 'maximizer' as Tool, name: 'Decision Style', icon: Brain, color: 'teal' },
        { id: 'bias' as Tool, name: 'Bias Test', icon: Target, color: 'gold' },
        { id: 'buyit' as Tool, name: 'Should I Buy It', icon: CreditCard, color: 'teal' },
        { id: 'blog' as Tool, name: 'Blog', icon: BookOpen, color: 'teal' },
      ]
    },
    {
      id: 'more',
      name: 'More',
      icon: Info,
      color: 'teal',
      tools: [
        { id: 'about' as Tool, name: 'About', icon: Info, color: 'teal' },
        { id: 'contact' as Tool, name: 'Contact', icon: Mail, color: 'teal' },
        { id: 'privacy' as Tool, name: 'Privacy', icon: Shield, color: 'teal' },
        { id: 'terms' as Tool, name: 'Terms', icon: FileText, color: 'gold' },
      ]
    }
  ];

const pathToTool: Record<string, Tool> = {
  'yes-no-oracle': 'oracle',
  'spin-the-wheel': 'spin',
  'coin-flip': 'coin',
  'random-picker': 'picker',
  'random-activity-picker': 'activity',
  'what-to-eat-randomizer': 'dinner',
  'rock-paper-scissors': 'rps',
  'random-name-generator': 'names',
  'random-username-generator': 'username',
  'what-to-wear-randomizer': 'outfit',
  'magic-chores-list': 'chores',
  'screen-time-swap': 'screentime',
  'decision-maximizer': 'maximizer',
  'cognitive-bias-checker': 'bias',
  'should-i-buy-it-calculator': 'buyit',
  'about-us': 'about',
  'privacy-policy': 'privacy',
  'terms-of-service': 'terms',
  'd20-roller': 'd20',
};

const toolToPath: Record<Tool, string> = {
  oracle: 'yes-no-oracle',
  spin: 'spin-the-wheel',
  coin: 'coin-flip',
  picker: 'random-picker',
  activity: 'random-activity-picker',
  dinner: 'what-to-eat-randomizer',
  rps: 'rock-paper-scissors',
  names: 'random-name-generator',
  username: 'random-username-generator',
  outfit: 'what-to-wear-randomizer',
  chores: 'magic-chores-list',
  screentime: 'screen-time-swap',
  maximizer: 'decision-maximizer',
  bias: 'cognitive-bias-checker',
  buyit: 'should-i-buy-it-calculator',
  about: 'about-us',
  privacy: 'privacy-policy',
  terms: 'terms-of-service',
  d20: 'd20-roller',
  home: '',
  contact: 'contact',
  blog: 'blog',
  blogpost: 'blog',
};

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string }> = {
      teal:  { bg: 'bg-secondary/10',   border: 'border-secondary/20',   text: 'text-secondary-600', hover: 'hover:bg-secondary/5' },
      gold:  { bg: 'bg-primary/10',     border: 'border-primary/20',     text: 'text-primary-600',   hover: 'hover:bg-primary/5' },
      coral: { bg: 'bg-highlight/10',    border: 'border-highlight/20',   text: 'text-highlight-500', hover: 'hover:bg-highlight/5' },
    };
    return colors[color] || colors.teal;
  };

  return (
    <div>
      {/* Navigation - Warm Paper Theme */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream-50/95 backdrop-blur-sm border-b border-cream-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTool('home')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">🔮</span>
              <span className="font-semibold font-display text-ink-800 text-lg hidden sm:inline">Magic Decisions</span>
            </button>

            {/* Theme & Sound Toggles */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleSound}
                className="p-2 rounded-xl text-[#A09080] hover:text-ink-800 hover:bg-primary/10 transition-all"
                title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-[#A09080] hover:text-ink-800 hover:bg-primary/10 transition-all"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {/* Category Dropdowns */}
            <div className="flex items-center gap-1">
              {toolCategories.map((category) => {
                const Icon = category.icon
                const isActive = category.tools.some(t => activeTool === t.id)
                return (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <button
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold font-display transition-all ${
                        isActive
                          ? 'bg-primary/10 text-primary-600'
                          : 'text-[#6B5E4E] hover:text-ink-800 hover:bg-primary/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{category.name}</span>
                      <svg className="w-3 h-3 hidden md:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {hoveredCategory === category.id && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-cream-50 rounded-2xl shadow-warm-lg border border-cream-300 py-2 z-50 animate-fade-in">
                        {category.tools.map((tool) => {
                          const ToolIcon = tool.icon
                          const colors = getColorClasses(tool.color)
                          return (
                            <button
                              key={tool.id}
                              onClick={() => setActiveTool(tool.id)}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors font-display ${
                                activeTool === tool.id
                                  ? `${colors.bg} ${colors.text}`
                                  : 'text-[#6B5E4E] hover:bg-primary/5 hover:text-ink-800'
                              }`}
                            >
                              <ToolIcon className="w-4 h-4" />
                              <span>{tool.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Tool Content */}
      <div className="pt-16">
        {activeTool === 'home' && <LandingPage onSelectTool={setActiveTool} />}
        {activeTool === 'oracle' && <YesNoOracle />}
        {activeTool === 'spin' && <SpinWheel onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'coin' && <CoinFlip onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'picker' && <RandomPicker onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'activity' && <ActivityPicker onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'dinner' && <DinnerDecider onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'rps' && <RockPaperScissors onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'names' && <NamePicker onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'username' && <UsernameGenerator onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'outfit' && <OutfitIdeaGenerator onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'maximizer' && <MaximizerQuiz onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'bias' && <CognitiveBiasTest onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'buyit' && <ShouldIBuyItCalculator onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'chores' && <MagicChores onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'd20' && <D20Roller onNavigate={(id) => setActiveTool(id as Tool)} />}
{activeTool === 'screentime' && <ScreenTimeSwap onNavigate={(id) => setActiveTool(id as Tool)} />}
        {activeTool === 'blog' && <BlogPage onNavigateToPost={(slug) => { setBlogPostSlug(slug); setActiveTool('blogpost'); }} />}
        {activeTool === 'blogpost' && blogPostSlug && <BlogPost slug={blogPostSlug} onBack={() => { setActiveTool('blog'); setBlogPostSlug(null); }} />}
        {activeTool === 'privacy' && <PrivacyPolicy onNavigate={setActiveTool} />}
        {activeTool === 'terms' && <TermsConditions onNavigate={setActiveTool} />}
        {activeTool === 'about' && <AboutPage onNavigate={setActiveTool} />}
        {activeTool === 'contact' && <ContactPage onNavigate={setActiveTool} />}
      </div>

      {/* Enhanced Footer - Warm Paper Theme */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-cream-50/95 border-t border-cream-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-xs text-[#A09080]">
              <span>© 2026 MagicDecisions.com</span>
              <span className="text-cream-300">•</span>
              <button onClick={() => setActiveTool('privacy')} className="hover:text-ink-800 transition-colors">Privacy Policy</button>
              <span className="text-cream-300">•</span>
              <button onClick={() => setActiveTool('terms')} className="hover:text-ink-800 transition-colors">Terms of Service</button>
              <span className="text-cream-300">•</span>
              <button onClick={() => setActiveTool('about')} className="hover:text-ink-800 transition-colors">About</button>
              <span className="text-cream-300">•</span>
              <button onClick={() => setActiveTool('contact')} className="hover:text-ink-800 transition-colors">Contact</button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs text-[#A09080]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure & Private</span>
              </div>
              <div className="h-4 w-px bg-cream-300" />
              <div className="text-[#A09080] text-xs">
                Clear thinking leads to better decisions
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App
