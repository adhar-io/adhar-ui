/**
 * Input OTP accessibility specification.
 * A one-time-code entry field built on a single native <input>.
 */
export const inputOTPA11y = {
  role: 'textbox tuned for one-time codes',
  ariaAttributes: {
    'autocomplete="one-time-code"': 'Enables OS/browser autofill of SMS codes',
    'inputmode="numeric"': 'Shows the numeric keypad on touch devices for digit codes',
    'aria-label': 'Names the field ("One-time code") when there is no visible label',
    'aria-invalid': 'Set when the entered code is wrong — turns the border destructive',
    'aria-describedby': 'Links to help/error text (e.g. "We sent a code to …")',
  },
  keyboard: {
    'Type / paste': 'Native — supports paste of the full code and per-digit typing',
    Backspace: 'Deletes the last character natively',
  },
  notes: [
    'Built on one real <input>, so paste, autofill, and mobile OTP suggestions all work.',
    'Always associate a label or aria-label; do not rely on placeholder alone.',
    'Announce delivery + errors via aria-describedby / a live region.',
    'For digit-only codes keep inputmode="numeric"; use "text" for alphanumeric codes.',
    'onComplete lets you auto-submit when the final digit is entered.',
  ],
} as const;
