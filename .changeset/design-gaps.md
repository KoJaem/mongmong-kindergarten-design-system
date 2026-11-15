---
"@kojaem/popover": minor
"@kojaem/date-picker": minor
"@kojaem/bottom-sheet": patch
"@kojaem/modal": patch
"@kojaem/chip": patch
"@kojaem/mongmong": patch
---

Close Figma design gaps: Popover `fixedWidth` prop (Figma `Fixed Width`, default `true`; `false` hugs content for `kind="popover"`); DatePicker `unit` prop (`"day" | "month"`, default `"day"`; `"month"` hides the wheel day column and `onChange` receives the 1st of the month); BottomSheet and Modal title/description preserve `\n` line breaks (`white-space: pre-line`); Chip selected label colors match Figma dark mode (fill → `background.default`, weak → `text.brand`).
