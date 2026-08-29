// @ts-nocheck
export interface HoverCardContentProps {
  id?: string;
  className?: string;
  children?: any;
}

function HoverCardContent(props: HoverCardContentProps) {
  return (
    <div class={props.className} role="tooltip" id={props.id}>
      {props.children}
    </div>
  );
}

export default HoverCardContent;
