import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface LabelProps {
  for?: string;
  className?: string;
  children?: any;
}

export default function Label(props: LabelProps) {
  return (
    <label className={props.className} htmlFor={props.for}>
      {props.children}
    </label>
  );
}
