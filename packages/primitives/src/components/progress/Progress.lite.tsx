import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { progressIndicatorVariants, progressVariants } from './progress.styles.ts';
import { clamp } from '../_internal/dom.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-progress' },
});

export interface ProgressProps {
  /** Current value. Omit (or pass null) for an indeterminate, busy bar. */
  value?: number | null;
  max?: number;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  indicatorClass?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** Human-readable value, e.g. "3 of 10 files" (defaults to the percentage) */
  'aria-valuetext'?: string;
}

export default function Progress(props: ProgressProps) {
  const state = useStore({
    get isIndeterminate(): boolean {
      return props.value === undefined || props.value === null;
    },
    get maxValue(): number {
      return props.max && props.max > 0 ? props.max : 100;
    },
    get percent(): number {
      if (state.isIndeterminate) return 0;
      return clamp(((props.value as number) / state.maxValue) * 100, 0, 100);
    },
    get classes(): string {
      return cn(progressVariants({ size: props.size }), props.className);
    },
    get indicatorClasses(): string {
      return cn(
        progressIndicatorVariants(),
        state.isIndeterminate ? 'animate-pulse motion-reduce:animate-none' : '',
        props.indicatorClass,
      );
    },
    get indicatorTransform(): string {
      return state.isIndeterminate
        ? 'translateX(0)'
        : 'translateX(-' + (100 - state.percent) + '%)';
    },
    get percentText(): string | undefined {
      return state.isIndeterminate ? undefined : Math.round(state.percent) + '%';
    },
  });

  return (
    <div
      className={state.classes}
      role='progressbar'
      aria-valuenow={state.isIndeterminate ? undefined : (props.value as number)}
      aria-valuemin={0}
      aria-valuemax={state.maxValue}
      aria-valuetext={props['aria-valuetext'] || state.percentText}
      aria-busy={state.isIndeterminate ? true : undefined}
      aria-label={props['aria-labelledby'] ? undefined : props['aria-label'] || 'Progress'}
      aria-labelledby={props['aria-labelledby']}
      data-state={state.isIndeterminate
        ? 'indeterminate'
        : state.percent >= 100
        ? 'complete'
        : 'loading'}
    >
      <div className={state.indicatorClasses} style={{ transform: state.indicatorTransform }} />
    </div>
  );
}
