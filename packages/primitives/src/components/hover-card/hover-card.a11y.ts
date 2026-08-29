/**
 * Hover Card accessibility specification.
 * A rich preview shown on hover OR keyboard focus of a trigger.
 */
export const hoverCardA11y = {
  role: 'tooltip-like preview (non-essential, supplementary content)',
  interaction: {
    hover: 'Opens on pointer hover of the trigger (group-hover)',
    focus: 'Also opens on keyboard focus of the trigger (group-focus-within) — never hover-only',
  },
  ariaAttributes: {
    'role="tooltip"': 'On the content',
    'aria-describedby': 'Links the trigger to the content id',
    'tabindex="0"': 'Makes the trigger focusable for keyboard users',
  },
  motionPreferences: {
    reducedMotion: 'The fade/slide is disabled via motion-reduce:transition-none',
  },
  notes: [
    'Never put essential or interactive-only content in a hover card — it must be reachable another way.',
    'Open on focus as well as hover so keyboard users can see it (handled by group-focus-within).',
    'Keep a small delay/gap tolerant hit area so the card is easy to reach.',
    'Content is supplementary; the trigger must make sense on its own.',
  ],
} as const;
