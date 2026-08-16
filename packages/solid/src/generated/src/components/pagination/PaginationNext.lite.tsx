// @ts-nocheck
export interface PaginationNextProps {
  href?: string;
  disabled?: boolean;
  className?: string;
  /** Visible label (default "Next") */
  label?: string;
  "aria-label"?: string;
  onClick?: (event: any) => void;
}

function PaginationNext(props: PaginationNextProps) {
  return (
    <a
      class={props.className}
      href={props.href}
      aria-label={props["aria-label"] || "Go to next page"}
      aria-disabled={props.disabled ? true : false}
      onClick={(event) => props.onClick?.(event)}
    >
      <span>{props.label || "Next"}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </a>
  );
}

export default PaginationNext;
