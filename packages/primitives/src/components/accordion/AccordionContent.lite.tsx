import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  children?: any;
}

export default function AccordionContent(props: AccordionContentProps) {
  return (
    <div
      className={props.className}
      role='region'
      hidden={!props.open}
      style={{
        overflow: 'hidden',
        transition: 'height 0.2s ease-out',
      }}
    >
      <div>{props.children}</div>
    </div>
  );
}
