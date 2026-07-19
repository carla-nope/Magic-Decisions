// Blog build step for Magic Decisions.
// Reads every markdown post in content/blog/, parses frontmatter, and emits:
//   public/blog-manifest.json        — full post list for the blog index
//   public/blog-content/<slug>.json  — one file per post for the post page
// Replaces the old approach of fetching posts from the GitHub API at runtime
// (slow, rate-limited at 60 req/hr, invisible to search engines).
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = resolve(root, 'content/blog')
const outDir = resolve(root, 'public/blog-content')

// Tolerant YAML-subset frontmatter parser: flat keys, quoted or unquoted
// values, folded continuation lines, and one level of nesting (the seo: block).
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { data: {}, body: raw }
  const data = {}
  let currentKey = null
  let nest = null
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue
    const nested = line.match(/^\s{2,}([A-Za-z_][\w-]*):\s*(.*)$/)
    const flat = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/)
    if (flat) {
      const [, key, valRaw] = flat
      if (valRaw === '' || valRaw === null) {
        // start of a nested block (e.g. seo:)
        nest = key
        data[nest] = {}
        currentKey = null
      } else {
        nest = null
        data[key] = unquote(valRaw)
        currentKey = key
      }
    } else if (nested && nest) {
      data[nest][nested[1]] = unquote(nested[2])
      currentKey = null
    } else if (currentKey && /^\s+/.test(line)) {
      // folded continuation line
      data[currentKey] = (data[currentKey] + ' ' + line.trim()).trim()
    }
  }
  return { data, body: raw.slice(m[0].length) }
}

function unquote(v) {
  const t = v.trim()
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1)
  }
  if (t === 'true') return true
  if (t === 'false') return false
  return t
}

const slugify = (name) =>
  name
    .replace(/\.mdx?$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '') // strip date prefixes from filenames
    .toLowerCase()

const readTime = (body) => `${Math.max(1, Math.round(body.split(/\s+/).length / 200))} min read`

const files = readdirSync(contentDir).filter((f) => /\.mdx?$/.test(f))
const bySlug = new Map()
for (const file of files) {
  const raw = readFileSync(resolve(contentDir, file), 'utf-8')
  const { data, body } = parseFrontmatter(raw)
  const slug = slugify(String(data.slug || file))
  const post = {
    slug,
    title: String(data.title && data.title !== 'Untitled Post' ? data.title : (data.seo?.meta_title || 'Untitled')),
    date: String(data.date || '2026-01-01').slice(0, 10),
    excerpt: String(data.excerpt || ''),
    category: String(data.category || 'General'),
    featured: Boolean(data.featured),
    author: String(data.author || 'MagicDecisions'),
    readTime: readTime(body),
    seo: {
      meta_title: String(data.seo?.meta_title || data.title || ''),
      meta_description: String(data.seo?.meta_description || data.excerpt || ''),
    },
    body,
    _file: file,
  }
  const existing = bySlug.get(slug)
  if (!existing || post.body.length > existing.body.length) {
    if (existing) console.warn(`  ! duplicate slug "${slug}": keeping ${file}, dropping ${existing._file}`)
    bySlug.set(slug, post)
  } else {
    console.warn(`  ! duplicate slug "${slug}": keeping ${existing._file}, dropping ${file}`)
  }
}

const posts = [...bySlug.values()].sort((a, b) => new Date(b.date) - new Date(a.date))

// Warn about near-duplicate titles for manual review (AdSense dislikes
// duplicate content); both still publish.
const titles = new Map()
for (const p of posts) {
  const key = p.title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
  if (titles.has(key)) console.warn(`  ~ similar titles: "${p.slug}" and "${titles.get(key)}" — review for duplicate content`)
  else titles.set(key, p.slug)
}

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })
for (const p of posts) {
  const { _file, ...clean } = p
  writeFileSync(resolve(outDir, `${p.slug}.json`), JSON.stringify(clean))
}
writeFileSync(
  resolve(root, 'public/blog-manifest.json'),
  JSON.stringify({ posts: posts.map(({ body, _file, ...meta }) => meta) }, null, 2)
)
console.log(`Blog build: ${posts.length} posts published from ${files.length} markdown files.`)
