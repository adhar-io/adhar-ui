import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dropdownMenuShortcutVariants } from './dropdown-menu.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dropdown-menu-shortcut' },
});

export interface DropdownMenuShortcutProps {
  className?: string;
  id?: string;
  children?: any;
}

// Keyboard shortcut hint shown at the end of a DropdownMenuItem.
export default function DropdownMenuShortcut(props: DropdownMenuShortcutProps) {
  const state = useStore({
    get classes(): string {
      return cn(dropdownMenuShortcutVariants(), props.className);
    },
  });

  return (
    <span className={state.classes} id={props.id} aria-hidden='true'>
      {props.children}
    </span>
  );
}
