// @ts-nocheck
export interface CollapsibleTriggerProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** ID of the content region this trigger controls */
  "aria-controls"?: string;
  "aria-label"?: string;
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <button
      class={props.className}
      type="button"
      id={props.id}
      disabled={props.disabled}
      aria-expanded={props.open ? true : false}
      aria-controls={props["aria-controls"]}
      aria-label={props["aria-label"]}
      data-state={props.open ? "open" : "closed"}
      onClick={(event) =>
        props.disabled ? undefined : props.onOpenChange?.(!props.open)
      }
    >
      {props.children}
    </button>
  );
}

export default CollapsibleTrigger;
