// @ts-nocheck
export interface AlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  className?: string;
  children?: any;
}

function Alert(props: AlertProps) {
  return (
    <div class={props.className} role='alert'>
      {props.children}
    </div>
  );
}

export default Alert;
