/**
 * Badge accessibility specification.
 */
export const badgeA11y = {
  role: 'status',
  ariaAttributes: {
    'aria-label': 'Describes the badge meaning when used as a standalone indicator',
    role: '"status" for dynamic counters (e.g. "3 unread"), omit for static labels',
  },
  notes: [
    'Badges are typically decorative — screen readers get context from surrounding text.',
    'Notification count badges need aria-label: "3 unread messages".',
    'Color alone must not convey meaning — pair with text or icons.',
    'Interactive badges (clickable) should use role="button".',
    'Badge inside a button is announced as part of the button label.',
  ],
} as const;
