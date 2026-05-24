# Systeme.io Setup Guide
## MagicDecisions — 100 Tiny Decisions Freebie Funnel

---

## What You're Setting Up

A complete email funnel that delivers a free "100 Tiny Decisions" PDF guide to new subscribers:

- **Landing Page** → captures email addresses
- **Welcome Email** → delivers the PDF instantly
- **Thank You Page** → confirms delivery + promotes free tools
- **Email Sequence** → 3 follow-up emails over 9 days

---

## Step 1 — Create the PDF Guide

**Important:** Systeme.io does not host PDFs natively in the same way a traditional funnel builder does. You have two options:

### Option A (Recommended): Upload PDF to Systeme.io
1. In your Systeme.io dashboard, go to **Products → New Product**
2. Give it a name (e.g., "100 Tiny Decisions Guide")
3. Upload your PDF file
4. Set the price to **$0** (free product)
5. Copy the **download link** it generates — you'll use this in your emails and thank you page

### Option B: Use Google Drive / Dropbox
1. Upload the PDF to Google Drive
2. Set sharing to **"Anyone with the link can view"**
3. Copy the sharing link
4. Convert to a direct download link:
   - Google Drive direct link format: `https://drive.google.com/uc?export=download&id=FILE_ID`
5. Use that link in your emails

> **Tip:** Systeme.io also lets you add the PDF to an **automation** so it fires automatically on opt-in. We'll cover that in Step 4.

---

## Step 2 — Create the Landing Page

1. In Systeme.io, go to **Funnels → New Funnel**
2. Name it: `100-tiny-decisions-freebie`
3. Choose **Squeeze Page** (email capture)
4. Select a template or start from scratch
5. Paste the HTML from **`opt-in-page.html`** into the custom HTML block

**Form settings:**
- Form action: connect to your Systeme.io form
- Redirect after submit: `/thank-you` (or your thank you page URL)

**Key elements to configure in Systeme.io's editor:**
| Element | What to put |
|---|---|
| Headline | Stop Overthinking the Small Stuff |
| Sub-headline | Get the free 100 Tiny Decisions guide... |
| CTA Button | Get Free Guide |
| Privacy note | Free guide from MagicDecisions. No spam. Unsubscribe anytime. |
| Guide mockup | Use the cover image or CSS-only mockup from the HTML |
| Trust icons | No spam / Instant delivery / Free forever / Built for parents |

**SEO fields:**
- Page title: `100 Tiny Decisions You Don't Need to Overthink | MagicDecisions`
- Meta description: `Stop overthinking the small stuff. Download 100 everyday decisions you can make in seconds and save your brain for what matters.`

**Publishing:**
- Set URL slug: `tiny-decisions`
- Publish and copy the live URL

---

## Step 3 — Create the Thank You Page

1. In the same funnel, add a new **Thank You Page**
2. Paste the HTML from **`thank-you-page.html`** into the custom HTML block

**Key dynamic elements to replace:**
| Placeholder | What to use |
|---|---|
| `[subscriber email]` | Use Systeme.io's merge tag: `{{ contact.email }}` |
| `[Open your PDF guide →]` | Your PDF download link from Step 1 |
| `[Try Free Decision Tools]` | `/tools` or your actual tools page URL |
| `[Browse the Blog]` | `/blog` or your blog URL |

> The thank you page is shown immediately after form submission — so make sure the redirect in your squeeze page settings points here.

---

## Step 4 — Build the Email Automation

Go to **Automations → New Automation**

### Trigger: **Contact subscribes to a tag or list**

Set up a **tag** in Systeme.io (e.g., `free-guide-100-tiny-decisions`) and trigger the automation when a contact is tagged.

### Email Sequence Setup

| Email | Delay | Subject Line | Attach PDF? |
|---|---|---|---|
| Email 1 | Instant (Day 0) | your free 100 tiny decisions guide is here | ✅ Yes — attach PDF |
| Email 2 | 2 days after Email 1 | the trickiest tiny decision (and what to do about it) | No |
| Email 3 | 5 days after Email 1 | the "I don't know" problem (and a simple fix) | No |
| Email 4 | 9 days after Email 1 | one last thing about tiny decisions | No |

### Per-email setup in Systeme.io:

**Email 1 (Instant):**
- Subject: `your free 100 tiny decisions guide is here`
- Body: Use the copy from `email-sequence.md` (Email 1 section)
- **Attachments:** Upload the PDF here
- **Plain text version:** Also paste the body copy as plain text fallback

**Email 2 (Day 2):**
- Subject: `the trickiest tiny decision (and what to do about it)`
- Body: Use copy from `email-sequence.md` (Email 2 section)
- Include link to `opt-in-page.html` (re-share the guide): `[Open your guide →]`
- Include link to tools page: `[Try it free →]`

**Email 3 (Day 5):**
- Subject: `the "I don't know" problem (and a simple fix)`
- Body: Use copy from `email-sequence.md` (Email 3 section)
- Include link to spin wheel tool

**Email 4 (Day 9):**
- Subject: `one last thing about tiny decisions`
- Body: Use copy from `email-sequence.md` (Email 4 section)
- Include link to share/refer: `tiny-decisions` landing page URL

### Merge tags to use:
- `{{ contact.first_name }}` — subscriber's first name (if collected)
- `{{ contact.email }}` — subscriber's email address
- `{{ site.name }}` — your site name
- `{{ site.url }}` — your site URL

---

## Step 5 — Connect the Landing Page Form to the Automation

In Systeme.io's funnel builder:

1. Go to your **Squeeze Page** settings
2. Under **Form Action**, select **Add to automation** or **Add tag**
3. Set the tag to: `free-guide-100-tiny-decisions`
4. This ensures the automation in Step 4 triggers correctly

---

## Step 6 — Test Everything

**Test the full flow:**

1. Submit your own email through the landing page
2. Confirm you receive Email 1 immediately with the PDF attached
3. Confirm the thank you page loads correctly
4. Confirm the email has no broken links
5. Wait 2 days and confirm Email 2 fires correctly
6. Check that unsubscribe links work

**Pre-launch checklist:**
- [ ] PDF is uploaded and link works
- [ ] Landing page form redirects to thank you page
- [ ] Automation triggers on form submission (tag = `free-guide-100-tiny-decisions`)
- [ ] Email 1 sends immediately with PDF attached
- [ ] Emails 2, 3, 4 have correct send delays
- [ ] All merge tags resolve correctly
- [ ] Unsubscribe links work in all emails
- [ ] GDPR / CAN-SPAM compliant: physical address or sender address in email footer
- [ ] Mobile view of landing page looks good
- [ ] SEO meta fields set on landing page

---

## File Reference

All source files for this funnel are in:

```
freebies/
├── opt-in-page.html       ← Landing page (paste into Systeme.io HTML block)
├── thank-you-page.html    ← Thank you page (paste into Systeme.io HTML block)
├── email-sequence.md     ← 4-email copy with subject lines
├── SYSTEME-SETUP-GUIDE.md ← This file
└── landing-page.md        ← Content reference / SEO description
```

---

## Notes & Gotchas

- **Systeme.io's HTML blocks:** Systeme.io has a custom HTML element in its page editor. Look for "Custom Code" or "HTML" in the element toolbar. Paste the HTML there — do NOT try to paste into a rich text block.
- **Images in landing page:** The current landing page uses CSS-only styling (no image files needed). If you want to add a guide cover image, upload it to Systeme.io media library first and update the `src` path.
- **GDPR:** Add your physical mailing address (required by law in many jurisdictions) to the email footer. Systeme.io has a built-in footer block for this.
- **Free product:** You must create a $0 product in Systeme.io to track the funnel goal. The PDF download is the "deliverable."
- **Domain:** If you're using a custom domain, make sure DKIM/SPF is configured in Systeme.io settings so emails land in inbox and not spam.