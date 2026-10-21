import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { cardDescriptionVariants } from './card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-card-description' },
});

export interface CardDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function CardDescription(props: CardDescriptionProps) {
  const state = useStore({
    get classes(): string {
      return cn(cardDescriptionVariants(), props.className);
    },
  });

  return (
    <p className={state.classes} id={props.id}>
      {props.children}
    </p>
  );
}
