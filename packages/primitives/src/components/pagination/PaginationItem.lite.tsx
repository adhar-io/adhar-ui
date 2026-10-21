import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { paginationItemVariants } from './pagination.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-pagination-item' },
});

export interface PaginationItemProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function PaginationItem(props: PaginationItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(paginationItemVariants(), props.className);
    },
  });

  return (
    <li className={state.classes} id={props.id}>
      {props.children}
    </li>
  );
}
