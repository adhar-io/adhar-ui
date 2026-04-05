import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: any;
}

export default function AccordionItem(props: AccordionItemProps) {
  return (
    <div className={props.className} data-value={props.value}>
      {props.children}
    </div>
  );
}
