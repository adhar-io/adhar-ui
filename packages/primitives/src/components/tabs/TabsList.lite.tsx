import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TabsListProps {
  className?: string;
  children?: any;
}

export default function TabsList(props: TabsListProps) {
  return (
    <div className={props.className} role='tablist'>
      {props.children}
    </div>
  );
}
