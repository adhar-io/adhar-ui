// @ts-nocheck
export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (value: string) => void;
  children?: any;
}

function TabsTrigger(props: TabsTriggerProps) {
  return (
    <button
      class={props.className}
      type='button'
      role='tab'
      aria-selected={props.active}
      disabled={props.disabled}
      tabIndex={props.active ? 0 : -1}
      data-value={props.value}
      onClick={(event) => props.onClick?.(props.value)}
    >
      {props.children}
    </button>
  );
}

export default TabsTrigger;
