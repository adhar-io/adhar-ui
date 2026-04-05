import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AccordionProps {
  type?: 'single' | 'multiple';
  className?: string;
  children?: any;
}

export default function Accordion(props: AccordionProps) {
  return (
    <div className={props.className} data-type={props.type || 'single'}>
      {props.children}
    </div>
  );
}
