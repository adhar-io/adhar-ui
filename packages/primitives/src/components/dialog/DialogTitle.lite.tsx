import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { dialogTitleVariants } from './dialog.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-dialog-title' },
});

export interface DialogTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Dialog as `aria-labelledby` so it is announced on open.
export default function DialogTitle(props: DialogTitleProps) {
  const state = useStore({
    get classes(): string {
      return cn(dialogTitleVariants(), props.className);
    },
  });

  return (
    <h2 className={state.classes} id={props.id}>
      {props.children}
    </h2>
  );
}
