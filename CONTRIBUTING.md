# Contributing to Adhar UI

Thank you for considering contributing to Adhar UI. This guide explains how to get started.

## Prerequisites

- [Deno](https://deno.land) >= 2.6.0
- Git

## Getting Started

```bash
# Clone
git clone https://github.com/adhar-io/adhar-ui.git
cd adhar-ui

# Type-check all packages
deno task check

# Lint
deno task lint

# Format
deno task fmt

# Run CLI locally
deno task cli --help
```

## Project Structure

```
packages/
  tokens/         # Design tokens (colors, spacing, animations)
  tailwind-preset/ # Tailwind CSS preset
  utils/          # cn(), responsive helpers, DOM utilities
  a11y/           # Accessibility primitives
  icons/          # SVG icon registry
  primitives/     # Mitosis components + CVA styles
  react/          # React compiled output
  vue/            # Vue compiled output
  solid/          # Solid compiled output
  svelte/         # Svelte compiled output
  angular/        # Angular compiled output
  cli/            # CLI tool
  registry/       # Component metadata
apps/
  docs/           # Documentation site
  playground/     # Component playground
  storybook/      # Storybook stories
```

## Development Guidelines

### Code Style

- Use Deno's built-in formatter: `deno fmt`
- Use Deno's built-in linter: `deno lint`
- TypeScript strict mode everywhere
- Single quotes, no semicolons, 2-space indent, 100 char line width
- All `.ts` imports must include the `.ts` extension (Deno requirement)

### Architecture Patterns

- **Mitosis source** - Components in `.lite.tsx` format compile to all frameworks
- **CVA variants** - All style variations defined via class-variance-authority
- **CSS variables** - Colors use HSL custom properties (`hsl(var(--primary))`)
- **forwardRef** - All React components use `React.forwardRef` for ref forwarding
- **cn()** - All className composition uses the `cn()` utility

### Adding a New Component

Follow this checklist (mirrors adhar-kit's "Adding a New Module"):

1. Create Mitosis source: `packages/primitives/src/components/<name>/<Name>.lite.tsx`
2. Create CVA styles: `packages/primitives/src/components/<name>/<name>.styles.ts`
3. Create prop types: `packages/primitives/src/components/<name>/<name>.types.ts`
4. Create a11y spec: `packages/primitives/src/components/<name>/<name>.a11y.ts`
5. Export from `packages/primitives/src/index.ts`
6. Run `deno task build:primitives` to compile to all frameworks
7. Add CLI template in `packages/cli/src/templates/tier<N>.ts`
8. Add registry entry in `packages/registry/src/component-index.ts`
9. Add Storybook story in `apps/storybook/stories/<Category>.stories.tsx`
10. Add playground demo in `apps/playground/src/demos.tsx`
11. Add docs reference in `apps/docs/src/app.tsx`

### Testing

```bash
# Type-check all packages
deno task check

# Lint all source files
deno task lint
```

### Commit Messages

Follow conventional commits:

```
feat(button): add loading state variant
fix(dialog): prevent scroll on body when open
docs(readme): add theming section
refactor(tokens): extract color generation
```

## Pull Request Process

1. Fork and create a feature branch from `main`
2. Make changes following the guidelines above
3. Ensure `deno task check` and `deno task lint` pass
4. Submit PR with description of changes

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
