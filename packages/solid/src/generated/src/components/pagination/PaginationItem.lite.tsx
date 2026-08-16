// @ts-nocheck
export interface PaginationItemProps {
  className?: string;
  children?: any;
}

function PaginationItem(props: PaginationItemProps) {
  return <li class={props.className}>{props.children}</li>;
}

export default PaginationItem;
