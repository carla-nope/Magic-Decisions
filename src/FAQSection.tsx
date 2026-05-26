import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { playClick } from '../lib/sounds'
import { useCallback } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  items: FAQItem[]
}

function FAQSection({ title = "Frequently Asked Questions", items }: FAQSectionProps) {
  const playClickSound = useCallback(() => playClick(), [])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    playClickSound()
    setOpenIndex(openIndex === index ? null : index)
  }

  // Generate JSON-LD FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <div className="faq-section">
      {/* JSON-LD Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mystical-card p-6">
        <h3 className="text-xl font-bold text-ink-800 mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-accent-400" />
          {title}
        </h3>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-cream-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-4 text-left bg-cream-50 hover:bg-cream-100 transition-colors"
              >
                <span className="font-medium text-ink-800 pr-4">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#A09080] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#A09080] flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border-t border-cream-100">
                  <p className="text-[#6B5E4E] leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQSection
export type { FAQItem }