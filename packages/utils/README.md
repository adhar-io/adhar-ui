# @adhar-ui/utils

Framework-agnostic utility functions for the Adhar UI design system.

## Usage

```ts
import { cn, generateId, isMobile, lockScroll } from '@adhar-ui/utils';

// Merge Tailwind classes with conflict resolution
cn('px-2 py-1', 'px-4'); // => 'py-1 px-4'
cn('text-red-500', active && 'text-blue'); // conditional

// Responsive helpers
if (isMobile()) { /* mobile layout */ }

// Lock scroll for modals
const unlock = lockScroll();
// later: unlock()

// Generate unique IDs for ARIA attributes
const id = generateId('dialog'); // => 'dialog-1'
```

## Exports

- `cn(...inputs)` - Tailwind-aware class merging (clsx + tailwind-merge)
- `getCurrentBreakpoint()` - Get current viewport breakpoint
- `isMobile()` - Check if viewport is below `md` breakpoint
- `isAtLeast(breakpoint)` - Check if viewport is at least the given breakpoint
- `minWidth(breakpoint)` / `maxWidth(breakpoint)` - Media query strings
- `getFocusableElements(container)` - Get all focusable elements
- `lockScroll()` - Lock body scroll (returns cleanup function)
- `generateId(prefix)` - Generate unique IDs for ARIA
- `isInViewport(element)` - Check element visibility
