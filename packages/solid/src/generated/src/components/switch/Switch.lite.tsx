// @ts-nocheck
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
}

function Switch(props: SwitchProps) {
  return (
    <button
      class={props.className}
      type='button'
      role='switch'
      id={props.id}
      aria-checked={isChecked}
      aria-label={props['aria-label']}
      disabled={props.disabled}
      onClick={(event) => handleClick()}
      onKeyDown={(event) => handleKeyDown(event)}
    >
      <span class={props.thumbClass}></span>
    </button>
  );
}

export default Switch;
