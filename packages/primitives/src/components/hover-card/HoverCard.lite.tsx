import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface HoverCardProps {
  className?: string;
  children?: any;
}

export default function HoverCard(props: HoverCardProps) {
  return <div className={props.className}>{props.children}</div>;
}
