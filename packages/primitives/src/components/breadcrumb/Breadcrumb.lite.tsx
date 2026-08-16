import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface BreadcrumbProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Breadcrumb(props: BreadcrumbProps) {
  return (
    <nav className={props.className} aria-label={props['aria-label'] || 'Breadcrumb'}>
      {props.children}
    </nav>
  );
}
