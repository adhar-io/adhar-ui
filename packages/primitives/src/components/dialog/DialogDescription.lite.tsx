import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DialogDescriptionProps {
  className?: string;
  children?: any;
}

export default function DialogDescription(props: DialogDescriptionProps) {
  return (
    <p className={props.className}>
      {props.children}
    </p>
  );
}
