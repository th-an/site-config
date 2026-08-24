# Understanding the Google Sites Embed Touch Issue

This is a known behavior when rendering embedded elements inside Google Sites. Because Google Sites encapsulates custom code embeds inside isolated `iframe` containers, Android tablets may struggle with gesture delegation upon initial page load. The parent browser page attempts to capture scrolling gestures while the inner `iframe` intercepts the initial touch registration, leading to an unresponsive or frozen feel.

---

## Recommended Solutions

### 1. Adjust CSS Pointer & Touch Actions *(Best for Custom Code Embeds)*

If you used the **Embed Code** feature to insert custom HTML, configure the embedded container to handle touch gestures and scrolling explicitly:

```css
html, body {
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}
```

* **Why this works:** It explicitly instructs the mobile WebKit/Blink engine to process standard vertical swipe actions immediately rather than waiting for complex gesture resolution.

---

### 2. Ensure a Mobile-Responsive Viewport *(For External Sites)*

If you are embedding an entire external website URL, verify that the external page includes a mobile-responsive viewport `<meta>` tag within its `<head>` section:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

* **Why this works:** Without a viewport tag, mobile browsers attempt to scale a desktop resolution into the `iframe`, misaligning touch target coordinates.

---

### 3. Increase Embed Container Height in Google Sites Editor

When an embed block's bounding box is shorter than its content, the browser generates an internal scrollbar inside the `iframe`. This creates conflicting scroll contexts between the page and the container.

* Open the **Google Sites Editor**.
* Click on the embedded block.
* Drag the bottom blue resize handle downward to give the content sufficient vertical space.
* **Why this works:** Eliminating nested scrollbars allows the tablet browser to handle all touch gestures at the page level.

---

### 4. Check Android Chrome "Embedded Content" Settings

In some instances, device-level cookie and `iframe` sandbox policies in Chrome can delay interaction.

1. Open **Chrome** on the Android tablet.
2. Tap the **three dots** in the top-right corner → **Settings**.
3. Navigate to **Site settings** → **Embedded content**.
4. Ensure the toggle is **On**.

---

## Need Further Troubleshooting?

To narrow down the exact cause, please share:

1. Are you embedding **custom HTML snippet code** or an **external web URL**?
2. Does the embedded snippet contain form inputs, JavaScript listeners, or static text/tables?

---

*Terminology note: This document uses neutral engineering terms — retrospective, root-cause analysis, incident review — in place of harsh terminology.*
