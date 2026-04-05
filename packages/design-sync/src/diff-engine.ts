/**
 * Structural diff engine for DTCG token trees.
 *
 * Compares two DTCG documents and produces a list of changes
 * (added, removed, modified tokens). Used to determine what
 * needs to be synced between code and design tools.
 *
 * @module
 */

import type { DTCGDocument, DTCGGroup, DTCGToken } from '@adhar-ui/dtcg';

/** A single token change in the diff. */
export interface TokenChange {
  /** Dot-separated path to the token (e.g. "color.primary.DEFAULT") */
  path: string;
  /** Type of change. */
  type: 'added' | 'removed' | 'modified';
  /** Previous value (for modified/removed). */
  oldValue?: string | number;
  /** New value (for added/modified). */
  newValue?: string | number;
}

/** Complete diff result between two token sets. */
export interface TokenDiff {
  /** All individual changes. */
  changes: TokenChange[];
  /** Whether any changes exist. */
  hasChanges: boolean;
  /** Count by change type. */
  summary: { added: number; removed: number; modified: number };
}

/**
 * Compute the diff between two DTCG documents.
 *
 * @param base - The base/previous state
 * @param current - The current/new state
 * @returns Diff with all changes listed
 */
export function diffTokens(base: DTCGDocument, current: DTCGDocument): TokenDiff {
  const changes: TokenChange[] = [];

  const baseFlat = flattenTokens(base['adhar-ui'], 'adhar-ui');
  const currentFlat = flattenTokens(current['adhar-ui'], 'adhar-ui');

  // Find added and modified tokens
  for (const [path, value] of currentFlat) {
    const baseValue = baseFlat.get(path);
    if (baseValue === undefined) {
      changes.push({ path, type: 'added', newValue: value });
    } else if (baseValue !== value) {
      changes.push({ path, type: 'modified', oldValue: baseValue, newValue: value });
    }
  }

  // Find removed tokens
  for (const [path, value] of baseFlat) {
    if (!currentFlat.has(path)) {
      changes.push({ path, type: 'removed', oldValue: value });
    }
  }

  const summary = {
    added: changes.filter((c) => c.type === 'added').length,
    removed: changes.filter((c) => c.type === 'removed').length,
    modified: changes.filter((c) => c.type === 'modified').length,
  };

  return { changes, hasChanges: changes.length > 0, summary };
}

/**
 * Flatten a DTCG group tree into a Map of path → value.
 */
function flattenTokens(
  group: DTCGGroup,
  prefix: string,
): Map<string, string | number> {
  const result = new Map<string, string | number>();

  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    const path = `${prefix}.${key}`;

    if (typeof value === 'object' && value !== null) {
      const obj = value as Record<string, unknown>;
      if ('$type' in obj && '$value' in obj) {
        // It's a token
        const token = obj as unknown as DTCGToken;
        result.set(path, token.$value as string | number);
      } else {
        // Recurse into group
        const nested = flattenTokens(value as DTCGGroup, path);
        for (const [k, v] of nested) {
          result.set(k, v);
        }
      }
    }
  }

  return result;
}
