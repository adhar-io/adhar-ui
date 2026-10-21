/**
 * Command (command palette / menu) accessibility specification.
 * Implements the WAI-ARIA Combobox + Listbox pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
 */
export const commandA11y = {
  role: 'combobox (input) controlling a listbox of options',
  keyboard: {
    'ArrowDown': 'Move highlight to the next option (wraps)',
    'ArrowUp': 'Move highlight to the previous option (wraps)',
    'Enter': 'Select the highlighted option',
    'Escape': 'Close the palette (when in a dialog)',
    Tab: 'Move focus out of the palette',
    Home: 'Highlight the first option',
    End: 'Highlight the last option',
  },
  ariaAttributes: {
    'role="combobox"': 'On the search input',
    'aria-expanded': 'true while the list is shown',
    'aria-controls': 'Points the input at the listbox id',
    'aria-autocomplete="list"': 'Announces that typing filters the list',
    'role="listbox"': 'On the results container (CommandList)',
    'role="option"': 'On each CommandItem',
    'aria-selected': 'Marks the currently highlighted option',
    'aria-activedescendant':
      'Keep on the input, pointing at the highlighted option id, so focus stays in the input',
  },
  focusManagement: {
    pattern:
      'Keep DOM focus on the input; move a visual highlight through options via aria-activedescendant rather than moving focus.',
    highlight: 'Reflect the highlighted item with aria-selected + the selected prop.',
  },
  notes: [
    'Filtering and highlight movement are controlled by the consumer — wire ArrowUp/Down and typing to your state.',
    'When rendered inside a modal, trap focus and restore it to the trigger on close.',
    'Give each option a stable id and set aria-activedescendant on the input to the highlighted id.',
    'Announce empty results with CommandEmpty so screen readers hear "No results".',
    'Group headings are decorative (aria-hidden); the group uses role="group".',
  ],
} as const;
