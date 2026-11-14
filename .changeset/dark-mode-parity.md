---
"@kojaem/button": patch
"@kojaem/bottom-sheet": patch
"@kojaem/popover": patch
"@kojaem/grid-list": patch
"@kojaem/mongmong": patch
---

Match Figma text tokens (Figma screens use the dark variable mode): Button brand fill → `text.strong`, brand weak → `text.brand`; BottomSheet and Popover title/description → `text.inversePrimary`/`text.inverseSecondary`; GridListItem label → `text.inverseSecondary`. Storybook now defaults to the dark theme with a toolbar toggle.
