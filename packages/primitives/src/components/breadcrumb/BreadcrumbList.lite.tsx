import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface BreadcrumbListProps {
  className?: string;
  children?: any;
}

export default function BreadcrumbList(props: BreadcrumbListProps) {
  return <ol className={props.className}>{props.children}</ol>;
}
