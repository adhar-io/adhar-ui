import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface InputOTPProps {
  value?: string;
  /** Number of digits/characters (maxLength). Default 6. */
  length?: number;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  inputMode?: 'numeric' | 'text';
  'aria-label'?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  /** Fired on every change with the current value */
  onValueChange?: (value: string) => void;
  /** Fired once the value reaches `length` characters */
  onComplete?: (value: string) => void;
}

export default function InputOTP(props: InputOTPProps) {
  return (
    <input
      type='text'
      className={props.className}
      value={props.value}
      maxLength={props.length || 6}
      inputMode={props.inputMode || 'numeric'}
      autoComplete='one-time-code'
      autoCorrect='off'
      spellcheck={false}
      disabled={props.disabled}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      aria-label={props['aria-label'] || 'One-time code'}
      aria-invalid={props['aria-invalid']}
      aria-describedby={props['aria-describedby']}
      onInput={(event) => {
        props.onValueChange?.(event.target.value);
        if (event.target.value.length >= (props.length || 6)) {
          props.onComplete?.(event.target.value);
        }
      }}
    />
  );
}
