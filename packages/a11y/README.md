# @adhar-ui/a11y

Accessibility primitives for the Adhar UI design system. Framework-agnostic utilities for building WCAG 2.1 AA compliant components.

## Usage

```ts
import { announce, createFocusTrap, createRovingTabIndex } from '@adhar-ui/a11y';

// Focus trap for dialogs/modals
const release = createFocusTrap({
  container: dialogElement,
  autoFocus: true,
});
// later: release()

// Screen reader announcements
announce('Item added to cart'); // polite
announce('Error: Required field', 'assertive'); // interrupts

// Keyboard navigation for tab lists, toolbars
const cleanup = createRovingTabIndex({
  container: tabListElement,
  itemSelector: '[role="tab"]',
  orientation: 'horizontal',
});
```

## Exports

- `createFocusTrap(options)` - Trap focus within a container (modals, dialogs)
- `announce(message, politeness)` - Announce to screen readers via live regions
- `createRovingTabIndex(options)` - Arrow key navigation for composite widgets
- `visuallyHiddenStyles` - CSS object for sr-only content
- `createSkipNavLink(config)` - Skip-to-content navigation link
- `skipNavClasses` - Tailwind classes for skip nav styling
