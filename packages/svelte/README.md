# @adhar-ui/svelte

Svelte components for the Adhar UI design system, compiled from the Mitosis sources in `@adhar-ui/primitives` as Svelte components (`export let` props, `on:` events — Svelte 4 syntax, which Svelte 5 runs in legacy mode).

## Usage

The components ship as source under `@adhar-ui/svelte/components/<name>/`. Import them directly; your bundler (e.g. Vite) compiles them along with the `.styles.ts` files they import.

```svelte
<script lang="ts">
  import Button from '@adhar-ui/svelte/components/button/Button.svelte';
</script>

<Button variant="outline" size="sm">Click me</Button>
```

Components apply their own Tailwind classes; pass `className` to extend or override them. Your Tailwind config must scan this package so the classes are generated.

CVA style variants and utilities are also exported from the package root:

```ts
import { buttonVariants, cn } from '@adhar-ui/svelte';
```
