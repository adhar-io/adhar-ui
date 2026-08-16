// @ts-nocheck
export interface AccordionContentProps {
  open?: boolean;
  className?: string;
  children?: any;
}

function AccordionContent(props: AccordionContentProps) {
  return (
    <div
      class={props.className}
      role="region"
      hidden={!props.open}
      style={{
        overflow: "hidden",
        transition: "height 0.2s ease-out",
      }}
    >
      <div>{props.children}</div>
    </div>
  );
}

export default AccordionContent;
