import { useMetadata, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { commandInputVariants, commandInputWrapperVariants } from './command.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-command-input' },
});

export interface CommandInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  wrapperClass?: string;
  'aria-label'?: string;
  /** ID of the listbox this input controls (for combobox semantics) */
  'aria-controls'?: string;
  /** ID of the highlighted CommandItem, so screen readers follow the highlight */
  'aria-activedescendant'?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: any) => void;
}

export default function CommandInput(props: CommandInputProps) {
  const state = useStore({
    get classes(): string {
      return cn(commandInputVariants(), props.className);
    },
    get wrapperClasses(): string {
      return cn(commandInputWrapperVariants(), props.wrapperClass);
    },
    handleInput(event: any) {
      props.onValueChange?.(event.target.value);
    },
  });

  return (
    <div className={state.wrapperClasses}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='shrink-0 text-muted-foreground'
        aria-hidden='true'
      >
        <circle cx='11' cy='11' r='8' />
        <path d='m21 21-4.3-4.3' />
      </svg>
      <input
        type='text'
        role='combobox'
        aria-expanded='true'
        aria-autocomplete='list'
        aria-controls={props['aria-controls']}
        aria-activedescendant={props['aria-activedescendant']}
        aria-label={props['aria-label'] || 'Search'}
        className={state.classes}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        autoComplete='off'
        autoCorrect='off'
        spellcheck={false}
        onInput={(event) => state.handleInput(event)}
        onKeyDown={(event) => props.onKeyDown?.(event)}
      />
    </div>
  );
}
