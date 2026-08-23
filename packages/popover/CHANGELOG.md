# @kojaem/popover

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
