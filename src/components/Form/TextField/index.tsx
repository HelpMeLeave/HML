import { getLabelType, processFieldName } from '@/components/Form/TextField/_lib'
import type { TextFieldProps } from '@/components/Form/TextField/_types'
import { FieldError } from '@/components/Form/TextField/FieldError'
import { TextLabel } from '@/components/Form/TextField/TextLabel'
import { WrapperField } from '@/components/Form/TextField/WrapperField'
import { cn } from '@/lib/cn'

export const TextField = (props: TextFieldProps) => {
  const { Label, Icon, error, ...rest } = props

  const labelType = getLabelType(Label)
  const newIdName = processFieldName(props.name, props.id)

  return (
    <div
      className={cn(
        `field-type text`,
        props.disabled && 'read-only',
        Boolean(error) && 'error',
        Boolean(Icon) && 'text--with-icon'
      )}
      style={
        {
          '--field-width': '75px',
          flex: '1 1 min-content',
          ...props.style,
        } as React.CSSProperties
      }>
      {labelType == 'object' && (
        <TextLabel {...(Label as Exclude<TextFieldProps['Label'], ReactNode>)} />
      )}
      {labelType == 'string' && (
        <TextLabel
          required={props.required}
          htmlFor={props.id ?? props.name}
          value={Label as string}
        />
      )}
      <WrapperField Icon={Icon}>
        <input
          {...rest}
          defaultValue={props.defaultValue ?? undefined}
          name={newIdName}
          id={newIdName}
          className={cn(
            props.readOnly && 'read-only',
            props.disabled && 'disabled',
            props.className
          )}
        />
        <FieldError error={error} />
      </WrapperField>
    </div>
  )
}
