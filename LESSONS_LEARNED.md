# Lessons Learned — site-config Google Sites Embeds & 8-Page Sequence

Captured from 2026-08-24 session: fixing 404 routes, jsDelivr CDN caching, recreating 8-page embed sequence, neutral terminology, Android touch handling, and Chrome sandbox navigation for `th-an/site-config`.

---

## Category Mechanism

This file uses a **category tagging system** for post-implementation reviews. Other projects can adopt it via `LESSONS_CATEGORIES`.

```yaml
LESSONS_CATEGORIES:
  ROUTING: "Route keys, Google Sites page hierarchy, and central config management"
  CDN_OPS: "CDN caching, raw GitHub vs jsDelivr, and propagation"
  ARCHITECTURE: "Google Sites iframe sandbox, X-Frame-Options, and embed methods"
  BROWSER_COMPAT: "Chrome strict vs Safari lenient, and cross-browser testing"
  NAVIGATION: "target _top vs _blank, hybrid handlers, and sandbox workarounds"
  TOUCH_UX: "Mobile touch delegation, touch-action, and viewport handling"
  TERMINOLOGY: "Neutral engineering language vs harsh terms"
  GIT_OPS: "Sequential page creation, commit hygiene, and recovery"
  DOCUMENTATION: "Troubleshooting guides and failure-mode mirroring"
```

| Tag | Category | Description |
|-----|----------|-------------|
| `R` | ROUTING | Route mismatches cause 404s |
| `C` | CDN_OPS | Cached CDN serves stale config |
| `A` | ARCHITECTURE | Double-sandboxed inner-frame blocks top navigation |
| `B` | BROWSER_COMPAT | Chrome blocks, Safari allows — must test both |
| `N` | NAVIGATION | `_top` blocked, `_blank` via `allow-popups` works |
| `T` | TOUCH_UX | `touch-action: pan-y` resolves gesture delegation |
| `L` | TERMINOLOGY | `retrospective`/`incident review` vs `post-mortem`/`gotchas` |
| `G` | GIT_OPS | 8-page sequential commits, reflog awareness |
| `D` | DOCUMENTATION | Guides mirror real embed failures |

---

## Lessons by Category

### ROUTING

#### R1. Route keys must match Google Sites’ actual page tree — not assumed hierarchy
`lessonsLearnt: "/projects/lessons-learnt"` returned 404 because Google Sites only has `/lessons-learnt` at root. `curl -I` showed `/lessons-learnt:200`, `/projects/lessons-learnt:404`. Sub-paths like `/lessons-learnt/l-csrd` (404) vs `/lessons-learnt/l-crypto-tax` (200) also differ.

**Lesson:** Always verify with `curl -I https://sites.google.com/view/<site><path>` before committing routes. A missing Google Sites page ≠ a missing route key — create the page first, then add the key.

**Fix:** `site-config.js:be1bc73` kept only `lessonsLearnt: "/lessons-learnt"` and `cryptoTaxLessons: "/lessons-learnt/l-crypto-tax"` (the two that exist), removed 4 non-existent `csrd/dora/estate/tisax` lesson routes.

#### R2. `data-path` full paths bypass route-key lookup — useful but masks missing keys
`a-crypto-mcp.html:451` uses `data-path="/projects/mcp/crypto-tax-mcp"` (full path, not `data-route="cryptoTax"`). The JS resolver `base + raw` works even if `site-config.js` lacks that key, hiding missing `cryptoTaxArch` etc.

**Lesson:** Prefer `data-route="cryptoTax"` to surface missing keys early; `data-path` is a silent fallback that hides config drift.

### CDN_OPS

#### C3. jsDelivr CDN caches stale `site-config.js` — raw GitHub is source of truth
After `34af279` (added `GLOBAL_SITE_BASE`), `curl https://cdn.jsdelivr.net/gh/th-an/site-config/site-config.js` still served old `lessonsLearnt: "/projects/lessons-learnt"`, while `https://raw.githubusercontent.com/th-an/site-config/main/site-config.js` served new `"/lessons-learnt"`.

**Lesson:** Never debug 404s via CDN — verify via raw GitHub URL. In embeds, use `https://raw.githubusercontent.com/th-an/site-config/main/site-config.js` to bypass CDN cache (as done in all 8 HTML pages).

### ARCHITECTURE

#### A4. Google Sites Embed Code is double-sandboxed without `allow-top-navigation`
Every `Embed → Embed code` is rendered as `https://1304452823-atari-embeds.googleusercontent.com/embeds/.../inner-frame-minified.html` with `sandbox="allow-scripts allow-same-origin allow-forms allow-popups ..."` **without** `allow-top-navigation` or `allow-top-navigation-by-user-activation`.

**Lesson:** Any `target="_top"` or `window.top.location.href` will hit `Unsafe attempt to initiate navigation ... sandboxed` in Chrome (shown in console). This is Google’s wrapper, not your code.

#### A5. `X-Frame-Options: DENY` on Google Sites blocks iframe fallback
All `https://sites.google.com/view/...` responses include `X-Frame-Options: DENY`. The hybrid handler at `3d6f89f` tried `window.location.href = url` inside the iframe after `top` failed — that load is blocked and appears as “not working” with no error.

**Lesson:** Never fallback to `window.location.href` inside the embed iframe for Google Sites URLs. Directly `window.open(url,'_blank')` after `top` fails (fixed at `519c071`).

### BROWSER_COMPAT

#### B6. Chrome strict vs Safari lenient — must test both browsers
Safari allowed `target="_top"` same-tab navigation; Chrome blocked with `Unsafe attempt ...` and required `_blank` via `allow-popups`. The touch issue was initially misattributed to Android, but was actually Chrome’s stricter sandbox enforcement.

**Lesson:** Test every embed in **both** Chrome and Safari (and Android Chrome). Console errors are the ground truth — Safari silence ≠ Chrome success.

### NAVIGATION

#### N7. `target="_top"` vs `"_blank"` vs hybrid — only `_blank` works in Chrome sandboxed embeds
- `target="_top"` (initial): Safari OK, Chrome blocked (`c5c4696` changed to `_blank`)
- `target="_blank"` (`c5c4696`, 81 links): Chrome OK via `allow-popups`, but user reported “all pages opening new tab” (issue #2)
- Hybrid `target="_self"` + `window.top → window.location.href → window.open` (`3d6f89f`): middle step blocked by `X-Frame-Options`, appeared dead on `a-crypto-mcp.html:451-457` (3 hero buttons)
- Final hybrid `target="_blank"` + `try top → catch → window.open` (`519c071`): Safari same-tab (top succeeds, returns), Chrome new tab (top throws, opens via `allow-popups`)

**Lesson:** For Google Sites Embed code in Chrome, **same-tab top navigation is impossible** without `allow-top-navigation`. Document this trade-off; if same-tab is required, switch embeds to **Embed → By URL** (not sandboxed) instead of Embed code.

### TOUCH_UX

#### T8. `touch-action: pan-y` + `-webkit-overflow-scrolling: touch` fixes Android gesture delegation
Added at `5850773` (8 files, 32 insertions) after `* { box-sizing... }`:
```css
html, body { touch-action: pan-y; -webkit-overflow-scrolling: touch; }
```
Plus ensuring `<meta name="viewport" content="width=device-width, initial-scale=1.0">` (already present) and increasing Google Sites embed height to eliminate nested scrollbars.

**Lesson:** Touch-action alone is insufficient if the embed’s bounding box is shorter than content — drag the blue handle in Google Sites Editor to remove inner scrollbars (Solution 3 in `EMBED_TROUBLESHOOTING.md`).

### TERMINOLOGY

#### L9. Neutral terminology: `retrospective`/`incident review` vs `post-mortem`/`gotchas`
Applied at `562ac8e` (5 files, 18 insertions): `Post-Mortem→Retrospective` (home:5, a-crypto-mcp:1, crypto-tax-mcp:1, l-crypto-tax:1, lessons-learnt:2), `Gotchas→Learnings` (lessons-learnt:3), `failure modes→incident patterns` (l-crypto-tax:2, lessons-learnt:1), `hard lessons→key learnings`, plus `EMBED_TROUBLESHOOTING.md:b86075c` uses `retrospective/root-cause analysis/incident review`.

**Lesson:** Define neutral terms in `LESSONS_CATEGORIES` and enforce via `sed -i ''` batch replacements — fixes double terms like `retrospective post-mortems → retrospectives`.

### GIT_OPS

#### G10. 8-page sequential creation needs reflog-aware commits and raw GitHub verification
Sequence: `4c9cedb` (delete HTML), then `cfec5fe` (P1 home), `c081e7a` (P2 projects), `aef6e0e` (P3 mcp), `7e6c2fc` (P4 crypto-tax), `ffc7385` (P5 architecture), `9e6dd37` (P6 a-crypto-mcp), `762d1d1` (P7 lessons-learnt), `3664a10` (P8 l-crypto-tax), followed by `5850773` (touch), `562ac8e` (neutral), `c5c4696`/`3d6f89f`/`519c071` (nav fixes).

**Lesson:** After `git reset --hard` or `4c9cedb` history rewrite, verify `git log --oneline` and `curl raw.githubusercontent` — not CDN — before declaring a fix live. Commit messages should list page/file and route to allow `grep log`.

### DOCUMENTATION

#### D11. Troubleshooting guide must mirror real embed failures with browser-specific console excerpts
Created `EMBED_TROUBLESHOOTING.md:b86075c` (2.8KB) with 4 solutions (touch-action CSS, viewport meta, embed height, Chrome embedded content toggle) and verbatim Chrome errors (`Unsafe attempt ...`, `allow-same-origin can escape`, `BrowserAutomation ... message channel closed`).

**Lesson:** Paste actual Chrome console excerpts (`about:blank:1 ...`, `content.js:7 ...`, `l-crypto-tax:1 Uncaught ...`) into the doc — future debugging localizes in minutes via `grep` for `allow-top-navigation` or `X-Frame-Options`.

---

## TL;DR

- Verify routes via `curl -I` on real Google Site paths — `/lessons-learnt` exists, `/projects/lessons-learnt` 404.
- Use `https://raw.githubusercontent.com/.../site-config.js` in embeds — jsDelivr CDN caches stale.
- Google Sites Embed code is sandboxed **without** `allow-top-navigation` — `target="_top"` always blocked in Chrome.
- Google Sites `X-Frame-Options: DENY` blocks iframe fallback — go `top → _blank` directly.
- Chrome new-tab via `_blank`/`allow-popups` is the only Chrome-compatible embed navigation; Safari same-tab is lenient — test both.
- `html,body{touch-action:pan-y}` + viewport + adequate embed height fixes Android gesture, not CSS alone.
- Batch `sed -i '' 's/Post-Mortem/Retrospective/g'` etc. enforces neutral terms — check for double `retrospective retrospectives`.
- 8-page sequence needs reflog-aware `git log` and raw GitHub verification, not CDN.
- Document real console errors verbatim for fast future triage.

| Tag | When to Use |
|-----|-------------|
| `R` | Route key missing or Google Site page not created |
| `C` | CDN still serves old config after push |
| `A` | `inner-frame-minified.html` sandbox blocks top nav |
| `B` | Safari works, Chrome blocked — test both |
| `N` | `_top` vs `_blank` trade-off, hybrid handler needed |
| `T` | Touch frozen, nested scrollbars |
| `L` | Harsh terms like `post-mortem`/`gotchas` |
| `G` | Sequential page commits, history rewrite |
| `D` | Missing troubleshooting guide |

---

*Mechanism: Define `LESSONS_CATEGORIES` at top, tag lessons with single-letter codes (`R,C,A,B,N,T,L,G,D`), group under `###` headers, and include category tags in commit messages (`git commit -m "Fix nav: hybrid ... (N,A,B)"`). Other repos can adopt same taxonomy.*
