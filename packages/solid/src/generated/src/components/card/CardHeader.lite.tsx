// @ts-nocheck
export interface CardHeaderProps {
  className?: string;
  children?: any;
}

function CardHeader(props: CardHeaderProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default CardHeader;
