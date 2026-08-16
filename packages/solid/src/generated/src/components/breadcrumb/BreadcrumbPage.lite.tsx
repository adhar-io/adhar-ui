// @ts-nocheck
export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.

function BreadcrumbPage(props: BreadcrumbPageProps) {
  return (
    <span
      class={props.className}
      role="link"
      aria-disabled="true"
      aria-current="page"
    >
      {props.children}
    </span>
  );
}

export default BreadcrumbPage;
