---
"@kojaem/button": patch
---

Fix invisible text on `variant="weak"` buttons: `color="brand"` used `text.brand` (#f9f8ff, near-white) on the near-white `fill.brandWeak` background, and `color="inverse"` used `text.inversePrimary` (near-white) on the near-white `fill.inverseWeak` background — both effectively unreadable. Brand now uses `text.brandWeak` (a readable purple, the token actually paired with weak brand surfaces elsewhere in the system, e.g. Chip); inverse now uses `text.primary` (dark), matching the same token already used correctly on `color="inverse" variant="fill"`. Verified in both light and dark theme token values, not just Figma's raw export (which reflects canvas-mode-dependent fallback colors that don't match this file's actual light/dark token values).
