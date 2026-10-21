/**
 * Slider accessibility specification.
 * Built on a native <input type="range">, which provides the full
 * WAI-ARIA Slider pattern (pointer, touch, and keyboard) natively:
 * https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export const sliderA11y = {
  role: 'slider (native to input[type=range])',
  keyboard: {
    'ArrowRight / ArrowUp': 'Increase value by one step',
    'ArrowLeft / ArrowDown': 'Decrease value by one step',
    'PageUp': 'Increase by a larger step',
    'PageDown': 'Decrease by a larger step',
    'Home': 'Set to minimum value',
    'End': 'Set to maximum value',
  },
  ariaAttributes: {
    'aria-label / aria-labelledby': 'Names the slider — required when there is no visible <label>',
    'aria-valuetext':
      'Provide a human-friendly value ("$40", "Medium") when the raw number is not meaningful',
    'aria-orientation': 'Reflects horizontal (default) or vertical layout',
    'aria-valuemin/max/now': 'Managed automatically by the native range input',
  },
  notes: [
    'Prefer the native range input — it is fully accessible and works without JS.',
    'Always give the slider an accessible name via <label htmlFor> or aria-label.',
    'Use aria-valuetext whenever the numeric value alone is ambiguous.',
    'Ensure the thumb has a visible focus indicator (provided via focus-visible ring).',
    'Keep the interactive target at least 44px on touch devices.',
  ],
} as const;
