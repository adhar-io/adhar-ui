// @ts-nocheck
export interface CollapsibleProps {
  open?: boolean;
  className?: string;
  children?: any;
}

function Collapsible(props: CollapsibleProps) {
  return (
    <div class={props.className} data-state={props.open ? "open" : "closed"}>
      {props.children}
    </div>
  );
}

export default Collapsible;
