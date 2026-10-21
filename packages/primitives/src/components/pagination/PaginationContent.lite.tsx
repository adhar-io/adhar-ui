import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { paginationContentVariants } from './pagination.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-pagination-content' },
});

export interface PaginationContentProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function PaginationContent(props: PaginationContentProps) {
  const state = useStore({
    get classes(): string {
      return cn(paginationContentVariants(), props.className);
    },
  });

  return (
    <ul className={state.classes} id={props.id}>
      {props.children}
    </ul>
  );
}
