import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface KbdProps {
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  'aria-label'?: string;
  children?: any;
}

export default function Kbd(props: KbdProps) {
  return (
    <kbd className={props.className} aria-label={props['aria-label']}>
      {props.children}
    </kbd>
  );
}
