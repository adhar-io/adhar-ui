import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface PaginationContentProps {
  className?: string;
  children?: any;
}

export default function PaginationContent(props: PaginationContentProps) {
  return <ul className={props.className}>{props.children}</ul>;
}
