// @ts-nocheck
export interface BreadcrumbProps {
  className?: string;
  "aria-label"?: string;
  children?: any;
}

function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav
      class={props.className}
      aria-label={props["aria-label"] || "Breadcrumb"}
    >
      {props.children}
    </nav>
  );
}

export default Breadcrumb;
