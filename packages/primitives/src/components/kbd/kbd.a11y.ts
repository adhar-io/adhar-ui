/**
 * Kbd (keyboard key) accessibility specification.
 * Represents user keyboard input using the semantic <kbd> element.
 */
export const kbdA11y = {
  role: 'native <kbd> element',
  ariaAttributes: {
    'aria-label':
      'Provide a spoken name when the visible glyph is a symbol (⌘ → "Command", ⇧ → "Shift", ↵ → "Enter")',
  },
  notes: [
    'Use the semantic <kbd> element so the content is announced as keyboard input.',
    'Symbol-only keys (⌘, ⌥, ⇧, ↵) should carry an aria-label with the spoken name.',
    'For a shortcut, wrap each key in its own <Kbd> and separate with a "+" so the sequence is clear.',
    'Kbd is decorative styling around real text — never rely on color alone to convey meaning.',
    'Keep contrast AA-compliant; the muted foreground on muted background is tuned for this.',
  ],
} as const;
