# @adhar-ui/tailwind-preset

Tailwind CSS v4 preset for the Adhar UI design system. Drop-in compatible with the existing CSS variable schema. Provides semantic color mapping, responsive breakpoints, fluid typography, container queries, and dark mode.

## Usage

```ts
// tailwind.config.ts
import { adharUIPreset } from '@adhar-ui/tailwind-preset';

export default {
  presets: [adharUIPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

## What It Provides

- **Semantic colors**: `bg-primary`, `text-muted-foreground`, `border-input` etc. mapped to CSS variables
- **Dark mode**: Class-based (`class="dark"`)
- **Breakpoints**: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Container queries**: Responsive to container, not just viewport
- **Fluid typography**: `text-fluid-sm` through `text-fluid-4xl` using `clamp()`
- **Touch targets**: `min-h-touch` / `min-w-touch` (44px) for mobile accessibility
- **Safe area insets**: `p-safe-top`, `p-safe-bottom` for notched devices
- **Border radius scale**: `rounded-sm` through `rounded-xl` based on `--radius` variable
- **Animations**: accordion, fade, slide, scale, spin, pulse, typing keyframes
