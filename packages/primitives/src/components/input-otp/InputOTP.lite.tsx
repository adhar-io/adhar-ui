import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { inputOTPVariants } from './input-otp.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-input-otp' },
});

export interface InputOTPProps {
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  /** Number of digits/characters (maxLength). Default 6. */
  length?: number;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  name?: string;
  id?: string;
  form?: string;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  placeholder?: string;
  /**
   * "numeric" (default) shows the number pad and strips non-digits.
   * "text" allows alphanumeric codes.
   */
  inputMode?: 'numeric' | 'text';
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  'aria-label'?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  /** Fired on every change with the current value */
  onValueChange?: (value: string) => void;
  /** Fired once each time the value reaches `length` characters */
  onComplete?: (value: string) => void;
}

export default function InputOTP(props: InputOTPProps) {
  const state = useStore({
    lastLength: 0,
    get maxLength(): number {
      return props.length || 6;
    },
    get isNumeric(): boolean {
      return props.inputMode !== 'text';
    },
    get classes(): string {
      return cn(inputOTPVariants({ size: props.size }), props.className);
    },
    handleInput(event: any) {
      const raw: string = event.target.value || '';
      let next = state.isNumeric ? raw.replace(/\D/g, '') : raw.replace(/\s/g, '');
      next = next.slice(0, state.maxLength);
      if (next !== raw) event.target.value = next;
      props.onValueChange?.(next);
      if (next.length === state.maxLength && state.lastLength < state.maxLength) {
        props.onComplete?.(next);
      }
      state.lastLength = next.length;
    },
  });

  return (
    <input
      type='text'
      className={state.classes}
      value={props.value}
      defaultValue={props.defaultValue}
      maxLength={state.maxLength}
      inputMode={state.isNumeric ? 'numeric' : 'text'}
      pattern={state.isNumeric ? '[0-9]*' : undefined}
      autoComplete='one-time-code'
      autoCorrect='off'
      autoCapitalize={state.isNumeric ? undefined : 'characters'}
      spellcheck={false}
      disabled={props.disabled}
      required={props.required}
      autoFocus={props.autoFocus}
      name={props.name}
      id={props.id}
      form={props.form}
      placeholder={props.placeholder}
      aria-label={props['aria-label'] || 'One-time code'}
      aria-invalid={props.invalid || props['aria-invalid'] ? true : undefined}
      aria-describedby={props['aria-describedby']}
      onInput={(event) => state.handleInput(event)}
    />
  );
}
