import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { ChipSize, ChipVariant } from './Chip';

export const icon = style({ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 });

export const dot = style({
  width: '8px',
  height: '8px',
  borderRadius: '9999px',
  backgroundColor: vars.color.fill.danger,
  flexShrink: 0,
});

export const chip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.gap.xs,
    borderRadius: '9999px',
    border: '1px solid transparent',
    cursor: 'pointer',
    fontFamily: vars.typography.fontFamily,
    fontWeight: vars.typography.fontWeight.bold,
    whiteSpace: 'nowrap',
    transition: 'all 0.15s ease-in-out',
    selectors: {
      '&:disabled': { cursor: 'not-allowed', opacity: 0.4 },
    },
  },
  variants: {
    size: {
      [ChipSize.s]: { height: '32px', fontSize: vars.typography.fontSize.subtitleSmall },
      [ChipSize.m]: { height: '38px', fontSize: vars.typography.fontSize.subtitleMedium },
    },
    hasLeading: {
      true: {},
      false: {},
    },
    hasTailing: {
      true: {},
      false: {},
    },
    selected: {
      true: {},
      false: {
        backgroundColor: vars.color.fill.inverseWeak,
        borderColor: vars.color.border.opacityWeak,
        color: vars.color.text.secondary,
      },
    },
    variant: {
      [ChipVariant.fill]: {},
      [ChipVariant.weak]: {},
    },
    kind: {
      select: {},
      action: {
        backgroundColor: vars.color.fill.glass,
        borderColor: vars.color.fill.glass,
        color: vars.color.text.inverseSecondary,
      },
    },
  },
  compoundVariants: [
    {
      variants: { selected: true, variant: ChipVariant.fill },
      style: {
        backgroundColor: vars.color.fill.neutral,
        borderColor: vars.color.fill.neutralWeak,
        color: vars.color.text.inversePrimary,
      },
    },
    {
      variants: { selected: true, variant: ChipVariant.weak },
      style: {
        backgroundColor: vars.color.fill.brandWeak,
        borderColor: vars.color.fill.brandWeak,
        color: vars.color.text.brand,
      },
    },
    {
      variants: { hasLeading: true, size: ChipSize.m },
      style: { paddingLeft: vars.spacing.padding.s },
    },
    {
      variants: { hasLeading: false, size: ChipSize.m },
      style: { paddingLeft: vars.spacing.padding.l },
    },
    {
      variants: { hasTailing: true, size: ChipSize.m },
      style: { paddingRight: vars.spacing.padding.s },
    },
    {
      variants: { hasTailing: false, size: ChipSize.m },
      style: { paddingRight: vars.spacing.padding.l },
    },
    {
      variants: { hasLeading: true, size: ChipSize.s },
      style: { paddingLeft: vars.spacing.padding.xs },
    },
    {
      variants: { hasLeading: false, size: ChipSize.s },
      style: { paddingLeft: vars.spacing.padding.m },
    },
    {
      variants: { hasTailing: true, size: ChipSize.s },
      style: { paddingRight: vars.spacing.padding.xs },
    },
    {
      variants: { hasTailing: false, size: ChipSize.s },
      style: { paddingRight: vars.spacing.padding.m },
    },
  ],
  defaultVariants: {
    kind: 'select',
    variant: ChipVariant.fill,
    size: ChipSize.m,
    selected: false,
    hasLeading: false,
    hasTailing: false,
  },
});
