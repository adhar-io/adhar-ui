// @ts-nocheck
/**
 * Prop types for consumers of the CVA-only API. Keep in sync with the
 * interface(s) in `Kbd.lite.tsx`, which are the source of truth.
 */
export interface KbdProps {
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  'aria-label'?: string;
  children?: any;
}