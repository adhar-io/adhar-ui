# @adhar-ui/icons

SVG icon registry for the Adhar UI design system. Ships with 17 essential Lucide-compatible icons and supports custom icon registration.

## Usage

```ts
import { getIcon, registerIcon, renderIconSvg } from '@adhar-ui/icons';

// Render a built-in icon
const searchIcon = getIcon('search');
const svg = renderIconSvg(searchIcon!, { size: 20, color: 'currentColor' });

// Register a custom icon
registerIcon({ name: 'custom', svg: '<path d="..."/>', keywords: ['custom'] });
```

## Built-in Icons (17)

x, check, chevron-down, chevron-up, chevron-left, chevron-right, search, menu, sun, moon, loader, alert-circle, info, copy, send, thumbs-up, thumbs-down
