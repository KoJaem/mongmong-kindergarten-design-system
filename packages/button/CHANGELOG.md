# @kojaem/button

## 1.0.1

### Patch Changes

- f5e2457: Add hover/pressed and disabled interaction states matching Figma spec: pressed backgrounds now use the existing pressed tokens (`fill.brandPressed`, `fill.pressed`, `fill.inversePressed`) for `:hover`/`:active`, and disabled now applies `opacity: 0.3` over the existing color/variant instead of swapping to a flat gray.
- e8143dc: Fix invisible text on `variant="weak"` buttons: `color="brand"` used `text.brand` (#f9f8ff, near-white) on the near-white `fill.brandWeak` background, and `color="inverse"` used `text.inversePrimary` (near-white) on the near-white `fill.inverseWeak` background — both effectively unreadable. Brand now uses `text.brandWeak` (a readable purple, the token actually paired with weak brand surfaces elsewhere in the system, e.g. Chip); inverse now uses `text.primary` (dark), matching the same token already used correctly on `color="inverse" variant="fill"`. Verified in both light and dark theme token values, not just Figma's raw export (which reflects canvas-mode-dependent fallback colors that don't match this file's actual light/dark token values).

## 1.0.0

### Major Changes

- 44e3033: Redesign Button props to match the Figma component model: `variant` (`fill`/`outline`/`ghost`) and `size` (`sm`/`md`/`lg`/`xl`) are replaced with `color` (`brand`/`neutral`/`inverse`), `variant` (`fill`/`weak`), and `size` (`s`/`m`/`l`/`xl`).

### Minor Changes

- a652930: Add Button component and design tokens build pipeline (light/dark themes).

### Patch Changes

- Updated dependencies [a652930]
  - @kojaem/tokens@0.2.0
