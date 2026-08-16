// @ts-nocheck
export interface BreadcrumbItemProps {
  className?: string;
  children?: any;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <li class={props.className}>{props.children}</li>;
}

export default BreadcrumbItem;
