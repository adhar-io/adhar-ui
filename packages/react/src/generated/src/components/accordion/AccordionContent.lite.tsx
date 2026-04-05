// @ts-nocheck
import * as React from 'react';

export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  children?: any;
}

function AccordionContent(props: AccordionContentProps) {
  return (
    <div
      role='region'
      hidden={!props.open}
      style={{
        overflow: 'hidden',
        transition: 'height 0.2s ease-out',
      }}
      className={props.className}
    >
      <div>{props.children}</div>
    </div>
  );
}

export default AccordionContent;
