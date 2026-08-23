# @kojaem/chip

## 0.1.1

### Patch Changes

- f5e2457: Fix the notification dot to match Figma: it's now a 6px badge absolutely positioned at the chip's top-right corner instead of an inline 8px dot that stretched the chip's width. (Figma audit otherwise confirmed the existing fill/weak/selected/action color logic already matches the design exactly.)
- e8143dc: Fix invisible text on `kind="select" selected variant="weak"` chips: used `text.brand` (#f9f8ff, near-white) on the near-white `fill.brandWeak` background — same bug found in `@kojaem/button`'s weak variant. Switched to `text.brandWeak`, the readable purple Figma actually shows for this state.
- 66cc9a7: Add a `wrap` prop matching Figma's `Wrap` property axis — the label was previously always forced to `white-space: nowrap` with no way to opt into wrapping.

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
