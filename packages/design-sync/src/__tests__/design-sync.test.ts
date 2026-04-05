/**
 * Tests for @adhar-ui/design-sync
 *
 * Validates diff engine, conflict resolution,
 * component mapping, and lockfile utilities.
 */

import { assert, assertEquals, assertExists } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { diffTokens } from '../diff-engine.ts';
import { resolveConflicts } from '../conflict-resolver.ts';
import { buildComponentMap, generateVariantCombinations } from '../component-map.ts';
import { createLockfile, hashTokens } from '../lockfile.ts';
import { themeToDtcg } from '@adhar-ui/dtcg';
import { blue, zinc } from '@adhar-ui/tokens';

// ─── Diff Engine ─────────────────────────────────────────────────────

Deno.test('diffTokens detects no changes for identical documents', () => {
  const dtcg = themeToDtcg(zinc);
  const diff = diffTokens(dtcg, dtcg);
  assert(!diff.hasChanges, 'identical documents should have no changes');
  assertEquals(diff.changes.length, 0);
  assertEquals(diff.summary.added, 0);
  assertEquals(diff.summary.modified, 0);
  assertEquals(diff.summary.removed, 0);
});

Deno.test('diffTokens detects changes between different presets', () => {
  const zincDtcg = themeToDtcg(zinc);
  const blueDtcg = themeToDtcg(blue);
  const diff = diffTokens(zincDtcg, blueDtcg);

  assert(diff.hasChanges, 'different presets should have changes');
  assert(diff.summary.modified > 0, 'should have modified tokens');
  assert(diff.changes.length > 0, 'should have change entries');
});

Deno.test('diffTokens change entries have correct shape', () => {
  const zincDtcg = themeToDtcg(zinc);
  const blueDtcg = themeToDtcg(blue);
  const diff = diffTokens(zincDtcg, blueDtcg);

  for (const change of diff.changes) {
    assertExists(change.path, 'change should have path');
    assert(['added', 'removed', 'modified'].includes(change.type), 'invalid change type');
    if (change.type === 'modified') {
      assertExists(change.oldValue, 'modified should have oldValue');
      assertExists(change.newValue, 'modified should have newValue');
    }
  }
});

// ─── Conflict Resolution ─────────────────────────────────────────────

Deno.test('resolveConflicts: code-only changes go to design', () => {
  const codeDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '2' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };
  const designDiff = {
    changes: [],
    hasChanges: false,
    summary: { added: 0, modified: 0, removed: 0 },
  };

  const result = resolveConflicts(codeDiff, designDiff, 'prompt');
  assertEquals(result.applyToDesign.length, 1);
  assertEquals(result.applyToCode.length, 0);
  assertEquals(result.conflicts.length, 0);
});

Deno.test('resolveConflicts: design-only changes go to code', () => {
  const codeDiff = {
    changes: [],
    hasChanges: false,
    summary: { added: 0, modified: 0, removed: 0 },
  };
  const designDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '3' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };

  const result = resolveConflicts(codeDiff, designDiff, 'prompt');
  assertEquals(result.applyToCode.length, 1);
  assertEquals(result.applyToDesign.length, 0);
  assertEquals(result.conflicts.length, 0);
});

Deno.test('resolveConflicts: same path different values creates conflict in prompt mode', () => {
  const codeDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '2' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };
  const designDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '3' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };

  const result = resolveConflicts(codeDiff, designDiff, 'prompt');
  assertEquals(result.conflicts.length, 1);
  assertEquals(result.conflicts[0].path, 'a');
  assertEquals(result.conflicts[0].codeValue, '2');
  assertEquals(result.conflicts[0].designValue, '3');
});

Deno.test('resolveConflicts: code-wins resolves conflict to design', () => {
  const codeDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '2' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };
  const designDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '3' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };

  const result = resolveConflicts(codeDiff, designDiff, 'code-wins');
  assertEquals(result.conflicts.length, 0);
  assertEquals(result.applyToDesign.length, 1);
});

Deno.test('resolveConflicts: design-wins resolves conflict to code', () => {
  const codeDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '2' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };
  const designDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '3' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };

  const result = resolveConflicts(codeDiff, designDiff, 'design-wins');
  assertEquals(result.conflicts.length, 0);
  assertEquals(result.applyToCode.length, 1);
});

Deno.test('resolveConflicts: same value convergence = no conflict', () => {
  const codeDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '2' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };
  const designDiff = {
    changes: [{ path: 'a', type: 'modified' as const, oldValue: '1', newValue: '2' }],
    hasChanges: true,
    summary: { added: 0, modified: 1, removed: 0 },
  };

  const result = resolveConflicts(codeDiff, designDiff, 'prompt');
  assertEquals(result.conflicts.length, 0, 'same value should not conflict');
});

// ─── Component Map ───────────────────────────────────────────────────

Deno.test('buildComponentMap extracts button variants', () => {
  const map = buildComponentMap('button', 'Button', {
    variants: {
      variant: { default: 'bg-primary', destructive: 'bg-destructive', outline: 'border' },
      size: { sm: 'h-9', default: 'h-10', lg: 'h-11' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  });

  assertEquals(map.componentName, 'button');
  assertEquals(map.title, 'Button');
  assertEquals(map.variantAxes.length, 2);

  const variantAxis = map.variantAxes.find((a) => a.axisName === 'variant')!;
  assertEquals(variantAxis.values, ['default', 'destructive', 'outline']);
  assertEquals(variantAxis.defaultValue, 'default');

  const sizeAxis = map.variantAxes.find((a) => a.axisName === 'size')!;
  assertEquals(sizeAxis.values, ['sm', 'default', 'lg']);
  assertEquals(sizeAxis.defaultValue, 'default');
});

Deno.test('buildComponentMap calculates totalVariants correctly', () => {
  const map = buildComponentMap('button', 'Button', {
    variants: {
      variant: { a: '', b: '', c: '' }, // 3
      size: { sm: '', lg: '' }, // 2
    },
  });
  assertEquals(map.totalVariants, 6); // 3 * 2
});

Deno.test('buildComponentMap handles empty variants', () => {
  const map = buildComponentMap('separator', 'Separator', {});
  assertEquals(map.variantAxes.length, 0);
  assertEquals(map.totalVariants, 0);
});

Deno.test('generateVariantCombinations produces all combinations', () => {
  const map = buildComponentMap('test', 'Test', {
    variants: {
      color: { red: '', blue: '' },
      size: { sm: '', lg: '' },
    },
  });
  const combos = generateVariantCombinations(map);
  assertEquals(combos.length, 4);
  assert(combos.some((c) => c.color === 'red' && c.size === 'sm'));
  assert(combos.some((c) => c.color === 'red' && c.size === 'lg'));
  assert(combos.some((c) => c.color === 'blue' && c.size === 'sm'));
  assert(combos.some((c) => c.color === 'blue' && c.size === 'lg'));
});

Deno.test('generateVariantCombinations returns [{}] for no variants', () => {
  const map = buildComponentMap('sep', 'Sep', {});
  const combos = generateVariantCombinations(map);
  assertEquals(combos.length, 1);
  assertEquals(Object.keys(combos[0]).length, 0);
});

// ─── Lockfile ────────────────────────────────────────────────────────

Deno.test('createLockfile creates valid structure', () => {
  const lockfile = createLockfile('abc123');
  assertEquals(lockfile.version, 1);
  assertExists(lockfile.lastSync);
  assertEquals(lockfile.sources.code.tokenHash, 'abc123');
});

Deno.test('hashTokens produces consistent hash', async () => {
  const hash1 = await hashTokens('{"test": true}');
  const hash2 = await hashTokens('{"test": true}');
  assertEquals(hash1, hash2, 'same input should produce same hash');
  assertEquals(hash1.length, 64, 'SHA-256 should be 64 hex chars');
});

Deno.test('hashTokens produces different hash for different input', async () => {
  const hash1 = await hashTokens('{"a": 1}');
  const hash2 = await hashTokens('{"a": 2}');
  assert(hash1 !== hash2, 'different input should produce different hash');
});
