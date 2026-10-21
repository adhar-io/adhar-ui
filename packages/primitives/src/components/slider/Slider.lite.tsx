import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { sliderVariants } from './slider.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-slider' },
});

export interface SliderProps {
  /** Current value (controlled) */
  value?: number;
  /** Initial value when uncontrolled */
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  name?: string;
  id?: string;
  form?: string;
  /** ID of a <datalist> with tick marks */
  list?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  /** Human-readable value for screen readers (e.g. "$40", "Medium") */
  'aria-valuetext'?: string;
  /** Fires continuously while dragging */
  onInput?: (value: number) => void;
  /** Alias of `onInput` */
  onValueChange?: (value: number) => void;
  /** Fires when the value is committed (drag end / keyboard) */
  onChange?: (value: number) => void;
}

export default function Slider(props: SliderProps) {
  const state = useStore({
    get classes(): string {
      return cn(
        sliderVariants({ size: props.size }),
        props.orientation === 'vertical'
          ? '[writing-mode:vertical-lr] [direction:rtl] h-auto w-5'
          : '',
        props.className,
      );
    },
    handleInput(event: any) {
      const next = Number(event.target.value);
      props.onInput?.(next);
      props.onValueChange?.(next);
    },
  });

  return (
    <input
      type='range'
      className={state.classes}
      min={props.min === undefined ? 0 : props.min}
      max={props.max === undefined ? 100 : props.max}
      step={props.step || 1}
      value={props.value}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      name={props.name}
      id={props.id}
      form={props.form}
      list={props.list}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      aria-valuetext={props['aria-valuetext']}
      aria-orientation={props.orientation || 'horizontal'}
      onInput={(event) => state.handleInput(event)}
      onChange={(event) => props.onChange?.(Number(event.target.value))}
    />
  );
}
