import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { selectTriggerVariants } from './select.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-select' },
});

export interface SelectProps {
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  name?: string;
  id?: string;
  form?: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  /**
   * Text shown while nothing is selected. Rendered as an empty-valued option,
   * so `required` validation fails until the user picks a real option.
   */
  placeholder?: string;
  autoComplete?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  onChange?: (event: any) => void;
  /** Fires with the newly selected option’s value */
  onValueChange?: (value: string) => void;
  onBlur?: (event: any) => void;
  /** <option> / <optgroup> elements */
  children?: any;
}

export default function Select(props: SelectProps) {
  const state = useStore({
    get classes(): string {
      return cn(selectTriggerVariants({ size: props.size }), props.className);
    },
    handleChange(event: any) {
      props.onChange?.(event);
      props.onValueChange?.(event.target.value);
    },
  });

  return (
    <select
      className={state.classes}
      value={props.value}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      form={props.form}
      autoComplete={props.autoComplete}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      aria-invalid={props.invalid ? true : undefined}
      onChange={(event) => state.handleChange(event)}
      onBlur={(event) => props.onBlur?.(event)}
    >
      <Show when={props.placeholder}>
        <option value='' hidden>{props.placeholder}</option>
      </Show>
      {props.children}
    </select>
  );
}
