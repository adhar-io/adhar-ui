import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { paginationEllipsisVariants } from './pagination.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-pagination-ellipsis' },
});

export interface PaginationEllipsisProps {
  className?: string;
  /** Screen-reader label (default "More pages") */
  label?: string;
}

export default function PaginationEllipsis(props: PaginationEllipsisProps) {
  const state = useStore({
    get classes(): string {
      return cn(paginationEllipsisVariants(), props.className);
    },
  });

  return (
    <span className={state.classes}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='1' />
        <circle cx='19' cy='12' r='1' />
        <circle cx='5' cy='12' r='1' />
      </svg>
      <span className='sr-only'>{props.label || 'More pages'}</span>
    </span>
  );
}
