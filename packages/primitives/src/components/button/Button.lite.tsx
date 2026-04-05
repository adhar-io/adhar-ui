import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (event: any) => void;
  children?: any;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      type={props.type || 'button'}
      aria-disabled={props.disabled}
      onClick={(event) => props.onClick?.(event)}
    >
      {props.children}
    </button>
  );
}
