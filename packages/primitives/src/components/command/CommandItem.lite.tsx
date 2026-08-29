import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  children?: any;
}

export default function CommandItem(props: CommandItemProps) {
  return (
    <div
      id={props.id}
      role='option'
      tabIndex={-1}
      aria-selected={props.selected ? true : false}
      aria-disabled={props.disabled ? true : false}
      data-selected={props.selected ? 'true' : 'false'}
      className={props.className}
      onClick={() => (props.disabled ? undefined : props.onSelect?.(props.value || ''))}
    >
      {props.children}
    </div>
  );
}
