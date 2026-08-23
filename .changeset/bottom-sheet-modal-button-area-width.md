---
"@kojaem/bottom-sheet": patch
"@kojaem/modal": patch
---

Fix the button area not filling the available width to match Figma: `horizontal` layout now uses a `1fr`-column grid so a single button spans the full width and two buttons split it evenly, instead of each button only being as wide as its label.
