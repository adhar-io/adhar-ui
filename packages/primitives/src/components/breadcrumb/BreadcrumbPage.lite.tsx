import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { breadcrumbPageVariants } from './breadcrumb.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-breadcrumb-page' },
});

export interface BreadcrumbPageProps {
  className?: string;
  children?: any;
}

// The current page — not a link. aria-current="page" marks it for AT.
export default function BreadcrumbPage(props: BreadcrumbPageProps) {
  const state = useStore({
    get classes(): string {
      return cn(breadcrumbPageVariants(), props.className);
    },
  });

  return (
    <span className={state.classes} aria-current='page'>
      {props.children}
    </span>
  );
}
