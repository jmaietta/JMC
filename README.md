# Jon Maietta — Personal & Professional Page

Live: [jonmaietta.com](https://jonmaietta.com/)

Static single-page portfolio for Jon Maietta (Founder & CEO, TEK2day Holdings). No framework, no build step — just HTML + CSS + JS.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure, inline styles, hero / products / background / following |
| `styles.css` | Currently unused (styles are inline in `index.html`); kept token-synced as a future extraction target |
| `script.js` | Renders pills/cards/lists from `site-data.js` (currently unused by `index.html`, which renders inline) |
| `site-data.js` | Canonical content data: social links, companies, YouTube follows |
| `favicon.svg` | Browser icon |
| `og.png` | Social preview image (1200×630) |
| `sitemap.xml` | Search-engine sitemap |
| `robots.txt` | Crawler rules + sitemap reference |

## Content source of truth

`site-data.js` is the intended single source of truth, but `index.html` currently hardcodes
products (Kilby, CEORater, EDGAR Watcher, TEK2day Finance, FinClaw, T2D Pulse, T2D Newsletter)
and YouTube follows inline. If you edit content, update **both** until the page is migrated
to render from `site-data.js`.

Known drift: `site-data.js` lists PromptGenius / TEK2day Holdings / Storefront (not on page);
the page lists Kilby / FinClaw (not in `site-data.js`).

## Local preview

```bash
npx serve .
# or
python -m http.server 8080
```

## SEO checklist

- Canonical, robots, JSON-LD Person schema ship in `<head>`
- `sitemap.xml` lastmod should be bumped on content changes
- Submit sitemap in Google Search Console after deploy

## Performance notes

- Google Fonts: single request, used weights only (`Outfit` 500/700/800 + `Fira Code` 400/500), async via `media="print"` swap
- `prefers-reduced-motion` disables pulse/blink/fadeUp animations
- `og.png` is ~121KB — keep under 200KB
