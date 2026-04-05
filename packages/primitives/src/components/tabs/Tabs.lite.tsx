import { useMetadata, useState } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  children?: any;
}

export default function Tabs(props: TabsProps) {
  const state = useState({
    get activeTab() {
      return props.value || props.defaultValue || '';
    },
  });

  return (
    <div className={props.className} data-active-tab={state.activeTab}>
      {props.children}
    </div>
  );
}
