// @ts-nocheck
export interface HoverCardProps {
  className?: string;
  children?: any;
}

function HoverCard(props: HoverCardProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default HoverCard;
