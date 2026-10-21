import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandShortcutVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-shortcut' },
});

export interface CommandShortcutProps {
  className?: string;
  'aria-label'?: string;
  children?: any;
}

export default function CommandShortcut(props: CommandShortcutProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandShortcutVariants(), props.className);
    },
  });

  return (
    <span className={state.classes} aria-label={props['aria-label']}>
      {props.children}
    </span>
  );
}
