// @ts-nocheck
import { Show } from 'solid-js';

export interface SheetProps {
  open?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  overlayClass?: string;
  contentClass?: string;
  onClose?: () => void;
  children?: any;
}

function Sheet(props: SheetProps) {
  return (
    <div>
      <Show when={props.open}>
        <div
          class={props.overlayClass}
          onClick={(event) => handleOverlayClick(event)}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          <div
            class={props.contentClass}
            role='dialog'
            aria-modal='true'
            data-side={props.side || 'right'}
            tabIndex={-1}
          >
            {props.children}
            <button
              type='button'
              aria-label='Close'
              onClick={(event) => props.onClose?.()}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                aria-hidden='true'
              >
                <path d='M18 6 6 18'></path>
                <path d='m6 6 12 12'></path>
              </svg>
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default Sheet;
