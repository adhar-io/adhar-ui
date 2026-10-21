import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { toggleVariants } from '../toggle/toggle.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-toggle-group-item' },
});

export interface ToggleGroupItemProps {
  /** The value this item represents within its group */
  value: string;
  /** Whether this item is currently pressed/on */
  pressed?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  id?: string;
  title?: string;
  'aria-label'?: string;
  /** Fired with this item’s value when activated */
  onToggle?: (value: string) => void;
  children?: any;
}

export default function ToggleGroupItem(props: ToggleGroupItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(toggleVariants({ variant: props.variant, size: props.size }), props.className);
    },
  });

  return (
    <button
      type='button'
      className={state.classes}
      id={props.id}
      title={props.title}
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
