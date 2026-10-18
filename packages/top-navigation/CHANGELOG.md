# @kojaem/top-navigation

## 0.1.1

### Patch Changes

- f5e2457: Fix the right-side icon/label gap to match Figma (4px, was 2px). Figma audit confirmed the transparent background is intentional (the dark backdrop in the Figma page is just the documentation canvas, not the component) — no dark-theme variant was missing.

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
