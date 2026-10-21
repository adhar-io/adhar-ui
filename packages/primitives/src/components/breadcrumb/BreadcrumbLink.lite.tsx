import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { breadcrumbLinkVariants } from './breadcrumb.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-breadcrumb-link' },
});

export interface BreadcrumbLinkProps {
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  /** Use for client-side routing; call event.preventDefault() to stop the native navigation */
  onClick?: (event: any) => void;
  children?: any;
}

export default function BreadcrumbLink(props: BreadcrumbLinkProps) {
  const state = useStore({
    get classes(): string {
      return cn(breadcrumbLinkVariants(), props.className);
    },
  });

  return (
    <a
      className={state.classes}
      href={props.href}
      target={props.target}
      rel={props.rel}
      onClick={(event) => props.onClick?.(event)}
    >
      {props.children}
    </a>
  );
}
