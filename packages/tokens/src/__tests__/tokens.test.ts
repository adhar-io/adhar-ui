/**
 * Tests for @adhar-ui/tokens
 *
 * Validates design token structures, theme presets,
 * CSS generation, and breakpoint definitions.
 */

import { assert, assertEquals, assertExists } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {
  animation,
  blue,
  breakpoints,
  breakpointValues,
  defineTheme,
  generateCSS,
  green,
  keyframes,
  slate,
  spacing,
  typography,
  zinc,
} from '../index.ts';
import type { ColorToken, ThemeColors, ThemePreset } from '../types.ts';

// ─── Theme Preset Structure ──────────────────────────────────────────

Deno.test('zinc preset has correct structure', () => {
  assertPresetStructure(zinc, 'zinc', 'Zinc');
});

Deno.test('slate preset has correct structure', () => {
  assertPresetStructure(slate, 'slate', 'Slate');
});

Deno.test('blue preset has correct structure', () => {
  assertPresetStructure(blue, 'blue', 'Blue');
});

Deno.test('green preset has correct structure', () => {
  assertPresetStructure(green, 'green', 'Green');
});

function assertPresetStructure(preset: ThemePreset, name: string, label: string) {
  assertEquals(preset.name, name);
  assertEquals(preset.label, label);
  assertExists(preset.light);
  assertExists(preset.dark);
  assertExists(preset.light.colors);
  assertExists(preset.dark.colors);
  assertExists(preset.light.radius);
  assertExists(preset.dark.radius);
  assertColorsComplete(preset.light.colors);
  assertColorsComplete(preset.dark.colors);
}

function assertColorsComplete(colors: ThemeColors) {
  // Simple string tokens
  for (const key of ['background', 'foreground', 'border', 'input', 'ring'] as const) {
    assert(typeof colors[key] === 'string', `${key} should be a string`);
    assertHslTriplet(colors[key] as string, key);
  }
  // ColorToken pairs
  for (
    const key of [
      'card',
      'popover',
      'primary',
      'secondary',
      'muted',
      'accent',
      'destructive',
    ] as const
  ) {
    const token = colors[key] as ColorToken;
    assertExists(token.DEFAULT, `${key}.DEFAULT should exist`);
    assertExists(token.foreground, `${key}.foreground should exist`);
    assertHslTriplet(token.DEFAULT, `${key}.DEFAULT`);
    assertHslTriplet(token.foreground, `${key}.foreground`);
  }
  // Sidebar tokens
  assertExists(colors.sidebar);
  assertHslTriplet(colors.sidebar.background, 'sidebar.background');
  assertHslTriplet(colors.sidebar.foreground, 'sidebar.foreground');
}

function assertHslTriplet(value: string, name: string) {
  const parts = value.trim().split(/\s+/);
  assert(parts.length >= 3, `${name}: "${value}" should have 3 parts (h s% l%)`);
  assert(!isNaN(parseFloat(parts[0])), `${name}: hue should be a number`);
}

// ─── CSS Generation ──────────────────────────────────────────────────

Deno.test('generateCSS produces valid CSS with :root and .dark', () => {
  const css = generateCSS(zinc);
  assert(css.includes('@layer base'), 'should contain @layer base');
  assert(css.includes(':root'), 'should contain :root selector');
  assert(css.includes('.dark'), 'should contain .dark selector');
  assert(css.includes('--background:'), 'should contain --background variable');
  assert(css.includes('--primary:'), 'should contain --primary variable');
  assert(css.includes('--radius:'), 'should contain --radius variable');
  assert(css.includes('--sidebar-background:'), 'should contain sidebar tokens');
});

Deno.test('generateCSS produces different values for light and dark', () => {
  const css = generateCSS(zinc);
  // The :root and .dark blocks should have different --background values
  const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
  const darkMatch = css.match(/\.dark\s*\{([^}]+)\}/);
  assertExists(rootMatch, 'should have :root block');
  assertExists(darkMatch, 'should have .dark block');
  assert(rootMatch![1] !== darkMatch![1], 'light and dark should have different values');
});

Deno.test('generateCSS works for all presets', () => {
  for (const preset of [zinc, slate, blue, green]) {
    const css = generateCSS(preset);
    assert(css.length > 500, `${preset.name} CSS should be substantial`);
    assert(css.includes(':root'), `${preset.name} should have :root`);
    assert(css.includes('.dark'), `${preset.name} should have .dark`);
  }
});

// ─── defineTheme ─────────────────────────────────────────────────────

Deno.test('defineTheme creates a valid preset', () => {
  const theme = defineTheme({
    name: 'custom',
    label: 'Custom',
  });
  assertEquals(theme.name, 'custom');
  assertEquals(theme.label, 'Custom');
  assertExists(theme.light);
  assertExists(theme.dark);
});

// ─── Breakpoints ─────────────────────────────────────────────────────

Deno.test('breakpoints contain all expected sizes', () => {
  assertEquals(breakpoints.xs, '475px');
  assertEquals(breakpoints.sm, '640px');
  assertEquals(breakpoints.md, '768px');
  assertEquals(breakpoints.lg, '1024px');
  assertEquals(breakpoints.xl, '1280px');
  assertEquals(breakpoints['2xl'], '1536px');
});

Deno.test('breakpointValues are numeric and ascending', () => {
  const values = [
    breakpointValues.xs,
    breakpointValues.sm,
    breakpointValues.md,
    breakpointValues.lg,
    breakpointValues.xl,
    breakpointValues['2xl'],
  ];
  for (let i = 1; i < values.length; i++) {
    assert(values[i] > values[i - 1], `${values[i]} should be > ${values[i - 1]}`);
  }
});

// ─── Spacing ─────────────────────────────────────────────────────────

Deno.test('spacing scale has expected entries', () => {
  assertEquals(spacing[0], '0px');
  assertEquals(spacing[1], '0.25rem');
  assertEquals(spacing[4], '1rem');
  assertEquals(spacing[8], '2rem');
  assertEquals(spacing[16], '4rem');
});

// ─── Typography ──────────────────────────────────────────────────────

Deno.test('typography has font families and sizes', () => {
  assert(typography.fontFamily.sans.includes('sans-serif'));
  assert(typography.fontFamily.mono.includes('monospace'));
  assertExists(typography.fontSize.sm);
  assertExists(typography.fontSize.base);
  assertExists(typography.fontSize.xl);
});

// ─── Animations ──────────────────────────────────────────────────────

Deno.test('keyframes has expected animations', () => {
  assertExists(keyframes['accordion-down']);
  assertExists(keyframes['accordion-up']);
  assertExists(keyframes['fade-in']);
  assertExists(keyframes['fade-out']);
  assertExists(keyframes['spin']);
  assertExists(keyframes['pulse']);
});

Deno.test('animation strings reference keyframes', () => {
  assert(animation['accordion-down'].includes('accordion-down'));
  assert(animation['fade-in'].includes('fade-in'));
  assert(animation['spin'].includes('spin'));
});
