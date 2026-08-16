// @ts-nocheck
export interface BreadcrumbLinkProps {
  href?: string;
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return (
    <a
      class={props.className}
      href={props.href}
      onClick={(event) => props.onClick?.(event)}
    >
      {props.children}
    </a>
  );
}

export default BreadcrumbLink;
