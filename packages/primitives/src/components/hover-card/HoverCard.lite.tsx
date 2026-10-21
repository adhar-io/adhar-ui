import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { hoverCardVariants } from './hover-card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-hover-card' },
});

export interface HoverCardProps {
  className?: string;
  children?: any;
}

// CSS-only: HoverCardContent is shown while the pointer is over, or keyboard
// focus is inside, this wrapper. Escape is not needed since moving away hides it.
export default function HoverCard(props: HoverCardProps) {
  const state = useStore({
    get classes(): string {
      return cn(hoverCardVariants(), props.className);
    },
  });

  return <div className={state.classes}>{props.children}</div>;
}
