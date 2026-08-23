---
"@kojaem/top-navigation": patch
---

Fix the right-side icon/label gap to match Figma (4px, was 2px). Figma audit confirmed the transparent background is intentional (the dark backdrop in the Figma page is just the documentation canvas, not the component) — no dark-theme variant was missing.
