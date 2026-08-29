import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CollapsibleContentProps {
  open?: boolean;
  id?: string;
  className?: string;
  /** Class for the required inner overflow-hidden wrapper */
  innerClass?: string;
  children?: any;
}

export default function CollapsibleContent(props: CollapsibleContentProps) {
  return (
    <div
      id={props.id}
      className={props.className}
      data-state={props.open ? 'open' : 'closed'}
      aria-hidden={props.open ? false : true}
    >
      <div className={props.innerClass}>
        {props.children}
      </div>
    </div>
  );
}
