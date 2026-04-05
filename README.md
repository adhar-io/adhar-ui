<h1 align="center">Adhar UI</h1>

<p align="center">
  <strong>The open, framework-agnostic design system.</strong><br/>
  <sub>Own your components. Ship to any framework. Sync with your design tools.</sub>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/license-Apache%202.0-orange?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vue-3-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/Solid-1.9-2C4F7C?style=flat-square&logo=solid&logoColor=white" alt="Solid" />
  <img src="https://img.shields.io/badge/Svelte-5-FF3E00?style=flat-square&logo=svelte&logoColor=white" alt="Svelte" />
  <img src="https://img.shields.io/badge/Angular-19-DD0031?style=flat-square&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Figma-plugin-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma" />
  <img src="https://img.shields.io/badge/Penpot-plugin-63E6BE?style=flat-square&logo=penpot&logoColor=black" alt="Penpot" />
</p>

---

## What is Adhar UI?

Adhar UI is a design system where **you own every line of code**. Components are copied into your project -- not installed from npm. You can read, modify, and extend them without fighting an upstream package.

It works with **React, Vue, Solid, Svelte, and Angular**. Components are authored once in [Mitosis](https://github.com/BuilderIO/mitosis) and compiled to native code for each framework -- not wrappers, real idiomatic output.

It includes everything you need, plus enterprise components (Data Table, Kanban Board, Form Builder, Tree View, etc.) and AI components (Chat, Streaming Text, Code Block, Prompt Input, etc.) that you'd otherwise have to build yourself.

Design tokens sync bidirectionally with **Figma** and **Penpot** via the W3C DTCG standard. A designer changes a color in Figma, your code gets a PR. You change a token in code, the design tool updates.

---

## Getting Started

### Prerequisites

You need one of these runtimes and a project using React, Vue, Solid, Svelte, or Angular with Tailwind CSS v4:

| Runtime                    | Minimum Version |
| -------------------------- | --------------- |
| [Deno](https://deno.land)  | 2.x             |
| [Node](https://nodejs.org) | 20+             |
| [Bun](https://bun.sh)      | 1.x             |

### Step 1: Initialize your project

```bash
deno run -A jsr:@adhar-ui/cli init       # Deno
npx @adhar-ui/cli init                   # Node
bunx @adhar-ui/cli init                  # Bun
```

The CLI will:

- Detect your framework (React, Vue, Solid, Svelte, Angular) and meta-framework (Next.js, Remix, Nuxt, Astro, SvelteKit, Vite)
- Detect your package manager (npm, yarn, pnpm, bun, deno)
- Create `adhar-ui.json` -- the config file that controls where components go
- Generate `src/lib/utils.ts` with the `cn()` class merging utility
- Generate `src/globals.css` with theme CSS variables (light + dark mode)
- Install `clsx`, `tailwind-merge`, and `class-variance-authority`

After init, your project looks like this:

```
your-project/
  adhar-ui.json            # Adhar UI configuration
  src/
    lib/utils.ts           # cn() utility
    globals.css            # Theme CSS variables
```

### Step 2: Add components

```bash
deno run -A jsr:@adhar-ui/cli add button card dialog     # Deno
npx @adhar-ui/cli add button card dialog                  # Node
bunx @adhar-ui/cli add button card dialog                 # Bun
```

Add as many as you need in one command:

```bash
# Core UI
adhar-ui add button card input dialog tabs accordion badge avatar

# Enterprise
adhar-ui add data-table list-view grid-view detail-view kanban-board timeline stepper

# AI
adhar-ui add chat code-block prompt-input streaming-text feedback-buttons

# Pre-composed page blocks
adhar-ui add block-login block-dashboard-overview block-settings-page block-pricing

# Everything
adhar-ui add --all
```

Dependencies resolve automatically. Adding `data-table` also installs `table`, `button`, `input`, `dropdown-menu`, `select`, `checkbox`, and `badge`.

After adding components, your project looks like this:

```
your-project/
  adhar-ui.json
  src/
    lib/utils.ts
    globals.css
    components/
      ui/
        button.tsx         # Full source -- yours to customize
        card.tsx
        dialog.tsx
        data-table.tsx
        chat.tsx
        block-login.tsx
        ...
```

### Step 3: Use components

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-3'>
        <Button>Primary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='destructive' size='sm'>Delete</Button>
      </CardContent>
    </Card>
  );
}
```

Every component supports the `className` prop and uses `cn()` for Tailwind class merging with conflict resolution. Variants are managed via [CVA](https://cva.style) (Class Variance Authority).

### Step 4: Customize

Since you own the source, customization is just editing the file:

```tsx
// src/components/ui/button.tsx -- this is YOUR file, change anything

const buttonVariants = cva('...base classes...', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      // Add your own:
      brand: 'bg-indigo-600 text-white hover:bg-indigo-700',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      // Add your own:
      xl: 'h-14 rounded-lg px-12 text-lg',
    },
  },
});
```

---

## Theming

### Switch theme presets

```bash
adhar-ui theme zinc      # Neutral gray (default)
adhar-ui theme slate     # Cool blue-gray
adhar-ui theme blue      # Vibrant blue
adhar-ui theme green     # Nature green
```

### Create your own theme

```bash
adhar-ui theme create my-brand
```

This generates `adhar-ui.theme.ts`:

```ts
import { defineTheme } from '@adhar-ui/tokens';

export default defineTheme({
  name: 'my-brand',
  extends: 'zinc',
  light: {
    colors: {
      primary: { DEFAULT: '220 70% 50%', foreground: '0 0% 100%' },
    },
    radius: '0.75rem',
  },
  dark: {
    colors: {
      primary: { DEFAULT: '220 70% 60%', foreground: '0 0% 100%' },
    },
    radius: '0.75rem',
  },
});
```

### How theming works

All colors are CSS custom properties using HSL values. This enables alpha composition in Tailwind (`bg-primary/50`) and runtime theme switching:

```css
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --destructive: 0 84.2% 60.2%;
  --radius: 0.5rem;
  /* 29 semantic tokens total */
}
.dark {
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  /* overrides for dark mode */
}
```

Dark mode is class-based. Add `class="dark"` to your root element. Works with `next-themes`, `vueuse`, or any toggle library.

---

## Design Tool Integration (Figma & Penpot)

### Generate a design kit

One command creates a complete importable design system:

```bash
deno run -A jsr:@adhar-ui/cli design-generate     # Deno
npx @adhar-ui/cli design-generate                  # Node
bunx @adhar-ui/cli design-generate                 # Bun
```

This outputs a `design-kit/` directory with SVG component frames, color swatches (light + dark), typography scale, spacing scale, a Penpot manifest, and W3C DTCG token file. Import into Penpot as a shared library or into Figma as frames.

### Sync tokens between code and design tools

```bash
# Export tokens as W3C DTCG JSON
adhar-ui design-export dtcg

# Push tokens to Figma or Penpot
adhar-ui design-sync push --target=figma
adhar-ui design-sync push --target=penpot

# Pull tokens from design tool back to code
adhar-ui design-sync pull --source=figma
adhar-ui design-sync pull --source=penpot
```

### Automated sync with webhooks

Run the sync server. When a designer changes a color in Figma, the server receives a webhook, converts the change via DTCG, and opens a PR:

```bash
deno run -A packages/sync-server/src/index.ts
```

See the individual package READMEs for detailed setup:
[dtcg](packages/dtcg/README.md) | [design-sync](packages/design-sync/README.md) | [figma-plugin](packages/figma-plugin/README.md) | [penpot-plugin](packages/penpot-plugin/README.md) | [sync-server](packages/sync-server/README.md) | [code-connect](packages/code-connect/README.md)

---

## CLI Reference

All commands work with Deno, Node.js, and Bun. Use `deno run -A jsr:@adhar-ui/cli`, `npx @adhar-ui/cli`, or `bunx @adhar-ui/cli`.

### Project setup

```bash
adhar-ui init                    # Initialize project
adhar-ui init --force            # Re-initialize (overwrite config)
adhar-ui doctor                  # Check project health (10 checks)
```

### Components

```bash
adhar-ui add button card dialog  # Add specific components
adhar-ui add --all               # Add everything
adhar-ui add --overwrite         # Overwrite existing files
adhar-ui list                    # List all available components
adhar-ui list --category=ai      # Filter by category
adhar-ui list --tier=3           # Filter by tier
adhar-ui list --json             # JSON output
adhar-ui diff                    # Compare local vs registry
```

### Theming

```bash
adhar-ui theme                   # List available presets
adhar-ui theme blue              # Apply a preset
adhar-ui theme create my-brand   # Scaffold custom theme
```

### Design tools

```bash
adhar-ui design-generate         # Generate design kit (SVG + Penpot manifest)
adhar-ui design-export dtcg      # Export tokens as W3C DTCG JSON
adhar-ui design-sync push        # Push tokens to Figma/Penpot
adhar-ui design-sync pull        # Pull tokens from Figma/Penpot
adhar-ui design-sync status      # Show sync state
```

---

## Components

### Core Primitives

Everything in shadcn/ui, with the same API and conventions:

**Form:** Button, Input, Textarea, Label, Checkbox, Radio Group, Switch, Select, Slider, Toggle, Toggle Group

**Display:** Badge, Avatar, Separator, Skeleton, Progress, Spinner, Aspect Ratio

**Layout:** Card, Scroll Area, Collapsible, Resizable

**Feedback:** Alert, Alert Dialog, Toast (Sonner)

**Overlay:** Dialog, Sheet, Tooltip, Popover, Hover Card, Drawer

**Navigation:** Tabs, Accordion, Dropdown Menu, Context Menu, Menubar, Navigation Menu, Breadcrumb, Pagination, Sidebar

**Composite:** Command (Cmd+K), Combobox, Date Picker, Calendar, Color Picker, Form (react-hook-form + zod), Input OTP, Table, Carousel, Chart (recharts)

### Enterprise

Components for business applications that shadcn/ui doesn't include:

**Data Views:** Data Table, Data Grid, List View, Grid View, Detail View, Master Detail, Property List, Description List

**Workflow:** Kanban Board, Timeline, Tree View, Stepper, Sortable List

**Forms:** Form Builder, File Upload, Rich Text Editor, Multi Select, Tag Input, Transfer List

**Navigation:** Command Bar (Cmd+K), Notification Center

**Display:** Empty State, Stat Card, Kbd, Copy Button

**Performance:** Infinite Scroll, Virtualized List

### AI

Components for AI-powered interfaces:

Chat, Prompt Input, Streaming Text, Code Block, Model Selector, Token Counter, Thinking Indicator, Feedback Buttons, Suggestion Chips, Message Bubble

### Blocks

Pre-composed page sections that combine base components. Add them the same way:

```bash
adhar-ui add block-login block-dashboard-overview block-pricing block-chat-page
```

**Auth:** Login, Sign Up, Forgot Password, OTP Verification

**Dashboard:** Stats Row, Chart Card, Activity Feed, Dashboard Overview

**Marketing:** Hero, Features Grid, Pricing Table, Testimonials, CTA Banner, FAQ

**Navigation:** Header/Navbar, Sidebar Layout, Footer, Command Menu

**Settings:** Profile, Account, Notifications, Billing, Settings Page (tabbed)

**Data Pages:** Table Page, Detail Page, List+Filter Page, Kanban Page

**E-commerce:** Product Card, Product Grid, Shopping Cart, Checkout

**AI:** Chat Page (with conversation sidebar), AI Playground (split-pane)

**Error:** 404, 500, Maintenance

---

## Architecture

Components are authored in [Mitosis](https://github.com/BuilderIO/mitosis) and compiled to native framework code:

```
Mitosis Source (.lite.tsx)
    +-- React     (JSX + useState + forwardRef)
    +-- Vue 3     (SFC + Composition API)
    +-- SolidJS   (JSX + createSignal)
    +-- Svelte    (SFC + export let)
    +-- Angular   (Standalone + @Input)
```

Each component follows this convention:

```
packages/primitives/src/components/<name>/
  <Name>.lite.tsx       # Mitosis source
  <name>.styles.ts      # CVA variants (Tailwind classes)
  <name>.types.ts       # TypeScript interfaces
  <name>.a11y.ts        # Accessibility spec
```

---

## Project Structure

```
adhar-ui/
  deno.json                    # Workspace root
  packages/
    tokens/                    # Design tokens
    tailwind-preset/           # Tailwind CSS v4 preset
    utils/                     # cn(), responsive helpers
    a11y/                      # Accessibility primitives
    icons/                     # SVG icon registry
    primitives/                # Mitosis sources + CVA
    react/ vue/ solid/         # Compiled framework outputs
    svelte/ angular/
    cli/                       # CLI tool
    registry/                  # Component registry
    dtcg/                      # W3C DTCG converter
    design-sync/               # Sync engine + design kit generator
    figma-plugin/              # Figma plugin
    penpot-plugin/             # Penpot plugin
    sync-server/               # Webhook handler
    code-connect/              # Figma Code Connect
  apps/
    docs/                      # Documentation site
    playground/                # Interactive demos
    storybook/                 # Storybook stories
```

---

## Development

```bash
git clone https://github.com/adhar-io/adhar-ui.git && cd adhar-ui

deno task check              # Type-check all packages
deno task lint               # Lint
deno task fmt                # Format
deno test --allow-read --allow-env --allow-net   # Run 109 tests
deno task cli --help         # Run CLI locally
deno task docs:dev           # Start docs site
deno task playground:dev     # Start playground
deno task build:primitives   # Compile Mitosis to 5 frameworks
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full development guide and component checklist.

---

## Configuration

### `adhar-ui.json`

```json
{
  "framework": "react",
  "typescript": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "utils": "@/lib/utils"
  },
  "design": {
    "figma": { "fileKey": "...", "variableCollectionName": "Adhar UI" },
    "penpot": { "instanceUrl": "https://design.penpot.app", "fileId": "..." },
    "syncMode": "manual",
    "conflictStrategy": "prompt"
  }
}
```

### Framework detection

The CLI auto-detects from `package.json`: React, Vue, Angular, Solid, Svelte. Meta-frameworks (Next.js, Remix, Nuxt, Astro, SvelteKit) are also detected for path resolution.

---

## Technology Stack

|                       |                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| **Runtime**           | [Deno](https://deno.land) 2.6+                                                                       |
| **Compiler**          | [Mitosis](https://github.com/BuilderIO/mitosis) 0.13                                                 |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com) v4 + CSS custom properties                                   |
| **Variants**          | [CVA](https://cva.style) 0.7.1                                                                       |
| **Class merging**     | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) |
| **Token standard**    | [W3C DTCG](https://www.designtokens.org/) v1                                                         |
| **Design tools**      | [Figma](https://figma.com) + [Penpot](https://penpot.app)                                            |
| **Dev server**        | [Vite](https://vitejs.dev) 8.x                                                                       |
| **Primary framework** | [React](https://react.dev) 19.2                                                                      |

---

## License

Apache License 2.0

---

<p align="center">
  <strong>Adhar UI</strong> &mdash; Part of the <a href="https://adhar.io">Adhar Platform</a>
</p>
