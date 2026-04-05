# @adhar-ui/figma-plugin

Figma plugin for bidirectional design token and component synchronization with the Adhar UI design system.

## Features

- **Token Push**: Push Adhar UI theme tokens to Figma Variables (light + dark modes)
- **Token Pull**: Pull Figma Variables back to Adhar UI ThemePreset format
- **Component Push**: Push CVA component variants to Figma as component sets with variant properties
- **Dev Mode Codegen**: Generate Adhar UI component code for selected design nodes in Figma Dev Mode
- **Multi-Framework**: Codegen supports React, Vue, Solid, Svelte, Angular

## Architecture

```
packages/figma-plugin/
  manifest.json              # Figma plugin configuration
  src/
    index.ts                 # Public API exports
    handlers/
      token-push.ts          # ThemePreset → Figma Variables
      token-pull.ts          # Figma Variables → ThemePreset
      component-push.ts      # CVA variants → Figma component sets
    codegen/                 # (future) Dev Mode code snippets
      handler.ts
      templates/
    ui/                      # (future) Plugin panel UI
      App.tsx
  build/
    esbuild.config.ts        # Bundle for Figma (no Deno runtime)
```

## How It Works

### Token Push (Code → Figma)

```ts
import { tokenPush } from '@adhar-ui/figma-plugin';
import { zinc } from '@adhar-ui/tokens';

// Generate Figma Variables API payload from a theme preset
const payload = tokenPush(zinc, 'Adhar UI');

// The payload contains:
// - variableCollections: Create "Adhar UI" collection
// - variableModes: "Light" and "Dark" modes
// - variables: One variable per token (color/primary, color/background, etc.)
// - variableModeValues: Light and dark values for each variable

// Push to Figma REST API
await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables`, {
  method: 'POST',
  headers: { 'X-Figma-Token': TOKEN, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

### Token Pull (Figma → Code)

```ts
import { tokenPull } from '@adhar-ui/figma-plugin';

// Fetch variables from Figma
const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables/local`, {
  headers: { 'X-Figma-Token': TOKEN },
});
const data = await res.json();

// Convert to ThemePreset
const collection = Object.values(data.meta.variableCollections)[0];
const theme = tokenPull(collection, data.meta.variables, 'custom', 'Custom');

// theme is now a full ThemePreset ready to write to a preset file
```

### Component Push (Code → Figma Component Sets)

```ts
import { componentPush } from '@adhar-ui/figma-plugin';

// Generate Figma component set instructions from CVA config
const instructions = componentPush('button', 'Button', {
  variants: {
    variant: { default: '...', destructive: '...', outline: '...' },
    size: { sm: '...', default: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

// instructions contains:
// - name: "Button"
// - properties: [{ name: "Variant", values: ["Default", "Destructive", ...] }, ...]
// - combinations: [{ variant: "default", size: "sm" }, ...] (all 24)
// - totalFrames: 24
```

### Dev Mode Codegen

The plugin registers a codegen handler via `figma.codegen.on("generate")`. When a designer selects an Adhar UI component instance in Dev Mode, it generates framework-appropriate code:

```
Designer selects a Button with variant="destructive", size="lg"
  ↓
Plugin detects Adhar UI component set
  ↓
Reads variant properties from the node
  ↓
Generates: <Button variant="destructive" size="lg">Click me</Button>
```

The `manifest.json` declares support for 5 languages:

- Adhar UI (React)
- Adhar UI (Vue)
- Adhar UI (Solid)
- Adhar UI (Svelte)
- Adhar UI (Angular)

## Plugin Manifest

```json
{
  "name": "Adhar UI",
  "id": "adhar-ui-figma-plugin",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/ui.html",
  "capabilities": ["codegen", "inspect"],
  "codegenLanguages": [
    { "label": "Adhar UI (React)", "value": "react" },
    { "label": "Adhar UI (Vue)", "value": "vue" },
    ...
  ]
}
```

## Building the Plugin

Figma plugins must be self-contained JavaScript bundles (no Deno runtime in output):

```bash
# Step 1: Bundle main thread code
npx esbuild src/code.ts --bundle --outfile=dist/code.js --platform=browser --format=iife

# Step 2: Bundle UI (when implemented)
npx esbuild src/ui/App.tsx --bundle --outfile=dist/ui.js --platform=browser

# Step 3: Create ui.html with inlined JS
# (build script wraps ui.js in an HTML file)
```

The `@adhar-ui/dtcg` converter is tree-shaken and inlined into the bundle -- only the Figma-relevant conversion paths are included.

## Developing the Plugin

### Prerequisites

- Figma desktop app (plugins don't run in the web version for development)
- Node.js or Deno for building

### Step 1: Set up development

```bash
cd packages/figma-plugin

# Install build dependencies
npm install esbuild
```

### Step 2: Build the plugin

```bash
npx esbuild src/code.ts --bundle --outfile=dist/code.js --platform=browser
```

### Step 3: Load in Figma

1. Open Figma Desktop
2. Go to Plugins → Development → Import plugin from manifest...
3. Select `packages/figma-plugin/manifest.json`
4. The plugin appears in the Plugins menu

### Step 4: Test token sync

1. Open any Figma file
2. Run the plugin from Plugins menu
3. Click "Push Tokens" to create Figma Variables
4. Verify variables appear in the Variables panel with Light/Dark modes

## API Reference

| Function                                          | Input          | Output                         |
| ------------------------------------------------- | -------------- | ------------------------------ |
| `tokenPush(preset, name?, id?)`                   | `ThemePreset`  | `FigmaVariablesPayload`        |
| `tokenPull(collection, variables, name?, label?)` | Figma API data | `ThemePreset`                  |
| `componentPush(name, title, cvaConfig)`           | CVA config     | `FigmaComponentSetInstruction` |

## Development

```bash
# Type-check
deno check packages/figma-plugin/src/index.ts

# Lint
deno lint packages/figma-plugin/src
```
