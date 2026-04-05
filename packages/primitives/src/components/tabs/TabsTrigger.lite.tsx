import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (value: string) => void;
  children?: any;
}

export default function TabsTrigger(props: TabsTriggerProps) {
  return (
    <button
      type='button'
      role='tab'
      className={props.className}
      aria-selected={props.active}
      disabled={props.disabled}
      tabIndex={props.active ? 0 : -1}
      data-value={props.value}
      onClick={() => props.onClick?.(props.value)}
    >
      {props.children}
    </button>
  );
}
