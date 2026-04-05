import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AlertDescriptionProps {
  className?: string;
  children?: any;
}

export default function AlertDescription(props: AlertDescriptionProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
