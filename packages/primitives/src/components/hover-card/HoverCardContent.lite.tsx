import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { hoverCardContentVariants } from './hover-card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-hover-card-content' },
});

export interface HoverCardContentProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  id?: string;
  className?: string;
  children?: any;
}

export default function HoverCardContent(props: HoverCardContentProps) {
  const state = useStore({
    get classes(): string {
      return cn(hoverCardContentVariants({ side: props.side }), props.className);
    },
  });

  return (
    <div id={props.id} role='tooltip' className={state.classes} data-side={props.side || 'bottom'}>
      {props.children}
    </div>
  );
}
