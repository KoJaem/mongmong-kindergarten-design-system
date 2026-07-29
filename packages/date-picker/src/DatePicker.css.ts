import { vars } from '@kojaem/tokens';

import { recipe } from '@vanilla-extract/recipes';

export const datePicker = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.typography.fontFamily,
  },
  variants: {},
  defaultVariants: {},
});
