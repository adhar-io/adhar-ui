import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { cardContentVariants } from './card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-card-content' },
});

export interface CardContentProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function CardContent(props: CardContentProps) {
  const state = useStore({
    get classes(): string {
      return cn(cardContentVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
