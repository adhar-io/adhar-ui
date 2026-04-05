// @ts-nocheck
export interface CardProps {
  className?: string;
  children?: any;
}

function Card(props: CardProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default Card;
