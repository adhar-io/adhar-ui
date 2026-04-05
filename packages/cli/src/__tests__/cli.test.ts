/**
 * Tests for @adhar-ui/cli utilities
 *
 * Validates config management, framework detection,
 * and template coverage.
 */

import { assert, assertEquals, assertExists } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import { defaultConfig, resolveAliasPath } from '../utils/config.ts';
import { getTemplate, getTemplateCount, hasTemplate } from '../templates/index.ts';
import { getAllComponentNames } from '@adhar-ui/registry';

// ─── Config ──────────────────────────────────────────────────────────

Deno.test('defaultConfig has correct defaults', () => {
  assertEquals(defaultConfig.framework, 'react');
  assertEquals(defaultConfig.typescript, true);
  assertEquals(defaultConfig.tailwind.baseColor, 'zinc');
  assertEquals(defaultConfig.tailwind.cssVariables, true);
  assertEquals(defaultConfig.aliases.ui, '@/components/ui');
  assertEquals(defaultConfig.aliases.utils, '@/lib/utils');
  assertEquals(defaultConfig.iconLibrary, 'lucide');
});

Deno.test('resolveAliasPath resolves @/ to src/', () => {
  const result = resolveAliasPath('@/components/ui', '/project');
  assertEquals(result, '/project/src/components/ui');
});

Deno.test('resolveAliasPath resolves ~/ to ./', () => {
  const result = resolveAliasPath('~/components/ui', '/project');
  assertEquals(result, '/project/./components/ui');
});

// ─── Templates ───────────────────────────────────────────────────────

Deno.test('template count matches registry count', () => {
  const registryCount = getAllComponentNames().length;
  const templateCount = getTemplateCount();
  assertEquals(templateCount, registryCount, 'every registry entry should have a template');
});

Deno.test('all registry entries have templates', () => {
  const names = getAllComponentNames();
  const missing: string[] = [];
  for (const name of names) {
    if (!hasTemplate(name)) missing.push(name);
  }
  assertEquals(missing.length, 0, `missing templates: ${missing.join(', ')}`);
});

Deno.test('button template contains React component code', () => {
  const template = getTemplate('button');
  assertExists(template);
  assert(template!.includes('React'), 'should import React');
  assert(template!.includes('buttonVariants'), 'should define buttonVariants');
  assert(template!.includes('forwardRef'), 'should use forwardRef');
  assert(template!.includes("from '@/lib/utils'"), 'should import cn from utils');
});

Deno.test('card template has all sub-components', () => {
  const template = getTemplate('card');
  assertExists(template);
  assert(template!.includes('CardHeader'));
  assert(template!.includes('CardTitle'));
  assert(template!.includes('CardDescription'));
  assert(template!.includes('CardContent'));
  assert(template!.includes('CardFooter'));
});

Deno.test('dialog template has overlay and close', () => {
  const template = getTemplate('dialog');
  assertExists(template);
  assert(template!.includes('DialogContent'));
  assert(template!.includes('DialogTitle'));
  assert(template!.includes('bg-black/80'), 'should have overlay');
  assert(template!.includes('Close'), 'should have close button');
});

Deno.test('chat template has message list and input', () => {
  const template = getTemplate('chat');
  assertExists(template);
  assert(template!.includes('ChatMessage') || template!.includes('messages'));
  assert(template!.includes('onSend') || template!.includes('send'));
});

Deno.test('block-login template has form and social login', () => {
  const template = getTemplate('block-login');
  assertExists(template);
  assert(template!.includes('email'));
  assert(template!.includes('password'));
  assert(template!.includes('Sign in') || template!.includes('sign in'));
  assert(template!.includes('Google') || template!.includes('google'));
});

Deno.test('block-dashboard-stats template has stat cards', () => {
  const template = getTemplate('block-dashboard-stats');
  assertExists(template);
  assert(template!.includes('stats'));
  assert(template!.includes('trend'));
  assert(template!.includes('value'));
});

Deno.test('data-table template uses tanstack table', () => {
  const template = getTemplate('data-table');
  assertExists(template);
  assert(template!.includes('@tanstack/react-table'));
  assert(template!.includes('useReactTable'));
  assert(
    template!.includes('pagination') || template!.includes('Pagination') ||
      template!.includes('previousPage'),
  );
});

Deno.test('hasTemplate returns false for nonexistent', () => {
  assert(!hasTemplate('nonexistent-component'));
});
