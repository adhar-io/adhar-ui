// @ts-nocheck
export interface DialogHeaderProps {
  className?: string;
  children?: any;
}

function DialogHeader(props: DialogHeaderProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default DialogHeader;
