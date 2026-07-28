import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chdir } from 'node:process';

import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

chdir(import.meta.dirname);

// Register Tokens Studio transforms and preprocessor into Style Dictionary
register(StyleDictionary, { excludeParentKeys: true });

const DIST = 'dist/css';
const DIST_TS = 'dist/ts';

const allTokens = JSON.parse(readFileSync('../../tokens/tokens.json', 'utf-8'));

// This repo's Tokens Studio export does not use a slash-prefix convention like
// `primitive/...` — sets are named explicitly, and (unlike a single shared primitive
// layer) the primitive color scales themselves fork per theme. So instead of prefix
// matching, build three explicit groups: theme-agnostic tokens shared by both themes,
// and one color group per theme.
const SHARED_SETS = ['global', 'Typography/Default', 'Radius/Default', 'Spacing/Mobile'];
const LIGHT_SETS = ['global', 'Primitive Colors/Light', 'Semantic Colors/Light'];
const DARK_SETS = ['global', 'Primitive Colors/Dark', 'Semantic Colors/Dark'];

/** @param {string[]} setNames */
function buildSetDict(setNames) {
  const dict = {};
  for (const name of setNames) {
    if (allTokens[name]) dict[name] = allTokens[name];
  }
  dict.$metadata = { tokenSetOrder: setNames.filter((n) => allTokens[n]) };
  return dict;
}

/** @param {string} str */
function toPascalCase(str) {
  return str
    .split(/[-\s/]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/** @param {string} typeNamePrefix */
function dtsFormat(typeNamePrefix) {
  return ({ dictionary }) => {
    /** @type {Map<string, string[]>} */
    const groups = new Map();
    for (const token of dictionary.allTokens) {
      const category = token.path[0];
      if (!groups.has(category)) groups.set(category, []);
      groups.get(category).push(token.name);
    }

    const lines = ['/** Auto-generated — do not edit directly. */\n'];
    const typeNames = [];

    for (const [category, names] of groups) {
      const typeName = `${typeNamePrefix}${toPascalCase(category)}Token`;
      typeNames.push(typeName);
      lines.push(`export type ${typeName} =`);
      lines.push(`${names.map((n) => `  | '${n}'`).join('\n')};\n`);
    }

    lines.push(`export type ${typeNamePrefix}Token =`);
    lines.push(`${typeNames.map((t) => `  | ${t}`).join('\n')};\n`);

    return lines.join('\n');
  };
}

/**
 * @param {object} options
 * @param {string[]} options.setNames
 * @param {string} options.cssFile
 * @param {string} options.selector
 * @param {string} options.tsPrefix
 * @param {string} options.tsBaseName base name (without extension) for the emitted .d.ts/.d.cts type files
 * @param {boolean} options.outputReferences
 */
async function buildGroup({ setNames, cssFile, selector, tsPrefix, tsBaseName, outputReferences }) {
  const sd = new StyleDictionary({
    tokens: buildSetDict(setNames),
    preprocessors: ['tokens-studio'],
    hooks: { formats: { dts: dtsFormat(tsPrefix) } },
    platforms: {
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: `${DIST}/`,
        files: [{ destination: cssFile, format: 'css/variables', options: { selector, outputReferences } }],
      },
      ts: {
        transforms: ['name/kebab'],
        buildPath: `${DIST_TS}/`,
        // Emit identical type content under both a .d.ts and .d.cts destination: the token-names
        // barrel (below) is published under both `import` and `require` conditions, and node16/
        // nodenext module resolution expects a relative type import from a .d.cts file to resolve
        // to a sibling .d.cts, not a .d.ts.
        files: [
          { destination: `${tsBaseName}.d.ts`, format: 'dts' },
          { destination: `${tsBaseName}.d.cts`, format: 'dts' },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
}

await buildGroup({
  setNames: SHARED_SETS,
  cssFile: 'shared.css',
  selector: ':root',
  tsPrefix: '',
  tsBaseName: 'shared',
  outputReferences: false,
});

await buildGroup({
  setNames: LIGHT_SETS,
  cssFile: 'color-light.css',
  selector: ':root',
  tsPrefix: '',
  // canonical color type names — token paths are identical between light/dark
  tsBaseName: 'color',
  outputReferences: false,
});

await buildGroup({
  setNames: DARK_SETS,
  cssFile: 'color-dark.css',
  selector: '[data-theme="dark"]',
  tsPrefix: '',
  // types already emitted by the light build above; these files are discarded
  tsBaseName: '__color-dark-types-unused',
  // semantic vars reference primitive vars instead of duplicating literal hex values
  outputReferences: true,
});

// Node16/NodeNext module resolution requires relative import specifiers to carry an explicit
// runtime extension (`./shared.js`, not `./shared`) — including from within .d.ts files, where
// TS maps a `.js`/`.cjs` specifier onto the sibling `.d.ts`/`.d.cts` declaration file. `shared`
// and `color` have no real runtime values (they're pure token-name union types), so emit trivial
// placeholder modules purely so that extension-mapping resolution has a file to find.
for (const base of ['shared', 'color']) {
  writeFileSync(`${DIST_TS}/${base}.js`, '/** Auto-generated — do not edit directly. */\nexport {};\n');
  writeFileSync(`${DIST_TS}/${base}.cjs`, "/** Auto-generated — do not edit directly. */\n'use strict';\n");
}

// Concatenate into one index.css (shared + light + dark, in that order — dark's
// [data-theme="dark"] block only applies when the attribute is set, so cascade order is safe)
mkdirSync(DIST, { recursive: true });
const parts = [
  readFileSync(`${DIST}/shared.css`, 'utf-8'),
  readFileSync(`${DIST}/color-light.css`, 'utf-8'),
  readFileSync(`${DIST}/color-dark.css`, 'utf-8'),
];
writeFileSync(`${DIST}/index.css`, parts.join('\n'));
console.log(`✓ ${DIST}/index.css generated`);

// Single public CSS entrypoint: Style Dictionary values + the vanilla-extract `--mkds-*` bridge.
// Both layers are required — the bridge maps `--mkds-x` onto `--x`, and only Style Dictionary
// defines `--x`. `dist/index.css` here is emitted by tsup's vanilla-extract esbuild plugin,
// which runs before this script (see the `build` script: `tsup && pnpm build:tokens`).
const bridgeCss = readFileSync('dist/index.css', 'utf-8');
writeFileSync('dist/styles.css', `${parts.join('\n')}\n${bridgeCss}`);
console.log('✓ dist/styles.css generated');

// token-names barrel (consumed via the `./token-names` publishConfig export, both ESM and CJS)
mkdirSync(DIST_TS, { recursive: true });

const dtsBarrel = (ext) =>
  [
    '/** Auto-generated — do not edit directly. */',
    `export * from './shared${ext}';`,
    `export * from './color${ext}';`,
    'export type DesignToken = SharedToken | ColorToken;',
    '/** Wraps a design token name in `var()` for use in inline styles. */',
    'export declare function cssVar<T extends DesignToken>(token: T): `var(--${T})`;\n',
  ].join('\n');
writeFileSync(`${DIST_TS}/index.d.ts`, dtsBarrel('.js'));
writeFileSync(`${DIST_TS}/index.d.cts`, dtsBarrel('.cjs'));

writeFileSync(
  `${DIST_TS}/index.js`,
  [
    '/** Auto-generated — do not edit directly. */',
    'export function cssVar(token) {',
    '  return `var(--${token})`;',
    '}\n',
  ].join('\n'),
);
writeFileSync(
  `${DIST_TS}/index.cjs`,
  [
    '/** Auto-generated — do not edit directly. */',
    "'use strict';",
    'function cssVar(token) {',
    '  return `var(--${token})`;',
    '}',
    'exports.cssVar = cssVar;\n',
  ].join('\n'),
);
console.log(`✓ ${DIST_TS}/index.js + index.cjs generated`);
