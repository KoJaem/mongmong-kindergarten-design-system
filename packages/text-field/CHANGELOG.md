# @kojaem/text-field

## 0.1.3

### Patch Changes

- 6884ca8: Update TextField default background to a tinted surface (`#F4F4F9` + brand overlay) and drop the focus background swap; disabled still clears the overlay.

## 0.1.2

### Patch Changes

- f5e2457: Fix focus and disabled states to match Figma spec: default background now uses `background.upper`, focus changes the background instead of the border color, and disabled uses `fill.inverseWeak`/`border.opacityWeak`/`text.quaternary` instead of the neutral-gray tokens.

## 0.1.1

### Patch Changes

- ab87c85: Publish @kojaem/text-field (was skipped due to private: true) so @kojaem/mongmong installs successfully.

## 0.1.0

### Minor Changes

- 218970d: Add TextField component (label, helperText, error states) matching the Figma "Text Field" spec.

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
