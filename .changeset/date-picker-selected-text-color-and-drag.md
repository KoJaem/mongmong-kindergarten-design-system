---
"@kojaem/date-picker": patch
---

Fix the selected calendar date using `text.strong` (a dark gray, #3c3c46 in light theme) for its label on top of the colored `fill.brand` background, making it nearly illegible — now uses `text.inversePrimary` (#f9f9fb), the same token already used for readable text on brand-colored fills elsewhere (e.g. Button). Also add mouse click-and-drag scrolling to the `wheel` type's columns, which previously only responded to native touch/trackpad scroll.
