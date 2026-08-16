import type { KbdVariants } from './kbd.styles.ts';

export interface KbdProps {
  /** Size of the key cap */
  size?: NonNullable<KbdVariants>['size'];
  className?: string;
  /** Spoken label when the glyph is not descriptive (e.g. "⌘" → "Command") */
  'aria-label'?: string;
}
