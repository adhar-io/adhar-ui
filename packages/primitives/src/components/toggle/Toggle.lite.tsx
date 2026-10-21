import { onInit, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { toggleVariants } from './toggle.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-toggle' },
});

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  /** Initial pressed state when uncontrolled */
  defaultPressed?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  id?: string;
  title?: string;
  'aria-label'?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

export default function Toggle(props: ToggleProps) {
  const state = useStore({
    internalPressed: false,
    get isPressed(): boolean {
      return props.pressed !== undefined ? !!props.pressed : state.internalPressed;
    },
    get classes(): string {
      return cn(toggleVariants({ variant: props.variant, size: props.size }), props.className);
    },
    handleClick() {
      if (props.disabled) return;
      const next = !state.isPressed;
      state.internalPressed = next;
      props.onPressedChange?.(next);
    },
  });

  onInit(() => {
    state.internalPressed = !!props.defaultPressed;
  });

  return (
    <button
      type='button'
      className={state.classes}
      id={props.id}
      title={props.title}
      aria-pressed={state.isPressed}
      aria-label={props['aria-label']}
      data-state={state.isPressed ? 'on' : 'off'}
      disabled={props.disabled}
      onClick={() => state.handleClick()}
    >
      {props.children}
    </button>
  );
}
