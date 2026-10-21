import { useMetadata, useRef, useStore } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-tabs' },
});

export interface TabsProps {
  /** The active tab’s value */
  value?: string;
  /** @deprecated Pass `value`; kept for data-active-tab on first render */
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  id?: string;
  /**
   * Fires with a tab’s value when the user activates it (click, or arrow keys
   * in TabsList). Lets the root own selection instead of every trigger’s onClick.
   */
  onValueChange?: (value: string) => void;
  /** Alias of `onValueChange` */
  onChange?: (value: string) => void;
  children?: any;
}

export default function Tabs(props: TabsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const state = useStore({
    get activeTab(): string {
      return props.value || props.defaultValue || '';
    },
    handleClick(event: any) {
      const tab = event.target.closest ? event.target.closest('[role="tab"]') : null;
      if (!tab || tab.disabled || !rootRef || !rootRef.contains(tab)) return;
      /* Ignore tabs that belong to a nested Tabs. */
      if (tab.closest('[data-adhar-tabs]') !== rootRef) return;
      const value = tab.getAttribute('data-value') || '';
      if (value === state.activeTab) return;
      props.onValueChange?.(value);
      props.onChange?.(value);
    },
  });

  return (
    <div
      ref={rootRef}
      className={props.className}
      id={props.id}
      data-adhar-tabs=''
      data-active-tab={state.activeTab}
      data-orientation={props.orientation || 'horizontal'}
      onClick={(event) => state.handleClick(event)}
    >
      {props.children}
    </div>
  );
}
