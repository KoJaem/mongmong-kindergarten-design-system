# @kojaem/grid-list

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
