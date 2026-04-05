// @ts-nocheck
import * as React from 'react';

export interface AccordionItemProps {
  value: string;
  className?: string;
  children?: any;
}

function AccordionItem(props: AccordionItemProps) {
  return (
    <div data-value={props.value} className={props.className}>
      {props.children}
    </div>
  );
}

export default AccordionItem;
