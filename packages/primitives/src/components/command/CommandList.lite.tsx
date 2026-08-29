import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandListProps {
  id?: string;
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function CommandList(props: CommandListProps) {
  return (
    <div
      id={props.id}
      role='listbox'
      aria-label={props['aria-label'] || 'Suggestions'}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
