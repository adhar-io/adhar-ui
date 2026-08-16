// @ts-nocheck
export interface PaginationContentProps {
  className?: string;
  children?: any;
}

function PaginationContent(props: PaginationContentProps) {
  return <ul class={props.className}>{props.children}</ul>;
}

export default PaginationContent;
