import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export default function Separator(props: SeparatorProps) {
  return (
    <div
      className={props.className}
      role='separator'
      aria-orientation={props.orientation || 'horizontal'}
    />
  );
}
