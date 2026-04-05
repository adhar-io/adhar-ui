/**
 * Design kit generator for Adhar UI.
 *
 * Produces a complete importable design system consisting of:
 *  - SVG component files organized by category
 *  - Color token swatches (light + dark)
 *  - Typography scale samples
 *  - Spacing scale visualization
 *  - Penpot-compatible manifest JSON
 *  - DTCG token file
 *
 * The output directory can be imported into Penpot as a shared library
 * or used as reference assets in any design tool.
 *
 * @module
 */

import { componentIndex } from '@adhar-ui/registry';
import { zinc } from '@adhar-ui/tokens';
import { themeToDtcg } from '@adhar-ui/dtcg';
import { hslTripletToHex } from '@adhar-ui/dtcg';
import {
  createDefaultPalette,
  type DesignPalette,
  renderBadge,
  renderButton,
  renderCard,
  renderColorSwatch,
  type RenderedComponent,
  renderInput,
  renderSimpleComponents,
  renderSpacingScale,
  renderTypographySample,
} from './svg-renderer.ts';

/** Design kit output manifest entry. */
export interface DesignKitFile {
  path: string;
  content: string;
  type: 'svg' | 'json';
}

/** Complete design kit output. */
export interface DesignKit {
  files: DesignKitFile[];
  manifest: PenpotManifest;
  stats: { components: number; variants: number; pages: number; files: number };
}

/** Penpot library manifest for import. */
export interface PenpotManifest {
  name: string;
  version: string;
  description: string;
  pages: { name: string; components: string[] }[];
  colors: { name: string; hex: string; path: string }[];
  typography: {
    name: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    lineHeight: number;
  }[];
}

/**
 * Generate the complete Adhar UI design kit.
 *
 * @param presetName - Theme preset to use (default: "zinc")
 * @returns Design kit with all files and manifest
 */
export function generateDesignKit(presetName = 'zinc'): DesignKit {
  const palette = createDefaultPalette();
  const files: DesignKitFile[] = [];
  const allRendered: RenderedComponent[] = [];

  // ── Render all component SVGs ──────────────────────────────
  const renderers = [
    renderButton,
    renderBadge,
    renderInput,
    renderCard,
    renderSimpleComponents,
  ];

  for (const renderer of renderers) {
    allRendered.push(...renderer(palette));
  }

  // Generate placeholder SVGs for components without dedicated renderers
  const renderedNames = new Set(allRendered.map((r) => r.name));

  for (const comp of componentIndex) {
    if (renderedNames.has(comp.name)) continue;

    const w = 240;
    const h = 80;
    const svg = renderPlaceholderComponent(comp.name, comp.title, comp.description, palette, w, h);
    allRendered.push({
      name: comp.name,
      variant: 'default',
      title: `${comp.title} / Default`,
      svg,
      width: w,
      height: h,
      category: comp.categories[0] || 'other',
    });
  }

  // Write component SVGs organized by category
  for (const comp of allRendered) {
    files.push({
      path: `components/${comp.category}/${comp.name}--${comp.variant}.svg`,
      content: comp.svg,
      type: 'svg',
    });
  }

  // ── Render color token pages ───────────────────────────────

  // Light mode colors
  const lightColors = extractThemeColors(zinc.light.colors as unknown as Record<string, unknown>);
  for (const [name, hex] of Object.entries(lightColors)) {
    files.push({
      path: `tokens/colors/light/${name}.svg`,
      content: renderColorSwatch(name, hex),
      type: 'svg',
    });
  }

  // Dark mode colors
  const darkColors = extractThemeColors(zinc.dark.colors as unknown as Record<string, unknown>);
  for (const [name, hex] of Object.entries(darkColors)) {
    files.push({
      path: `tokens/colors/dark/${name}.svg`,
      content: renderColorSwatch(name, hex),
      type: 'svg',
    });
  }

  // ── Render typography samples ──────────────────────────────
  const typographySamples = [
    { name: 'text-xs', fontSize: 12, lineHeight: 16, fontWeight: 400 },
    { name: 'text-sm', fontSize: 14, lineHeight: 20, fontWeight: 400 },
    { name: 'text-base', fontSize: 16, lineHeight: 24, fontWeight: 400 },
    { name: 'text-lg', fontSize: 18, lineHeight: 28, fontWeight: 400 },
    { name: 'text-xl', fontSize: 20, lineHeight: 28, fontWeight: 400 },
    { name: 'text-2xl', fontSize: 24, lineHeight: 32, fontWeight: 400 },
    { name: 'text-3xl', fontSize: 30, lineHeight: 36, fontWeight: 400 },
    { name: 'text-4xl', fontSize: 36, lineHeight: 40, fontWeight: 400 },
    { name: 'heading-sm', fontSize: 14, lineHeight: 20, fontWeight: 600 },
    { name: 'heading-base', fontSize: 16, lineHeight: 24, fontWeight: 600 },
    { name: 'heading-lg', fontSize: 20, lineHeight: 28, fontWeight: 600 },
    { name: 'heading-xl', fontSize: 24, lineHeight: 32, fontWeight: 700 },
    { name: 'heading-2xl', fontSize: 30, lineHeight: 36, fontWeight: 700 },
  ];

  for (const sample of typographySamples) {
    files.push({
      path: `tokens/typography/${sample.name}.svg`,
      content: renderTypographySample(
        sample.name,
        sample.fontSize,
        sample.lineHeight,
        sample.fontWeight,
        palette.foreground,
      ),
      type: 'svg',
    });
  }

  // ── Render spacing scale ───────────────────────────────────
  files.push({
    path: 'tokens/spacing/scale.svg',
    content: renderSpacingScale(palette.foreground, palette.mutedForeground),
    type: 'svg',
  });

  // ── Generate DTCG tokens file ──────────────────────────────
  const dtcg = themeToDtcg(zinc);
  files.push({
    path: 'tokens/tokens.dtcg.json',
    content: JSON.stringify(dtcg, null, 2),
    type: 'json',
  });

  // ── Build Penpot manifest ──────────────────────────────────
  const categories = [...new Set(allRendered.map((r) => r.category))];
  const pages = categories.map((cat) => ({
    name: capitalize(cat),
    components: allRendered.filter((r) => r.category === cat).map((r) => r.title),
  }));

  // Add token pages
  pages.unshift(
    { name: 'Colors', components: Object.keys(lightColors).map((n) => `Color / ${n}`) },
    { name: 'Typography', components: typographySamples.map((s) => s.name) },
    { name: 'Spacing', components: ['Spacing Scale'] },
  );

  const manifest: PenpotManifest = {
    name: 'Adhar UI Design System',
    version: '0.1.0',
    description: `Complete design kit with ${componentIndex.length} components, ${
      Object.keys(lightColors).length
    } color tokens, ${typographySamples.length} typography styles. Generated from the ${presetName} theme preset.`,
    pages,
    colors: Object.entries(lightColors).map(([name, hex]) => ({
      name: capitalize(name),
      hex,
      path: name.includes('-') ? name.split('-')[0] : '',
    })),
    typography: typographySamples.map((s) => ({
      name: s.name,
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: s.fontSize,
      fontWeight: s.fontWeight,
      lineHeight: s.lineHeight,
    })),
  };

  files.push({
    path: 'manifest.json',
    content: JSON.stringify(manifest, null, 2),
    type: 'json',
  });

  // ── Generate README for the kit ────────────────────────────
  files.push({
    path: 'README.md',
    content: generateKitReadme(manifest, presetName, allRendered.length),
    type: 'json', // treat as raw text
  });

  return {
    files,
    manifest,
    stats: {
      components: componentIndex.length,
      variants: allRendered.length,
      pages: pages.length,
      files: files.length,
    },
  };
}

/**
 * Extract theme colors as a flat name→hex map.
 */
function extractThemeColors(colors: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      result[key] = hslTripletToHex(value);
    } else if (typeof value === 'object' && value !== null) {
      const obj = value as Record<string, unknown>;
      if (typeof obj.DEFAULT === 'string') {
        result[key] = hslTripletToHex(obj.DEFAULT);
      }
      if (typeof obj.foreground === 'string') {
        result[`${key}-foreground`] = hslTripletToHex(obj.foreground);
      }
      // Recursively handle nested objects like sidebar
      for (const [subKey, subVal] of Object.entries(obj)) {
        if (subKey !== 'DEFAULT' && subKey !== 'foreground' && typeof subVal === 'string') {
          result[`${key}-${subKey}`] = hslTripletToHex(subVal);
        }
      }
    }
  }

  return result;
}

function renderPlaceholderComponent(
  name: string,
  title: string,
  description: string,
  p: DesignPalette,
  w: number,
  h: number,
): string {
  const truncDesc = description.length > 50 ? description.slice(0, 47) + '...' : description;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect x="0.5" y="0.5" width="${w - 1}" height="${
    h - 1
  }" rx="${p.radius}" fill="${p.card}" stroke="${p.border}" stroke-dasharray="4 2"/>
  <text x="${
    w / 2
  }" y="28" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="600" fill="${p.cardForeground}">${title}</text>
  <text x="${
    w / 2
  }" y="48" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" fill="${p.mutedForeground}">${truncDesc}</text>
  <text x="${
    w / 2
  }" y="68" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="10" fill="${p.mutedForeground}" opacity="0.5">adhar-ui add ${name}</text>
</svg>`;
}

function generateKitReadme(
  manifest: PenpotManifest,
  preset: string,
  _variantCount: number,
): string {
  return `# ${manifest.name}

${manifest.description}

## Theme: ${preset}

## Contents

### Pages (${manifest.pages.length})
${manifest.pages.map((p) => `- **${p.name}** (${p.components.length} items)`).join('\n')}

### Colors (${manifest.colors.length})
${manifest.colors.map((c) => `- ${c.name}: ${c.hex}`).join('\n')}

### Typography (${manifest.typography.length})
${
    manifest.typography.map((t) =>
      `- ${t.name}: ${t.fontSize}px / ${t.lineHeight}px / ${t.fontWeight}`
    ).join('\n')
  }

## How to Import into Penpot

1. Open Penpot and create a new project or open an existing one
2. Go to **Assets** panel > **Libraries** > **Import**
3. Select the SVG files from the \`components/\` directory
4. The components will appear as assets you can drag onto the canvas
5. To set up the color library, import colors from \`tokens/colors/\`
6. Publish as a **Shared Library** to use across all your Penpot projects

## How to Use with Figma

1. Run \`adhar-ui design-sync push --target=figma\` to push tokens as Figma Variables
2. Import the SVG files as Figma frames
3. Or use the Adhar UI Figma Plugin for automated component creation

## Customization

1. Modify colors in \`adhar-ui.json\` (change \`baseColor\` to zinc/slate/blue/green)
2. Run \`adhar-ui design-generate\` to regenerate the kit with new colors
3. Re-import into your design tool

Generated by Adhar UI CLI v0.1.0
`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
