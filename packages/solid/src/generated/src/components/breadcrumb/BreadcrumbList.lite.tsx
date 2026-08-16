// @ts-nocheck
export interface BreadcrumbListProps {
  className?: string;
  children?: any;
}

function BreadcrumbList(props: BreadcrumbListProps) {
  return <ol class={props.className}>{props.children}</ol>;
}

export default BreadcrumbList;
