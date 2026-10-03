'use client'

import { FieldError } from '@/components/Form/TextField/FieldError'
import { cn } from '@/lib/cn'
import { toTitleCase } from '@/lib/textCasing'
import { CheckboxInput, useField } from '@payloadcms/ui'
import type { JSONFieldClientProps } from 'payload'
import { useState, type JSX } from 'react'
import { Fragment } from 'react/jsx-runtime'

type FieldKey = 'M' | 'T' | 'W' | 'Th' | 'F' | 'S' | 'Su'
type TODKey = 'morning' | 'afternoon' | 'night'
type FieldValue = Record<FieldKey, Record<TODKey, boolean>>

const TODField = ({ as, ...props }: Props<'button'> & { as?: JSX.ElementType }) => {
  const El = as ?? 'button'
  return (
    <El
      {...props}
      style={{
        cursor: 'pointer',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '.75rem',
        fontWight: 500,
        textTransform: 'uppercase',
        backgroundColor: 'var(--theme-elevation-100)',
        appearance: 'none',
        border: 0,
      }}
      className={cn('h-full click', props.className)}
    />
  )
}

const WeeklyDays = (props: JSONFieldClientProps) => {
  const field = useField<FieldValue>({ path: props.path })
  const [values, setValues] = useState(field.value)

  const initEntry = () => ({ ...values })
  const getValCount = (values: boolean[]) => {
    const count = {
      true: values.filter(Boolean).length,
      false: values.filter((v) => v == false).length,
    }

    if (count.true == 0) {
      return true
    } else if (count.false == 0) {
      return false
    } else {
      return count.true > count.false
    }
  }

  const handleDayClick = (day: FieldKey) => {
    const entry = initEntry()
    const todKeys = Object.keys(entry[day]) as TODKey[]
    const counted = getValCount(todKeys.map((tod) => entry[day][tod]))

    Object.keys(entry[day]).forEach((tod) => {
      entry[day][tod as TODKey] = counted
    })
    setValues(entry)
  }

  const handleTimeClick = (time: TODKey) => {
    const entry = initEntry()
    const counted = getValCount(Object.values(values).map((ea) => ea[time]))

    Object.keys(entry).forEach((key) => {
      entry[key as FieldKey][time] = counted
    })
    setValues(entry)
    field.setValue(entry)
  }

  if (field.errorMessage) {
    console.warn(field.errorMessage)
  }

  return (
    <fieldset
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4,max-content)',
        width: props.field.admin?.width,
        rowGap: '0.25rem',
        ...props.field.admin?.style,
      }}>
      <TODField as='span' />
      {['morning', 'afternoon', 'evening'].map((each, i) => {
        return (
          <TODField
            onClick={() => {
              handleTimeClick(each as TODKey)
            }}
            key={each}
            style={{
              gridRowStart: i + 2,
            }}
            type='button'>
            {toTitleCase(each)}
          </TODField>
        )
      })}

      {['Su', 'M', 'T', 'W', 'Th', 'F', 'S'].map((mapDay) => {
        const day = mapDay as FieldKey
        const times = values[day]
        return (
          <Fragment key={day}>
            <button
              aria-label={day}
              style={{
                background: 'none',
                textTransform: 'uppercase',
                textAlign: 'end',
                paddingRight: '1rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={() => handleDayClick(day)}
              type='button'>
              {day}
            </button>
            {Object.keys(times).map((mapT) => {
              const time = mapT as TODKey
              const timeStr = `${mapDay}-${time}`
              return (
                <CheckboxInput
                  className={cn(
                    'field-label:sr-only',
                    time == 'morning' && 'row-start-2',
                    time == 'afternoon' && 'row-start-3'
                  )}
                  key={mapT}
                  onToggle={(val) => {
                    const entry = { ...values }
                    entry[day][time] = val.currentTarget.checked
                    setValues(entry)
                  }}
                  name={timeStr}
                  id={timeStr}
                  checked={values[day][time]}
                />
              )
            })}
          </Fragment>
        )
      })}
      <span>
        <FieldError error={field.errorMessage} />
      </span>
    </fieldset>
  )
}

export default WeeklyDays
