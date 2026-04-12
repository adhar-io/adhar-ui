/**
 * Card accessibility specification.
 */
export const cardA11y = {
  role: 'article',
  ariaAttributes: {
    role: '"article" for content cards in feeds, omit for layout containers',
    'aria-labelledby': 'References CardTitle for card identification',
    'aria-describedby': 'References CardDescription for card summary',
  },
  keyboard: {
    Tab: 'Focus interactive elements within the card (buttons, links)',
    Enter: 'Activate the card if it is interactive (clickable)',
  },
  interactive: {
    clickable: 'Use role="button" tabindex="0" and keyboard handlers when entire card is clickable',
    focusRing: 'focus-visible:ring-2 on interactive cards',
  },
  notes: [
    'Non-interactive cards need no role or tabindex.',
    'Interactive cards must have keyboard support (Enter/Space to activate).',
    'Card content order should make semantic sense for screen readers.',
    'Images in cards need alt text or aria-hidden="true" if decorative.',
    'Card actions (footer buttons) should be individually focusable.',
  ],
} as const;
