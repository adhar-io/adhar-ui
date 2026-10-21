import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dropdownMenuLabelVariants } from './dropdown-menu.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dropdown-menu-label' },
});

export interface DropdownMenuLabelProps {
  className?: string;
  id?: string;
  children?: any;
}

// Non-interactive heading for a group of menu items.
export default function DropdownMenuLabel(props: DropdownMenuLabelProps) {
  const state = useStore({
    get classes(): string {
      return cn(dropdownMenuLabelVariants(), props.className);
    },
  });

  return (
    <div className={state.classes} id={props.id} role='presentation'>
      {props.children}
    </div>
  );
}
