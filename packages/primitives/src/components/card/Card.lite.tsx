import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CardProps {
  className?: string;
  children?: any;
}

export default function Card(props: CardProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
