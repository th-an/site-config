# Embed URLs — th-an/site-config

Central reference for Google Sites embeds. Use **GitHub Pages** URLs for `Embed → By URL` (allows same-tab navigation, no sandbox block). Raw GitHub URLs are source of truth for `site-config.js`.

---

## GitHub Pages Embed URLs (recommended for `By URL`)

| # | Page | Route | Pages URL |
|---|------|-------|-----------|
| 1 | Home Dashboard | `/home` | `https://th-an.github.io/site-config/home.html` |
| 2 | Projects Hub | `/projects` | `https://th-an.github.io/site-config/projects.html` |
| 3 | MCP Registry | `/projects/mcp` | `https://th-an.github.io/site-config/mcp.html` |
| 4 | Crypto Tax Inventory | `/projects/mcp/crypto-tax-mcp` | `https://th-an.github.io/site-config/crypto-tax-mcp.html` |
| 5 | Main Architecture Hub | `/architecture` | `https://th-an.github.io/site-config/architecture.html` |
| 6 | Crypto Tax Arch Deep Dive | `/architecture/a-crypto-mcp` | `https://th-an.github.io/site-config/a-crypto-mcp.html` |
| 7 | Lessons Hub | `/lessons-learnt` | `https://th-an.github.io/site-config/lessons-learnt.html` |
| 8 | Crypto Tax Retrospective | `/lessons-learnt/l-crypto-tax` | `https://th-an.github.io/site-config/l-crypto-tax.html` |

**Notes:**
- All 8 pages use neutral terminology (`Retrospective` vs `Post-Mortem`, `Learnings` vs `Gotchas`) at `562ac8e`.
- Pages are served via GitHub Pages (`https://th-an.github.io/site-config/`) with `Content-Type: text/html` — embeddable via `By URL` (avoids `raw.githubusercontent` provider block).
- For `Embed → Embed code` (paste HTML), copy **Raw** content: `https://raw.githubusercontent.com/th-an/site-config/main/<file>.html` and paste directly — updates require re-paste.

---

## Central Config

| File | Raw URL (always latest) | CDN (cached) |
|------|-------------------------|--------------|
| `site-config.js` | `https://raw.githubusercontent.com/th-an/site-config/main/site-config.js` | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/site-config.js` |

Base: `https://sites.google.com/view/s-agenticaiexplorer`
Routes in `site-config.js:3563a34`:
- `home: "/home"`, `projects: "/projects"`, `architecture: "/architecture"`, `lessonsLearnt: "/lessons-learnt"`, `mcp: "/projects/mcp"`, `cryptoTax: "/projects/mcp/crypto-tax-mcp"`, `cryptoTaxMCP: "/projects/mcp/crypto-tax-mcp"`, `cryptoTaxArch: "/architecture/a-crypto-mcp"`, `cryptoTaxLessons: "/lessons-learnt/l-crypto-tax"`

Use in embeds:
```html
<script src="https://raw.githubusercontent.com/th-an/site-config/main/site-config.js"></script>
<script>
  (function(){
    const base = window.GLOBAL_SITE_BASE || window.SITE_CONFIG.base;
    document.querySelectorAll("a[data-path]").forEach(el=> el.href = base + el.getAttribute("data-path"));
  })();
</script>
```

---

## Alternative CDN (jsDelivr) — if Pages not available

| Page | CDN URL |
|------|---------|
| Home | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/home.html` |
| Projects | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/projects.html` |
| MCP Registry | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/mcp.html` |
| Crypto Tax Inventory | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/crypto-tax-mcp.html` |
| Architecture Hub | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/architecture.html` |
| Crypto Tax Arch | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/a-crypto-mcp.html` |
| Lessons Hub | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/lessons-learnt.html` |
| Crypto Tax Retrospective | `https://cdn.jsdelivr.net/gh/th-an/site-config@main/l-crypto-tax.html` |

---

*Generated 2026-08-24 — 8 pages at `519c071` (hybrid nav) + `562ac8e` (neutral) + `e9e629c` (lessons learned). Pages via `https://th-an.github.io/site-config/`.*
