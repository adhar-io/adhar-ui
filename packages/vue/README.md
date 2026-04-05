# @adhar-ui/vue

Vue 3 components for the Adhar UI design system. Compiled from Mitosis sources as SFC components with Composition API and `defineComponent`.

## Usage

Generated Vue components are in `src/generated/`. Import them directly:

```vue
<script setup lang="ts">
import Button from '@adhar-ui/vue/generated/src/components/button/Button.lite.tsx'
</script>

<template>
  <Button class-name="bg-primary text-primary-foreground">Click me</Button>
</template>
```

CVA style variants and utilities are also available:

```ts
import { buttonVariants, cn } from '@adhar-ui/vue';
```
