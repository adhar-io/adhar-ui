# @adhar-ui/cli

CLI tool for the Adhar UI design system. Components are copied to your project (shadcn-style), not installed from npm.

## Installation

```bash
# Run directly with Deno (no install needed)
deno run -A jsr:@adhar-ui/cli <command>

# Or from the monorepo
deno task cli <command>
```

## Commands

| Command               | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `init`                | Initialize project (detect framework, create config, install deps) |
| `add <components...>` | Add components to your project                                     |
| `add --all`           | Add all 91 components + 36 blocks                                  |
| `list`                | List available components                                          |
| `list --category=ai`  | Filter by category                                                 |
| `list --tier=3`       | Filter by tier                                                     |
| `diff`                | Compare local components with registry                             |
| `theme`               | List available themes                                              |
| `theme <preset>`      | Apply a theme preset (zinc, slate, blue, green)                    |
| `theme create <name>` | Scaffold a custom theme file                                       |
| `doctor`              | Validate project setup (10 health checks)                          |

## Framework Detection

Auto-detects from `package.json`:

- **UI Framework**: React, Vue, Angular, Solid, Svelte
- **Meta-framework**: Next.js, Remix, Nuxt, Astro, SvelteKit, Analog, Vite
- **Package Manager**: npm, yarn, pnpm, bun, deno
- **TypeScript**: via tsconfig.json
- **Tailwind**: v4

## Configuration

`adhar-ui.json` created by `init`:

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
  "aliases": { "components": "@/components", "ui": "@/components/ui", "utils": "@/lib/utils" }
}
```
