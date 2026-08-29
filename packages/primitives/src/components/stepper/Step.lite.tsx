import { Show, useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface StepProps {
  state?: 'complete' | 'current' | 'upcoming' | 'error';
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Hide the trailing connector on the last step */
  last?: boolean;
  clickable?: boolean;
  className?: string;
  indicatorClass?: string;
  connectorClass?: string;
  labelClass?: string;
  descriptionClass?: string;
  onSelect?: () => void;
  children?: any;
}

export default function Step(props: StepProps) {
  return (
    <li
      className={props.className}
      aria-current={props.state === 'current' ? 'step' : undefined}
    >
      <button
        type='button'
        className={props.indicatorClass}
        disabled={!props.clickable}
        aria-label={props.label}
        onClick={() => props.onSelect?.()}
      >
        <Show when={props.state === 'complete'}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
            strokeLinejoin='round'
            aria-hidden='true'
          >
            <path d='M20 6 9 17l-5-5' />
          </svg>
        </Show>
        <Show when={props.state !== 'complete'}>
          <span>{props.stepNumber}</span>
        </Show>
      </button>

      <div>
        <Show when={props.label}>
          <span className={props.labelClass}>{props.label}</span>
        </Show>
        <Show when={props.description}>
          <span className={props.descriptionClass}>{props.description}</span>
        </Show>
        {props.children}
      </div>

      <Show when={!props.last}>
        <span className={props.connectorClass} aria-hidden='true' />
      </Show>
    </li>
  );
}
