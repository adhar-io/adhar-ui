// @ts-nocheck
export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  className?: string;
  'aria-label'?: string;
  onChange?: (checked: boolean) => void;
}

function Checkbox(props: CheckboxProps) {
  return (
    <input
      class={props.className}
      type='checkbox'
      role='checkbox'
      checked={isChecked}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      value={props.value}
      aria-checked={isChecked}
      aria-label={props['aria-label']}
      onInput={(event) => handleChange(event)}
    />
  );
}

export default Checkbox;
