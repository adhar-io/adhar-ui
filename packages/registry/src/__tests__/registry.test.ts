/**
 * Tests for @adhar-ui/registry
 *
 * Validates component index integrity, lookups,
 * block filtering, and dependency resolution.
 */

import { assert, assertEquals, assertExists } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {
  componentIndex,
  getAllComponentNames,
  getBlocks,
  getBlocksByCategory,
  getComponent,
  getComponentsByCategory,
  getComponentsByTier,
} from '../component-index.ts';

// ─── Index Integrity ─────────────────────────────────────────────────

Deno.test('registry has 147 total entries', () => {
  assertEquals(componentIndex.length, 147);
});

Deno.test('registry has 91 components (non-block)', () => {
  const nonBlocks = componentIndex.filter((c) => !c.categories.includes('block'));
  assertEquals(nonBlocks.length, 91);
});

Deno.test('registry has 56 blocks', () => {
  assertEquals(getBlocks().length, 56);
});

Deno.test('no duplicate names', () => {
  const names = getAllComponentNames();
  const unique = new Set(names);
  assertEquals(unique.size, names.length, 'all names should be unique');
});

Deno.test('all entries have required fields', () => {
  for (const comp of componentIndex) {
    assertExists(comp.name, `entry should have name`);
    assertExists(comp.title, `${comp.name} should have title`);
    assertExists(comp.description, `${comp.name} should have description`);
    assert(comp.description.length > 10, `${comp.name} description should be meaningful`);
    assert([1, 2, 3].includes(comp.tier), `${comp.name} tier should be 1, 2, or 3`);
    assert(comp.categories.length > 0, `${comp.name} should have at least one category`);
    assert(Array.isArray(comp.dependencies), `${comp.name} dependencies should be array`);
    assert(
      Array.isArray(comp.registryDependencies),
      `${comp.name} registryDependencies should be array`,
    );
  }
});

// ─── Tier Distribution ───────────────────────────────────────────────

Deno.test('tier 1 has 39 components', () => {
  assertEquals(getComponentsByTier(1).length, 39);
});

Deno.test('tier 2 has 12 components', () => {
  assertEquals(getComponentsByTier(2).length, 12);
});

Deno.test('tier 3 has 96 entries (40 components + 56 blocks)', () => {
  assertEquals(getComponentsByTier(3).length, 96);
});

// ─── Lookups ─────────────────────────────────────────────────────────

Deno.test('getComponent finds button', () => {
  const btn = getComponent('button');
  assertExists(btn);
  assertEquals(btn!.name, 'button');
  assertEquals(btn!.title, 'Button');
  assertEquals(btn!.tier, 1);
  assert(btn!.categories.includes('form'));
});

Deno.test('getComponent returns undefined for missing', () => {
  assertEquals(getComponent('nonexistent'), undefined);
});

Deno.test('getComponentsByCategory finds form components', () => {
  const forms = getComponentsByCategory('form');
  assert(forms.length >= 11, 'should have at least 11 form components');
  assert(forms.some((c) => c.name === 'button'));
  assert(forms.some((c) => c.name === 'input'));
  assert(forms.some((c) => c.name === 'checkbox'));
});

Deno.test('getComponentsByCategory finds AI components', () => {
  const ai = getComponentsByCategory('ai');
  assert(ai.length >= 10, 'should have at least 10 AI components');
  assert(ai.some((c) => c.name === 'chat'));
  assert(ai.some((c) => c.name === 'code-block'));
  assert(ai.some((c) => c.name === 'streaming-text'));
});

// ─── Dependency Integrity ────────────────────────────────────────────

Deno.test('all registryDependencies resolve', () => {
  for (const comp of componentIndex) {
    for (const dep of comp.registryDependencies) {
      assertExists(
        getComponent(dep),
        `${comp.name} depends on "${dep}" which does not exist in registry`,
      );
    }
  }
});

Deno.test('no circular self-dependencies', () => {
  for (const comp of componentIndex) {
    assert(
      !comp.registryDependencies.includes(comp.name),
      `${comp.name} should not depend on itself`,
    );
  }
});

// ─── Blocks ──────────────────────────────────────────────────────────

Deno.test('all blocks have block category', () => {
  for (const block of getBlocks()) {
    assert(block.categories.includes('block'), `${block.name} should have block category`);
    assert(block.name.startsWith('block-'), `${block.name} should start with block-`);
  }
});

Deno.test('blocks cover all expected categories', () => {
  const blockCategories = new Set<string>();
  for (const block of getBlocks()) {
    for (const cat of block.categories) {
      if (cat !== 'block') blockCategories.add(cat);
    }
  }
  const expected = [
    'auth',
    'dashboard',
    'marketing',
    'settings',
    'data',
    'ecommerce',
    'ai',
    'error',
    'navigation',
  ];
  for (const cat of expected) {
    assert(blockCategories.has(cat), `should have blocks in "${cat}" category`);
  }
});

Deno.test('getBlocksByCategory returns correct subsets', () => {
  const authBlocks = getBlocksByCategory('auth');
  assertEquals(authBlocks.length, 4);
  assert(authBlocks.every((b) => b.categories.includes('auth')));

  const dashBlocks = getBlocksByCategory('dashboard');
  assertEquals(dashBlocks.length, 4);

  const errorBlocks = getBlocksByCategory('error');
  assertEquals(errorBlocks.length, 3);
});

// ─── shadcn/ui Parity ────────────────────────────────────────────────

Deno.test('all shadcn/ui components are present', () => {
  const shadcn = [
    'button',
    'input',
    'textarea',
    'label',
    'checkbox',
    'radio-group',
    'switch',
    'select',
    'slider',
    'toggle',
    'toggle-group',
    'badge',
    'avatar',
    'separator',
    'skeleton',
    'progress',
    'aspect-ratio',
    'card',
    'scroll-area',
    'collapsible',
    'resizable',
    'alert',
    'alert-dialog',
    'toast',
    'dialog',
    'sheet',
    'tooltip',
    'popover',
    'hover-card',
    'tabs',
    'accordion',
    'dropdown-menu',
    'context-menu',
    'menubar',
    'navigation-menu',
    'breadcrumb',
    'pagination',
    'sidebar',
    'command',
    'combobox',
    'date-picker',
    'calendar',
    'color-picker',
    'form',
    'input-otp',
    'table',
    'carousel',
    'chart',
    'drawer',
    'sonner',
  ];
  for (const name of shadcn) {
    assertExists(getComponent(name), `shadcn component "${name}" should exist`);
  }
});
