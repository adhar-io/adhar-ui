// @ts-nocheck
export interface DropdownMenuItemProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  return (
    <div
      class={props.className}
      role="menuitem"
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      onClick={(event) => {
        if (!props.disabled) {
          props.onClick?.();
        }
      }}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && !props.disabled) {
          event.preventDefault();
          props.onClick?.();
        }
      }}
    >
      {props.children}
    </div>
  );
}

export default DropdownMenuItem;
