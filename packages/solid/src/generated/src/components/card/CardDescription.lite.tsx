// @ts-nocheck
export interface CardDescriptionProps {
  className?: string;
  children?: any;
}

function CardDescription(props: CardDescriptionProps) {
  return <p class={props.className}>{props.children}</p>;
}

export default CardDescription;
