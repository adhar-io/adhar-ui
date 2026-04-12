/**
 * Accordion accessibility specification.
 * Follows WAI-ARIA Accordion pattern: https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 */
export const accordionA11y = {
  roles: {
    trigger: 'button — each expandable section header',
    content: 'region — the expandable content panel',
  },
  keyboard: {
    Enter: 'Toggle the focused section',
    Space: 'Toggle the focused section',
    ArrowDown: 'Move focus to next section header',
    ArrowUp: 'Move focus to previous section header',
    Home: 'Move focus to first section header',
    End: 'Move focus to last section header',
  },
  ariaAttributes: {
    'aria-expanded': 'Set on trigger — true when open, false when closed',
    'aria-controls': 'Trigger references its content panel ID',
    'aria-labelledby': 'Content panel references its trigger ID',
  },
  notes: [
    'Content panels use role="region" when visible.',
    'Animation should respect prefers-reduced-motion.',
    'Single vs multi-expand behavior should be configurable.',
    'Disabled sections should be visible but not expandable.',
  ],
} as const;
