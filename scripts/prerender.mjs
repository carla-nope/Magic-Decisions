// Prerender script for Magic Decisions.
// Runs after the client + SSR builds and writes a static HTML file for
// every route so search engines and social crawlers see real content.
//
// Usage (see package.json "build:prerender"):
//   vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr
//   node scripts/prerender.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')
if (!existsSync(ssrEntry)) {
  console.error('SSR bundle not found. Run: vite build --ssr src/entry-server.tsx --outDir dist-ssr')
  process.exit(1)
}
const { render, routeMeta, metaForPath } = await import(pathToFileURL(ssrEntry).href)

const template = readFileSync(resolve(dist, 'index.html'), 'utf-8')
if (!template.includes('<!--app-html-->')) {
  console.error('dist/index.html is missing the <!--app-html--> placeholder.')
  process.exit(1)
}

// Routes = every entry in routeMeta ('' is the homepage) + blog posts
const routes = Object.keys(routeMeta)
try {
  const manifest = JSON.parse(readFileSync(resolve(root, 'public/blog-manifest.json'), 'utf-8'))
  for (const post of manifest.posts ?? []) {
    if (post.slug) routes.push('blog/' + post.slug)
  }
} catch {
  console.warn('No blog manifest found; skipping blog post routes.')
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Load blog data so blog routes render with full article content and
// post-specific metadata.
let manifest = { posts: [] }
try {
  manifest = JSON.parse(readFileSync(resolve(root, 'public/blog-manifest.json'), 'utf-8'))
} catch { /* no blog */ }
const loadPost = (slug) => {
  try {
    return JSON.parse(readFileSync(resolve(root, `public/blog-content/${slug}.json`), 'utf-8'))
  } catch { return undefined }
}

let ok = 0
let fallback = 0
for (const route of routes) {
  const urlPath = route ? '/' + route : '/'
  // Preload blog data for blog routes so effects-free SSR still has content
  globalThis.__SSR_BLOG_MANIFEST__ = route === 'blog' ? manifest.posts : undefined
  globalThis.__SSR_BLOG_POST__ = route.startsWith('blog/') ? loadPost(route.slice(5)) : undefined
  let appHtml = ''
  try {
    appHtml = render(urlPath)
    ok++
  } catch (err) {
    // A route whose component touches browser APIs at render time still
    // gets correct metadata; content loads client-side as before.
    console.warn(`  ! render failed for ${urlPath} (shipping meta-only shell): ${err.message}`)
    fallback++
  }

  let meta = metaForPath(route)
  const post = globalThis.__SSR_BLOG_POST__
  if (post) {
    meta = {
      title: `${post.seo?.meta_title || post.title} | Magic Decisions`,
      description: post.seo?.meta_description || post.excerpt || meta.description,
    }
  }
  const canonical = 'https://magicdecisions.com' + (route ? '/' + route : '/')

  let html = template.replace('<!--app-html-->', appHtml)
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
  html = html.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${canonical}$2`)
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${canonical}$2`)
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
  html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
  html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)

  // Per-post social image: blog posts use their generated hero (1200x630)
  if (route.startsWith('blog/')) {
    const slug = route.slice(5)
    if (existsSync(resolve(root, 'public/blog-images', slug + '.png'))) {
      const heroUrl = 'https://magicdecisions.com/blog-images/' + slug + '.png'
      html = html.replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${heroUrl}$2`)
      html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${heroUrl}$2`)
    }
  }

  const outFile = route ? resolve(dist, route, 'index.html') : resolve(dist, 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  console.log(`  ✓ ${urlPath}`)
}

// Generate sitemap.xml from the actual route list so it never drifts
const today = new Date().toISOString().slice(0, 10)
const smUrl = (route) => {
  const loc = 'https://magicdecisions.com' + (route ? '/' + route : '')
  const prio = route === '' ? '1.0' : route.startsWith('blog/') ? '0.6'
    : ['privacy-policy', 'terms-of-service', 'contact'].includes(route) ? '0.3' : '0.8'
  const lastmod = route.startsWith('blog/') ? (loadPost(route.slice(5))?.date || today) : today
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${prio}</priority>\n  </url>`
}
writeFileSync(resolve(dist, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  routes.map(smUrl).join('\n') + '\n</urlset>\n')
console.log(`Sitemap: ${routes.length} URLs written to dist/sitemap.xml`)

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`\nPrerendered ${ok} routes with full HTML` + (fallback ? `, ${fallback} meta-only` : '') + '.')
