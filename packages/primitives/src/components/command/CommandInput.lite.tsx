import { useMetadata } from '@builder.io/mitosis';

useMetadata({
  isAttachedToShadowDom: false,
});

export interface CommandInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  wrapperClass?: string;
  'aria-label'?: string;
  /** ID of the listbox this input controls (for combobox semantics) */
  'aria-controls'?: string;
  onValueChange?: (value: string) => void;
  onKeyDown?: (event: any) => void;
}

export default function CommandInput(props: CommandInputProps) {
  return (
    <div className={props.wrapperClass}>
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
        aria-label={props['aria-label'] || 'Search'}
        className={props.className}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        autoComplete='off'
        autoCorrect='off'
        spellcheck={false}
        onInput={(event) => props.onValueChange?.(event.target.value)}
        onKeyDown={(event) => props.onKeyDown?.(event)}
      />
    </div>
  );
}
