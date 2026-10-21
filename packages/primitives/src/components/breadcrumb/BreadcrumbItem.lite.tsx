import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { breadcrumbItemVariants } from './breadcrumb.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-breadcrumb-item' },
});

export interface BreadcrumbItemProps {
  className?: string;
  id?: string;
  children?: any;
}

export default function BreadcrumbItem(props: BreadcrumbItemProps) {
  const state = useStore({
    get classes(): string {
      return cn(breadcrumbItemVariants(), props.className);
    },
  });

  return (
    <li className={state.classes} id={props.id}>
      {props.children}
    </li>
  );
}
