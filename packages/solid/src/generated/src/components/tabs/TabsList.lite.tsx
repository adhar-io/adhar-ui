// @ts-nocheck
export interface TabsListProps {
  className?: string;
  children?: any;
}

function TabsList(props: TabsListProps) {
  return (
    <div class={props.className} role="tablist">
      {props.children}
    </div>
  );
}

export default TabsList;
