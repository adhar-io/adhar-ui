import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface StepperProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function Stepper(props: StepperProps) {
  return (
    <ol
      className={props.className}
      aria-label={props['aria-label'] || 'Progress'}
      data-orientation={props.orientation || 'horizontal'}
    >
      {props.children}
    </ol>
  );
}
