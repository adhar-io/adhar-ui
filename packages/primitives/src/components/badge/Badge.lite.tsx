import { Show, useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
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
  /** Renders a small leading status dot inheriting the badge's text color */
  dot?: boolean;
  /** Extra classes for the leading dot (e.g. a fixed color) */
  dotClass?: string;
  /**
   * ARIA role. Only set "status" for live, dynamic counters (e.g. unread
   * counts) so screen readers announce changes. Static labels need no role.
   */
  role?: string;
  'aria-label'?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default function Badge(props: BadgeProps) {
  return (
    <span
      className={props.className}
      role={props.role}
      aria-label={props['aria-label']}
      onClick={(event) => props.onClick?.(event)}
    >
      <Show when={props.dot}>
        <span
          className={props.dotClass || 'mr-1 inline-block size-1.5 rounded-full bg-current opacity-70'}
          aria-hidden='true'
        />
      </Show>
      {props.children}
    </span>
  );
}
