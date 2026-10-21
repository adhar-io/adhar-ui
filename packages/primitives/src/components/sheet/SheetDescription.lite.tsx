import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { sheetDescriptionVariants } from './sheet.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-sheet-description' },
});

export interface SheetDescriptionProps {
  className?: string;
  id?: string;
  children?: any;
}

// Pass the same `id` to the Sheet as `aria-describedby`.
export default function SheetDescription(props: SheetDescriptionProps) {
  const state = useStore({
    get classes(): string {
      return cn(sheetDescriptionVariants(), props.className);
    },
  });

  return (
    <p className={state.classes} id={props.id}>
      {props.children}
    </p>
  );
}
