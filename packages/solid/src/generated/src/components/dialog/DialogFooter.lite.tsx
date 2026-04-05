// @ts-nocheck
export interface DialogFooterProps {
  className?: string;
  children?: any;
}

function DialogFooter(props: DialogFooterProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default DialogFooter;
