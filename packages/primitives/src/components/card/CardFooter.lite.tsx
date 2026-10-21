import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { cardFooterVariants } from './card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-card-footer' },
});

export interface CardFooterProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function CardFooter(props: CardFooterProps) {
  const state = useStore({
    get classes(): string {
      return cn(cardFooterVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
