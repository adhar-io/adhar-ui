# @adhar-ui/dtcg

W3C Design Tokens Community Group (DTCG) interchange layer for Adhar UI. Provides bidirectional, lossless conversion between Adhar UI tokens, Figma Variables, and Penpot library colors using the [W3C DTCG standard](https://www.designtokens.org/) as the canonical format.

## Why DTCG?

Instead of building direct converters between every pair of tools (code ↔ Figma, code ↔ Penpot, Figma ↔ Penpot), all tools convert to/from DTCG. This keeps the conversion matrix at O(n) instead of O(n²):

```
ThemePreset ←→ DTCG JSON ←→ Figma Variables
                   ↕
             Penpot Colors
                   ↕
            Style Dictionary
```

Adding a new design tool only requires two new converters (tool → DTCG, DTCG → tool).

## Architecture

```
src/
  index.ts              # Public API (all exports)
  types.ts              # DTCG, Figma, Penpot type definitions
  color-utils.ts        # HSL ↔ Hex ↔ RGBA color conversions
  theme-to-dtcg.ts      # Adhar UI ThemePreset → DTCG JSON
  dtcg-to-theme.ts      # DTCG JSON → Adhar UI ThemePreset
  figma-to-dtcg.ts      # Figma Variables API response → DTCG JSON
  dtcg-to-figma.ts      # DTCG JSON → Figma Variables API payload
  penpot-to-dtcg.ts     # Penpot library colors → DTCG JSON
  dtcg-to-penpot.ts     # DTCG JSON → Penpot color entries
  validators.ts         # DTCG schema validation
```

## Getting Started

### Step 1: Export tokens from code to DTCG

```ts
import { zinc } from '@adhar-ui/tokens';
import { themeToDtcg } from '@adhar-ui/dtcg';

// Convert the zinc preset to DTCG format
const dtcg = themeToDtcg(zinc);

// Write to a file for interchange
const json = JSON.stringify(dtcg, null, 2);
await Deno.writeTextFile('tokens.dtcg.json', json);
```

The CLI shortcut for this is:

```bash
deno task cli design-export dtcg
```

### Step 2: Import tokens from DTCG to code

```ts
import { dtcgToTheme } from '@adhar-ui/dtcg';

// Read a DTCG file (from Figma, Penpot, or any DTCG tool)
const json = JSON.parse(await Deno.readTextFile('tokens.dtcg.json'));

// Convert back to ThemePreset
const theme = dtcgToTheme(json, 'custom', 'Custom Theme');
// theme is a full ThemePreset with light and dark modes
```

### Step 3: Push tokens to Figma

```ts
import { zinc } from '@adhar-ui/tokens';
import { dtcgToFigma, themeToDtcg } from '@adhar-ui/dtcg';

// Step 1: Theme → DTCG
const dtcg = themeToDtcg(zinc);

// Step 2: DTCG → Figma Variables API payload
const payload = dtcgToFigma(dtcg, 'Adhar UI');

// Step 3: POST to Figma REST API
const response = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables`, {
  method: 'POST',
  headers: {
    'X-Figma-Token': FIGMA_TOKEN,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});
```

### Step 4: Pull tokens from Figma

```ts
import { dtcgToTheme, figmaToDtcg } from '@adhar-ui/dtcg';

// Step 1: Fetch variables from Figma REST API
const response = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
  { headers: { 'X-Figma-Token': FIGMA_TOKEN } },
);
const data = await response.json();

// Step 2: Find the Adhar UI collection
const collection = data.meta.variableCollections['collection_id'];
const variables = data.meta.variables;

// Step 3: Figma → DTCG → ThemePreset
const dtcg = figmaToDtcg(collection, variables);
const theme = dtcgToTheme(dtcg, 'figma-import', 'Figma Import');
```

### Step 5: Push tokens to Penpot

```ts
import { zinc } from '@adhar-ui/tokens';
import { dtcgToPenpot, themeToDtcg } from '@adhar-ui/dtcg';

// Theme → DTCG → Penpot colors
const dtcg = themeToDtcg(zinc);
const lightColors = dtcgToPenpot(dtcg, 'light');
const darkColors = dtcgToPenpot(dtcg, 'dark');

// Each color has: { id, name, color (hex), opacity, path }
// Use Penpot RPC API to add to library
```

### Step 6: Pull tokens from Penpot

```ts
import { dtcgToTheme, penpotToDtcg } from '@adhar-ui/dtcg';
import type { PenpotColor } from '@adhar-ui/dtcg';

// Fetch colors from Penpot RPC API
const colors: PenpotColor[] = await fetchPenpotColors(fileId);

// Penpot → DTCG → ThemePreset
const dtcg = penpotToDtcg(colors, 'penpot');
const theme = dtcgToTheme(dtcg, 'penpot-import', 'Penpot Import');
```

### Step 7: Validate a DTCG file

```ts
import { validateDtcg } from '@adhar-ui/dtcg';

const doc = JSON.parse(await Deno.readTextFile('tokens.dtcg.json'));
const result = validateDtcg(doc);

if (!result.valid) {
  for (const error of result.errors) {
    console.error(`${error.path}: ${error.message}`);
  }
}
```

## Color Conversion Utilities

The `color-utils.ts` module handles all color format conversions:

```ts
import {
  figmaRGBAToHex, // { r, g, b, a } → "#18181b"
  figmaRGBAToHslTriplet, // { r, g, b, a } → "240 5.9% 10%"
  formatHslTriplet, // (240, 5.9, 10) → "240 5.9% 10%"
  hexToFigmaRGBA, // "#18181b" → { r, g, b, a }
  hexToHslTriplet, // "#18181b" → "240 5.9% 10.6%"
  hslTripletToFigmaRGBA, // "240 5.9% 10%" → { r: 0.09, g: 0.09, b: 0.11, a: 1 }
  hslTripletToHex, // "240 5.9% 10%" → "#18181b"
  parseHslTriplet, // "240 5.9% 10%" → { h: 240, s: 5.9, l: 10 }
} from '@adhar-ui/dtcg';
```

## HSL Round-Trip Fidelity

DTCG stores colors as hex (`#rrggbb`), but Adhar UI uses HSL triplets (`"240 5.9% 10%"`). Converting hex → HSL introduces floating-point rounding errors. To preserve exact HSL values across round-trips, this package stores the original HSL triplet in the DTCG `$extensions` field:

```json
{
  "$type": "color",
  "$value": "#18181b",
  "$extensions": {
    "com.adhar-ui": {
      "hslRaw": "240 5.9% 10%",
      "mode": "light"
    },
    "com.adhar-ui.dark": {
      "hslRaw": "0 0% 98%",
      "hex": "#fafafa"
    }
  }
}
```

The `dtcg-to-theme` converter reads `hslRaw` first, falling back to hex conversion only when extensions are absent (e.g., tokens created manually in the design tool).

## DTCG Output Format

The generated DTCG JSON follows the W3C specification:

```json
{
  "adhar-ui": {
    "$description": "Adhar UI design tokens – Zinc preset",
    "color": {
      "background": { "$type": "color", "$value": "#ffffff", ... },
      "primary": {
        "DEFAULT": { "$type": "color", "$value": "#18181b", ... },
        "foreground": { "$type": "color", "$value": "#fafafa", ... }
      },
      "sidebar": {
        "background": { "$type": "color", "$value": "#f9fafb", ... },
        ...
      }
    },
    "radius": { "$type": "dimension", "$value": "0.5rem" }
  }
}
```

## API Reference

| Function                        | Input              | Output                  |
| ------------------------------- | ------------------ | ----------------------- |
| `themeToDtcg(preset)`           | `ThemePreset`      | `DTCGDocument`          |
| `dtcgToTheme(doc, name, label)` | `DTCGDocument`     | `ThemePreset`           |
| `dtcgToFigma(doc, name?, id?)`  | `DTCGDocument`     | `FigmaVariablesPayload` |
| `figmaToDtcg(collection, vars)` | Figma API response | `DTCGDocument`          |
| `dtcgToPenpot(doc, mode)`       | `DTCGDocument`     | `PenpotColor[]`         |
| `penpotToDtcg(colors, name)`    | `PenpotColor[]`    | `DTCGDocument`          |
| `validateDtcg(doc)`             | `unknown`          | `ValidationResult`      |
| `hslTripletToHex(triplet)`      | `string`           | `string`                |
| `hexToHslTriplet(hex)`          | `string`           | `string`                |

## Development

```bash
# Type-check
deno check packages/dtcg/src/index.ts

# Lint
deno lint packages/dtcg/src
```
