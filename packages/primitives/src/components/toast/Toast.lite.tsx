import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface ToastProps {
  open?: boolean;
  variant?: 'default' | 'destructive' | 'success';
  className?: string;
  titleClass?: string;
  descriptionClass?: string;
  closeClass?: string;
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  children?: any;
}

export default function Toast(props: ToastProps) {
  const state = useState({
    get isOpen() {
      return props.open !== false;
    },
  });

  return (
    <div>
      {state.isOpen
        ? (
          <div
            className={props.className}
            role='status'
            aria-live='polite'
            aria-atomic='true'
          >
            <div>
              {props.title ? <div className={props.titleClass}>{props.title}</div> : null}
              {props.description
                ? <div className={props.descriptionClass}>{props.description}</div>
                : null}
              {props.children}
            </div>
            <button
              type='button'
              className={props.closeClass}
              aria-label='Close'
              onClick={() => props.onClose?.()}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        )
        : null}
    </div>
  );
}
