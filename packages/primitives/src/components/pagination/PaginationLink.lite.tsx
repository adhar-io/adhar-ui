import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface PaginationLinkProps {
  href?: string;
  /** Marks this link as the current page (sets aria-current="page") */
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default function PaginationLink(props: PaginationLinkProps) {
  return (
    <a
      className={props.className}
      href={props.href}
      aria-current={props.isActive ? 'page' : undefined}
      aria-disabled={props.disabled ? true : false}
      aria-label={props['aria-label']}
      onClick={(event) => props.onClick?.(event)}
    >
      {props.children}
    </a>
  );
}
