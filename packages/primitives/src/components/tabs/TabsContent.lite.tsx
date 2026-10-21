import { Show, useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { tabsContentVariants } from './tabs.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-tabs-content' },
});

export interface TabsContentProps {
  value: string;
  active?: boolean;
  /** Keep inactive panels mounted (hidden) to preserve their state */
  forceMount?: boolean;
  className?: string;
  id?: string;
  /** ID of the TabsTrigger that labels this panel */
  'aria-labelledby'?: string;
  children?: any;
}

export default function TabsContent(props: TabsContentProps) {
  const state = useStore({
    get classes(): string {
      return cn(tabsContentVariants(), props.className);
    },
  });

  return (
    <div
      role='tabpanel'
      className={state.classes}
      id={props.id}
      aria-labelledby={props['aria-labelledby']}
      data-value={props.value}
      data-state={props.active ? 'active' : 'inactive'}
      hidden={!props.active}
      tabIndex={0}
    >
      <Show when={props.active || props.forceMount}>{props.children}</Show>
    </div>
  );
}
