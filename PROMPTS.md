# 330330.com — Phase-wise Build Prompts

Copy each prompt into your AI builder in order. Each phase is self-contained and assumes the previous phases exist. Stack: static HTML/CSS/vanilla JS, no build step required, hosted free on GitHub Pages.

---

## Phase 0 — Global rules (prepend to every prompt)

```
You are building 330330.com, "The Miss-You Hub" — a bilingual (English / 简体中文) site for anyone who misses someone:
long-distance couples, families apart, students abroad, the Chinese diaspora. Core idea: in Chinese number-codes
3 = 想 (miss) and 0 = 你 (you), so 330 = 想想你 "missing you, missing you".
Rules:
- Pure static HTML5 + one CSS file + vanilla JS modules. Must run on GitHub Pages free plan. Relative links only.
- Mobile-first, responsive (320px → 1440px), WCAG AA contrast, keyboard accessible, prefers-color-scheme dark mode.
- Every page starts with a top strip: "Contact, if you are interested in this website / domain name / Sponsorship /
  Advertisement / Partnership" linking to https://web.works/contact (target _blank).
- ONE owner inbox for all forms (the Webworks Gmail inbox) — NEVER print it in HTML/text or docs. Store it encoded (reversed base64,
  split into chunks) in assets/js/config.js and decode only at submit time; submit via FormSubmit AJAX
  (https://formsubmit.co/ajax/<inbox>). Fallback: build a mailto link at click time.
- Ad slots read from config.js (adsenseClient + slot ids). If empty, show tasteful "Advertise here" house ads.
- Do not use any third-party trademarked names, logos or characters in branding. "330330" is used as a numeric
  descriptor; include a trademark/copyright disclosure in the footer and legal page.
- Fonts: Google Fonts only (Noto Serif SC + Inter). No other external CSS.
```

## Phase 1 — Foundation, design system, shell

```
Create: index.html, assets/css/style.css, assets/js/config.js, assets/js/main.js, favicon.svg, manifest.webmanifest,
robots.txt, sitemap.xml, ads.txt, 404.html, .nojekyll.
Design tokens: Chinese red #C8102E (CTA), rose #FBE9EC, gold #E8B33A, ink #1D1B26, night navy #141B3C (Qixi),
off-white #FFFBF7. Radius 16px, soft shadows, card grids.
Header: logo "330·330 想想你", sticky nav (Messages, Love Codes, LDR Toolkit, E-Cards, Gifts, Festivals, Get Help,
Support), EN/中文 toggle (persist in localStorage, wrapped in try/catch), hamburger on mobile.
Footer: 4 columns (Explore, Tools, Work with us, Legal), newsletter form, donate button, TM/© disclosure.
main.js: renders active nav state, i18n toggle via data-en / data-zh attributes, toast system, copy-to-clipboard,
share (Web Share API → fallback WhatsApp / X / Facebook / Pinterest / copy link), ad loader, form handler.
```

## Phase 2 — Homepage that converts

```
Hero: giant animated "330 330" that resolves into 想想你 · 想想你 / "Missing you, missing you". Primary CTA:
"Send a Miss-You message" and an inline Love-Code decoder input. Below: stat strip (40M diaspora, 14M LDR couples,
343 texts/week), "Message of the day" with copy/share, tool cards (Countdown, Time-zone clock, E-card, Quiz),
next-festival countdown, gift-guide teaser, lead-gen band ("Get matched with a coach / Mandarin tutor / gift concierge"),
supporter wall + donate CTA, contest banner, FAQ accordion with FAQPage JSON-LD, newsletter lead magnet
("Free: 100 Miss-You Texts + Love-Code cheat sheet").
Ad slots: below hero (leaderboard), mid-page (in-feed), footer (anchor on mobile).
```

## Phase 3 — Content engines (traffic)

```
1. miss-you-messages.html — 200+ messages in data.js tagged by audience (partner, husband, wife, boyfriend,
   girlfriend, family, friend, mom, dad), tone (sweet, funny, deep, short, flirty), language (EN/中文).
   Filter chips, search, "Generate one for me" randomizer, copy, share, "Make it an e-card". In-feed ad every 8 cards.
2. love-codes.html — Decoder (type any number → per-digit meanings + known phrase match) and Reverse lookup
   (phrase → code). Table of 60+ codes with code, 汉字, pinyin, English, vibe (sweet/funny/rude warning).
   Deep section "What does 330 mean?".
3. guide pages (SEO long-form, 1,200+ words each, Article JSON-LD, ToC, FAQs):
   what-does-330-mean.html, how-to-say-i-miss-you-in-chinese.html, long-distance-relationship-guide.html.
4. festivals.html — Qixi, 520, 521, Valentine's, White Day, Mid-Autumn, Lunar New Year, Lantern Festival with
   dates for 3 years, legend summaries, greeting lines, live countdown, gift CTA per festival.
5. videos.html — YouTube grid configured from config.js (channel + video IDs), privacy-enhanced embeds
   (youtube-nocookie), lazy click-to-load thumbnails; curated search links when IDs are empty.
```

## Phase 4 — Interactive tools (retention + shares)

```
ldr-toolkit.html with tabs:
- Reunion Countdown (date picker, names, shareable URL with query params, "save to calendar" .ics download)
- Dual time-zone clock (two Intl time zones, "good time to call" overlap finder, awake/asleep indicator)
- Distance calculator (pick two cities from 120-city list, haversine km/mi, "you are X heartbeats apart" fun line)
- Days-together counter (start date → days, weeks, next anniversary milestones 100/365/500/1000 days)
- 60 virtual date ideas with filters (free / under $20 / 30 min / app needed)
ecards.html — Canvas e-card maker: 8 templates, custom message, names, font, color, sticker "330"; download PNG,
  share link, "Send flowers too" affiliate upsell. No ads on the editor canvas.
quiz.html — 8-question "What's your Miss-You style?" quiz with 4 result types; result shown immediately,
  optional email to receive the full guide (lead).
```

## Phase 5 — Monetization layer

```
- AdSense: load adsbygoogle.js only when config.adsenseClient is set; auto + manual slots; ads.txt template.
- gifts.html: Gift finder with filters (budget, recipient, occasion, LDR gadget / flowers / experience / DIY),
  24+ product cards with neutral generic product names, price band, "Check price" affiliate buttons driven from
  config.affiliates (rel="sponsored nofollow noopener"), affiliate disclosure at top.
- YouTube: channel subscribe CTA, video embeds on guides/festivals.
- Sponsored placements: "Featured partner" cards on tools pages; advertise.html with rate card + media kit request form.
```

## Phase 6 — Lead generation engine (highest-value page)

```
get-help.html — "Get matched in 60 seconds". 4-step wizard with progress bar:
  Step 1 What do you need? (LDR/relationship coaching, Learn Mandarin for my partner/family, Gift & flower delivery
  concierge, Reunion trip planning, Wedding/proposal planning, Business partnership/sponsorship)
  Step 2 Details (timeline, budget band, countries/cities, language)
  Step 3 Contact (name, email, WhatsApp/WeChat optional, preferred contact time)
  Step 4 Consent + submit → thank-you state with next steps and share.
Trust: response-time promise, privacy note, testimonials placeholders, FAQ. Hidden fields: source page, UTM,
lead score (budget × timeline). Repeat compact lead forms on homepage, tools pages, guides.
Lead magnets: newsletter (cheat sheet PDF), festival reminder sign-up (email + which festivals), quiz result email.
```

## Phase 7 — Community, donations, contests, hiring

```
support.html — donation tiers (¥33 "Coffee", $33 "Supporter", $330 "Patron", custom), PayPal/Ko-fi/BMC/Stripe
  buttons from config (hidden when empty), pledge form fallback, funding goal bar with allocation
  (operations, promotion, marketing, hiring, contest prizes), supporter wall.
contests.html — seasonal "330 Miss-You Letter Contest": rules, prizes, timeline, entry form (name, email, country,
  entry text ≤ 330 words, consent), past winners placeholder, sponsor-a-prize CTA.
careers.html — open roles (bilingual writer, video creator, community manager, illustrator, SEO, partnerships)
  with application form (portfolio link) and "volunteer / ambassador" program.
advertise.html — audience stats, ad formats, sponsorship packages, partnership form.
```

## Phase 8 — Trust, legal, SEO, performance

```
legal.html — Privacy, Terms, Cookie notice, Affiliate disclosure, Advertising disclosure, Trademark & Copyright
disclosure ("330330" is used descriptively as a number; not affiliated with any company using similar numbers;
all third-party marks belong to their owners; original content © 330330.com), DMCA/takedown contact form.
about.html, contact.html (form only, no email shown).
SEO: unique titles/meta, canonical, Open Graph + Twitter cards, hreflang en/zh, JSON-LD (Organization, WebSite
SearchAction, FAQPage, Article), sitemap.xml, robots.txt. Performance: no frameworks, defer JS, lazy images,
Lighthouse ≥ 90 on mobile. Cookie-consent banner before loading ads in EEA.
```

## Phase 9 — Deploy & grow

```
Push to GitHub repo webworksa1/330330-com (branch main). Settings → Pages → Deploy from branch main / root.
Custom domain: add CNAME file "330330.com", DNS A records 185.199.108.153/109.153/110.153/111.153 + CNAME www →
webworksa1.github.io. Enforce HTTPS. Then: submit sitemap to Google Search Console, apply for AdSense, add ads.txt,
create YouTube channel "330330 Miss-You", schedule festival content 6 weeks ahead of each spike
(Feb 14, May 20, Qixi, Mid-Autumn), run the contest each Qixi.
```
