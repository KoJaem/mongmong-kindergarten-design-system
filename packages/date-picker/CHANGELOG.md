# @kojaem/date-picker

## 0.2.1

### Patch Changes

- Updated dependencies [a085892]
  - @kojaem/tokens@0.2.1

## 0.2.0

### Minor Changes

- 189c9fa: Close Figma design gaps: Popover `fixedWidth` prop (Figma `Fixed Width`, default `true`; `false` hugs content for `kind="popover"`); DatePicker `unit` prop (`"day" | "month"`, default `"day"`; `"month"` hides the wheel day column and `onChange` receives the 1st of the month); BottomSheet and Modal title/description preserve `\n` line breaks (`white-space: pre-line`); Chip selected label colors match Figma dark mode (fill → `background.default`, weak → `text.brand`). DatePicker wheel items use Figma inverse text tokens (`text.inverseTertiary`, selected `text.inverseSecondary`) and the calendar selected day uses `text.strong`.

## 0.1.1

### Patch Changes

- 169e028: Fix the selected calendar date using `text.strong` (a dark gray, #3c3c46 in light theme) for its label on top of the colored `fill.brand` background, making it nearly illegible — now uses `text.inversePrimary` (#f9f9fb), the same token already used for readable text on brand-colored fills elsewhere (e.g. Button). Also add mouse click-and-drag scrolling to the `wheel` type's columns, which previously only responded to native touch/trackpad scroll.
- f5e2457: Rebuild the `wheel` DatePicker type as an actual scroll-snap wheel picker (center highlight row, muted fading rows) matching the Figma design, replacing the previous plain native `<select>` dropdowns.

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
