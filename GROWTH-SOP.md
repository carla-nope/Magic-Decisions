# Magic Decisions — Growth → Monetize → Exit SOP

A repeatable operating procedure in three phases. Each phase has a gate —
don't move to the next phase until the gate is met. Work top to bottom;
most tasks are 15–60 minutes.

---

## Phase 0 — This week (unblock everything)

1. **Deploy the v2 package** (blog pipeline + AdSense). Push, wait for the
   Vercel build, then hard-refresh magicdecisions.com and spot-check:
   `/blog` shows 48 posts, any post URL shows the article, `/ads.txt` loads.
2. **Google Search Console**: submit `https://magicdecisions.com/sitemap.xml`
   (now 70 URLs). Use URL Inspection → "Request indexing" on: homepage,
   /about-us, /blog, and your 5 best posts. Google allows ~10 manual
   requests/day — use them daily for a week.
3. **Merge the duplicate post**: `decision-fatigue` vs
   `what-is-decision-fatigue-signs-and-fixes` cover the same topic. Keep
   the stronger one, delete the other's markdown file, rebuild. Duplicate
   content works against an AdSense re-review.
4. **Analytics**: enable Vercel Analytics (one click in the Vercel
   dashboard, no code) or add GA4. You cannot run the Phase 1 weekly loop
   without traffic numbers.
5. **Do NOT request AdSense review yet.** See Phase 2 gate.

---

## Phase 1 — Traffic engine (repeat weekly)

Goal: consistent organic + Pinterest traffic. Target: 100+ sessions/day
sustained before the exit phase matters.

**Weekly loop (≈3–4 hours, same day each week):**

1. **Publish 2 new blog posts** through the CMS or as markdown files in
   `content/blog/` (each push rebuilds and prerenders automatically).
   - Source titles from real parent language: "my kid can't make
     decisions," "child says I don't know," "overthinking child."
   - 800–1,500 words, one internal link to a tool page and one to another
     post, one CTA to the Decision Traps Guide (go.magicdecisions.com/dt1).
   - Write in the brand voice prompt from your About-page doc (warm,
     practical single mom building this with her daughter).
2. **Pin 5 Pinterest pins** (Canva templates, brand palette): 2 for new
   posts, 2 for evergreen posts, 1 for a tool. Pinterest is the highest-
   leverage channel for parenting content and compounds for months.
3. **1 Instagram Reel or story** from the "Built by a Mom and Daughter"
   content pillar — what you two tested/learned this week.
4. **Check Search Console** (10 min): which queries are getting
   impressions? Next week's posts target those queries.
5. **Log the numbers** in a simple sheet: sessions, top pages, email
   signups, Pinterest saves. Trendline > any single week.

**Monthly (1 hour):** update your 3 highest-traffic posts (add a section,
refresh the year, improve the title), and interlink any orphan posts.

**Gate to Phase 2:** site indexed in Google (site:magicdecisions.com shows
your pages), 25+ posts live, and any consistent daily traffic.

---

## Phase 2 — AdSense (fix the rejection properly)

**Why you were rejected:** at review time, Google's crawler saw empty
client-rendered pages and only 5 listed posts. "Low value content" was
accurate *for what the bot could see*. Both causes are now fixed: every
page ships full static HTML, and all 48 articles are published. So yes —
your instinct was right, this is remediable, but the fix was deploy +
publish, not only "more posts."

**Checklist before requesting re-review (order matters):**

1. ✅ AdSense code installed site-wide (done in v2 — the script tag with
   `ca-pub-4005623306172939` is in the head of every prerendered page).
2. ✅ ads.txt live at magicdecisions.com/ads.txt (done in v2).
3. Wait 2–4 weeks after deploying while Google indexes the new pages.
   Verify in Search Console: 40+ pages indexed. Requesting review before
   indexing = the bot sees the old picture = second rejection, and repeat
   reviews get slower.
4. In AdSense → Privacy & messaging, turn on Google's **consent message**
   for EEA/UK visitors (required to serve ads there; no code needed).
5. Confirm your Privacy Policy mentions advertising cookies (it mentions
   analytics; add one paragraph about third-party advertising/AdSense).
6. Then check "I confirm I have fixed the issues" → **Request review**.

**After approval:** enable Auto ads first (zero code). Once revenue is
flowing, place manual ad units only where they don't hurt the tool
experience — mid-article in blog posts is the safe money-maker. Never
place ads that interfere with the spin/flip interactions; a kids-and-
family audience punishes intrusive ads with bounces.

**Reality check on revenue:** family/parenting content RPMs are modest;
expect single-digit dollars per 1,000 pageviews at first. AdSense is the
floor, not the ceiling — the Decision Traps funnel and (later) a low-cost
digital product for parents will out-earn ads at the same traffic.

---

## Phase 3 — Prepare and sell the asset

Content sites sell primarily on **provable earnings and traffic**, and
buyers typically pay a multiple of average monthly net profit (small
content/tool sites commonly trade in the rough range of ~20–40x monthly
profit depending on trend, diversification, and transferability — treat
that as orientation, not a promise; marketplaces will give you real comps).

**Gate to list:** 6+ months of AdSense earnings history, 6+ months of
analytics, stable or growing traffic. Buyers discount anything they can't
verify, and heavily discount sites monetized for under 6 months.

**Build the "data room" as you go (don't reconstruct it later):**
- Monthly P&L: AdSense revenue, domain cost, any tool subscriptions.
- Google Analytics + Search Console access (read-only guest for buyers).
- Traffic sources breakdown (organic %, Pinterest %, direct %).
- Asset inventory: domain, GitHub repo, Vercel project, Decap CMS,
  Systeme.io funnel + email list, Pinterest + Instagram accounts, brand
  kit, the 48+ articles.
- One-page "how it runs" doc: this SOP is literally that — a documented,
  repeatable operation raises the multiple because the buyer isn't buying
  your personal effort.

**Where to sell (when the gate is met):** Flippa (small sites, auction
style), Motion Invest (content sites, faster/simpler), Empire Flippers
(usually wants $1k+/month profit). Use escrow through the marketplace,
always.

**What raises the price:** email list size, revenue diversification
(ads + affiliate + product), transferable rankings, clean analytics.
**What lowers it:** traffic dependent on one channel, founder-branded
content that can't transfer, declining trendline, no earnings history.

Note the tension to manage: the founder story ("built by a mom and
daughter") is your best trust asset for *growth* but is non-transferable
for a *sale*. Keep it, but as you approach listing, make sure tool pages
and articles stand on their own without it.

*(General information, not financial or legal advice — marketplace terms
and valuations vary; verify with the platform when you're ready.)*

---

## Quick reference — the whole system on one line each

- **Weekly:** 2 posts → 5 pins → 1 reel → check Search Console → log numbers.
- **Monthly:** refresh top 3 posts, interlink orphans.
- **AdSense:** wait for indexing → consent message → privacy policy → review.
- **Exit:** 6 months of clean books → data room → Flippa/Motion Invest.
