import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CardContentProps {
  className?: string;
  children?: any;
}

export default function CardContent(props: CardContentProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
