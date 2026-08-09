import { vars } from '@kojaem/tokens';

import { recipe } from '@vanilla-extract/recipes';

import { CardRadius, CardVariant } from './Card';

export const card = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    fontFamily: vars.typography.fontFamily,
    padding: vars.spacing.padding['2xl'],
  },
  variants: {
    variant: {
      [CardVariant.default]: { backgroundColor: vars.color.background.default },
      [CardVariant.lower]: { backgroundColor: vars.color.background.lower },
    },
    radius: {
      [CardRadius.s]: { borderRadius: vars.radius.card.s },
      [CardRadius.m]: { borderRadius: vars.radius.card.m },
      [CardRadius.l]: { borderRadius: vars.radius.card.l },
    },
  },
  defaultVariants: { variant: CardVariant.default, radius: CardRadius.l },
});
