import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DialogFooterProps {
  className?: string;
  children?: any;
}

export default function DialogFooter(props: DialogFooterProps) {
  return (
    <div className={props.className}>
      {props.children}
    </div>
  );
}
