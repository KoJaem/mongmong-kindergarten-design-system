---
"@kojaem/bottom-sheet": patch
"@kojaem/modal": patch
---

Fix title/description text being nearly invisible in light theme: both components used `text.inversePrimary`/`text.inverseSecondary` (near-white) on the translucent `background.upper` surface, matching the actual Figma design's dark, legible text (`text.primary`/`text.secondary`) instead.
