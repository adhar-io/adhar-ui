// @ts-nocheck
export interface CardFooterProps {
  className?: string;
  children?: any;
}

function CardFooter(props: CardFooterProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default CardFooter;
