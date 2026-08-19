---
"@kojaem/chip": patch
---

Fix invisible text on `kind="select" selected variant="weak"` chips: used `text.brand` (#f9f8ff, near-white) on the near-white `fill.brandWeak` background — same bug found in `@kojaem/button`'s weak variant. Switched to `text.brandWeak`, the readable purple Figma actually shows for this state.
