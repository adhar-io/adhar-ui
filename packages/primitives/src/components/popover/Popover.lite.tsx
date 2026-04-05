import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface PopoverProps {
  open?: boolean;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  onOpenChange?: (open: boolean) => void;
  trigger?: any;
  children?: any;
}

export default function Popover(props: PopoverProps) {
  const state = useState({
    get isOpen() {
      return props.open || false;
    },
    toggle() {
      props.onOpenChange?.(!state.isOpen);
    },
    handleKeyDown(event: any) {
      if (event.key === 'Escape') {
        props.onOpenChange?.(false);
      }
    },
  });

  return (
    <div className={props.className} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type='button'
        className={props.triggerClass}
        aria-expanded={state.isOpen}
        aria-haspopup='dialog'
        onClick={() => state.toggle()}
      >
        {props.trigger}
      </button>
      {state.isOpen
        ? (
          <div
            className={props.contentClass}
            role='dialog'
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
