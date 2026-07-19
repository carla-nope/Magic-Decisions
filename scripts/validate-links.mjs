// Build-time content validator: fails the build on dead internal links,
// unknown tool paths, banned patterns, or missing hero images.
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = resolve(root, 'content/blog')

const VALID_PATHS = new Set(['yes-no-oracle','spin-the-wheel','coin-flip','random-picker',
  'random-activity-picker','what-to-eat-randomizer','rock-paper-scissors','random-name-generator',
  'random-username-generator','what-to-wear-randomizer','magic-chores-list','screen-time-swap',
  'decision-maximizer','cognitive-bias-checker','should-i-buy-it-calculator','about-us',
  'privacy-policy','terms-of-service','d20-roller','keep-or-toss','should-i-keep-it','blog','contact'])
const BANNED = ['htmlUrl:', '← Back to Blog', '- MagicDecisions"']

const slugs = new Set(readdirSync(contentDir).filter(f => f.endsWith('.md')).map(f => f.slice(0, -3)))
const errors = []

for (const file of readdirSync(contentDir)) {
  if (!file.endsWith('.md')) continue
  const text = readFileSync(resolve(contentDir, file), 'utf-8')
  for (const b of BANNED) if (text.includes(b)) errors.push(`${file}: banned pattern "${b}"`)
  for (const m of text.matchAll(/\]\(\/([a-z0-9-]+(?:\/[a-z0-9.-]+)?)\)/g)) {
    const p = m[1]
    if (p.startsWith('blog/')) {
      if (!slugs.has(p.slice(5))) errors.push(`${file}: dead internal link /${p}`)
    } else if (p.startsWith('blog-images/')) {
      if (!existsSync(resolve(root, 'public', p))) errors.push(`${file}: missing image /${p}`)
    } else if (!VALID_PATHS.has(p)) {
      errors.push(`${file}: unknown path /${p}`)
    }
  }
}

if (errors.length) {
  console.error(`\nContent validation FAILED (${errors.length} problem${errors.length > 1 ? 's' : ''}):`)
  for (const e of errors) console.error('  ✗ ' + e)
  process.exit(1)
}
console.log(`Content validation passed: ${slugs.size} posts, no dead links.`)
