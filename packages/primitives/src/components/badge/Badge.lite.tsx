import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { badgeVariants } from './badge.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-badge' },
});

export interface BadgeProps {
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'outline'
    | 'success'
    | 'warning'
    | 'info';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  id?: string;
  title?: string;
  /** Renders a small leading status dot inheriting the badge’s text color */
  dot?: boolean;
  /** Extra classes for the leading dot (e.g. a fixed color) */
  dotClass?: string;
  /**
   * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
   * counts) so screen readers announce changes. Static labels need no role.
   * Defaults to "button" when `onClick` is set.
   */
  role?: string;
  'aria-label'?: string;
  /** Makes the badge interactive: focusable, and activated by Enter / Space */
  onClick?: (event: any) => void;
  children?: any;
}

export default function Badge(props: BadgeProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        badgeVariants({ variant: props.variant, size: props.size }),
        props.onClick ? 'cursor-pointer' : '',
        props.className,
      );
    },
    get dotClasses(): string {
      return cn(
        'mr-1 inline-block size-1.5 shrink-0 rounded-full bg-current opacity-70',
        props.dotClass,
      );
    },
    handleKeyDown(event: any) {
      if (props.onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        props.onClick(event);
      }
    },
  });

  return (
    <span
      className={state.classes}
      id={props.id}
      title={props.title}
      role={props.role || (props.onClick ? 'button' : undefined)}
      tabIndex={props.onClick ? 0 : undefined}
      aria-label={props['aria-label']}
      onClick={(event) => props.onClick?.(event)}
      onKeyDown={(event) => state.handleKeyDown(event)}
    >
      <Show when={props.dot}>
        <span className={state.dotClasses} aria-hidden='true' />
      </Show>
      {props.children}
    </span>
  );
}
