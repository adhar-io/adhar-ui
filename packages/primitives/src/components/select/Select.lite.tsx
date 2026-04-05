import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface SelectProps {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  'aria-label'?: string;
  onChange?: (event: any) => void;
  children?: any;
}

export default function Select(props: SelectProps) {
  return (
    <select
      className={props.className}
      value={props.value}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      aria-label={props['aria-label']}
      onChange={(event) => props.onChange?.(event)}
    >
      {props.children}
    </select>
  );
}
