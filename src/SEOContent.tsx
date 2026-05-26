import FAQSection, { type FAQItem } from './FAQSection'
import { Search, Sparkles, ThumbsUp, ThumbsDown, ArrowRight } from 'lucide-react'
import { playClick } from '../lib/sounds'
import { useCallback } from 'react'

interface SEOContentProps {
  toolName: string
  toolDescription: string
  pros: string[]
  cons?: string[]
  tips: string[]
  faqs: FAQItem[]
  relatedTools?: { name: string; description: string; id: string }[]
  onNavigate?: (toolId: string) => void
}

function SEOContent({
  toolName,
  toolDescription,
  pros,
  cons,
  tips,
  faqs,
  relatedTools = [],
  onNavigate
}: SEOContentProps) {
  const playClickSound = useCallback(() => playClick(), [])
  return (
    <div className="w-full max-w-3xl mt-16 mb-8 space-y-8">
      {/* Main Tool Description */}
      <div className="mystical-card p-6">
        <h2 className="text-xl font-bold text-ink-800 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-accent-400" />
          What is {toolName}?
        </h2>
        <p className="text-[#6B5E4E] leading-relaxed">{toolDescription}</p>
      </div>

      {/* Why Use This Tool */}
      <div className="mystical-card p-6">
        <h3 className="text-lg font-semibold text-ink-800 mb-4">
          Why Use {toolName}?
        </h3>
        <ul className="text-[#6B5E4E] space-y-2">
          {pros.map((pro, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-secondary-400 mt-1"><ThumbsUp className="w-4 h-4" /></span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pros vs Considerations Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="mystical-card p-6">
          <h3 className="text-lg font-semibold text-secondary-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Benefits
          </h3>
          <ul className="text-[#6B5E4E] text-sm space-y-1">
            {pros.map((pro, idx) => (
              <li key={idx}>✓ {pro}</li>
            ))}
          </ul>
        </div>
        <div className="mystical-card p-6">
          <h3 className="text-lg font-semibold text-secondary-400 mb-3 flex items-center gap-2">
            <ThumbsDown className="w-5 h-5" />
            Tips
          </h3>
          <ul className="text-[#6B5E4E] text-sm space-y-1">
            {tips.map((tip, idx) => (
              <li key={idx}>• {tip}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <FAQSection items={faqs} />
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mystical-card p-6">
          <h3 className="text-lg font-semibold text-ink-800 mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-secondary-400" />
            Try Another Tool
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => { playClickSound(); onNavigate?.(tool.id); }}
                className="p-3 rounded-xl bg-cream-50 hover:bg-cream-100 text-left transition-colors"
              >
                <p className="font-medium text-ink-800 text-sm">{tool.name}</p>
                <p className="text-xs text-[#A09080] line-clamp-1">{tool.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SEOContent
export type { FAQItem }