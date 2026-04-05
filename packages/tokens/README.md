# @adhar-ui/tokens

Design tokens for the Adhar UI design system. Single source of truth for colors, spacing, typography, animations, and breakpoints.

## Usage

```ts
import { breakpoints, generateCSS, spacing, zinc } from '@adhar-ui/tokens';

// Generate CSS custom properties for a theme
const css = generateCSS(zinc);

// Access breakpoint values
console.log(breakpoints.md); // '768px'
```

## Theme Presets

| Preset  | Description                           |
| ------- | ------------------------------------- |
| `zinc`  | Default neutral gray (shadcn default) |
| `slate` | Cool blue-gray tones                  |
| `blue`  | Vibrant blue primary                  |
| `green` | Nature-inspired green                 |

## Custom Themes

```ts
import { defineTheme } from '@adhar-ui/tokens';

export default defineTheme({
  name: 'brand',
  extends: 'zinc',
  light: {
    colors: { primary: { DEFAULT: '220 70% 50%', foreground: '0 0% 100%' } },
    radius: '0.5rem',
  },
  dark: {
    colors: { primary: { DEFAULT: '220 70% 60%', foreground: '0 0% 100%' } },
    radius: '0.5rem',
  },
});
```

## Exports

- **Types**: `ThemePreset`, `ThemeColors`, `Breakpoint`, `AdharUIConfig`
- **Values**: `breakpoints`, `breakpointValues`, `spacing`, `typography`, `animation`, `keyframes`
- **Utilities**: `generateCSS()`, `defineTheme()`
- **Presets**: `zinc`, `slate`, `blue`, `green`
