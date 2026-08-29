/**
 * Aspect Ratio accessibility specification.
 * A purely presentational layout wrapper.
 */
export const aspectRatioA11y = {
  role: 'presentational layout container',
  notes: [
    'Aspect Ratio only constrains dimensions — it adds no semantics.',
    'Give the media inside real alt text (<img alt>) / captions where needed.',
    'Uses the native CSS aspect-ratio property; no JS padding hacks.',
    'Do not place focusable content off-screen when the ratio clips overflow.',
  ],
} as const;
