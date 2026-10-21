import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { cardTitleVariants } from './card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-card-title' },
});

export interface CardTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function CardTitle(props: CardTitleProps) {
  const state = useStore({
    get classes(): string {
      return cn(cardTitleVariants(), props.className);
    },
  });

  return (
    <h3 className={state.classes} id={props.id}>
      {props.children}
    </h3>
  );
}
