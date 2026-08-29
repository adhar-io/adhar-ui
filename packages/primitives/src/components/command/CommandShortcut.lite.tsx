import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandShortcutProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function CommandShortcut(props: CommandShortcutProps) {
  return (
    <span className={props.className} aria-label={props['aria-label']}>
      {props.children}
    </span>
  );
}
