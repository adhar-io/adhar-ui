import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export default function DropdownMenuSeparator(props: DropdownMenuSeparatorProps) {
  return <div className={props.className} role='separator' />;
}
