# @adhar-ui/code-connect

Figma Code Connect mapping generator for Adhar UI components. Auto-generates `.figma.ts` files that link Figma component instances to their Adhar UI code equivalents, enabling code snippets in Figma Dev Mode.

## What is Code Connect?

[Figma Code Connect](https://developers.figma.com/docs/code-connect/) is a feature that links design components to their code implementations. When a developer selects a component in Figma Dev Mode, they see the actual code instead of auto-generated CSS.

This package auto-generates Code Connect files for all 91 Adhar UI components across 5 frameworks.

## Architecture

```
packages/code-connect/
  src/
    index.ts                 # Public API exports
    generator.ts             # Auto-generates .figma.ts from registry + CVA
  (generated output)
    components/
      button.figma.ts        # Maps Figma Button → <Button variant="..." />
      card.figma.ts
      badge.figma.ts
      ...
```

## Getting Started

### Step 1: Generate Code Connect files

```ts
import { generateCodeConnect } from '@adhar-ui/code-connect';
import { componentIndex } from '@adhar-ui/registry';

// Generate for React (default)
const files = generateCodeConnect(componentIndex, 'react', 'YOUR_FIGMA_FILE_KEY');

// Each file has: { path, content, componentName }
for (const file of files) {
  console.log(`Generated: ${file.path}`);
  // Write to disk
  await Deno.writeTextFile(file.path, file.content);
}
```

### Step 2: Generate for a single component with CVA variants

```ts
import { generateComponentConnect } from '@adhar-ui/code-connect';

const file = generateComponentConnect(
  { name: 'button', title: 'Button' },
  'react',
  'YOUR_FILE_KEY',
  {
    variants: {
      variant: {
        default: '...',
        destructive: '...',
        outline: '...',
        secondary: '...',
        ghost: '...',
        link: '...',
      },
      size: { sm: '...', default: '...', lg: '...', icon: '...' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

console.log(file.content);
```

Output:

```ts
import figma from '@figma/code-connect';

figma.connect(
  'https://figma.com/file/YOUR_FILE_KEY?node-id=BUTTON_NODE_ID',
  {
    props: {
      variant: figma.enum('Variant', {
        Default: 'default',
        Destructive: 'destructive',
        Outline: 'outline',
        Secondary: 'secondary',
        Ghost: 'ghost',
        Link: 'link',
      }),
      size: figma.enum('Size', {
        Sm: 'sm',
        Default: 'default',
        Lg: 'lg',
        Icon: 'icon',
      }),
      children: figma.children('Content'),
    },
    example: ({ variant, size, children }) =>
      `<Button variant="${variant}" size="${size}">${children}</Button>`,
  },
);
```

### Step 3: Generate for different frameworks

```ts
// Vue
const vueFiles = generateCodeConnect(components, 'vue', 'FILE_KEY');
// Generates: <Button variant="${variant}" size="${size}">${children}</Button>

// Angular
const angularFiles = generateCodeConnect(components, 'angular', 'FILE_KEY');
// Generates: <button variant="${variant}" size="${size}">${children}</button>
```

### Step 4: Use via CLI

```bash
# Scaffold Code Connect files for all components
deno task cli design-connect figma --file-key=YOUR_FILE_KEY
```

### Step 5: Push to Figma

After generating the `.figma.ts` files, use the Figma Code Connect CLI to publish them:

```bash
# Install Figma Code Connect CLI
npm install -g @figma/code-connect

# Publish all Code Connect files
figma connect publish --token YOUR_FIGMA_TOKEN
```

## How It Maps CVA Variants to Figma Properties

```
CVA Definition (code)              Figma Component (design)
─────────────────────              ────────────────────────
variants: {                        Component Properties:
  variant: {                         Variant (enum):
    default: '...',       ───→         Default
    destructive: '...',   ───→         Destructive
    outline: '...',       ───→         Outline
  },
  size: {                            Size (enum):
    sm: '...',            ───→         Sm
    default: '...',       ───→         Default
    lg: '...',            ───→         Lg
  },
}
```

## API Reference

| Function                                                                | Input            | Output              |
| ----------------------------------------------------------------------- | ---------------- | ------------------- |
| `generateCodeConnect(components, framework?, fileKey?)`                 | Component list   | `CodeConnectFile[]` |
| `generateComponentConnect(component, framework?, fileKey?, cvaConfig?)` | Single component | `CodeConnectFile`   |

## Development

```bash
# Type-check
deno check packages/code-connect/src/index.ts

# Lint
deno lint packages/code-connect/src
```
