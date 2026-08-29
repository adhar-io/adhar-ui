// @ts-nocheck
export interface CommandItemProps {
  /** The value this item represents (passed to onSelect) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  children?: any;
}

function CommandItem(props: CommandItemProps) {
  return (
    <div
      class={props.className}
      role="option"
      id={props.id}
      tabIndex={-1}
      aria-selected={props.selected ? true : false}
      aria-disabled={props.disabled ? true : false}
      data-selected={props.selected ? "true" : "false"}
      onClick={(event) =>
        props.disabled ? undefined : props.onSelect?.(props.value || "")
      }
    >
      {props.children}
    </div>
  );
}

export default CommandItem;
