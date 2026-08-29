/**
 * Scroll Area accessibility specification.
 * A themed overflow-scroll container.
 */
export const scrollAreaA11y = {
  role: 'scrollable region',
  keyboard: {
    'Arrow keys / PageUp / PageDown': 'Scroll when the region is focused (set focusable)',
    Tab: 'Focus the region when focusable is enabled',
  },
  ariaAttributes: {
    'role="region"': 'Applied when focusable, so AT announces a scrollable area',
    'aria-label': 'Name the region when it is focusable',
    'tabindex="0"': 'Lets keyboard-only users scroll content with no focusable children',
  },
  notes: [
    'If a scroll container has no focusable children, make it focusable so keyboard users can scroll it.',
    'Keep scrollbars visible enough to signal overflow; the thumb uses token colors.',
    'Do not trap focus; the region should scroll, not capture Tab.',
    'Respect prefers-reduced-motion for any scroll-linked animation.',
  ],
} as const;
