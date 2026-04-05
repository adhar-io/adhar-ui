// @ts-nocheck
export interface AccordionProps {
  type?: 'single' | 'multiple';
  className?: string;
  children?: any;
}

function Accordion(props: AccordionProps) {
  return (
    <div class={props.className} data-type={props.type || 'single'}>
      {props.children}
    </div>
  );
}

export default Accordion;
