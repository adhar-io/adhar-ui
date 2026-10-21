import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { accordionItemVariants } from './accordion.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-accordion-item' },
});

export interface AccordionItemProps {
  value: string;
  /** Exposes data-state="open" for styling */
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

export default function AccordionItem(props: AccordionItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(accordionItemVariants(), props.className);
    },
  });

  return (
    <div
      className={state.classes}
      data-value={props.value}
      data-state={props.open ? 'open' : 'closed'}
      data-disabled={props.disabled ? '' : undefined}
    >
      {props.children}
    </div>
  );
}
