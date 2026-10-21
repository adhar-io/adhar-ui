import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import {
  collapsibleContentInnerVariants,
  collapsibleContentVariants,
} from './collapsible.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-collapsible-content' },
});

export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  /** ID of the trigger, to expose the content as a labelled region */
  'aria-labelledby'?: string;
  children?: any;
}

// Animates height with the grid-rows 0fr → 1fr technique; closed content is
// `invisible`, so it is skipped by Tab and screen readers but stays mounted.
export default function CollapsibleContent(props: CollapsibleContentProps) {
  const state = useStore({
    get classes(): string {
      return cn(collapsibleContentVariants({ open: !!props.open }), props.className);
    },
    get innerClasses(): string {
      return cn(collapsibleContentInnerVariants(), props.innerClass);
    },
  });

  return (
    <div
      id={props.id}
      className={state.classes}
      role={props['aria-labelledby'] ? 'region' : undefined}
      aria-labelledby={props['aria-labelledby']}
      data-state={props.open ? 'open' : 'closed'}
    >
      <div className={state.innerClasses}>
        {props.children}
      </div>
    </div>
  );
}
