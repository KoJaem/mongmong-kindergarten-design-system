export type MapLeaves<T> = T extends string ? string : { [K in keyof T]: MapLeaves<T[K]> };

export const cssVar = (token: string) => `var(--${token})`;

/**
 * Strips the `mkds-` prefix from every leaf value in a vars subtree,
 * converting `'var(--mkds-*)'` references into SD CSS variable references (`'var(--*)'`).
 *
 * When the VE contract key and the SD token path don't match, use cssVar() directly instead.
 */
export function mapVars<T>(obj: T): MapLeaves<T> {
  if (typeof obj === 'string') return obj.replace('var(--mkds-', 'var(--') as MapLeaves<T>;
  return Object.fromEntries(Object.entries(obj as object).map(([k, v]) => [k, mapVars(v)])) as MapLeaves<T>;
}
