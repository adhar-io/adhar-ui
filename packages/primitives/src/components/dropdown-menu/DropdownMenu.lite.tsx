import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DropdownMenuProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

export default function DropdownMenu(props: DropdownMenuProps) {
  const state = useState({
    get isOpen() {
      return props.open || false;
    },
    toggle() {
      props.onOpenChange?.(!state.isOpen);
    },
    close() {
      props.onOpenChange?.(false);
    },
    handleKeyDown(event: any) {
      if (event.key === 'Escape') {
        state.close();
      }
    },
  });

  return (
    <div className={props.className} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type='button'
        className={props.triggerClass}
        aria-expanded={state.isOpen}
        aria-haspopup='menu'
        onClick={() => state.toggle()}
      >
        {props.trigger}
      </button>
      {state.isOpen
        ? (
          <div
            className={props.contentClass}
            role='menu'
            onKeyDown={(event) => state.handleKeyDown(event)}
            tabIndex={-1}
          >
            {props.children}
          </div>
        )
        : null}
    </div>
  );
}
