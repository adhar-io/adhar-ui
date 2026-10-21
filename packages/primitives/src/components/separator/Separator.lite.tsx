import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { separatorVariants } from './separator.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-separator' },
});

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  /**
   * Purely visual separators (the default) are hidden from assistive tech.
   * Set false when the separator divides meaningful sections.
   */
  decorative?: boolean;
  className?: string;
}

export default function Separator(props: SeparatorProps) {
  const state = useStore({
    get classes(): string {
      return cn(separatorVariants({ orientation: props.orientation }), props.className);
    },
    get isDecorative(): boolean {
      return props.decorative !== false;
    },
  });

  return (
    <div
      className={state.classes}
      role={state.isDecorative ? 'none' : 'separator'}
      aria-orientation={state.isDecorative ? undefined : props.orientation || 'horizontal'}
      data-orientation={props.orientation || 'horizontal'}
    />
  );
}
