/**
 * Color conversion utilities for the DTCG interchange layer.
 *
 * Handles bidirectional conversion between:
 *  - HSL triplets ("240 5.9% 10%") used by Adhar UI tokens
 *  - Hex strings ("#18181b") used by DTCG standard
 *  - RGBA floats ({ r: 0.09, g: 0.09, b: 0.11, a: 1 }) used by Figma Variables API
 *
 * All conversions are designed for lossless round-trips where possible.
 * The $extensions.hslRaw field is used to preserve exact HSL values.
 *
 * @module
 */

import type { FigmaRGBA } from './types.ts';

/**
 * Parse an Adhar UI HSL triplet string into numeric components.
 *
 * @param triplet - HSL string like "240 5.9% 10%"
 * @returns Parsed { h, s, l } where h is degrees, s and l are 0-100
 */
export function parseHslTriplet(triplet: string): { h: number; s: number; l: number } {
  const parts = triplet.trim().split(/\s+/);
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]); // includes % but parseFloat ignores it
  const l = parseFloat(parts[2]);
  return { h, s, l };
}

/**
 * Format HSL components back into an Adhar UI triplet string.
 *
 * @param h - Hue in degrees (0-360)
 * @param s - Saturation as percentage (0-100)
 * @param l - Lightness as percentage (0-100)
 * @returns Triplet string like "240 5.9% 10%"
 */
export function formatHslTriplet(h: number, s: number, l: number): string {
  // Round to 1 decimal place to avoid floating-point noise
  const rh = Math.round(h * 10) / 10;
  const rs = Math.round(s * 10) / 10;
  const rl = Math.round(l * 10) / 10;
  return `${rh} ${rs}% ${rl}%`;
}

/**
 * Convert an HSL triplet string to a hex color string.
 *
 * @param triplet - HSL string like "240 5.9% 10%"
 * @returns Hex string like "#18181b"
 */
export function hslTripletToHex(triplet: string): string {
  const { h, s, l } = parseHslTriplet(triplet);
  return hslToHex(h, s, l);
}

/**
 * Convert HSL values to hex.
 *
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns Hex string like "#18181b"
 */
export function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s / 100, l / 100);
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert hex color to an HSL triplet string.
 *
 * Note: This involves floating-point conversion and may not round-trip
 * perfectly. Use $extensions.hslRaw for lossless preservation.
 *
 * @param hex - Hex string like "#18181b"
 * @returns HSL triplet string like "240 5.9% 10.6%"
 */
export function hexToHslTriplet(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  return formatHslTriplet(h, s * 100, l * 100);
}

/**
 * Convert HSL to RGB floats (0-1 range).
 * Standard algorithm from CSS Color Module Level 4.
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hue = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;
  if (hue < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (hue < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (hue < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (hue < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return { r: r + m, g: g + m, b: b + m };
}

/**
 * Convert hex to HSL (h: 0-360, s: 0-1, l: 0-1).
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return { h, s, l };
}

/**
 * Convert an HSL triplet string to Figma RGBA format.
 *
 * @param triplet - HSL string like "240 5.9% 10%"
 * @returns FigmaRGBA with r, g, b, a in 0-1 range
 */
export function hslTripletToFigmaRGBA(triplet: string): FigmaRGBA {
  const { h, s, l } = parseHslTriplet(triplet);
  const { r, g, b } = hslToRgb(h, s / 100, l / 100);
  return { r, g, b, a: 1 };
}

/**
 * Convert Figma RGBA to an HSL triplet string.
 *
 * @param rgba - Figma color { r, g, b, a } in 0-1 range
 * @returns HSL triplet string
 */
export function figmaRGBAToHslTriplet(rgba: FigmaRGBA): string {
  const r = rgba.r, g = rgba.g, b = rgba.b;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return formatHslTriplet(h, s * 100, l * 100);
}

/**
 * Convert Figma RGBA to hex string.
 */
export function figmaRGBAToHex(rgba: FigmaRGBA): string {
  const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
  return `#${toHex(rgba.r)}${toHex(rgba.g)}${toHex(rgba.b)}`;
}

/**
 * Convert hex string to Figma RGBA.
 */
export function hexToFigmaRGBA(hex: string): FigmaRGBA {
  const cleaned = hex.replace('#', '');
  return {
    r: parseInt(cleaned.slice(0, 2), 16) / 255,
    g: parseInt(cleaned.slice(2, 4), 16) / 255,
    b: parseInt(cleaned.slice(4, 6), 16) / 255,
    a: 1,
  };
}
