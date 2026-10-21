import { onInit, Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { switchThumbVariants, switchVariants } from './switch.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-switch' },
});

export interface SwitchProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Initial checked state when uncontrolled */
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'default' | 'lg';
  /** Submits `value` (default "on") under this name when checked */
  name?: string;
  value?: string;
  form?: string;
  id?: string;
  className?: string;
  thumbClass?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** Fires with the next checked state */
  onChange?: (checked: boolean) => void;
  /** Alias of `onChange` */
  onCheckedChange?: (checked: boolean) => void;
}

export default function Switch(props: SwitchProps) {
  const state = useStore({
    internalChecked: false,
    get isChecked(): boolean {
      return props.checked !== undefined ? !!props.checked : state.internalChecked;
    },
    get dataState(): string {
      return state.isChecked ? 'checked' : 'unchecked';
    },
    get classes(): string {
      return cn(switchVariants({ size: props.size }), props.className);
    },
    get thumbClasses(): string {
      return cn(switchThumbVariants({ size: props.size }), props.thumbClass);
    },
    /* Native <button> already turns Enter / Space into a click, so this is the */
    /* only activation path — a separate keydown handler would toggle twice. */
    handleClick() {
      if (props.disabled) return;
      const next = !state.isChecked;
      state.internalChecked = next;
      props.onChange?.(next);
      props.onCheckedChange?.(next);
    },
  });

  onInit(() => {
    state.internalChecked = !!props.defaultChecked;
  });

  return (
    <button
      type='button'
      role='switch'
      className={state.classes}
      id={props.id}
      aria-checked={state.isChecked}
      aria-required={props.required ? true : undefined}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      data-state={state.dataState}
      disabled={props.disabled}
      onClick={() => state.handleClick()}
    >
      <span className={state.thumbClasses} data-state={state.dataState} />
      <Show when={props.name && state.isChecked}>
        <input type='hidden' name={props.name} value={props.value || 'on'} form={props.form} />
      </Show>
    </button>
  );
}
