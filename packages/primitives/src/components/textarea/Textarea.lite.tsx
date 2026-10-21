import { onMount, onUpdate, useMetadata, useRef, useStore } from '@builder.io/mitosis';
import { cn } from '@adhar-ui/utils';
import { textareaVariants } from './textarea.styles.ts';

useMetadata({
  isAttachedToShadowDom: false,
  angular: { selector: 'adhar-textarea' },
});

export interface TextareaProps {
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Initial value when uncontrolled */
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  /** @deprecated Use `readOnly` */
  readonly?: boolean;
  required?: boolean;
  /** Marks the field as invalid: destructive border + aria-invalid */
  invalid?: boolean;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  /** Grow with the content instead of scrolling (up to `maxRows` if set) */
  autoResize?: boolean;
  /** Row cap for `autoResize` */
  maxRows?: number;
  size?: 'sm' | 'default' | 'lg';
  name?: string;
  id?: string;
  form?: string;
  autoFocus?: boolean;
  spellcheck?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean;
  onChange?: (event: any) => void;
  onInput?: (event: any) => void;
  /** Fires on every keystroke with the current string value */
  onValueChange?: (value: string) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
}

export default function Textarea(props: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const state = useStore({
    get classes(): string {
      return cn(
        textareaVariants({ size: props.size }),
        props.autoResize ? 'resize-none overflow-hidden' : '',
        props.className,
      );
    },
    resize() {
      const el = textareaRef;
      if (!props.autoResize || !el) return;
      el.style.height = 'auto';
      let next = el.scrollHeight;
      if (props.maxRows) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
        const cap = lineHeight * props.maxRows + (el.offsetHeight - el.clientHeight) + 16;
        if (next > cap) {
          next = cap;
          el.style.overflowY = 'auto';
        } else {
          el.style.overflowY = 'hidden';
        }
      }
      el.style.height = next + 'px';
    },
    handleInput(event: any) {
      props.onInput?.(event);
      props.onValueChange?.(event.target.value);
      state.resize();
    },
  });

  onMount(() => {
    state.resize();
  });

  onUpdate(() => {
    state.resize();
  }, [props.value]);

  return (
    <textarea
      ref={textareaRef}
      className={state.classes}
      placeholder={props.placeholder}
      value={props.value}
      defaultValue={props.defaultValue}
      disabled={props.disabled}
      readOnly={props.readOnly || props.readonly}
      required={props.required}
      rows={props.rows || 3}
      maxLength={props.maxLength}
      minLength={props.minLength}
      name={props.name}
      id={props.id}
      form={props.form}
      autoFocus={props.autoFocus}
      spellcheck={props.spellcheck}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
      aria-describedby={props['aria-describedby']}
      aria-invalid={props.invalid || props['aria-invalid'] ? true : undefined}
      onChange={(event) => props.onChange?.(event)}
      onInput={(event) => state.handleInput(event)}
      onFocus={(event) => props.onFocus?.(event)}
      onBlur={(event) => props.onBlur?.(event)}
      onKeyDown={(event) => props.onKeyDown?.(event)}
    />
  );
}
