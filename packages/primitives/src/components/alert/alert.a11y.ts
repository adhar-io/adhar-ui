/**
 * Alert accessibility specification.
 * Follows WAI-ARIA Alert pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const alertA11y = {
  role: 'alert',
  liveRegion: {
    'aria-live': '"assertive" for errors/warnings, "polite" for info/success',
    'aria-atomic': 'true — entire alert announced as a unit',
  },
  ariaAttributes: {
    role: '"alert" for urgent messages, "status" for informational',
    'aria-labelledby': 'References the alert title',
    'aria-describedby': 'References the alert description',
  },
  keyboard: {
    Tab: 'Focus action links or dismiss button within the alert',
  },
  notes: [
    'Alerts are not dismissible by default — use Toast for dismissible notifications.',
    'role="alert" triggers immediate screen reader announcement.',
    'Icons should have aria-hidden="true" — the text conveys meaning.',
    'Destructive alerts should use distinct border and background colors for color-blind users.',
  ],
} as const;
