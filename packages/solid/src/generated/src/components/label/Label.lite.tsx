// @ts-nocheck
export interface LabelProps {
  /** ID of the form control this label is bound to (compiles to `for` per framework) */
  htmlFor?: string;
  className?: string;
  children?: any;
}

function Label(props: LabelProps) {
  return (
    <label class={props.className} for={props.htmlFor}>
      {props.children}
    </label>
  );
}

export default Label;
