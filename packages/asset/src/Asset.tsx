import { type ForwardedRef, forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { Slot } from '@radix-ui/react-slot';

import { clsx as cx } from 'clsx';

import * as styles from './Asset.css';

export const AssetShape = { circle: 'circle', square: 'square', squircle: 'squircle' } as const;
export type AssetShape = (typeof AssetShape)[keyof typeof AssetShape];

export const AssetType = { icon: 'icon', filledImage: 'filledImage' } as const;
export type AssetType = (typeof AssetType)[keyof typeof AssetType];

export const AssetSize = { xs: 'xs', s: 's', m: 'm', l: 'l', xl: 'xl', '2xl': '2xl' } as const;
export type AssetSize = (typeof AssetSize)[keyof typeof AssetSize];

export interface AssetProps extends HTMLAttributes<HTMLDivElement> {
  shape?: AssetShape;
  assetType?: AssetType;
  size?: AssetSize;
  src?: string;
  alt?: string;
  icon?: ReactNode;
  asChild?: boolean;
}

export const Asset = forwardRef(function Asset(
  {
    shape = AssetShape.circle,
    assetType = AssetType.icon,
    size = AssetSize.m,
    src,
    alt = '',
    icon,
    asChild,
    className: _className,
    children,
    ...props
  }: AssetProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const Comp = asChild ? Slot : 'div';
  const isFilledImage = assetType === AssetType.filledImage;
  const className = cx(styles.asset({ shape, size, assetType }), _className);

  return (
    <Comp ref={ref} className={className} {...props}>
      {isFilledImage && src && <img className={styles.image} src={src} alt={alt} />}
      {!isFilledImage && (icon || children) && <span className={styles.icon({ size })}>{icon ?? children}</span>}
    </Comp>
  );
});
