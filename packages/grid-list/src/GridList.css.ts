import { vars } from '@kojaem/tokens';

import { recipe } from '@vanilla-extract/recipes';

import { GridListColumns } from './GridList';

export const gridList = recipe({
  base: {
    display: 'grid',
    gap: vars.spacing.gap.m,
    fontFamily: vars.typography.fontFamily,
  },
  variants: {
    columns: {
      [GridListColumns[1]]: { gridTemplateColumns: 'repeat(1, 1fr)' },
      [GridListColumns[2]]: { gridTemplateColumns: 'repeat(2, 1fr)' },
      [GridListColumns[3]]: { gridTemplateColumns: 'repeat(3, 1fr)' },
    },
  },
  defaultVariants: { columns: GridListColumns[3] },
});
