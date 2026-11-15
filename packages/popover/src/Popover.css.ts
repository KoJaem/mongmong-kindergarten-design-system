import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { PopoverKind, PopoverSize, PopoverTail } from './Popover';

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
});

const surfaceBase = {
  backgroundColor: vars.color.background.default,
  backdropFilter: 'blur(15px)',
  boxShadow: `0 2px 15px ${vars.color.shadow.default}`,
  borderRadius: vars.radius.popover,
  fontFamily: vars.typography.fontFamily,
};

export const surface = recipe({
  base: surfaceBase,
  variants: {
    kind: {
      [PopoverKind.tooltip]: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${vars.spacing.padding.xs} ${vars.spacing.padding.s}`,
        color: vars.color.text.primary,
        fontWeight: vars.typography.fontWeight.bold,
        fontSize: vars.typography.fontSize.subtitleSmall,
        lineHeight: vars.typography.lineHeight.subtitleSmall,
        whiteSpace: 'nowrap',
      },
      [PopoverKind.popover]: {
        display: 'flex',
        flexDirection: 'column',
        padding: vars.spacing.padding.l,
        width: '260px',
      },
    },
    size: {
      [PopoverSize.s]: {},
      [PopoverSize.m]: {},
    },
  },
  defaultVariants: { kind: PopoverKind.tooltip, size: PopoverSize.s },
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
});

export const title = recipe({
  base: {
    margin: 0,
    color: vars.color.text.inversePrimary,
    fontWeight: vars.typography.fontWeight.bold,
  },
  variants: {
    size: {
      [PopoverSize.s]: {
        fontSize: vars.typography.fontSize.subtitleSmall,
        lineHeight: vars.typography.lineHeight.subtitleSmall,
      },
      [PopoverSize.m]: {
        fontSize: vars.typography.fontSize.subtitleMedium,
        lineHeight: vars.typography.lineHeight.subtitleMedium,
      },
    },
  },
  defaultVariants: { size: PopoverSize.s },
});

export const description = recipe({
  base: {
    margin: 0,
    color: vars.color.text.inverseSecondary,
    fontWeight: vars.typography.fontWeight.regular,
  },
  variants: {
    size: {
      [PopoverSize.s]: {
        fontSize: vars.typography.fontSize.captionMedium,
        lineHeight: vars.typography.lineHeight.captionMedium,
      },
      [PopoverSize.m]: {
        fontSize: vars.typography.fontSize.captionLarge,
        lineHeight: vars.typography.lineHeight.captionLarge,
      },
    },
  },
  defaultVariants: { size: PopoverSize.s },
});

const tailSize = '8px';

// ponytail: Figma uses a custom teardrop SVG tail asset; approximated here with a rotated
// square, which is visually close and avoids embedding a separate SVG asset. Swap to the
// real asset if the approximation looks off in review.
export const tail = recipe({
  base: {
    position: 'absolute',
    width: tailSize,
    height: tailSize,
    backgroundColor: vars.color.background.default,
    transform: 'rotate(45deg)',
  },
  variants: {
    tail: {
      [PopoverTail.top]: { top: `calc(-1 * ${tailSize} / 2)`, left: '50%', marginLeft: `calc(-1 * ${tailSize} / 2)` },
      [PopoverTail.bottom]: {
        bottom: `calc(-1 * ${tailSize} / 2)`,
        left: '50%',
        marginLeft: `calc(-1 * ${tailSize} / 2)`,
      },
      [PopoverTail.left]: { left: `calc(-1 * ${tailSize} / 2)`, top: '50%', marginTop: `calc(-1 * ${tailSize} / 2)` },
      [PopoverTail.right]: {
        right: `calc(-1 * ${tailSize} / 2)`,
        top: '50%',
        marginTop: `calc(-1 * ${tailSize} / 2)`,
      },
      [PopoverTail.none]: { display: 'none' },
    },
  },
  defaultVariants: { tail: PopoverTail.bottom },
});
