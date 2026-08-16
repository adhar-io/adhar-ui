import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface PaginationItemProps {
  className?: string;
  children?: any;
}

export default function PaginationItem(props: PaginationItemProps) {
  return <li className={props.className}>{props.children}</li>;
}
