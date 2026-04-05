import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DropdownMenuItemProps {
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: any;
}

export default function DropdownMenuItem(props: DropdownMenuItemProps) {
  return (
    <div
      className={props.className}
      role='menuitem'
      tabIndex={props.disabled ? -1 : 0}
      aria-disabled={props.disabled}
      onClick={() => {
        if (!props.disabled) {
          props.onClick?.();
        }
      }}
      onKeyDown={(event: any) => {
        if ((event.key === 'Enter' || event.key === ' ') && !props.disabled) {
          event.preventDefault();
          props.onClick?.();
        }
      }}
    >
      {props.children}
    </div>
  );
}
