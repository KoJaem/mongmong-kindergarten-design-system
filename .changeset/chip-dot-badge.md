---
"@kojaem/chip": patch
---

Fix the notification dot to match Figma: it's now a 6px badge absolutely positioned at the chip's top-right corner instead of an inline 8px dot that stretched the chip's width. (Figma audit otherwise confirmed the existing fill/weak/selected/action color logic already matches the design exactly.)
