import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { paginationLinkVariants } from './pagination.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-pagination-link' },
});

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  /** Removes the link from navigation and the tab order */
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  'aria-label'?: string;
  /** Use for client-side paging; not called while disabled */
  onClick?: (event: any) => void;
  children?: any;
}

export default function PaginationLink(props: PaginationLinkProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        paginationLinkVariants({ isActive: !!props.isActive, size: props.size }),
        props.className,
      );
    },
    handleClick(event: any) {
      if (props.disabled) {
        event.preventDefault();
        return;
      }
      props.onClick?.(event);
    },
  });

  return (
    <a
      className={state.classes}
      href={props.disabled ? undefined : props.href}
      role={props.href && !props.disabled ? undefined : 'link'}
      tabIndex={props.disabled ? -1 : props.href ? undefined : 0}
      aria-current={props.isActive ? 'page' : undefined}
      aria-disabled={props.disabled ? true : undefined}
      aria-label={props['aria-label']}
      onClick={(event) => state.handleClick(event)}
      onKeyDown={(event) => {
        if (!props.href && event.key === 'Enter') state.handleClick(event);
      }}
    >
      {props.children}
    </a>
  );
}
