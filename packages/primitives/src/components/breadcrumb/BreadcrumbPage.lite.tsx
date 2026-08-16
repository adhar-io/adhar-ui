import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.
export default function BreadcrumbPage(props: BreadcrumbPageProps) {
  return (
    <span
      className={props.className}
      role='link'
      aria-disabled='true'
      aria-current='page'
    >
      {props.children}
    </span>
  );
}
