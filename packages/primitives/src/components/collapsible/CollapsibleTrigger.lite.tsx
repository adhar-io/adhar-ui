import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CollapsibleTriggerProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** ID of the content region this trigger controls */
  'aria-controls'?: string;
  onOpenChange?: (open: boolean) => void;
  children?: any;
}

export default function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return (
    <button
      type='button'
      id={props.id}
      className={props.className}
      disabled={props.disabled}
      aria-expanded={props.open ? true : false}
      aria-controls={props['aria-controls']}
      data-state={props.open ? 'open' : 'closed'}
      onClick={() => (props.disabled ? undefined : props.onOpenChange?.(!props.open))}
    >
      {props.children}
    </button>
  );
}
