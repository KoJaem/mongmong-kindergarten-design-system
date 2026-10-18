# @kojaem/tab-bar

## 0.1.1

### Patch Changes

- f5e2457: Match Figma spacing/background: items now grow evenly with a 6px gap (was `space-around` with no gap), container padding matches Figma (8px top / 12px bottom / 20px sides, was 6px all around with no horizontal padding), background uses `background.primary` with a 15px backdrop blur, and the unselected label color moved from `text.inverseTertiary` (invisible in light theme) to `text.tertiary`, which contrasts correctly in both themes. (The 5px square red-dot badge and `border-radius: 1px` were already correct per Figma — not a bug.)

## 0.1.0

### Minor Changes

- 9377bc6: Implement Asset, BottomSheet, Card, Checkbox, Chip, DatePicker, GridList (+ GridListItem),
  ListRow, Modal, Popover, Result, TabBar (+ TabBarItem), Toast, and TopNavigation components
  from the Figma design file, replacing their scaffolds. `@kojaem/mongmong` now re-exports all
  of them alongside Button and tokens.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
