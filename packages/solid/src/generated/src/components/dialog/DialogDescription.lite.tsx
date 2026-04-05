// @ts-nocheck
export interface DialogDescriptionProps {
  className?: string;
  children?: any;
}

function DialogDescription(props: DialogDescriptionProps) {
  return <p class={props.className}>{props.children}</p>;
}

export default DialogDescription;
