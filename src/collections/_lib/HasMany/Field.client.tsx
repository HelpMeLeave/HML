'use client'

import { cn } from '@/lib/cn'
import { Button, useField } from '@payloadcms/ui'
import { X } from 'lucide-react'
import type { TextFieldClientProps } from 'payload'
import { useRef, useState } from 'react'
import './style.scss'

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
      <div className={cn('field-type__wrap', field?.admin?.className)}>
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

      <div className={`field-${name}--has-many has-many`}>
        <span className='has-many__wrapper'>
          {value?.map((v) => (
            <Button
              onClick={() => setValue([...value.filter((val) => v != val)])}
              tooltip='Remove'
              round={true}
              className='has-many__item'
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
