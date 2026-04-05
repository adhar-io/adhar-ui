import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface TabsContentProps {
  value: string;
  active?: boolean;
  className?: string;
  children?: any;
}

export default function TabsContent(props: TabsContentProps) {
  return (
    <div
      role='tabpanel'
      className={props.className}
      data-value={props.value}
      hidden={!props.active}
      tabIndex={0}
    >
      {props.active ? props.children : null}
    </div>
  );
}
