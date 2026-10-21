import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { cardHeaderVariants } from './card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-card-header' },
});

export interface CardHeaderProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function CardHeader(props: CardHeaderProps) {
  const state = useStore({
    get classes(): string {
      return cn(cardHeaderVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id}>
      {props.children}
    </div>
  );
}
