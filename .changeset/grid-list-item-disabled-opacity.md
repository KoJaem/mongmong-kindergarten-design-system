---
"@kojaem/grid-list": patch
---

Fix disabled GridListItem opacity to match Figma (50%, was 40%) and remove the dead `disabled` recipe variant that never applied any style (disabling is already handled correctly via the native `:disabled` selector). Figma audit confirmed the background/padding/radius/selected-border already matched exactly.
