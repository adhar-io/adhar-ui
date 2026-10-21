import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-collapsible' },
});

export interface CollapsibleProps {
  open?: boolean;
  disabled?: boolean;
  className?: string;
  children?: any;
}

export default function Collapsible(props: CollapsibleProps) {
  return (
    <div
      className={props.className}
      data-state={props.open ? 'open' : 'closed'}
      data-disabled={props.disabled ? '' : undefined}
    >
      {props.children}
    </div>
  );
}
