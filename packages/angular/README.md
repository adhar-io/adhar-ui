# @adhar-ui/angular

Angular components for the Adhar UI design system, compiled from the Mitosis sources in `@adhar-ui/primitives` as standalone Angular components with `adhar-` selectors.

## Usage

The components ship as source under `@adhar-ui/angular/components/<name>/`. Import them directly; your bundler (e.g. Vite) compiles them along with the `.styles.ts` files they import.

```ts
import Button from '@adhar-ui/angular/components/button/Button.ts';

@Component({
  standalone: true,
  imports: [Button],
  template: `<adhar-button variant="outline" size="sm">Click me</adhar-button>`,
})
export class Toolbar {}
```

Components apply their own Tailwind classes; pass `className` to extend or override them. Your Tailwind config must scan this package so the classes are generated.

CVA style variants and utilities are also exported from the package root:

```ts
import { buttonVariants, cn } from '@adhar-ui/angular';
```
