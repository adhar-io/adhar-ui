import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CardHeaderProps {
  className?: string;
  children?: any;
}

export default function CardHeader(props: CardHeaderProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
