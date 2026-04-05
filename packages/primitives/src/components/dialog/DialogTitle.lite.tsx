import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DialogTitleProps {
  className?: string;
  children?: any;
}

export default function DialogTitle(props: DialogTitleProps) {
  return (
    <h2 className={props.className}>
      {props.children}
    </h2>
  );
}
