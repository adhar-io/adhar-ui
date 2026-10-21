import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandItemVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-item' },
});

export interface CommandItemProps {
  /** The value this item represents (passed to onSelect / onHighlightChange) */
  value?: string;
  /** Whether this item is the active/highlighted option */
  selected?: boolean;
  disabled?: boolean;
  /** Set an id to reference it from CommandInput `aria-activedescendant` */
  id?: string;
  className?: string;
  onSelect?: (value: string) => void;
  /** Fires on pointer hover, so mouse and keyboard share one highlight */
  onHighlight?: (value: string) => void;
  children?: any;
}

export default function CommandItem(props: CommandItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandItemVariants(), props.className);
    },
  });

  return (
    <div
      id={props.id}
      role='option'
      tabIndex={-1}
      aria-selected={props.selected ? true : false}
      aria-disabled={props.disabled ? true : undefined}
      data-selected={props.selected ? 'true' : 'false'}
      data-disabled={props.disabled ? '' : undefined}
      data-value={props.value}
      className={state.classes}
      onClick={() => (props.disabled ? undefined : props.onSelect?.(props.value || ''))}
      onMouseEnter={() => (props.disabled ? undefined : props.onHighlight?.(props.value || ''))}
    >
      {props.children}
    </div>
  );
}
