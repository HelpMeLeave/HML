import type { FormField, labelFieldType, widthFieldType } from '@/_components/blocks/Form/types'
import { cn } from '@/lib/cn'

export const Field = ({
  label,
  name,
  children,
  width,
  required = false,
  error,
}: {
  required: boolean
  width?: widthFieldType
  children: ReactNode
  label?: labelFieldType
  name: string
  type: FormField['blockType']
  error?: string
  unstyled?: boolean
}) => {
  return (
    <div
      style={{
        width: `${width ?? 100}%`,
        flex: `1 1 ${width ?? 100}%`,
      }}
      data-slot={'field-wrapper'}
      className={cn('form-field')}>
      <FieldLabel
        label={label}
        name={name}
        astrickPosition='right'
        required={required}
      />
      <FieldInputWrapper className={''}>{children}</FieldInputWrapper>
      <FieldError error={error} />
    </div>
  )
}

const FieldError = ({ error }: { error?: string }) =>
  error && <p className='col-start-2 mt-0.5 pr-2 pl-4 text-sm text-red-400'>{error}</p>

const RequiredAstrick = ({ required }: { required: boolean }) => {
  return required && <span className='text-red-400'> *</span>
}

export const FieldLabel = ({
  name,
  required,
  astrickPosition,
  label,
  ...props
}: Props<'label'> & {
  name: string
  required?: boolean | null
  astrickPosition?: 'left' | 'right'
  label?: ReactNode
}) =>
  label && (
    <label
      data-slot='field-label'
      htmlFor={`field-${name}`}
      className={cn('block text-sm/6 font-medium', props.className)}>
      {!!required && astrickPosition == 'left' && <RequiredAstrick required={required} />}
      <span className='text-balance'>{label}</span>
      {!!required && astrickPosition != 'left' && <RequiredAstrick required={required} />}
    </label>
  )

const FieldInputWrapper = (props: Props) => (
  <div
    data-slot='input-wrapper'
    {...props}
  />
)

export const FieldSet = ({
  children,
  error,
  className,
  label,
  required,
}: {
  required?: boolean
  children: ReactNode
  error?: string
  className?: Props['className']
  label: ReactNode
}) => {
  return (
    <fieldset className={cn('basis-full', className)}>
      <legend className='form-label -ml-2 text-lg font-medium'>
        {label}
        <RequiredAstrick required={required ?? false} />
      </legend>
      {error && <p className='mt-0.5 text-sm text-red-400 dark:text-red-600'>{error}</p>}
      {children}
    </fieldset>
  )
}
