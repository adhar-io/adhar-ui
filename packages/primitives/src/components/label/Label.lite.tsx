import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  className?: string;
  children?: any;
}

export default function Label(props: LabelProps) {
  return (
    <label className={props.className} htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
}
