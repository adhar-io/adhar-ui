import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AlertTitleProps {
  className?: string;
  children?: any;
}

export default function AlertTitle(props: AlertTitleProps) {
  return (
    <h5 className={props.className}>
      {props.children}
    </h5>
  );
}
