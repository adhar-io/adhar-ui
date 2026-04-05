/**
 * Three-way merge conflict resolution for design sync.
 *
 * Uses the lockfile as the common ancestor (base), compares code changes
 * and design tool changes, and resolves conflicts based on the configured strategy.
 *
 * @module
 */

import type { TokenChange, TokenDiff } from './diff-engine.ts';

/** How to resolve conflicting changes. */
export type ConflictStrategy = 'prompt' | 'code-wins' | 'design-wins';

/** A single conflict between code and design tool. */
export interface ConflictRecord {
  /** DTCG path to the conflicting token. */
  path: string;
  /** Value at the last sync (from lockfile). */
  baseValue?: string | number;
  /** Current value in code. */
  codeValue?: string | number;
  /** Current value in design tool. */
  designValue?: string | number;
  /** Source design tool. */
  source: 'figma' | 'penpot';
  /** Whether this conflict has been resolved. */
  resolved: boolean;
  /** How it was resolved. */
  resolution?: 'code' | 'design' | 'custom';
  /** Custom resolution value. */
  customValue?: string | number;
}

/**
 * Resolve conflicts between code changes and design tool changes.
 *
 * @param codeDiff - Changes from base → current code state
 * @param designDiff - Changes from base → current design tool state
 * @param strategy - How to handle conflicts
 * @param source - Which design tool the changes come from
 * @returns List of conflicts and auto-resolved changes
 */
export function resolveConflicts(
  codeDiff: TokenDiff,
  designDiff: TokenDiff,
  strategy: ConflictStrategy,
  source: 'figma' | 'penpot' = 'figma',
): {
  /** Changes to apply to code (design → code). */
  applyToCode: TokenChange[];
  /** Changes to push to design tool (code → design). */
  applyToDesign: TokenChange[];
  /** Unresolved conflicts needing manual intervention. */
  conflicts: ConflictRecord[];
} {
  const applyToCode: TokenChange[] = [];
  const applyToDesign: TokenChange[] = [];
  const conflicts: ConflictRecord[] = [];

  // Build lookup maps
  const codeChanges = new Map(codeDiff.changes.map((c) => [c.path, c]));
  const designChanges = new Map(designDiff.changes.map((c) => [c.path, c]));

  // Process design-only changes → apply to code
  for (const [path, change] of designChanges) {
    if (!codeChanges.has(path)) {
      applyToCode.push(change);
    }
  }

  // Process code-only changes → apply to design
  for (const [path, change] of codeChanges) {
    if (!designChanges.has(path)) {
      applyToDesign.push(change);
    }
  }

  // Process changes that exist in both → potential conflicts
  for (const [path, codeChange] of codeChanges) {
    const designChange = designChanges.get(path);
    if (!designChange) continue;

    // Both changed to the same value → no conflict
    if (codeChange.newValue === designChange.newValue) continue;

    // Both changed to different values → conflict
    if (strategy === 'code-wins') {
      applyToDesign.push(codeChange);
    } else if (strategy === 'design-wins') {
      applyToCode.push(designChange);
    } else {
      // prompt: record the conflict for manual resolution
      conflicts.push({
        path,
        baseValue: codeChange.oldValue,
        codeValue: codeChange.newValue,
        designValue: designChange.newValue,
        source,
        resolved: false,
      });
    }
  }

  return { applyToCode, applyToDesign, conflicts };
}
