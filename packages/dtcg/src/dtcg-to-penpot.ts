/**
 * Convert DTCG JSON → Penpot RPC mutation payloads.
 *
 * Produces Penpot color library entries from DTCG tokens.
 * Each semantic color becomes a Penpot library color with a group path.
 *
 * @module
 */

import type { DTCGGroup, DTCGToken, PenpotColor } from './types.ts';
import type { DTCGDocument } from './types.ts';

/**
 * Convert a DTCG document to Penpot color entries.
 *
 * @param doc - DTCG document
 * @param mode - Which mode to extract ('light' or 'dark')
 * @returns Array of PenpotColor entries for the library
 */
export function dtcgToPenpot(
  doc: DTCGDocument,
  mode: 'light' | 'dark' = 'light',
): PenpotColor[] {
  const colors: PenpotColor[] = [];
  const root = doc['adhar-ui'];
  const colorGroup = root['color'] as DTCGGroup | undefined;

  if (colorGroup) {
    walkForPenpot(colorGroup, [], colors, mode);
  }

  return colors;
}

/**
 * Recursively walk DTCG group and collect Penpot color entries.
 */
function walkForPenpot(
  group: DTCGGroup,
  path: string[],
  colors: PenpotColor[],
  mode: 'light' | 'dark',
): void {
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue;

    if (isDTCGToken(value)) {
      const token = value as DTCGToken;
      if (token.$type === 'color') {
        let hex: string;

        if (mode === 'dark') {
          // Try dark extension
          const darkExt = token.$extensions?.['com.adhar-ui.dark'] as
            | Record<string, unknown>
            | undefined;
          hex = (darkExt?.hex as string) ?? (token.$value as string);
        } else {
          hex = token.$value as string;
        }

        colors.push({
          id: crypto.randomUUID(),
          name: key,
          color: hex,
          opacity: 1,
          path: path.length > 0 ? path.join('/') : undefined,
        });
      }
    } else if (typeof value === 'object' && value !== null) {
      walkForPenpot(value as DTCGGroup, [...path, key], colors, mode);
    }
  }
}

function isDTCGToken(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as Record<string, unknown>;
  return '$type' in obj && '$value' in obj;
}
