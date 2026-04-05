# @adhar-ui/penpot-plugin

Penpot plugin for bidirectional design token and component synchronization with the Adhar UI design system. The open-source counterpart to the Figma plugin.

## Features

- **Token Push**: Push Adhar UI theme tokens to Penpot library colors (organized by semantic groups)
- **Token Pull**: Pull Penpot library colors back to Adhar UI ThemePreset format
- **Component Push**: Push CVA component variants to Penpot component variants

## Architecture

```
packages/penpot-plugin/
  manifest.json              # Penpot plugin configuration
  src/
    index.ts                 # Public API exports
    handlers/
      token-push.ts          # ThemePreset → Penpot library colors
      token-pull.ts          # Penpot library colors → ThemePreset
    ui/                      # (future) Plugin panel UI
      App.tsx
  build/
    vite.config.ts           # Build as hosted web app
```

## How It Works

### Token Push (Code → Penpot)

```ts
import { tokenPush } from '@adhar-ui/penpot-plugin';
import { zinc } from '@adhar-ui/tokens';

// Generate Penpot color entries for the light mode
const lightColors = tokenPush(zinc, 'light');
// Returns array of PenpotColor objects:
// [
//   { id: "...", name: "DEFAULT", color: "#18181b", opacity: 1, path: "primary" },
//   { id: "...", name: "foreground", color: "#fafafa", opacity: 1, path: "primary" },
//   { id: "...", name: "background", color: "#ffffff", opacity: 1 },
//   ...
// ]

// Push dark mode colors
const darkColors = tokenPush(zinc, 'dark');

// Use Penpot plugin API to add colors to the library:
// penpot.library.addColor(color)
```

### Token Pull (Penpot → Code)

```ts
import { tokenPull } from '@adhar-ui/penpot-plugin';
import type { PenpotColor } from '@adhar-ui/dtcg';

// Fetch colors from Penpot (via plugin API or RPC)
const colors: PenpotColor[] = [
  { id: '1', name: 'DEFAULT', color: '#18181b', opacity: 1, path: 'primary' },
  { id: '2', name: 'foreground', color: '#fafafa', opacity: 1, path: 'primary' },
  { id: '3', name: 'background', color: '#ffffff', opacity: 1 },
  // ...
];

// Convert to ThemePreset
const theme = tokenPull(colors, 'my-theme', 'My Theme');
// theme.light.colors.primary.DEFAULT === "240 5.9% 10%"
```

## Penpot Plugin System

Penpot plugins run as hosted web apps loaded in an iframe. The plugin communicates with Penpot via the `@penpot/plugin-types` API.

### Plugin Manifest

```json
{
  "name": "Adhar UI",
  "description": "Bidirectional design token and component sync for Adhar UI",
  "host": "https://plugins.adhar.io/penpot/",
  "code": "index.js",
  "icon": "icon.svg",
  "permissions": ["content:read", "content:write"]
}
```

### Developing the Plugin

#### Step 1: Set up the development environment

```bash
cd packages/penpot-plugin

# Install Penpot plugin types
deno add npm:@penpot/plugin-types
```

#### Step 2: Build the plugin

The plugin is a Vite web app:

```bash
deno run -A npm:vite build
```

#### Step 3: Host for development

```bash
deno run -A npm:vite --host --port 4400
```

#### Step 4: Register in Penpot

1. Open Penpot
2. Go to Plugin Manager
3. Add plugin URL: `http://localhost:4400`
4. The plugin appears in the Plugins sidebar

#### Step 5: Test token sync

1. Open any Penpot file
2. Open the Adhar UI plugin from the sidebar
3. Click "Push Tokens" to add colors to the shared library
4. Verify colors appear in the Assets panel organized by group (primary, secondary, etc.)

## Color Organization

Tokens are organized using Penpot's path system to match the semantic hierarchy:

```
Library Colors:
  primary/
    DEFAULT       #18181b
    foreground    #fafafa
  secondary/
    DEFAULT       #f4f4f5
    foreground    #18181b
  destructive/
    DEFAULT       #ef4444
    foreground    #fafafa
  muted/
    DEFAULT       #f4f4f5
    foreground    #71717a
  accent/
    DEFAULT       #f4f4f5
    foreground    #18181b
  background      #ffffff
  foreground      #09090b
  border          #e4e4e7
  input           #e4e4e7
  ring            #18181b
  sidebar/
    background    #f9fafb
    foreground    #3f3f46
    ...
```

## API Reference

| Function                           | Input                              | Output          |
| ---------------------------------- | ---------------------------------- | --------------- |
| `tokenPush(preset, mode)`          | `ThemePreset`, `'light' \| 'dark'` | `PenpotColor[]` |
| `tokenPull(colors, name?, label?)` | `PenpotColor[]`                    | `ThemePreset`   |

## Development

```bash
# Type-check
deno check packages/penpot-plugin/src/index.ts

# Lint
deno lint packages/penpot-plugin/src
```
