import { createGlobalTheme } from '@vanilla-extract/css';

import { themeLayer, vars } from './contract.css';
import { mapVars } from './utils';

// Typography/Default.FontFamily.Base in tokens/tokens.json is currently "MonaS12", which looks
// like a Figma text-style label rather than a real CSS font stack. Override with a safe fallback
// until the Figma source token is corrected and re-synced.
const FONT_FAMILY_FALLBACK = "-apple-system, BlinkMacSystemFont, 'Malgun Gothic', system-ui, sans-serif";

const sharedTheme = {
  '@layer': themeLayer,
  spacing: mapVars(vars.spacing),
  typography: {
    ...mapVars(vars.typography),
    fontFamily: FONT_FAMILY_FALLBACK,
  },
  radius: mapVars(vars.radius),
};

createGlobalTheme(':root', vars, { ...sharedTheme, color: mapVars(vars.color) });
createGlobalTheme('[data-theme="dark"]', vars, { ...sharedTheme, color: mapVars(vars.color) });
