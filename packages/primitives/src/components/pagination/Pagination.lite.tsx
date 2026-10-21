import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { paginationVariants } from './pagination.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-pagination' },
});

export interface PaginationProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Pagination(props: PaginationProps) {
  const state = useStore({
    get classes(): string {
      return cn(paginationVariants(), props.className);
    },
  });

  return (
    <nav className={state.classes} aria-label={props['aria-label'] || 'Pagination'}>
      {props.children}
    </nav>
  );
}
