// @ts-nocheck
export interface CardContentProps {
  className?: string;
  children?: any;
}

function CardContent(props: CardContentProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default CardContent;
