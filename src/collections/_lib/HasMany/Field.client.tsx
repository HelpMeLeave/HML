'use client'

import { cn } from '@/lib/cn'
import { X } from '@boxicons-pro/react'
import { Button, useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { useRef, useState } from 'react'

export const HasManyFieldClient = ({
  path: contextPath,
  readOnly,
  name,
  field,
}: TextFieldClientProps & {
  required: boolean
  name: string
}) => {
  const { value, setValue, disabled } = useField<string[]>({
    potentiallyStalePath: contextPath,
  })

  const [currentValue, setCurrentValue] = useState<string | null>()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const thisValue = Array.isArray(value) && value.length > 0 ? value : []

  const handleEnter = () => {
    const allValues = [...thisValue, currentValue].reduce((final, current) => {
      current = current?.trim().replace(/\s\s/g, ' ')
      if (current && current != '' && !final.includes(current)) {
        final.push(current)
      }
      return final
    }, [] as string[])
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    setValue(allValues)
  }

  return (
    <>
      <div
        className={cn(
          'field-type__wrap in-sidebar:max-sidebar:col-[1/2] in-sidebar:max-sidebar:row-[2/3]',
          field?.admin?.className
        )}>
        <input
          ref={inputRef}
          id={`field-${name}`}
          type='text'
          name={name}
          data-rtl={'false'}
          readOnly={readOnly || disabled}
          disabled={readOnly || disabled}
          onKeyDown={(e) => e.key == 'Enter' && handleEnter()}
          onChange={(e) => setCurrentValue(e.currentTarget.value)}
          placeholder='add an alias...'
          autoComplete={undefined}
        />
      </div>

      <div
        className={cn(
          `field-${name}--has-many has-many col-[2/4] row-[2/3] block max-h-10`,
          value?.length
            && 'px-[calc(var(--spacing-field)*0.5)] py-[calc(var(--spacing-field)*0.65)]'
        )}>
        <span className='has-many__wrapper flex flex-wrap gap-[calc(var(--spacing-field)*0.25)]'>
          {value?.map((v) => (
            <Button
              onClick={() => setValue([...value.filter((val) => v != val)])}
              tooltip='Remove'
              round={true}
              // className='has-many__item'
              className='has-many__item min-w-min p-0 [--color:var(--theme-text)] hover:stroke-[2.25px] hover:text-(--theme-error-500) btn-icon:pointer-events-auto btn-icon:h-full btn-icon:w-[calc(var(--btn-icon-size)+1rem)] btn-icon:justify-start btn-content:pl-4 btn-icon:[&_svg]:size-(--btn-icon-size)'
              key={v}
              size='xsmall'
              margin={false}
              buttonStyle='transparent'
              iconStyle='without-border'
              icon={<X className='has-many__icon' />}>
              {v}
            </Button>
          ))}
        </span>
      </div>
    </>
  )
}
