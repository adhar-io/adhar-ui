/**
 * Dialog accessibility specification.
 * Follows WAI-ARIA Dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export const dialogA11y = {
  role: 'dialog',
  keyboard: {
    Escape: 'Close the dialog',
    Tab: 'Move focus to next element within the dialog (trapped)',
    'Shift+Tab': 'Move focus to previous element within the dialog (trapped)',
  },
  ariaAttributes: {
    'aria-modal': 'Set to true — prevents interaction with content behind the dialog',
    'aria-labelledby': 'References the dialog title element',
    'aria-describedby': 'References the dialog description element',
  },
  focusManagement: {
    onOpen: 'Focus moves to first focusable element inside the dialog',
    onClose: 'Focus returns to the element that triggered the dialog',
    focusTrap: 'Tab key is trapped within dialog boundaries',
  },
  notes: [
    'Overlay (backdrop) should close dialog on click.',
    'Content behind dialog must have aria-hidden="true" and inert.',
    'Dialog should be a direct child of body for proper stacking.',
    'Use AlertDialog for destructive confirmations that require explicit user action.',
  ],
} as const;
