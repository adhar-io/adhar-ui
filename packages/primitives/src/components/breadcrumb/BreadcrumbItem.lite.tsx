import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface BreadcrumbItemProps {
  className?: string;
  children?: any;
}

export default function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li className={props.className}>{props.children}</li>;
}
