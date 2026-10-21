import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { kbdVariants } from './kbd.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-kbd' },
});

export interface KbdProps {
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  /** Spoken label for the key when the glyph is not descriptive (e.g. "⌘" → "Command") */
  'aria-label'?: string;
  children?: any;
}

export default function Kbd(props: KbdProps) {
  const state = useStore({
    get classes(): string {
      return cn(kbdVariants({ size: props.size }), props.className);
    },
  });

  return (
    <kbd className={state.classes} aria-label={props['aria-label']}>
      {props.children}
    </kbd>
  );
}
