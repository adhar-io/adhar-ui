// @ts-nocheck
export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: any;
}

function AccordionItem(props: AccordionItemProps) {
  return (
    <div class={props.className} data-value={props.value}>
      {props.children}
    </div>
  );
}

export default AccordionItem;
