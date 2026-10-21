import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { breadcrumbListVariants } from './breadcrumb.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-breadcrumb-list' },
});

export interface BreadcrumbListProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function BreadcrumbList(props: BreadcrumbListProps) {
  const state = useStore({
    get classes(): string {
      return cn(breadcrumbListVariants(), props.className);
    },
  });

  return (
    <ol className={state.classes} id={props.id}>
      {props.children}
    </ol>
  );
}
