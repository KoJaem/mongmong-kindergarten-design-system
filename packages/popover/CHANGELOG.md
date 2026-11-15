# @kojaem/popover

## 0.2.1

### Patch Changes

- Updated dependencies [a085892]
  - @kojaem/tokens@0.2.1

## 0.2.0

### Minor Changes

- 189c9fa: Close Figma design gaps: Popover `fixedWidth` prop (Figma `Fixed Width`, default `true`; `false` hugs content for `kind="popover"`); DatePicker `unit` prop (`"day" | "month"`, default `"day"`; `"month"` hides the wheel day column and `onChange` receives the 1st of the month); BottomSheet and Modal title/description preserve `\n` line breaks (`white-space: pre-line`); Chip selected label colors match Figma dark mode (fill → `background.default`, weak → `text.brand`). DatePicker wheel items use Figma inverse text tokens (`text.inverseTertiary`, selected `text.inverseSecondary`) and the calendar selected day uses `text.strong`.

## 0.1.2

### Patch Changes

- 6359348: Match Figma text tokens (Figma screens use the dark variable mode): Button brand fill → `text.strong`, brand weak → `text.brand`; BottomSheet and Popover title/description → `text.inversePrimary`/`text.inverseSecondary`; GridListItem label → `text.inverseSecondary`. Storybook now defaults to the dark theme with a toolbar toggle.

## 0.1.1

### Patch Changes

- f5e2457: Fix Tooltip padding to match Figma (6px vertical / 8px horizontal, was 8px / 10px). Figma audit confirmed the shadow, blur, radius, popover width/padding, and size-affects-typography-only behavior already matched exactly.

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
