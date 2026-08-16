import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface BreadcrumbLinkProps {
  href?: string;
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return (
    <a
      className={props.className}
      href={props.href}
      onClick={(event) => props.onClick?.(event)}
    >
      {props.children}
    </a>
  );
}
