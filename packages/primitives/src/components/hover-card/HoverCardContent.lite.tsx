import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface HoverCardContentProps {
  id?: string;
  className?: string;
  children?: any;
}

export default function HoverCardContent(props: HoverCardContentProps) {
  return (
    <div id={props.id} role='tooltip' className={props.className}>
      {props.children}
    </div>
  );
}
