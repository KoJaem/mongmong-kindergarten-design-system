# @kojaem/modal

## 0.1.2

### Patch Changes

- 189c9fa: Close Figma design gaps: Popover `fixedWidth` prop (Figma `Fixed Width`, default `true`; `false` hugs content for `kind="popover"`); DatePicker `unit` prop (`"day" | "month"`, default `"day"`; `"month"` hides the wheel day column and `onChange` receives the 1st of the month); BottomSheet and Modal title/description preserve `\n` line breaks (`white-space: pre-line`); Chip selected label colors match Figma dark mode (fill → `background.default`, weak → `text.brand`). DatePicker wheel items use Figma inverse text tokens (`text.inverseTertiary`, selected `text.inverseSecondary`) and the calendar selected day uses `text.strong`.

## 0.1.1

### Patch Changes

- cd27b7f: Fix the button area not filling the available width to match Figma: `horizontal` layout now uses a `1fr`-column grid so a single button spans the full width and two buttons split it evenly, instead of each button only being as wide as its label.
- f5e2457: Fix title/description text being nearly invisible in light theme: both components used `text.inversePrimary`/`text.inverseSecondary` (near-white) on the translucent `background.upper` surface, matching the actual Figma design's dark, legible text (`text.primary`/`text.secondary`) instead.

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
