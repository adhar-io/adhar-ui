import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dropdownMenuSeparatorVariants } from './dropdown-menu.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dropdown-menu-separator' },
});

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export default function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  const state = useStore({
    get classes(): string {
      return cn(dropdownMenuSeparatorVariants(), props.className);
    },
  });

  return <div className={state.classes} role='separator' />;
}
