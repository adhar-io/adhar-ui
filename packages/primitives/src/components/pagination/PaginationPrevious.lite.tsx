import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface PaginationPreviousProps {
  href?: string;
  disabled?: boolean;
  className?: string;
  /** Visible label (default "Previous") */
  label?: string;
  'aria-label'?: string;
  onClick?: (event: any) => void;
}

export default function PaginationPrevious(props: PaginationPreviousProps) {
  return (
    <a
      className={props.className}
      href={props.href}
      aria-label={props['aria-label'] || 'Go to previous page'}
      aria-disabled={props.disabled ? true : false}
      onClick={(event) => props.onClick?.(event)}
    >
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
      >
        <path d='m15 18-6-6 6-6' />
      </svg>
      <span>{props.label || 'Previous'}</span>
    </a>
  );
}
