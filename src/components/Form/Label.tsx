import { cn } from '@/lib/cn'

export const Label = ({ text, ...props }: Props<'label'> & { text?: string }) => {
  return (
    <label
      {...props}
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        '*:disabled:opacity-70 has-disabled:cursor-not-allowed',
        // stretch alignment only when wrapping a checkbox, so the box fills the row height
        'flex items-center gap-2 has-[input[type="checkbox"]]:items-stretch *:[button]:click',
        props.className
      )}>
      {text && (
        <span>
          {text} {props['aria-required'] && <span className='align-middle text-red-500'>*</span>}
        </span>
      )}
      {props.children}
    </label>
  )
}
