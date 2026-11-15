# @kojaem/grid-list

## 0.1.3

### Patch Changes

- Updated dependencies [a085892]
  - @kojaem/tokens@0.2.1

## 0.1.2

### Patch Changes

- 6359348: Match Figma text tokens (Figma screens use the dark variable mode): Button brand fill → `text.strong`, brand weak → `text.brand`; BottomSheet and Popover title/description → `text.inversePrimary`/`text.inverseSecondary`; GridListItem label → `text.inverseSecondary`. Storybook now defaults to the dark theme with a toolbar toggle.

## 0.1.1

### Patch Changes

- f5e2457: Fix disabled GridListItem opacity to match Figma (50%, was 40%) and remove the dead `disabled` recipe variant that never applied any style (disabling is already handled correctly via the native `:disabled` selector). Figma audit confirmed the background/padding/radius/selected-border already matched exactly.

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
