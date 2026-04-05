import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CardTitleProps {
  className?: string;
  children?: any;
}

export default function CardTitle(props: CardTitleProps) {
  return (
    <h3 className={props.className}>
      {props.children}
    </h3>
  );
}
