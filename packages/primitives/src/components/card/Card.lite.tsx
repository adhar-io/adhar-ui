import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { cardVariants } from './card.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-card' },
});

export interface CardProps {
  /** Inner padding. Use ’none’ (default) with CardHeader / CardContent / CardFooter. */
  padding?: 'none' | 'sm' | 'default' | 'lg';
  /**
   * Hover / focus affordance for clickable cards. With `onClick` the card is
   * also focusable and activated by Enter / Space.
   */
  interactive?: boolean;
  className?: string;
  id?: string;
  role?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default function Card(props: CardProps) {
  const state = useStore({
    get isInteractive(): boolean {
      return !!props.interactive || !!props.onClick;
    },
    get classes(): string {
      return cn(
        cardVariants({ padding: props.padding, interactive: state.isInteractive }),
        props.className,
      );
    },
    handleKeyDown(event: any) {
      if (
        props.onClick && event.target === event.currentTarget &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        props.onClick(event);
      }
    },
  });

  return (
    <div
      className={state.classes}
      id={props.id}
      role={props.role || (props.onClick ? 'button' : undefined)}
      tabIndex={props.onClick ? 0 : undefined}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      onClick={(event) => props.onClick?.(event)}
      onKeyDown={(event) => state.handleKeyDown(event)}
    >
      {props.children}
    </div>
  );
}
