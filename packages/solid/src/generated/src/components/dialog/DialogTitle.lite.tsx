// @ts-nocheck
export interface DialogTitleProps {
  className?: string;
  children?: any;
}

function DialogTitle(props: DialogTitleProps) {
  return <h2 class={props.className}>{props.children}</h2>;
}

export default DialogTitle;
