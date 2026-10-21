import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dropdownMenuItemVariants } from './dropdown-menu.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dropdown-menu-item' },
});

export interface DropdownMenuItemProps {
  disabled?: boolean;
  /** "destructive" for delete-style actions */
  variant?: 'default' | 'destructive';
  /** Indent to line up with items that have a leading icon */
  inset?: boolean;
  className?: string;
  onClick?: () => void;
  /** Alias of `onClick` */
  onSelect?: () => void;
  children?: any;
}

export default function DropdownMenuItem(props: DropdownMenuItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        dropdownMenuItemVariants({ variant: props.variant, inset: !!props.inset }),
        props.className,
      );
    },
    activate() {
      if (props.disabled) return;
      props.onClick?.();
      props.onSelect?.();
    },
    handleKeyDown(event: any) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        /* Route through click so DropdownMenu sees it and closes. */
        if (!props.disabled) event.currentTarget.click();
      }
    },
  });

  return (
    <div
      className={state.classes}
      role='menuitem'
      tabIndex={-1}
      aria-disabled={props.disabled ? true : undefined}
      data-disabled={props.disabled ? '' : undefined}
      onClick={() => state.activate()}
      onKeyDown={(event) => state.handleKeyDown(event)}
    >
      {props.children}
    </div>
  );
}
