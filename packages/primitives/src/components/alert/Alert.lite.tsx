import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface AlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  className?: string;
  children?: any;
}

export default function Alert(props: AlertProps) {
  return (
    <div className={props.className} role='alert'>
      {props.children}
    </div>
  );
}
