// @ts-nocheck
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  children?: any;
}

function Tabs(props: TabsProps) {
  return (
    <div class={props.className} data-active-tab={activeTab}>
      {props.children}
    </div>
  );
}

export default Tabs;
