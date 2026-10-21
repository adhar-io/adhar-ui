/**
 * Radio Group accessibility specification.
 * Follows the WAI-ARIA Radio Group pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
 */
export const radioGroupA11y = {
  role: 'radiogroup (container) + radio (items)',
  keyboard: {
    Tab: 'Move focus into the group (lands on the checked radio, or the first if none checked)',
    'Space': 'Select the focused radio',
    'ArrowDown / ArrowRight': 'Move to and select the next radio (wraps to first)',
    'ArrowUp / ArrowLeft': 'Move to and select the previous radio (wraps to last)',
  },
  ariaAttributes: {
    'role="radiogroup"': 'Set on the container that wraps the radio items',
    'aria-label / aria-labelledby':
      'Names the group — required when there is no visible group label',
    'aria-orientation': 'Reflects horizontal/vertical layout for assistive tech',
    'aria-required': 'Set when a selection is mandatory',
    'role="radio"': 'Set on each item',
    'aria-checked': 'Reflects the selected state of each radio (only one true per group)',
  },
  focusManagement: {
    rovingTabIndex:
      'Only the checked (or first) radio is in the tab order; arrow keys move focus between items. Use createRovingTabIndex from @adhar-ui/a11y at the group level.',
    focusVisible: 'Visible ring via focus-visible:ring-2 focus-visible:ring-ring',
  },
  notes: [
    'Exactly one radio in a group may be checked at a time.',
    'Selecting a radio with arrow keys should also move focus to it (single-tab-stop pattern).',
    'Each radio needs an accessible name — pair with a <Label> or use aria-label.',
    'Group the radios under a <fieldset> with <legend>, or a container labelled via aria-labelledby.',
    'Disabled items remain discoverable; the whole group can be disabled via aria-disabled.',
  ],
} as const;
