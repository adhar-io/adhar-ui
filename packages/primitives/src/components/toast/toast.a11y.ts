/**
 * Toast accessibility specification.
 * Follows WAI-ARIA Alert pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
 */
export const toastA11y = {
  role: 'status',
  liveRegion: {
    'aria-live': 'polite — non-urgent notifications (default, success, info)',
    'aria-live-assertive': 'Use "assertive" for error/destructive toasts',
    'aria-atomic': 'true — entire toast is announced as a whole',
  },
  keyboard: {
    Escape: 'Dismiss the toast (when focused)',
    Tab: 'Focus the toast action button (if present)',
  },
  ariaAttributes: {
    role: '"status" for informational, "alert" for errors/warnings',
    'aria-label': 'Describes the toast for screen readers',
  },
  timing: {
    autoClose: 'Minimum 5 seconds for toasts with text content (WCAG 2.2.1)',
    pauseOnHover: 'Timer pauses when mouse enters the toast',
    pauseOnFocus: 'Timer pauses when toast receives focus',
  },
  notes: [
    'Toasts must not contain critical information that requires action — use AlertDialog.',
    'Auto-dismissing toasts must be pausable.',
    'Screen readers announce new toasts via aria-live region.',
    'Action buttons in toasts must be keyboard accessible.',
    'Maximum 3 toasts visible at once to avoid cognitive overload.',
  ],
} as const;
