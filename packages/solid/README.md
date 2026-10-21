# @adhar-ui/solid

SolidJS components for the Adhar UI design system, compiled from the Mitosis sources in `@adhar-ui/primitives` as Solid components (signals and memos).

## Usage

The components ship as source under `@adhar-ui/solid/components/<name>/`. Import them directly; your bundler (e.g. Vite) compiles them along with the `.styles.ts` files they import.

```tsx
import Button from '@adhar-ui/solid/components/button/Button.tsx';

<Button variant='outline' size='sm'>Click me</Button>
```

Components apply their own Tailwind classes; pass `className` to extend or override them. Your Tailwind config must scan this package so the classes are generated.

CVA style variants and utilities are also exported from the package root:

```ts
import { buttonVariants, cn } from '@adhar-ui/solid';
```
