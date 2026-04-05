import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DialogHeaderProps {
  className?: string;
  children?: any;
}

export default function DialogHeader(props: DialogHeaderProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
