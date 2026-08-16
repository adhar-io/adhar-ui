import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  'aria-label'?: string;
  /** Fired with this item's value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}

export default function ToggleGroupItem(props: ToggleGroupItemProps) {
  return (
    <button
      type='button'
      className={props.className}
      id={props.id}
      value={props.value}
      aria-pressed={props.pressed ? true : false}
      aria-label={props['aria-label']}
      data-state={props.pressed ? 'on' : 'off'}
      disabled={props.disabled}
      onClick={() => (props.disabled ? undefined : props.onToggle?.(props.value))}
    >
      {props.children}
    </button>
  );
}
