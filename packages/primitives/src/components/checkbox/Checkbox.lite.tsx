import { onInit, onMount, onUpdate, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { checkboxVariants } from './checkbox.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-checkbox' },
});

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  /** Shows the mixed (dash) state, e.g. for a "select all" with some rows selected */
  indeterminate?: boolean;
  disabled?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive ring + aria-invalid */
  invalid?: boolean;
  size?: 'sm' | 'default' | 'lg';
  name?: string;
  id?: string;
  form?: string;
  value?: string;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const state = useStore({
    internalChecked: false,
    get isChecked(): boolean {
      return props.checked !== undefined ? !!props.checked : state.internalChecked;
    },
    get classes(): string {
      return cn(checkboxVariants({ size: props.size }), props.className);
    },
    get dataState(): string {
      if (props.indeterminate) return 'indeterminate';
      return state.isChecked ? 'checked' : 'unchecked';
    },
    syncIndeterminate() {
      if (inputRef) inputRef.indeterminate = !!props.indeterminate;
    },
    handleChange(event: any) {
      const next = !!event.target.checked;
      state.internalChecked = next;
      props.onChange?.(next);
      props.onCheckedChange?.(next);
    },
  });

  onInit(() => {
    state.internalChecked = !!props.defaultChecked;
  });

  onMount(() => {
    state.syncIndeterminate();
  });

  onUpdate(() => {
    state.syncIndeterminate();
  }, [props.indeterminate]);

  return (
    <input
      ref={inputRef}
      type='checkbox'
      className={state.classes}
      checked={state.isChecked}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      id={props.id}
      form={props.form}
      value={props.value}
      data-state={state.dataState}
      aria-checked={props.indeterminate ? 'mixed' : undefined}
      aria-invalid={props.invalid ? true : undefined}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      onChange={(event) => state.handleChange(event)}
    />
  );
}
