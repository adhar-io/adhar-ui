import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface ToggleProps {
  /** Whether the toggle is currently pressed/on (controlled) */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  /** Fired with the next pressed state when activated */
  onPressedChange?: (pressed: boolean) => void;
  children?: any;
}

export default function Toggle(props: ToggleProps) {
  return (
    <button
      type='button'
      className={props.className}
      id={props.id}
      aria-pressed={props.pressed ? true : false}
      aria-label={props['aria-label']}
      data-state={props.pressed ? 'on' : 'off'}
      disabled={props.disabled}
      onClick={() => (props.disabled ? undefined : props.onPressedChange?.(!props.pressed))}
    >
      {props.children}
    </button>
  );
}
