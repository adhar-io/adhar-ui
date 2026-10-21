import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { inputVariants } from './input.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-input' },
});

export interface InputProps {
  type?: string;
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** @deprecated Use `readOnly` */
  readonly?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  name?: string;
  id?: string;
  form?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'ghost' | 'flush';
  /** Native autocomplete hint (e.g. "email", "current-password", "off") */
  autoComplete?: string;
  /** Virtual keyboard hint on touch devices */
  inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  /** Enter-key label on virtual keyboards */
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  autoFocus?: boolean;
  spellcheck?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  /** Min value / date for numeric & date inputs */
  min?: string | number;
  /** Max value / date for numeric & date inputs */
  max?: string | number;
  /** Step increment for numeric & date inputs */
  step?: string | number;
  /** File inputs: accepted types, e.g. "image/*" */
  accept?: string;
  /** File / email inputs: allow multiple values */
  multiple?: boolean;
  list?: string;
  title?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  'aria-errormessage'?: string;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  /** Fires on every keystroke with the current string value */
  onValueChange?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

export default function Input(props: InputProps) {
  const state = useStore({
    get classes(): string {
      return cn(inputVariants({ size: props.size, variant: props.variant }), props.className);
    },
    handleInput(event: any) {
      props.onInput?.(event);
      props.onValueChange?.(event.target.value);
    },
  });

  return (
    <input
      type={props.type || 'text'}
      className={state.classes}
      placeholder={props.placeholder}
      value={props.value}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      readOnly={props.readOnly || props.readonly}
      required={props.required}
      name={props.name}
      id={props.id}
      form={props.form}
      autoComplete={props.autoComplete}
      inputMode={props.inputMode}
      enterKeyHint={props.enterKeyHint}
      autoFocus={props.autoFocus}
      spellcheck={props.spellcheck}
      maxLength={props.maxLength}
      minLength={props.minLength}
      pattern={props.pattern}
      min={props.min}
      max={props.max}
      step={props.step}
      accept={props.accept}
      multiple={props.multiple}
      list={props.list}
      title={props.title}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      aria-invalid={props.invalid || props['aria-invalid'] ? true : undefined}
      aria-errormessage={props['aria-errormessage']}
      onChange={(event) => props.onChange?.(event)}
      onInput={(event) => state.handleInput(event)}
      onFocus={(event) => props.onFocus?.(event)}
      onBlur={(event) => props.onBlur?.(event)}
      onKeyDown={(event) => props.onKeyDown?.(event)}
    />
  );
}
