# Single Config File for Google Site Embeds

This repository hosts a single `site-config.js` file that provides the base URL for all Google Site embeds.

## Purpose

Instead of hardcoding `SITE_BASE` in every embed, this file serves as the single source of truth. All subpages fetch the base URL from this file via jsDelivr CDN.

## File Structure

```
/
  site-config.js    # Contains window.GLOBAL_SITE_BASE
  README.md         # This file
```

## How to Use

1. **Create a GitHub repository** with these files
2. **Share via jsDelivr**: `https://cdn.jsdelivr.net/gh/YOUR_GITHUB_USERNAME/YOUR_REPO/site-config.js`
3. **Add to all subpages**: Use the script tag pattern from the config

## Editing

To change your site URL, edit only `site-config.js`:
```javascript
window.GLOBAL_SITE_BASE = "https://YOUR_NEW_SITE_URL";
```

All embeds will automatically use the new URL on next load.
