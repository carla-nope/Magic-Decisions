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

let ok = 0
let fallback = 0
for (const route of routes) {
  const urlPath = route ? '/' + route : '/'
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

  const meta = metaForPath(route)
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

  const outFile = route ? resolve(dist, route, 'index.html') : resolve(dist, 'index.html')
  mkdirSync(dirname(outFile), { recursive: true })
  writeFileSync(outFile, html)
  console.log(`  ✓ ${urlPath}`)
}

rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`\nPrerendered ${ok} routes with full HTML` + (fallback ? `, ${fallback} meta-only` : '') + '.')
