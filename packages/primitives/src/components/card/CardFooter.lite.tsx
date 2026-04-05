import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CardFooterProps {
  className?: string;
  children?: any;
}

export default function CardFooter(props: CardFooterProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
