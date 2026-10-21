// @ts-nocheck
export interface CollapsibleProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

function Collapsible(props: CollapsibleProps) {
  return (
    <div
      class={props.className}
      data-state={props.open ? "open" : "closed"}
      data-disabled={props.disabled ? "" : undefined}
    >
      {props.children}
    </div>
  );
}

export default Collapsible;
