/**
 * Tests for @adhar-ui/utils
 *
 * Validates cn() class merging, responsive helpers,
 * and DOM utility functions.
 */

import { assert, assertEquals } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { cn } from '../cn.ts';
import { maxWidth, minWidth } from '../responsive.ts';
import { generateId } from '../dom.ts';

// ─── cn() class merging ──────────────────────────────────────────────

Deno.test('cn merges simple classes', () => {
  assertEquals(cn('foo', 'bar'), 'foo bar');
});

Deno.test('cn handles conditional classes', () => {
  assertEquals(cn('base', false && 'hidden', 'end'), 'base end');
  assertEquals(cn('base', true && 'visible', 'end'), 'base visible end');
});

Deno.test('cn resolves tailwind conflicts (last wins)', () => {
  const result = cn('px-2 py-1', 'px-4');
  assert(result.includes('px-4'), 'px-4 should win over px-2');
  assert(!result.includes('px-2'), 'px-2 should be removed');
  assert(result.includes('py-1'), 'py-1 should remain');
});

Deno.test('cn handles undefined and null', () => {
  assertEquals(cn('base', undefined, null, 'end'), 'base end');
});

Deno.test('cn handles empty string', () => {
  assertEquals(cn('', 'foo', ''), 'foo');
});

Deno.test('cn handles arrays', () => {
  assertEquals(cn(['foo', 'bar']), 'foo bar');
});

Deno.test('cn handles objects', () => {
  assertEquals(cn({ foo: true, bar: false, baz: true }), 'foo baz');
});

Deno.test('cn resolves bg color conflicts', () => {
  const result = cn('bg-red-500', 'bg-blue-500');
  assertEquals(result, 'bg-blue-500');
});

Deno.test('cn resolves text size conflicts', () => {
  const result = cn('text-sm', 'text-lg');
  assertEquals(result, 'text-lg');
});

Deno.test('cn preserves non-conflicting classes', () => {
  const result = cn('rounded-md', 'border', 'p-4', 'text-sm');
  assert(result.includes('rounded-md'));
  assert(result.includes('border'));
  assert(result.includes('p-4'));
  assert(result.includes('text-sm'));
});

// ─── Responsive helpers ─────────────────────────────────────────────

Deno.test('minWidth generates correct media query', () => {
  assertEquals(minWidth('md'), '(min-width: 768px)');
  assertEquals(minWidth('lg'), '(min-width: 1024px)');
});

Deno.test('maxWidth generates correct media query', () => {
  assertEquals(maxWidth('md'), '(max-width: 767px)');
  assertEquals(maxWidth('lg'), '(max-width: 1023px)');
});

// ─── DOM utilities ───────────────────────────────────────────────────

Deno.test('generateId produces unique IDs', () => {
  const id1 = generateId('test');
  const id2 = generateId('test');
  assert(id1 !== id2, 'IDs should be unique');
  assert(id1.startsWith('test-'), 'should start with prefix');
  assert(id2.startsWith('test-'), 'should start with prefix');
});

Deno.test('generateId uses default prefix', () => {
  const id = generateId();
  assert(id.startsWith('adhar-ui-'), 'should use default prefix');
});
