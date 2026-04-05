// @ts-nocheck
export interface CardTitleProps {
  className?: string;
  children?: any;
}

function CardTitle(props: CardTitleProps) {
  return <h3 class={props.className}>{props.children}</h3>;
}

export default CardTitle;
