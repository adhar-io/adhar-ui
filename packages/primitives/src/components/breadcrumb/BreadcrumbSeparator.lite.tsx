import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { breadcrumbSeparatorVariants } from './breadcrumb.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-breadcrumb-separator' },
});

export interface BreadcrumbSeparatorProps {
  className?: string;
  /** Custom separator content; defaults to a chevron */
  children?: any;
}

export default function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  const state = useStore({
    get classes(): string {
      return cn(breadcrumbSeparatorVariants(), props.className);
    },
  });

  return (
    <li role='presentation' aria-hidden='true' className={state.classes}>
      <Show
        when={props.children}
        else={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='14'
            height='14'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m9 18 6-6-6-6' />
          </svg>
        }
      >
        {props.children}
      </Show>
    </li>
  );
}
