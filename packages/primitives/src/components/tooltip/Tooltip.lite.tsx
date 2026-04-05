import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  triggerClass?: string;
  contentClass?: string;
  delay?: number;
  children?: any;
}

export default function Tooltip(props: TooltipProps) {
  const state = useState({
    visible: false,
    handleMouseEnter() {
      state.visible = true;
    },
    handleMouseLeave() {
      state.visible = false;
    },
    handleFocus() {
      state.visible = true;
    },
    handleBlur() {
      state.visible = false;
    },
  });

  return (
    <div className={props.className} style={{ position: 'relative', display: 'inline-block' }}>
      <div
        className={props.triggerClass}
        onMouseEnter={() => state.handleMouseEnter()}
        onMouseLeave={() => state.handleMouseLeave()}
        onFocus={() => state.handleFocus()}
        onBlur={() => state.handleBlur()}
        aria-describedby={state.visible ? 'tooltip-content' : undefined}
      >
        {props.children}
      </div>
      {state.visible
        ? (
          <div
            id='tooltip-content'
            className={props.contentClass}
            role='tooltip'
          >
            {props.content}
          </div>
        )
        : null}
    </div>
  );
}
