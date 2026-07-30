import { vars } from '@kojaem/tokens';

import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { AssetShape, AssetSize, AssetType } from './Asset';
import { squircleMaskDataUri } from './squircleMask';

const containerSize: Record<AssetSize, string> = {
  [AssetSize.xs]: '24px',
  [AssetSize.s]: '30px',
  [AssetSize.m]: '36px',
  [AssetSize.l]: '40px',
  [AssetSize.xl]: '52px',
  [AssetSize['2xl']]: '60px',
};

const squareRadius: Record<AssetSize, string> = {
  [AssetSize.xs]: '6px',
  [AssetSize.s]: '8px',
  [AssetSize.m]: '8px',
  [AssetSize.l]: '10px',
  [AssetSize.xl]: '12px',
  [AssetSize['2xl']]: '12px',
};

const iconSize: Record<AssetSize, string> = {
  [AssetSize.xs]: '16px',
  [AssetSize.s]: '20px',
  [AssetSize.m]: '24px',
  [AssetSize.l]: '26px',
  [AssetSize.xl]: '34px',
  [AssetSize['2xl']]: '40px',
};

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const icon = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: vars.color.icon.brand,
  },
  variants: {
    size: {
      [AssetSize.xs]: { width: iconSize[AssetSize.xs], height: iconSize[AssetSize.xs] },
      [AssetSize.s]: { width: iconSize[AssetSize.s], height: iconSize[AssetSize.s] },
      [AssetSize.m]: { width: iconSize[AssetSize.m], height: iconSize[AssetSize.m] },
      [AssetSize.l]: { width: iconSize[AssetSize.l], height: iconSize[AssetSize.l] },
      [AssetSize.xl]: { width: iconSize[AssetSize.xl], height: iconSize[AssetSize.xl] },
      [AssetSize['2xl']]: { width: iconSize[AssetSize['2xl']], height: iconSize[AssetSize['2xl']] },
    },
  },
});

export const asset = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    overflow: 'hidden',
    fontFamily: vars.typography.fontFamily,
  },
  variants: {
    size: {
      [AssetSize.xs]: { width: containerSize[AssetSize.xs], height: containerSize[AssetSize.xs] },
      [AssetSize.s]: { width: containerSize[AssetSize.s], height: containerSize[AssetSize.s] },
      [AssetSize.m]: { width: containerSize[AssetSize.m], height: containerSize[AssetSize.m] },
      [AssetSize.l]: { width: containerSize[AssetSize.l], height: containerSize[AssetSize.l] },
      [AssetSize.xl]: { width: containerSize[AssetSize.xl], height: containerSize[AssetSize.xl] },
      [AssetSize['2xl']]: { width: containerSize[AssetSize['2xl']], height: containerSize[AssetSize['2xl']] },
    },
    shape: {
      [AssetShape.circle]: { borderRadius: '9999px' },
      [AssetShape.squircle]: {
        WebkitMaskImage: `url(${squircleMaskDataUri})`,
        WebkitMaskSize: '100% 100%',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: `url(${squircleMaskDataUri})`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
      },
      [AssetShape.square]: {},
    },
    assetType: {
      [AssetType.icon]: { backgroundColor: vars.color.fill.brandWeak },
      [AssetType.filledImage]: { backgroundColor: vars.color.fill.neutralWeak },
    },
  },
  compoundVariants: [
    { variants: { shape: AssetShape.square, size: AssetSize.xs }, style: { borderRadius: squareRadius[AssetSize.xs] } },
    { variants: { shape: AssetShape.square, size: AssetSize.s }, style: { borderRadius: squareRadius[AssetSize.s] } },
    { variants: { shape: AssetShape.square, size: AssetSize.m }, style: { borderRadius: squareRadius[AssetSize.m] } },
    { variants: { shape: AssetShape.square, size: AssetSize.l }, style: { borderRadius: squareRadius[AssetSize.l] } },
    { variants: { shape: AssetShape.square, size: AssetSize.xl }, style: { borderRadius: squareRadius[AssetSize.xl] } },
    {
      variants: { shape: AssetShape.square, size: AssetSize['2xl'] },
      style: { borderRadius: squareRadius[AssetSize['2xl']] },
    },
  ],
  defaultVariants: { shape: AssetShape.circle, size: AssetSize.m, assetType: AssetType.icon },
});
