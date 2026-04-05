import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DialogProps {
  open?: boolean;
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

export default function Dialog(props: DialogProps) {
  const state = useState({
    handleOverlayClick(event: any) {
      if (event.target === event.currentTarget) {
        props.onClose?.();
      }
    },
    handleKeyDown(event: any) {
      if (event.key === 'Escape') {
        props.onClose?.();
      }
    },
  });

  return (
    <div>
      {props.open
        ? (
          <div
            className={props.overlayClass}
            onClick={(event) => state.handleOverlayClick(event)}
            onKeyDown={(event) => state.handleKeyDown(event)}
          >
            <div
              className={props.contentClass}
              role='dialog'
              aria-modal='true'
              tabIndex={-1}
            >
              {props.children}
            </div>
          </div>
        )
        : null}
    </div>
  );
}
