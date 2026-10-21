import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { tabsTriggerVariants } from './tabs.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-tabs-trigger' },
});

export interface TabsTriggerProps {
  value: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  /** Give the trigger an id and pass it to TabsContent `aria-labelledby` */
  id?: string;
  /** ID of the TabsContent this trigger shows */
  'aria-controls'?: string;
  onClick?: (value: string) => void;
  children?: any;
}

export default function TabsTrigger(props: TabsTriggerProps) {
  const state = useStore({
    get classes(): string {
      return cn(tabsTriggerVariants(), props.className);
    },
  });

  return (
    <button
      type='button'
      role='tab'
      className={state.classes}
      id={props.id}
      aria-selected={props.active ? true : false}
      aria-controls={props['aria-controls']}
      disabled={props.disabled}
      tabIndex={props.active ? 0 : -1}
      data-value={props.value}
      data-state={props.active ? 'active' : 'inactive'}
      onClick={() => props.onClick?.(props.value)}
    >
      {props.children}
    </button>
  );
}
