import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CardDescriptionProps {
  className?: string;
  children?: any;
}

export default function CardDescription(props: CardDescriptionProps) {
  return (
    <p className={props.className}>
      {props.children}
    </p>
  );
}
