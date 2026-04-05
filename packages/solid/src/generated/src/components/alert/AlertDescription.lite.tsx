// @ts-nocheck
export interface AlertDescriptionProps {
  className?: string;
  children?: any;
}

function AlertDescription(props: AlertDescriptionProps) {
  return <div class={props.className}>{props.children}</div>;
}

export default AlertDescription;
