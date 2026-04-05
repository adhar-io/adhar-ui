/**
 * Tests for @adhar-ui/icons
 */

import { assert, assertEquals, assertExists } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { getAllIcons, getIcon, hasIcon, registerIcon, renderIconSvg } from '../registry.ts';

Deno.test('built-in icons are registered', () => {
  const builtIn = [
    'x',
    'check',
    'chevron-down',
    'chevron-up',
    'search',
    'menu',
    'sun',
    'moon',
    'loader',
    'copy',
    'send',
    'thumbs-up',
    'thumbs-down',
  ];
  for (const name of builtIn) {
    assert(hasIcon(name), `${name} should be registered`);
  }
});

Deno.test('getIcon returns correct definition', () => {
  const icon = getIcon('search');
  assertExists(icon);
  assertEquals(icon!.name, 'search');
  assert(icon!.svg.includes('circle'), 'search icon should have circle');
  assert(icon!.keywords!.includes('find'), 'should have find keyword');
});

Deno.test('getIcon returns undefined for missing icon', () => {
  assertEquals(getIcon('nonexistent'), undefined);
});

Deno.test('hasIcon returns boolean correctly', () => {
  assert(hasIcon('check'));
  assert(!hasIcon('nonexistent'));
});

Deno.test('getAllIcons returns all registered icons', () => {
  const all = getAllIcons();
  assert(all.length >= 17, 'should have at least 17 built-in icons');
});

Deno.test('registerIcon adds new icon', () => {
  registerIcon({ name: 'test-icon', svg: '<path d="M0 0"/>', keywords: ['test'] });
  assert(hasIcon('test-icon'));
  assertEquals(getIcon('test-icon')!.svg, '<path d="M0 0"/>');
});

Deno.test('renderIconSvg produces valid SVG', () => {
  const icon = getIcon('check')!;
  const svg = renderIconSvg(icon, { size: 24 });
  assert(svg.includes('<svg'), 'should contain svg tag');
  assert(svg.includes('width="24"'), 'should have correct size');
  assert(svg.includes('aria-hidden="true"'), 'should be aria-hidden without label');
});

Deno.test('renderIconSvg with label uses aria-label', () => {
  const icon = getIcon('search')!;
  const svg = renderIconSvg(icon, { label: 'Search' });
  assert(svg.includes('aria-label="Search"'), 'should have aria-label');
  assert(svg.includes('role="img"'), 'should have role=img');
});

Deno.test('renderIconSvg respects custom size and color', () => {
  const icon = getIcon('x')!;
  const svg = renderIconSvg(icon, { size: 16, color: 'red', strokeWidth: 3 });
  assert(svg.includes('width="16"'));
  assert(svg.includes('stroke="red"'));
  assert(svg.includes('stroke-width="3"'));
});
