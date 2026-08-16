// @ts-nocheck
export interface PaginationProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Pagination(props: PaginationProps) {
  return (
    <nav
      class={props.className}
      role="navigation"
      aria-label={props["aria-label"] || "Pagination"}
    >
      {props.children}
    </nav>
  );
}

export default Pagination;
