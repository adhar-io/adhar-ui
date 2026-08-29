// @ts-nocheck
export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  children?: any;
}

function CollapsibleContent(props: CollapsibleContentProps) {
  return (
    <div
      class={props.className}
      id={props.id}
      data-state={props.open ? "open" : "closed"}
      aria-hidden={props.open ? false : true}
    >
      <div class={props.innerClass}>{props.children}</div>
    </div>
  );
}

export default CollapsibleContent;
