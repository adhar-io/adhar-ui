// @ts-nocheck
export interface TextareaProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  name?: string;
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  onChange?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
}

function Textarea(props: TextareaProps) {
  return (
    <textarea
      class={props.className}
      placeholder={props.placeholder}
      value={props.value}
      disabled={props.disabled}
      readOnly={props.readonly}
      required={props.required}
      rows={props.rows || 3}
      name={props.name}
      id={props.id}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      aria-invalid={props["aria-invalid"]}
      onChange={(event) => props.onChange?.(event)}
      onFocus={(event) => props.onFocus?.(event)}
      onBlur={(event) => props.onBlur?.(event)}
    ></textarea>
  );
}

export default Textarea;
