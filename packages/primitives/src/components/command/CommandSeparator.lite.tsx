import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandSeparatorVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-separator' },
});

export interface CommandSeparatorProps {
  className?: string;
}

export default function CommandSeparator(props: CommandSeparatorProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandSeparatorVariants(), props.className);
    },
  });

  return <div role='separator' aria-orientation='horizontal' className={state.classes} />;
}
