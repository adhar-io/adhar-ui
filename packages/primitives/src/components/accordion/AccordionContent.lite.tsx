import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { accordionContentVariants } from './accordion.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-accordion-content' },
});

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  /** Class for the inner padding wrapper */
  innerClass?: string;
  /** Give the region an id and pass it to AccordionTrigger `aria-controls` */
  id?: string;
  /** ID of the AccordionTrigger that labels this region */
  'aria-labelledby'?: string;
  children?: any;
}

export default function AccordionContent(props: AccordionContentProps) {
  const state = useStore({
    get classes(): string {
      return cn(accordionContentVariants(), props.className);
    },
    get innerClasses(): string {
      return cn('pb-4 pt-0', props.innerClass);
    },
  });

  return (
    <div
      className={state.classes}
      id={props.id}
      role='region'
      aria-labelledby={props['aria-labelledby']}
      data-state={props.open ? 'open' : 'closed'}
      hidden={!props.open}
    >
      <div className={state.innerClasses}>{props.children}</div>
    </div>
  );
}
