/**
 * Tests for @adhar-ui/dtcg
 *
 * Validates color conversions, DTCG round-trips,
 * Figma/Penpot converters, and validators.
 */

import { assert, assertEquals, assertExists } from 'https://deno.land/std@0.224.0/assert/mod.ts';
import {
  figmaRGBAToHex,
  figmaRGBAToHslTriplet,
  formatHslTriplet,
  hexToFigmaRGBA,
  hexToHslTriplet,
  hslTripletToFigmaRGBA,
  hslTripletToHex,
  parseHslTriplet,
} from '../color-utils.ts';
import { themeToDtcg } from '../theme-to-dtcg.ts';
import { dtcgToTheme } from '../dtcg-to-theme.ts';
import { dtcgToFigma } from '../dtcg-to-figma.ts';
import { dtcgToPenpot } from '../dtcg-to-penpot.ts';
import { penpotToDtcg } from '../penpot-to-dtcg.ts';
import { validateDtcg } from '../validators.ts';
import { blue, green, slate, zinc } from '@adhar-ui/tokens';
import type { ThemePreset } from '@adhar-ui/tokens';

// ─── Color Utilities ─────────────────────────────────────────────────

Deno.test('parseHslTriplet parses correctly', () => {
  const { h, s, l } = parseHslTriplet('240 5.9% 10%');
  assertEquals(h, 240);
  assertEquals(s, 5.9);
  assertEquals(l, 10);
});

Deno.test('formatHslTriplet formats correctly', () => {
  assertEquals(formatHslTriplet(240, 5.9, 10), '240 5.9% 10%');
  assertEquals(formatHslTriplet(0, 0, 100), '0 0% 100%');
});

Deno.test('hslTripletToHex converts white', () => {
  assertEquals(hslTripletToHex('0 0% 100%'), '#ffffff');
});

Deno.test('hslTripletToHex converts black', () => {
  assertEquals(hslTripletToHex('0 0% 0%'), '#000000');
});

Deno.test('hslTripletToHex converts primary color', () => {
  const hex = hslTripletToHex('240 5.9% 10%');
  assert(hex.startsWith('#'), 'should start with #');
  assertEquals(hex.length, 7, 'should be 7 chars (#rrggbb)');
});

Deno.test('hexToHslTriplet round-trips approximately', () => {
  const original = '0 0% 100%';
  const hex = hslTripletToHex(original);
  const roundTripped = hexToHslTriplet(hex);
  // White should round-trip perfectly
  assertEquals(roundTripped, '0 0% 100%');
});

Deno.test('hexToFigmaRGBA converts correctly', () => {
  const rgba = hexToFigmaRGBA('#ffffff');
  assertEquals(rgba.r, 1);
  assertEquals(rgba.g, 1);
  assertEquals(rgba.b, 1);
  assertEquals(rgba.a, 1);
});

Deno.test('hexToFigmaRGBA converts black', () => {
  const rgba = hexToFigmaRGBA('#000000');
  assertEquals(rgba.r, 0);
  assertEquals(rgba.g, 0);
  assertEquals(rgba.b, 0);
});

Deno.test('figmaRGBAToHex converts correctly', () => {
  assertEquals(figmaRGBAToHex({ r: 1, g: 1, b: 1, a: 1 }), '#ffffff');
  assertEquals(figmaRGBAToHex({ r: 0, g: 0, b: 0, a: 1 }), '#000000');
});

Deno.test('hslTripletToFigmaRGBA round-trips via figmaRGBAToHslTriplet', () => {
  const original = '0 0% 100%';
  const rgba = hslTripletToFigmaRGBA(original);
  const roundTripped = figmaRGBAToHslTriplet(rgba);
  assertEquals(roundTripped, '0 0% 100%');
});

// ─── ThemePreset <-> DTCG Round-Trip ─────────────────────────────────

Deno.test('themeToDtcg produces valid DTCG structure', () => {
  const dtcg = themeToDtcg(zinc);
  assertExists(dtcg['adhar-ui']);
  assertExists(dtcg['adhar-ui'].$description);
  assertExists(dtcg['adhar-ui'].color);
  assertExists(dtcg['adhar-ui'].radius);
});

Deno.test('themeToDtcg -> dtcgToTheme round-trips for zinc', () => {
  assertRoundTrip(zinc);
});

Deno.test('themeToDtcg -> dtcgToTheme round-trips for slate', () => {
  assertRoundTrip(slate);
});

Deno.test('themeToDtcg -> dtcgToTheme round-trips for blue', () => {
  assertRoundTrip(blue);
});

Deno.test('themeToDtcg -> dtcgToTheme round-trips for green', () => {
  assertRoundTrip(green);
});

function assertRoundTrip(preset: ThemePreset) {
  const dtcg = themeToDtcg(preset);
  const restored = dtcgToTheme(dtcg, preset.name, preset.label);

  assertEquals(restored.name, preset.name);
  assertEquals(restored.label, preset.label);
  assertEquals(restored.light.radius, preset.light.radius);
  assertEquals(restored.dark.radius, preset.dark.radius);

  // Light mode colors should round-trip via hslRaw extension
  assertEquals(restored.light.colors.background, preset.light.colors.background);
  assertEquals(restored.light.colors.foreground, preset.light.colors.foreground);
  assertEquals(restored.light.colors.primary.DEFAULT, preset.light.colors.primary.DEFAULT);
  assertEquals(restored.light.colors.primary.foreground, preset.light.colors.primary.foreground);
  assertEquals(restored.light.colors.destructive.DEFAULT, preset.light.colors.destructive.DEFAULT);
  assertEquals(restored.light.colors.border, preset.light.colors.border);

  // Dark mode via extension
  assertEquals(restored.dark.colors.background, preset.dark.colors.background);
  assertEquals(restored.dark.colors.primary.DEFAULT, preset.dark.colors.primary.DEFAULT);
}

// ─── DTCG -> Figma ───────────────────────────────────────────────────

Deno.test('dtcgToFigma produces valid payload', () => {
  const dtcg = themeToDtcg(zinc);
  const payload = dtcgToFigma(dtcg);

  assertExists(payload.variableCollections);
  assertExists(payload.variableModes);
  assertExists(payload.variables);
  assertExists(payload.variableModeValues);

  assert(payload.variableCollections.length >= 1, 'should have at least 1 collection');
  assert(payload.variableModes.length >= 2, 'should have Light and Dark modes');
  assert(payload.variables.length > 0, 'should have variables');
  assert(payload.variableModeValues.length > 0, 'should have mode values');
});

Deno.test('dtcgToFigma creates Light and Dark modes', () => {
  const dtcg = themeToDtcg(zinc);
  const payload = dtcgToFigma(dtcg);
  const modeNames = payload.variableModes.map((m) => m.name);
  assert(modeNames.includes('Light'), 'should have Light mode');
  assert(modeNames.includes('Dark'), 'should have Dark mode');
});

// ─── DTCG -> Penpot ──────────────────────────────────────────────────

Deno.test('dtcgToPenpot produces color entries', () => {
  const dtcg = themeToDtcg(zinc);
  const colors = dtcgToPenpot(dtcg, 'light');

  assert(colors.length > 0, 'should produce color entries');
  for (const color of colors) {
    assertExists(color.id);
    assertExists(color.name);
    assert(color.color.startsWith('#'), 'color should be hex');
    assertEquals(color.opacity, 1);
  }
});

Deno.test('dtcgToPenpot produces different values for light vs dark', () => {
  const dtcg = themeToDtcg(zinc);
  const lightColors = dtcgToPenpot(dtcg, 'light');
  const darkColors = dtcgToPenpot(dtcg, 'dark');

  // Find background color in both
  const lightBg = lightColors.find((c) => c.name === 'background');
  const darkBg = darkColors.find((c) => c.name === 'background');
  assertExists(lightBg);
  assertExists(darkBg);
  assert(lightBg!.color !== darkBg!.color, 'light and dark background should differ');
});

// ─── Penpot -> DTCG ──────────────────────────────────────────────────

Deno.test('penpotToDtcg creates valid DTCG from colors', () => {
  const colors = [
    { id: '1', name: 'DEFAULT', color: '#18181b', opacity: 1, path: 'primary' },
    { id: '2', name: 'foreground', color: '#fafafa', opacity: 1, path: 'primary' },
    { id: '3', name: 'background', color: '#ffffff', opacity: 1 },
  ];
  const dtcg = penpotToDtcg(colors, 'test');
  assertExists(dtcg['adhar-ui']);
  assertExists(dtcg['adhar-ui'].color);
});

// ─── Validator ───────────────────────────────────────────────────────

Deno.test('validateDtcg accepts valid document', () => {
  const dtcg = themeToDtcg(zinc);
  const result = validateDtcg(dtcg);
  assert(
    result.valid,
    `should be valid but got errors: ${result.errors.map((e) => e.message).join(', ')}`,
  );
  assertEquals(result.errors.length, 0);
});

Deno.test('validateDtcg rejects missing adhar-ui root', () => {
  const result = validateDtcg({ foo: 'bar' });
  assert(!result.valid);
  assert(result.errors.some((e) => e.message.includes('adhar-ui')));
});

Deno.test('validateDtcg rejects non-object', () => {
  const result = validateDtcg(null);
  assert(!result.valid);
});

Deno.test('validateDtcg rejects string', () => {
  const result = validateDtcg('not an object');
  assert(!result.valid);
});
