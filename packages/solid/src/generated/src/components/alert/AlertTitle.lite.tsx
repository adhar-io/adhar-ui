// @ts-nocheck
export interface AlertTitleProps {
  className?: string;
  children?: any;
}

function AlertTitle(props: AlertTitleProps) {
  return <h5 class={props.className}>{props.children}</h5>;
}

export default AlertTitle;
