import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

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

export default function Checkbox(props: CheckboxProps) {
  const state = useState({
    get isChecked() {
      return props.checked || false;
    },
    handleChange(event: any) {
      const newChecked = event.target.checked;
      props.onChange?.(newChecked);
    },
  });

  return (
    <input
      type='checkbox'
      className={props.className}
      checked={state.isChecked}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      value={props.value}
      role='checkbox'
      aria-checked={state.isChecked}
      aria-label={props['aria-label']}
      onChange={(event) => state.handleChange(event)}
    />
  );
}
