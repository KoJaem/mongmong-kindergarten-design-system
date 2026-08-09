import { vars } from '@kojaem/tokens';

import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { CheckboxSize } from './Checkbox';

const iconSize: Record<CheckboxSize, string> = {
  [CheckboxSize.xs]: '16px',
  [CheckboxSize.s]: '20px',
  [CheckboxSize.m]: '24px',
  [CheckboxSize.l]: '30px',
};

export const container = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    fontFamily: vars.typography.fontFamily,
    cursor: 'pointer',
  },
  variants: {
    size: {
      [CheckboxSize.xs]: { width: iconSize[CheckboxSize.xs], height: iconSize[CheckboxSize.xs] },
      [CheckboxSize.s]: { width: iconSize[CheckboxSize.s], height: iconSize[CheckboxSize.s] },
      [CheckboxSize.m]: { width: iconSize[CheckboxSize.m], height: iconSize[CheckboxSize.m] },
      [CheckboxSize.l]: { width: iconSize[CheckboxSize.l], height: iconSize[CheckboxSize.l] },
    },
    disabled: {
      true: { cursor: 'not-allowed', opacity: 0.4 },
      false: {},
    },
  },
  defaultVariants: { size: CheckboxSize.m, disabled: false },
});

export const input = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  margin: 0,
  opacity: 0,
  cursor: 'inherit',
});

export const icon = style({
  display: 'flex',
  width: '100%',
  height: '100%',
});

export const unchecked = style({ display: 'flex', width: '100%', height: '100%' });
export const checked = style({ display: 'none', width: '100%', height: '100%' });

globalStyle(`${input}:checked ~ ${icon} ${unchecked}`, { display: 'none' });
globalStyle(`${input}:checked ~ ${icon} ${checked}`, { display: 'flex' });
