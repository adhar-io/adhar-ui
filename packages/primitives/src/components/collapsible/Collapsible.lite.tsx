import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CollapsibleProps {
  open?: boolean;
  className?: string;
  children?: any;
}

export default function Collapsible(props: CollapsibleProps) {
  return (
    <div className={props.className} data-state={props.open ? 'open' : 'closed'}>
      {props.children}
    </div>
  );
}
