## What

P0 optimization pass on the single-page portfolio (index.html + supporting files). No visual redesign — same look, faster + more discoverable + more accessible.

## Changes

**SEO / discoverability**
- Added canonical, author, robots, theme-color, JSON-LD Person schema
- Added robots.txt (references sitemap)
- Added README.md (repo had none — helps GitHub discovery + documents structure)

**Performance**
- Google Fonts trimmed 11 weights to 5 actually used (Outfit 500/700/800 + Fira Code 400/500)
- Async font load via media=print swap + preload as=style + noscript fallback
- Wired --font-heading/body/mono to the loaded families (previously fetched but fell back to system fonts)
- og.png verified at ~121KB (under 200KB budget)

**Accessibility**
- prefers-reduced-motion kill-switch for pulse/blink/fadeUp animations
- Bumped --text-secondary #d6d6d6 to #e2e2e2, --text-muted #a8a8a8 to #c2c2c2 for WCAG AA on near-black
- Descriptive aria-labels on all 7 product cards + YouTube grid links

**UX**
- Added Get in touch mailto link to hero social row (previously email only existed in site-data.js, unreachable from the page)

**Security**
- rel=noopener noreferrer on all JS-rendered external links in script.js

**Docs / hygiene**
- Annotated unused styles.css (page styles are inline; tokens now synced so a future extraction is safe)
- README documents the known site-data.js drift: data file lists PromptGenius/Holdings/Storefront (not on page); page lists Kilby/FinClaw (not in data file)

## Deliberately NOT in this PR

- No consolidation of inline style vs styles.css (visual risk, needs eyeball check)
- No site-data.js migration (content decision — Kilby/FinClaw vs PromptGenius/Storefront)
- No Following section rework, no Background dates/metrics, no product screenshots
- og:url / og:image still use bare jonmaietta.com (www vs apex redirect should be confirmed in hosting first)

## Verify

- [ ] Open preview deploy, confirm hero/cards/timeline render identically
- [ ] DevTools Network: fonts = 1 request, display=swap
- [ ] DevTools Lighthouse: check Performance / Accessibility deltas
- [ ] View-source: canonical + JSON-LD present
- [ ] https://jonmaietta.com/robots.txt serves after deploy
- [ ] Submit sitemap.xml in Search Console (bump lastmod on content edits)
