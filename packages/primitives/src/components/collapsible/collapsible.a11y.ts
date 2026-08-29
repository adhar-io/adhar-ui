/**
 * Collapsible (disclosure) accessibility specification.
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 */
export const collapsibleA11y = {
  role: 'disclosure (button controlling a region)',
  keyboard: {
    'Enter / Space': 'Toggle the collapsible open/closed',
    Tab: 'Move focus to/from the trigger',
  },
  ariaAttributes: {
    'aria-expanded': 'On the trigger — reflects open/closed',
    'aria-controls': 'Points the trigger at the content region id',
    'aria-hidden': 'Set on the content when closed',
  },
  motionPreferences: {
    reducedMotion: 'The grid-rows height animation is disabled via motion-reduce:transition-none',
  },
  notes: [
    'Use a real <button> for the trigger with aria-expanded.',
    'Height animates smoothly via the grid 0fr→1fr technique — no JS measurement needed.',
    'Keep content in the DOM (hidden via aria-hidden) so in-page find still works.',
    'Pair the trigger and content with matching id / aria-controls.',
  ],
} as const;
