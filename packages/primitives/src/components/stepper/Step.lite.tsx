import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import {
  stepConnectorClass,
  stepDescriptionVariants,
  stepIndicatorClass,
  stepLabelClass,
  stepVariants,
} from './stepper.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-step' },
});

export interface StepProps {
  state?: 'complete' | 'current' | 'upcoming' | 'error';
  /** Number shown in the indicator when not complete */
  stepNumber?: number;
  label?: string;
  description?: string;
  /** Match the parent Stepper’s orientation */
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'default' | 'lg';
  /** Hide the trailing connector on the last step */
  last?: boolean;
  /** Lets users jump to this step via the indicator */
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
  const state = useStore({
    get stepState(): 'complete' | 'current' | 'upcoming' | 'error' {
      return props.state || 'upcoming';
    },
    get classes(): string {
      return cn(stepVariants({ orientation: props.orientation }), props.className);
    },
    get indicatorClasses(): string {
      return cn(
        stepIndicatorClass(state.stepState, props.size),
        props.clickable
          ? 'cursor-pointer hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          : 'cursor-default',
        props.indicatorClass,
      );
    },
    get connectorClasses(): string {
      return cn(
        stepConnectorClass(state.stepState, props.orientation),
        props.connectorClass,
      );
    },
    get labelClasses(): string {
      return cn(stepLabelClass(state.stepState), 'block', props.labelClass);
    },
    get descriptionClasses(): string {
      return cn(stepDescriptionVariants(), 'block', props.descriptionClass);
    },
    get statusText(): string {
      if (state.stepState === 'complete') return 'Completed';
      if (state.stepState === 'current') return 'Current step';
      if (state.stepState === 'error') return 'Error';
      return 'Not started';
    },
  });

  return (
    <li
      className={state.classes}
      aria-current={state.stepState === 'current' ? 'step' : undefined}
      data-state={state.stepState}
    >
      <button
        type='button'
        className={state.indicatorClasses}
        disabled={!props.clickable}
        aria-label={props.label ? props.label + ', ' + state.statusText : state.statusText}
        onClick={() => props.onSelect?.()}
      >
        <Show when={state.stepState === 'complete'}>
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
        <Show when={state.stepState === 'error'}>
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
            <path d='M18 6 6 18' />
            <path d='m6 6 12 12' />
          </svg>
        </Show>
        <Show when={state.stepState === 'current' || state.stepState === 'upcoming'}>
          <span aria-hidden='true'>{props.stepNumber}</span>
        </Show>
      </button>
      <div className='min-w-0'>
        <Show when={props.label}>
          <span className={state.labelClasses} aria-hidden='true'>{props.label}</span>
        </Show>
        <Show when={props.description}>
          <span className={state.descriptionClasses}>{props.description}</span>
        </Show>
        {props.children}
      </div>
      <Show when={!props.last}>
        <span className={state.connectorClasses} aria-hidden='true' />
      </Show>
    </li>
  );
}
