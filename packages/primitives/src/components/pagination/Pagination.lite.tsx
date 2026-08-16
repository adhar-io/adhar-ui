import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface PaginationProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Pagination(props: PaginationProps) {
  return (
    <nav
      className={props.className}
      role='navigation'
      aria-label={props['aria-label'] || 'Pagination'}
    >
      {props.children}
    </nav>
  );
}
