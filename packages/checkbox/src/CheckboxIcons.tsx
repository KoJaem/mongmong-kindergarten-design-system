import { vars } from '@kojaem/tokens';

const iconProps = {
  width: '100%',
  height: '100%',
  xmlns: 'http://www.w3.org/2000/svg',
} as const;

export function CircleUncheckedIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 22 22" fill="none">
      <path
        d="M11 2C16 2 20 6 20 11C20 16 16 20 11 20C6 20 2 16 2 11C2 6 6 2 11 2ZM11 0C4.9 0 0 4.9 0 11C0 17.1 4.9 22 11 22C17.1 22 22 17.1 22 11C22 4.9 17.1 0 11 0Z"
        fill={vars.color.icon.graySecondary}
      />
    </svg>
  );
}

export function CircleCheckedIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill={vars.color.fill.inverse}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0ZM17.68 10.05L11.59 16.14C11.39 16.34 11.11 16.46 10.82 16.46C10.53 16.46 10.25 16.34 10.05 16.14L6.32 12.41C5.89 11.98 5.89 11.29 6.32 10.87C6.75 10.44 7.44 10.44 7.86 10.87L10.82 13.83L16.14 8.51C16.57 8.08 17.26 8.08 17.68 8.51C18.11 8.94 18.11 9.63 17.68 10.05Z"
        fill={vars.color.icon.brand}
      />
    </svg>
  );
}

export function LineUncheckedIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 16.3444 11.2827" fill="none">
      <path
        d="M6.53211 11.2827C6.19281 11.2827 5.85345 11.1696 5.62723 10.8303L0.42417 5.62719C-0.14139 5.06169 -0.14139 4.26989 0.42417 3.70439C0.98972 3.1388 1.78149 3.1388 2.34704 3.70439L6.53211 7.88939L13.9974 0.424163C14.5629 -0.141388 15.3547 -0.141388 15.9202 0.424163C16.4858 0.989713 16.4858 1.78148 15.9202 2.34703L7.55011 10.7172C7.21081 11.1696 6.87141 11.2827 6.53211 11.2827Z"
        fill={vars.color.icon.graySecondary}
      />
    </svg>
  );
}

export function LineCheckedIcon() {
  return (
    <svg {...iconProps} viewBox="0 0 14.4 9.8" fill="none">
      <path
        d="M1.2 4.1L5.8 8.6L13.2 1.2"
        stroke={vars.color.icon.brand}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
