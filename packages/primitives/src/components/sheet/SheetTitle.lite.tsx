import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { sheetTitleVariants } from './sheet.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-sheet-title' },
});

export interface SheetTitleProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-labelledby` so it is announced on open.
export default function SheetTitle(props: SheetTitleProps) {
  const state = useStore({
    get classes(): string {
      return cn(sheetTitleVariants(), props.className);
    },
  });

  return (
    <h2 className={state.classes} id={props.id}>
      {props.children}
    </h2>
  );
}
