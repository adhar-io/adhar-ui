# @adhar-ui/vue

Vue 3 components for the Adhar UI design system, compiled from the Mitosis sources in `@adhar-ui/primitives` as Vue SFCs (Options API with `defineComponent`).

## Usage

The components ship as source under `@adhar-ui/vue/components/<name>/`. Import them directly; your bundler (e.g. Vite) compiles them along with the `.styles.ts` files they import.

```vue
<script setup lang="ts">
import Button from '@adhar-ui/vue/components/button/Button.vue';
</script>

<template>
  <Button variant="outline" size="sm">Click me</Button>
</template>
```

Components apply their own Tailwind classes; pass `className` to extend or override them. Your Tailwind config must scan this package so the classes are generated.

CVA style variants and utilities are also exported from the package root:

```ts
import { buttonVariants, cn } from '@adhar-ui/vue';
```
