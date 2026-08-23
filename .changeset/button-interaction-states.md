---
"@kojaem/button": patch
---

Add hover/pressed and disabled interaction states matching Figma spec: pressed backgrounds now use the existing pressed tokens (`fill.brandPressed`, `fill.pressed`, `fill.inversePressed`) for `:hover`/`:active`, and disabled now applies `opacity: 0.3` over the existing color/variant instead of swapping to a flat gray.
