---
"@kojaem/text-field": patch
---

Fix focus and disabled states to match Figma spec: default background now uses `background.upper`, focus changes the background instead of the border color, and disabled uses `fill.inverseWeak`/`border.opacityWeak`/`text.quaternary` instead of the neutral-gray tokens.
