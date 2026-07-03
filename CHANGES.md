# Site Repairs — July 2026

## The big fix: search engines can now read the site
The site was a client-side React app serving an empty `<div id="root">` to
crawlers — invisible to Google. Now every route is **prerendered to static
HTML at build time** (27 pages including all tools, about, and blog posts),
each with its own title, meta description, and canonical URL.

New files: `src/entry-server.tsx`, `src/seo-meta.ts`, `scripts/prerender.mjs`.
New build script: `build:prerender` (vercel.json now uses it).

## Metadata & social sharing (index.html)
- Homepage repositioned from generic "decision maker tool" to
  "Fun Decision-Making Tools for Kids & Families" (matches the SEO plan's
  primary keyword and the founder-led brand strategy).
- Added og:image (`public/og-image.png`, 1200x630, brand gradient) and
  upgraded Twitter card to `summary_large_image` — shares now show a real
  preview instead of a bare link. Swap the PNG for a Canva export anytime.
- Added JSON-LD structured data (site + founder). Removed the obsolete
  meta keywords tag (ignored by Google, visible to competitors).

## Bugs fixed
1. **Broken imports** — `FAQSection`, `RandomBioGenerator`, `SEOContent`
   imported `'../lib/sounds'` (wrong path). This failed `tsc -b`, which
   would fail Vercel's build. Fixed to `'./lib/sounds'`.
2. **CMS admin never deployed** — `/admin` files sat at repo root, outside
   the build output, so the Decap CMS 404'd in production. Moved to
   `public/admin/`; removed the stray `public/index.html` (a duplicate
   CMS page with `noindex` sitting in the homepage's slot).
3. **Missing route rewrites** — direct visits to `/d20-roller`, `/blog`,
   `/contact`, and `/blog/<slug>` 404'd (absent from vercel.json). Now
   prerendered as real files + a catch-all rewrite as backstop.
4. **Back/forward buttons didn't work** — navigation used `replaceState`
   with no popstate handling. Now uses `pushState` + popstate listener,
   and `/blog/<slug>` URLs load directly.
5. **URL flash on load** — the tool state initialized to 'home' then
   corrected after mount. Now initialized from the URL directly.
6. **Sitemap** — removed `/random-bio-generator` (no such route existed;
   note: `RandomBioGenerator.tsx` exists but was never wired into the
   app — wire it up or delete it), added `/d20-roller`, `/blog`,
   `/contact`, and all 5 blog post URLs.
7. **Per-page titles** — every route now sets its own document.title and
   meta description client-side too (previously one title for all pages).

## Not changed (flagged for later)
- Duplicate `LegalPages.tsx` / `MagicChores.tsx` at repo root are unused
  copies of the src/ files — safe to delete.
- `RandomBioGenerator.tsx` is imported but never rendered.

## After deploying
1. Verify: View Source on any page shows real text.
2. Google Search Console: submit https://magicdecisions.com/sitemap.xml,
   request indexing for the homepage and /about-us.
3. Set the non-www domain as primary in Vercel (canonical is non-www).
4. Test a share preview (paste the URL in a DM to yourself).
