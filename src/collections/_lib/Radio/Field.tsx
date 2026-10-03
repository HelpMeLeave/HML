'use client'
import { Required } from '@/collections/_lib/Required'
import { cn } from '@/lib/cn'
import { toTitleCase } from '@/lib/textCasing'
import type { FieldCustomLayout } from '@/payload-types'
import { fieldBaseClass, useField, useForm } from '@payloadcms/ui'
import { Radio } from '@payloadcms/ui/fields/RadioGroup/Radio'
import type { RadioFieldClientProps } from 'payload'
import { optionIsObject } from 'payload/shared'

const baseClass = 'radio-group'

const RadioFieldEl = (
  props: RadioFieldClientProps & {
    labelSize: FieldCustomLayout['labelSize']
  }
) => {
  const { field, path: pathFromProps, readOnly } = props

  const {
    admin: { className, layout } = {
      layout: 'horizontal',
    },
    required,
    options,
    label,
  } = field

  const { uuid } = useForm()

  const {
    disabled,
    path,
    setValue,
    showError,
    value: valueFromContext,
  } = useField<string>({
    potentiallyStalePath: pathFromProps,
  })

  return (
    <fieldset
      className={cn(
        fieldBaseClass,
        baseClass,
        className,
        `${baseClass}--layout-${layout ?? 'horizontal'}`,
        showError && 'error',
        (readOnly || disabled) && `${baseClass}--read-only`
      )}>
      <legend className='field-label'>
        {String(label) ?? field.name}
        {required && <Required />}
      </legend>
      <div
        className={`${fieldBaseClass}__wrap`}
        style={{
          marginTop: '0.25rem',
        }}>
        <ul
          className={`${baseClass}--group`}
          id={`field-${path.replace(/\./g, '__')}`}>
          {options.map((option, i) => {
            let optionValue = ''
            const optionObject = {
              label: '',
              value: '',
            }
            if (optionIsObject(option)) {
              optionValue = option.value
              Object.assign(optionObject, option)
            } else {
              optionValue = option
              optionObject.label = toTitleCase(option)
              optionObject.value = option
            }

            const isSelected = String(optionValue) === String(valueFromContext)

            return (
              <li key={`${path} - ${optionValue}`}>
                <Radio
                  isSelected={isSelected}
                  id={i.toString()}
                  onChange={(e) => {
                    setValue(e)
                  }}
                  option={optionObject}
                  path={path}
                  readOnly={readOnly || disabled}
                  uuid={uuid}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {field.admin?.description && (
        <p className='field-description'>{field.admin.description.toString()}</p>
      )}
    </fieldset>
  )
}

export default RadioFieldEl
