import { onInit, onUnMount, Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn, generateId } from '@adhar-ui/utils';
import { tooltipContentVariants } from './tooltip.styles.ts';
import { placementVariants } from '../_internal/placement.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-tooltip' },
});

export interface TooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  /** Hover delay in ms before showing (default 300). Keyboard focus shows immediately. */
  delay?: number;
  /** Suppress the tooltip (e.g. while a menu it labels is open) */
  disabled?: boolean;
  /** Content id; generated when omitted */
  id?: string;
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  children?: any;
}

// Shows on hover (after `delay`) and on keyboard focus, hides on Escape. The
// pointer can move onto the tooltip without it closing (WCAG 1.4.13).
export default function Tooltip(props: TooltipProps) {
  const state = useStore({
    visible: false,
    generatedId: '',
    inst: { timer: 0 as any },
    get tooltipId(): string {
      return props.id || state.generatedId;
    },
    get resolvedSide(): 'top' | 'right' | 'bottom' | 'left' {
      return props.side || 'top';
    },
    get rootClasses(): string {
      return cn('relative inline-block', props.className);
    },
    get contentClasses(): string {
      return cn(
        placementVariants({ side: state.resolvedSide, align: props.align }),
        tooltipContentVariants(),
        'w-max max-w-xs',
        props.contentClass,
      );
    },
    clearTimer() {
      if (state.inst.timer) clearTimeout(state.inst.timer);
      state.inst.timer = 0;
    },
    show(immediate: boolean) {
      if (props.disabled || !props.content) return;
      state.clearTimer();
      const delay = props.delay === undefined ? 300 : props.delay;
      if (immediate || delay <= 0) {
        state.visible = true;
      } else {
        state.inst.timer = setTimeout(() => {
          state.visible = true;
        }, delay);
      }
    },
    hide() {
      state.clearTimer();
      state.visible = false;
    },
    handleKeyDown(event: any) {
      if (event.key === 'Escape' && state.visible) {
        event.stopPropagation();
        state.hide();
      }
    },
  });

  onInit(() => {
    state.generatedId = generateId('adhar-tooltip');
  });

  onUnMount(() => {
    state.clearTimer();
  });

  return (
    <div
      className={state.rootClasses}
      onMouseEnter={() => state.show(false)}
      onMouseLeave={() => state.hide()}
      onKeyDown={(event) => state.handleKeyDown(event)}
    >
      <div
        className={props.triggerClass}
        onFocusIn={() => state.show(true)}
        onFocusOut={() => state.hide()}
        aria-describedby={state.visible ? state.tooltipId : undefined}
      >
        {props.children}
      </div>
      <Show when={state.visible}>
        <div
          id={state.tooltipId}
          className={state.contentClasses}
          role='tooltip'
          data-state='open'
          data-side={state.resolvedSide}
        >
          {props.content}
        </div>
      </Show>
    </div>
  );
}
