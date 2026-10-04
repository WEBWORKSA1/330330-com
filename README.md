# 330330.com — The Miss-You Hub · 想想你

In Chinese number-code **3 = 想 (miss)** and **0 = 你 (you)**: 330 = 想想你, "missing you, missing you".
330330.com is a bilingual (EN/中文) hub for long-distance couples, families apart and everyone who misses someone.

**Live (GitHub Pages):** https://webworksa1.github.io/330330-com/

## What's inside
| Page | Purpose | Revenue |
|---|---|---|
| `index.html` | Hero decoder, message of the day, festival countdown, tools, quick lead form, lead magnet, FAQ | AdSense, leads, donations |
| `miss-you-messages.html` | 100+ bilingual messages, generator, filters, copy/share | AdSense (in-feed every 8 cards) |
| `love-codes.html` | Number → meaning decoder, reverse lookup, 50+ code dictionary | AdSense, Mandarin-tutor leads |
| `ldr-toolkit.html` | Reunion countdown (+ .ics), dual time-zone clock & call-overlap, distance, days-together, 40 date ideas | AdSense, affiliates, trip leads |
| `ecards.html` | Canvas e-card maker, PNG download/share | Flower/gift affiliate upsell |
| `gifts.html` | Filterable gift finder + gift-concierge form | Affiliates, leads |
| `festivals.html` | Valentine's, LNY, Lantern, White Day, 520, 521, Qixi, Mid-Autumn, Double Ninth (3 years of dates) + reminders | AdSense, affiliates, list growth |
| `quiz.html` | 8-question Miss-You style quiz with email-gated guide | Leads |
| `videos.html` | YouTube grid (config-driven) | YouTube |
| `get-help.html` | 4-step lead wizard with lead scoring | Lead gen (coaching, tutors, gifts, travel, proposals, B2B) |
| `support.html` | Donation tiers, goal bar, pledge form | Donations |
| `contests.html` | Miss-You Letter Contest, prizes, entry form, rules | Sponsorship, engagement |
| `careers.html` | Roles + ambassador program + application form | Talent |
| `advertise.html` | Packages + partnership/media-kit form | Direct ads, sponsorships |
| Guides | `what-does-330-mean.html`, `how-to-say-i-miss-you-in-chinese.html`, `long-distance-relationship-guide.html` | SEO traffic |
| `about.html`, `contact.html`, `legal.html`, `404.html` | Trust, privacy, terms, TM/© disclosure | — |

## Switch on revenue — edit `assets/js/config.js` only
- `adsenseClient` + `adSlots` → AdSense everywhere (house ads show until then). Update `ads.txt`.
- `affiliates.amazonTag`, `flowers`, `esim`, `flights`, `tutors` → affiliate links.
- `donate.paypal / kofi / buymeacoffee / stripe` → donation buttons appear automatically.
- `youtubeChannel`, `videos[]` → subscribe buttons and embedded videos.
- `contest` → name, close date, prizes. `fundingGoal` → supporter goal bar.

## Forms
All forms post via FormSubmit AJAX to a single owner inbox stored encoded in `config.js` (never printed in page text or source).
The **first** submission triggers a one-time FormSubmit activation email — click it once. Optionally paste the random alias FormSubmit gives you into `inboxAlias` and set `inboxIsAlias: true`.

## Editing pages
Every page is plain HTML at the repo root — edit and commit, no build step. The shared footer (links, newsletter, TM/© disclosure,
cookie notice) is injected from `assets/js/main.js` so it only needs changing in one place. Add new pages to `sitemap.xml`.
Social share image: add a 1200×630 `assets/img/og.png` and an `og:image` meta tag when ready.

## Custom domain
1. Add a file named `CNAME` containing `330330.com`.
2. DNS: A records → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; `www` CNAME → `webworksa1.github.io`.
3. Settings → Pages → Custom domain → `330330.com`, tick **Enforce HTTPS**.

## Docs
- `RESEARCH.md` — cultural/economic research, decision rationale, competitor audit (29 sites)
- `PROMPTS.md` — phase-wise build prompts

## Trademark & copyright
"330330" is used descriptively as a number and Chinese number-code. Not affiliated with any company using the same or similar number. Third-party marks belong to their owners. Original content © 330330.com.
