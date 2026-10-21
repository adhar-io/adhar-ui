import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { stepperVariants } from './stepper.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-stepper' },
});

export interface StepperProps {
  /** Pass the same orientation to each Step */
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Stepper(props: StepperProps) {
  const state = useStore({
    get classes(): string {
      return cn(stepperVariants({ orientation: props.orientation }), props.className);
    },
  });

  return (
    <ol
      className={state.classes}
      aria-label={props['aria-label'] || 'Progress'}
      data-orientation={props.orientation || 'horizontal'}
    >
      {props.children}
    </ol>
  );
}
