import type { TextFieldProps } from '@/components/Form/TextField/_types'
import { cn } from '@/lib/cn'

export const TextLabel = (props: Exclude<TextFieldProps['Label'], ReactNode>) => {
  return (
    <label
      className={cn('field-label', props.className)}
      htmlFor={`field-${props.htmlFor}`}>
      {props.value}
      {props.required && <span className='required'>*</span>}
    </label>
  )
}
