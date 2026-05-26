import { useState, useEffect, useCallback } from 'react'
import { Sparkles, Wand2, Plus, Trash2, Check, Clock, Star, Crown, Flame, ChevronDown, ChevronUp, Castle, Shield, Swords, Timer, Gift, Info, RefreshCw, ArrowRight } from 'lucide-react'
import { playChoreSpin, playClick } from './lib/sounds'
import './index.css'
// ============================================
// MOTIVATIONAL QUOTES (Magical + Plain)
// ============================================

const MOTIVATIONAL_QUOTES = [
  { magical: "Every spell you cast builds your magical power!", plain: "Every task you complete makes you stronger!" },
  { magical: "The greatest wizards started with simple spells.", plain: "Everyone starts somewhere. You're doing great!" },
  { magical: "A single act of magic brightens the whole realm.", plain: "One good deed can make someone's whole day!" },
  { magical: "The timer clock ticks not to frighten, but to excite!", plain: "Deadlines help us do our best work!" },
  { magical: "Your wand grows mightier with each quest completed!", plain: "You're getting better at this every day!" },
  { magical: "Even dragons were once baby drakes learning to breathe fire.", plain: "Nobody's perfect at first. Keep practicing!" },
  { magical: "The stars align for those who complete their quests.", plain: "Great things happen when you follow through!" },
  { magical: "An enchanted realm is built one spell at a time.", plain: "Big achievements come from small steps!" },
  { magical: "Your magic grows brighter when you help others.", plain: "Teamwork makes the dream work!" },
  { magical: "The ancient scrolls say: 'Done is better than perfect.'", plain: "Finished is better than perfect!" },
  { magical: "Every completed quest adds a star to your crown.", plain: "Every task you finish counts!" },
  { magical: "The crystal ball sees great things in your future.", plain: "You're capable of amazing things!" },
  { magical: "Today's small magic becomes tomorrow's legendary feat.", plain: "Small wins lead to big victories!" },
  { magical: "The wise wizard knows: progress, not perfection.", plain: "Focus on progress, not perfection!" },
  { magical: "Your magical stamina grows with each challenge.", plain: "You're building great habits!" },
  { magical: "The enchanted forest rewards those who venture forth.", plain: "Taking action leads to rewards!" },
  { magical: "A quest in motion casts its own protective spell.", plain: "Starting is the hardest part—and you're doing it!" },
  { magical: "The magic within you is stronger than any obstacle.", plain: "You've got this inside you!" },
  { magical: "Phoenixes rise because they never give up trying.", plain: "Failure is just practice for success!" },
  { magical: "The ancient wisdom whispers: 'You've got this!'", plain: "Trust yourself—you can do it!" },
  { magical: "Each completed task summons a bit more joy.", plain: "Finishing tasks feels really good!" },
  { magical: "The kingdom's magic flows through your completed works.", plain: "Your effort makes a real difference!" },
  { magical: "Even the mightiest spell started as a single incantation.", plain: "Big things start small!" },
  { magical: "The stars celebrate your courage to begin.", plain: "Starting is an act of courage!" },
  { magical: "Your magical journey continues—one quest at a time.", plain: "Keep going—you're making progress!" },
]

// ============================================
// MAGIC CHORE CATEGORIES & NAMING SYSTEM
// ============================================

interface MagicTask {
  id: string
  originalName: string
  magicName: string
  category: MagicCategory
  completed: boolean
}

type MagicCategory = 'castle' | 'alchemy' | 'druid' | 'wizard' | 'transformation' | 'hero'

interface CategoryInfo {
  id: MagicCategory
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
}

const CATEGORIES: CategoryInfo[] = [
  { id: 'castle', name: 'Castle Upkeep', icon: <Castle className="w-4 h-4" />, color: 'text-secondary-400', bgColor: 'bg-secondary/10', borderColor: 'border-cream-300' },
  { id: 'alchemy', name: 'Alchemy Kitchen', icon: <Flame className="w-4 h-4" />, color: 'text-primary-400', bgColor: 'bg-primary/10', borderColor: 'border-cream-300' },
  { id: 'druid', name: 'Druid Nature', icon: <Sparkles className="w-4 h-4" />, color: 'text-secondary-400', bgColor: 'bg-secondary/10', borderColor: 'border-cream-300' },
  { id: 'wizard', name: 'Wizard Training', icon: <Star className="w-4 h-4" />, color: 'text-secondary-400', bgColor: 'bg-secondary/10', borderColor: 'border-cream-300' },
  { id: 'transformation', name: 'Transformation', icon: <Wand2 className="w-4 h-4" />, color: 'text-highlight-500', bgColor: 'bg-highlight/10', borderColor: 'border-cream-300' },
  { id: 'hero', name: 'Hero Quests', icon: <Swords className="w-4 h-4" />, color: 'text-highlight-500', bgColor: 'bg-highlight/10', borderColor: 'border-cream-300' },
]

const PRESET_TASKS: { originalName: string; magicName: string; category: MagicCategory }[] = [
  // Castle Upkeep
  { originalName: 'Clean room', magicName: 'Chamber Restoration Spell', category: 'castle' },
  { originalName: 'Make bed', magicName: 'Royal Bedcharm Ritual', category: 'castle' },
  { originalName: 'Vacuum', magicName: 'Dust Dragon Sweep', category: 'castle' },
  { originalName: 'Wipe surfaces', magicName: 'Enchantment Polish', category: 'castle' },
  { originalName: 'Do laundry', magicName: 'Garment Cleansing Quest', category: 'castle' },
  // Alchemy Kitchen
  { originalName: 'Help cook', magicName: 'Potion Brewing Session', category: 'alchemy' },
  { originalName: 'Set table', magicName: 'Feast Preparation Rite', category: 'alchemy' },
  { originalName: 'Clear table', magicName: 'After-Feast Reset', category: 'alchemy' },
  { originalName: 'Load dishwasher', magicName: 'Dish Summoning Cycle', category: 'alchemy' },
  { originalName: 'Put away groceries', magicName: 'Ingredient Sorting Spell', category: 'alchemy' },
  // Druid Nature
  { originalName: 'Water plants', magicName: 'Life Growth Blessing', category: 'druid' },
  { originalName: 'Yard cleanup', magicName: 'Forest Tending Quest', category: 'druid' },
  { originalName: 'Take care of pets', magicName: 'Creature Care Pact', category: 'druid' },
  { originalName: 'Take out trash', magicName: 'Waste Vanishing Quest', category: 'druid' },
  // Wizard Training
  { originalName: 'Homework', magicName: 'Spell Study Session', category: 'wizard' },
  { originalName: 'Reading', magicName: 'Ancient Tome Reading', category: 'wizard' },
  { originalName: 'Practice skills', magicName: 'Magic Mastery Drill', category: 'wizard' },
  { originalName: 'Pack backpack', magicName: 'Quest Prep Kit', category: 'wizard' },
  // Transformation
  { originalName: 'Brush teeth', magicName: 'Sparkle Smile Spell', category: 'transformation' },
  { originalName: 'Shower', magicName: 'Cleansing Ritual', category: 'transformation' },
  { originalName: 'Get dressed', magicName: 'Armor Equipping', category: 'transformation' },
  { originalName: 'Brush hair', magicName: 'Tangle Taming Charm', category: 'transformation' },
  // Hero Quests
  { originalName: 'Help sibling', magicName: 'Ally Assist Mission', category: 'hero' },
  { originalName: 'Extra chore', magicName: 'Side Quest Challenge', category: 'hero' },
  { originalName: 'Organize', magicName: 'Order Restoration', category: 'hero' },
  { originalName: 'Be kind', magicName: 'Kindness Enchantment', category: 'hero' },
]

const STICKERS = [
  { name: 'Crown', path: '/stickers/medieval/crown.png', rarity: 'Legendary' },
  { name: 'Sword', path: '/stickers/medieval/sword.png', rarity: 'Common' },
  { name: 'Shield', path: '/stickers/medieval/shield.png', rarity: 'Common' },
  { name: 'Dragon', path: '/stickers/medieval/dragon.png', rarity: 'Rare' },
  { name: 'Unicorn', path: '/stickers/medieval/unicorn.png', rarity: 'Rare' },
  { name: 'Phoenix', path: '/stickers/medieval/phoenix.png', rarity: 'Legendary' },
]

// ============================================
// STORAGE KEYS
// ============================================

const STORAGE_KEYS = {
  tasks: 'magic_chores_tasks_v2',
  stickers: 'magic_chores_stickers_v2',
  streak: 'magic_chores_streak_v2',
}

// ============================================
// MAIN COMPONENT
// ============================================

interface StickerReward {
  id: string
  name: string
  path: string
  earnedAt: number
  taskName: string
}

interface MagicChoresProps {
  onNavigate?: (toolId: string) => void
}

export default function MagicChores({ onNavigate }: MagicChoresProps) {
  // Task State
  const [tasks, setTasks] = useState<MagicTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.tasks)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Sticker Collection
  const [stickers, setStickers] = useState<StickerReward[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.stickers)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Streak State
  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.streak)
      return saved ? parseInt(saved) : 0
    } catch {
      return 0
    }
  })

  // UI State
  const [customTask, setCustomTask] = useState('')
  const [showPresetPicker, setShowPresetPicker] = useState(false)
  const [summonedTask, setSummonedTask] = useState<MagicTask | null>(null)
  const [showQuestModal, setShowQuestModal] = useState(false)
  const [gameState, setGameState] = useState<'idle' | 'estimating' | 'running' | 'finished'>('idle')
  const [estimatedMinutes, setEstimatedMinutes] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)
  const [showStickers, setShowStickers] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(() => MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)])

  const refreshQuote = () => {
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
    setCurrentQuote(randomQuote)
  }

  // Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.stickers, JSON.stringify(stickers))
  }, [stickers])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.streak, streak.toString())
  }, [streak])

  useEffect(() => {
    return () => {
      if (timerInterval) clearInterval(timerInterval)
    }
  }, [timerInterval])

  // Task Actions
  const addTask = useCallback((originalName: string, magicName: string, category: MagicCategory) => {
    if (tasks.some(t => t.originalName.toLowerCase() === originalName.toLowerCase())) return false

    playClick();
    const newTask: MagicTask = {
      id: crypto.randomUUID(),
      originalName,
      magicName,
      category,
      completed: false,
    }
    setTasks(prev => [...prev, newTask])
    return true
  }, [tasks])

  const removeTask = (id: string) => {
    playClick();
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const toggleComplete = (id: string) => {
    playClick();
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
    setStreak(prev => prev + 1)
  }

  // Summon Random Task
  const summonQuest = () => {
    const incompleteTasks = tasks.filter(t => !t.completed)
    if (incompleteTasks.length === 0) return
    playClick();
    const randomTask = incompleteTasks[Math.floor(Math.random() * incompleteTasks.length)]
    setSummonedTask(randomTask)
    setShowQuestModal(true)
    setGameState('estimating')
    playChoreSpin();
  }

  // Timer Functions
  const startTimer = () => {
    if (!estimatedMinutes || isNaN(Number(estimatedMinutes)) || Number(estimatedMinutes) <= 0) {
      alert('Please enter a valid number of minutes')
      return
    }
    playClick();
    setGameState('running')
    setElapsedSeconds(0)

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1)
    }, 1000)
    setTimerInterval(interval)
  }

  const stopTimer = () => {
    playClick();
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    setGameState('finished')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const finishQuest = () => {
    playClick();
    if (summonedTask) {
      // Mark task complete
      setTasks(prev => prev.map(t =>
        t.id === summonedTask.id ? { ...t, completed: true } : t
      ))
      setStreak(prev => prev + 1)

      // Award sticker based on whether they beat the timer
      const beatTimer = elapsedSeconds <= Number(estimatedMinutes) * 60
      const wonReward = beatTimer ? Math.random() < 0.9 : Math.random() < 0.3

      if (wonReward) {
        const randomSticker = STICKERS[Math.floor(Math.random() * STICKERS.length)]
        const newSticker: StickerReward = {
          id: crypto.randomUUID(),
          name: randomSticker.name,
          path: randomSticker.path,
          earnedAt: Date.now(),
          taskName: summonedTask.magicName,
        }
        setStickers(prev => [newSticker, ...prev])

        // Show success message
        if (beatTimer) {
          alert(`Amazing! You beat the timer and earned a ${randomSticker.name} sticker!`)
        } else {
          alert(`You completed the quest and got lucky! A ${randomSticker.name} sticker is yours!`)
        }
      } else {
        alert(beatTimer ? "So close! You beat the timer but didn't get a sticker this time." : "Quest complete! No sticker this time, but you still earned a streak!")
      }
    }
    resetQuest()
  }

  const resetQuest = () => {
    playClick();
    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(null)
    }
    setGameState('idle')
    setEstimatedMinutes('')
    setElapsedSeconds(0)
    setSummonedTask(null)
    setShowQuestModal(false)
  }

  // Group tasks by category
  const incompleteTasks = tasks.filter(t => !t.completed)
  const tasksByCategory = CATEGORIES.map(cat => ({
    ...cat,
    tasks: tasks.filter(t => t.category === cat.id),
  }))

  return (
    <div className="min-h-screen relative overflow-hidden bg-cream-50">
      {/* Magical Background */}
      <div className="absolute inset-0 bg-cream-100" />
      <div className="absolute inset-0 opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-secondary-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 text-center border-b border-cream-300">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary-300 text-secondary-500 text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            Magic Decisions
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display text-ink-800">
            ✨ Magic Chores ✨
          </h1>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary-300 text-primary-500 text-sm">
              <Crown className="w-4 h-4" />
              {streak} Spells
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary-300 text-secondary-500 text-sm">
              <Gift className="w-4 h-4" />
              {stickers.length} Stickers
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary-300 text-secondary-500 text-sm">
              {incompleteTasks.length} Tasks
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-4 px-4">
            <div className="bg-cream-100 border border-cream-300 rounded-2xl p-4 max-w-xl mx-auto mystical-card">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 text-center">
                  <p className="text-ink-700 italic text-sm md:text-base font-display">"{currentQuote.magical}"</p>
                  <p className="text-[#A09080] text-xs mt-2">(or, in plain words: "{currentQuote.plain}")</p>
                </div>
                <button
                  onClick={refreshQuote}
                  className="flex-shrink-0 p-1.5 rounded-full bg-secondary/10 hover:bg-secondary/20 text-secondary-400 hover:text-secondary-500 transition-all"
                  aria-label="Get new inspiration"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="px-4 py-4 border-b border-cream-300">
          <div className="bg-cream-100 border border-cream-300 rounded-2xl p-4 max-w-2xl mx-auto mystical-card">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-secondary-400" />
              <h2 className="font-semibold font-display text-ink-700">How It Works</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                  <Wand2 className="w-5 h-5 text-secondary-400" />
                </div>
                <p className="text-ink-700 font-bold font-display">Add Tasks</p>
                <p className="text-[#6B5E4E] text-xs mt-1">Pick presets or create custom magical tasks</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                  <Timer className="w-5 h-5 text-secondary-400" />
                </div>
                <p className="text-ink-700 font-bold font-display">Start Timer</p>
                <p className="text-[#6B5E4E] text-xs mt-1">Estimate time, then race the clock to earn rewards</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                  <Gift className="w-5 h-5 text-secondary-400" />
                </div>
                <p className="text-ink-700 font-bold font-display">Earn Stickers</p>
                <p className="text-[#6B5E4E] text-xs mt-1">Beat the timer to collect magical rewards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 py-4 pb-24 max-w-2xl mx-auto w-full space-y-4">
          {/* Summon Quest Button */}
          <div className="text-center">
            <button
              onClick={summonQuest}
              disabled={incompleteTasks.length === 0}
              className="w-full max-w-md mx-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed mystical-btn flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Summon a Quest
            </button>
            {incompleteTasks.length === 0 && (
              <p className="text-secondary-400/70 text-sm mt-2">Add tasks below to begin your magical journey!</p>
            )}
          </div>

          {/* Add Task Section */}
          <div className="bg-cream-100 border border-cream-300 rounded-2xl p-4 mystical-card">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-5 h-5 text-secondary-400" />
              <h2 className="text-lg font-semibold font-display text-ink-800">Conjure a New Spell</h2>
            </div>

            {/* Preset Tasks Picker */}
            <div className="mb-4">
              <button
                onClick={() => setShowPresetPicker(!showPresetPicker)}
                className="w-full flex items-center justify-between px-4 py-3 bg-cream-50 border border-cream-300 rounded-lg text-secondary-400 hover:bg-cream-100 transition-colors mystical-input"
              >
                <span>Choose from Magical Presets</span>
                {showPresetPicker ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showPresetPicker && (
                <div className="mt-2 max-h-80 overflow-y-auto bg-cream-50 rounded-lg border border-cream-300 p-2 space-y-1">
                  {PRESET_TASKS.map((preset, idx) => {
                    const isAdded = tasks.some(t => t.originalName.toLowerCase() === preset.originalName.toLowerCase())
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          addTask(preset.originalName, preset.magicName, preset.category)
                          setShowPresetPicker(false)
                        }}
                        disabled={isAdded}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          isAdded
                            ? 'bg-cream-100/50 text-[#A09080] cursor-not-allowed'
                            : 'bg-cream-50 hover:bg-cream-100 text-ink-700 border border-cream-300 hover:border-secondary-400/50'
                        }`}
                      >
                        <div className="font-medium text-sm font-display">{preset.originalName}</div>
                        <div className="text-xs text-secondary-400/70 mt-0.5">→ {preset.magicName}</div>
                        <div className="text-xs text-[#A09080] mt-0.5">{CATEGORIES.find(c => c.id === preset.category)?.name}</div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Custom Task Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customTask}
                onChange={(e) => setCustomTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customTask.trim()) {
                    const magicName = `${customTask.trim()} Enchantment`
                    addTask(customTask.trim(), magicName, 'castle')
                    setCustomTask('')
                  }
                }}
                placeholder="Enter any chore..."
                className="flex-1 px-4 py-3 bg-cream-50 border border-cream-300 rounded-lg text-ink-800 placeholder-[#A09080] focus:border-secondary-400 focus:outline-none mystical-input"
              />
              <button
                onClick={() => {
                  if (customTask.trim()) {
                    const magicName = `${customTask.trim()} Enchantment`
                    addTask(customTask.trim(), magicName, 'castle')
                    setCustomTask('')
                  }
                }}
                className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors mystical-btn"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Collection Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowStickers(!showStickers)}
              className="px-4 py-2 rounded-full bg-primary/10 border border-primary-300 text-primary-500 hover:bg-primary/20 transition-colors flex items-center gap-2 mystical-btn"
            >
              <Shield className="w-4 h-4" />
              My Collection ({stickers.length})
            </button>
          </div>

          {/* Sticker Collection Modal */}
          {showStickers && (
            <div className="bg-cream-100 border border-primary-300 rounded-2xl p-4 mystical-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary-500" />
                  <h2 className="text-lg font-semibold font-display text-ink-800">Spell Collection</h2>
                </div>
                <button onClick={() => setShowStickers(false)} className="text-[#A09080] hover:text-ink-800 text-xl leading-none">
                  ✕
                </button>
              </div>

              {stickers.length === 0 ? (
                <div className="text-center py-8">
                  <Gift className="w-12 h-12 mx-auto text-[#A09080] mb-3" />
                  <p className="text-[#6B5E4E]">Complete quests to earn magical rewards!</p>
                  <p className="text-[#A09080] text-sm mt-1">Beat the timer when completing tasks for a chance to win stickers</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {stickers.map((sticker) => (
                    <div key={sticker.id} className="aspect-square bg-cream-50 rounded-lg border border-primary-300 p-3 flex flex-col items-center justify-center tool-card">
                      <img src={sticker.path} alt={sticker.name} className="w-full h-full object-contain" />
                      <span className="text-xs text-primary-500 mt-1 text-center font-display">{sticker.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Task List by Category */}
          <div className="space-y-3">
            {tasksByCategory.map(category => (
              category.tasks.length > 0 && (
                <div key={category.id} className="bg-cream-100 border border-cream-300 rounded-2xl p-4 mystical-card">
                  <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-cream-300 ${category.color}`}>
                    {category.icon}
                    <h3 className="font-semibold font-display">{category.name}</h3>
                    <span className="text-xs text-[#A09080] ml-auto">{category.tasks.filter(t => !t.completed).length} remaining</span>
                  </div>

                  <div className="space-y-2">
                    {category.tasks.map(task => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                          task.completed
                            ? 'bg-cream-50/50 border-cream-200/50 opacity-60'
                            : 'bg-cream-50 border-cream-300 hover:border-secondary-400/50'
                        }`}
                      >
                        <button
                          onClick={() => toggleComplete(task.id)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            task.completed
                              ? 'bg-secondary-500 border-secondary-500'
                              : 'border-[#A09080] hover:border-secondary-400'
                          }`}
                        >
                          {task.completed && <Check className="w-3 h-3 text-white" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <p className={`font-medium font-display ${task.completed ? 'line-through text-[#A09080]' : 'text-ink-700'}`}>
                            {task.magicName}
                          </p>
                          <p className="text-xs text-[#A09080]">{task.originalName}</p>
                        </div>

                        <button
                          onClick={() => removeTask(task.id)}
                          className="flex-shrink-0 p-1 text-[#A09080] hover:text-highlight-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {tasks.length === 0 && (
            <div className="text-center py-8">
              <Wand2 className="w-12 h-12 mx-auto text-secondary-400 mb-3" />
              <p className="text-secondary-400 mb-1 font-display">No spells summoned yet!</p>
              <p className="text-[#6B5E4E] text-sm">Add tasks above to begin your magical journey.</p>
            </div>
          )}
        </div>

        {/* Quest Modal */}
        {showQuestModal && summonedTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-800/50">
            <div className="bg-cream-50 border border-secondary-400/50 rounded-2xl max-w-md w-full p-6 mystical-card">
              <h2 className="text-2xl font-bold font-display text-ink-800 text-center mb-4">
                {gameState === 'idle' || gameState === 'estimating' ? '⚔️ Quest Awaits!' :
                 gameState === 'running' ? '⏱️ Cast Your Spell!' :
                 '🎉 Quest Complete!'}
              </h2>

              {/* Task Card */}
              <div className="bg-secondary/10 border border-secondary-300 rounded-2xl p-4 mb-6 mystical-card">
                <p className="text-xl font-semibold text-ink-700 text-center font-display">{summonedTask.originalName}</p>
                <p className="text-sm text-secondary-400/70 text-center mt-1">aka: {summonedTask.magicName}</p>
              </div>

              {/* Estimating State */}
              {gameState === 'estimating' && (
                <>
                  <div className="mb-4 text-center">
                    <label className="block text-secondary-400 text-sm mb-3 font-display">
                      How many minutes will this take?
                    </label>
                    <div className="flex items-center justify-center gap-3">
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={estimatedMinutes}
                        onChange={(e) => setEstimatedMinutes(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && startTimer()}
                        placeholder="5"
                        className="w-24 px-4 py-3 bg-cream-50 border border-cream-300 rounded-lg text-ink-800 text-center text-2xl font-bold focus:border-secondary-400 focus:outline-none mystical-input"
                      />
                      <span className="text-secondary-400 text-lg font-display">min</span>
                    </div>
                    <p className="text-[#A09080] text-sm mt-2">Beat the timer to earn a sticker!</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={resetQuest} className="flex-1 px-4 py-3 bg-cream-100 hover:bg-cream-50 text-[#6B5E4E] rounded-lg transition-colors mystical-btn">
                      Cancel
                    </button>
                    <button
                      onClick={startTimer}
                      className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-semibold mystical-btn"
                    >
                      Start Timer
                    </button>
                  </div>
                </>
              )}

              {/* Running State */}
              {gameState === 'running' && (
                <>
                  <div className="text-center py-6">
                    <div className="text-6xl font-bold text-secondary-400 mb-2 font-display">
                      {formatTime(elapsedSeconds)}
                    </div>
                    <div className="text-sm text-[#6B5E4E]">
                      Target: {estimatedMinutes} min
                    </div>
                    <div className="mt-4 text-xs text-[#A09080]">
                      Timer is running! Complete your task and click "I'm Done" when finished.
                    </div>
                  </div>
                  <button
                    onClick={stopTimer}
                    className="w-full px-4 py-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-2xl transition-colors text-lg font-semibold mystical-btn"
                  >
                    ✓ I'm Done!
                  </button>
                </>
              )}

              {/* Finished State */}
              {gameState === 'finished' && (
                <>
                  <div className="text-center py-4 mb-4">
                    <div className="text-5xl mb-3">🎉</div>
                    <p className="text-lg text-ink-700 mb-2 font-display">Excellent work, Wizard!</p>
                    <p className="text-sm text-[#6B5E4E]">
                      Completed in {formatTime(elapsedSeconds)}
                    </p>
                    {elapsedSeconds <= Number(estimatedMinutes) * 60 && (
                      <div className="mt-3 p-3 bg-primary/10 border border-primary-300 rounded-lg">
                        <p className="text-primary-500 font-bold font-display">⚡ You beat the timer!</p>
                        <p className="text-primary-400/80 text-sm">Collect your reward!</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={finishQuest}
                    className="w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-semibold text-lg mystical-btn"
                  >
                    {elapsedSeconds <= Number(estimatedMinutes) * 60 ? 'Collect Reward' : 'Complete Quest'}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Parent/Family Teaching Moment */}
      <div className="w-full max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-cream-100 border border-secondary-300 rounded-2xl p-6 mystical-card">
          <h2 className="text-xl font-bold font-display text-ink-700 mb-4 text-center">
            Use Magic Chores to Teach Task Management and Delayed Gratification
          </h2>
          <p className="text-[#6B5E4E] text-center mb-4">
            Magic Chores gamifies task completion to make chores feel like adventures. The timer mechanic teaches time estimation and urgency without pressure. Sticker rewards introduce the concept of earned rewards—kids learn that completing tasks brings tangible satisfaction. Discuss the magic theme together: what makes a quest feel special? How does completing small quests build confidence for bigger challenges?
          </p>
        </div>
      </div>

      {/* Related Tools */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-12">
        <h2 className="text-xl font-semibold font-display text-ink-800 mb-6 text-center">
          Try More Free Decision Tools
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Random Picker', description: 'Pick from any list of options', id: 'picker', emoji: '🎯' },
            { name: 'Activity Picker', description: 'Decide what to do for fun', id: 'activity', emoji: '🎮' },
            { name: 'Dinner Decider', description: 'Decide what to cook or eat', id: 'dinner', emoji: '🍽️' },
            { name: 'D20 Roller', description: 'Roll for creative prompts and games', id: 'd20', emoji: '🎲' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => onNavigate?.(tool.id)}
              className="bg-cream-100 border border-cream-300 p-4 text-center hover:border-secondary-400/50 cursor-pointer rounded-2xl mystical-card"
            >
              <span className="text-3xl mb-2 block">{tool.emoji}</span>
              <h3 className="font-semibold font-display text-ink-800 mb-1">{tool.name}</h3>
              <p className="text-[#6B5E4E] text-xs">{tool.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Lead Magnet CTA */}
      <div className="w-full max-w-2xl mx-auto px-4 mb-8">
        <div className="bg-cream-100 border border-secondary-300 rounded-2xl p-8 text-center mystical-card">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-secondary-400" />
          </div>
          <h2 className="text-xl font-bold font-display text-ink-800 mb-3">
            Want to Help Kids Build Better Task Habits?
          </h2>
          <p className="text-[#6B5E4E] text-sm mb-6 max-w-md mx-auto">
            Get the free Decision Traps Guide and learn five common ways kids get stuck when making choices — plus simple prompts that make everyday decisions easier to practice.
          </p>
          <a
            href="https://go.magicdecisions.com/dt1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-semibold transition-all hover:shadow-lg mystical-btn"
          >
            Get the Free Decision Traps Guide
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-24" />
    </div>
  )
}