import toolFaqs from './tool-faqs.json'

// Shared FAQ section for tool pages. Content lives in tool-faqs.json —
// scripts/prerender.mjs injects matching FAQPage JSON-LD from the same file.
function ToolFaq({ route }: { route: string }) {
  const faqs = (toolFaqs as Record<string, { q: string; a: string }[]>)[route]
  if (!faqs || faqs.length === 0) return null
  return (
    <div className="w-full max-w-2xl mb-12 px-4 mx-auto">
      <h2 className="text-xl font-semibold text-ink-800 mb-6 text-center font-display">
        Questions Parents Ask
      </h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="mystical-card p-5">
            <h3 className="font-semibold text-ink-800 mb-2">{f.q}</h3>
            <p className="text-[#6B5E4E] text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToolFaq
