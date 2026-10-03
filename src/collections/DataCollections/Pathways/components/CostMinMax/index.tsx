'use client'

import FlagLabel from '@/collections/_labels/FlagLabel'
import { getPermissions } from '@/hooks/usePermissions'
import { cn } from '@/lib/cn'
import { toNumber } from '@/lib/normalize/to'
import type { CountryISO } from '@/payload-types'
import { FieldDescription, useField, useFormFields } from '@payloadcms/ui'
import type { JSONFieldClientProps } from 'payload'
import { useState } from 'react'
import { toIntervalString, type tInterval } from './util'

const INPUT_REG_MATCHER = /([0-9,.\s]+)/gi

const parseNumbers = (entry: string | number) =>
  toNumber(typeof entry == 'string' ? entry.replace(' ', '') : entry, entry)

const cleanUp = (entry: string) => entry?.toLowerCase().trim().replaceAll(' ', '')

const proccessEntry = (entry: string) => {
  const data: tInterval = {
    min: undefined as unknown as number,
    max: 0,
    na: false,
  }
  if (entry.trim().replaceAll(/[^\d]/g, '') == '') {
    return data
  }

  const asStrings = entry
    .match(INPUT_REG_MATCHER)
    ?.map((m) => {
      return parseNumbers(cleanUp(m))
    })
    .filter((ea) => typeof ea == 'number' && ea >= 0.01) as number[]
  if (!asStrings) return

  data.min = Math.min(...asStrings)
  data.max = Math.max(...asStrings)

  return data
}

const CostMinMax = ({ ...props }: JSONFieldClientProps) => {
  const dataField = useField({ path: props.path })

  const fields = useFormFields(([fields, dispatch]) => ({
    currencyField: fields.currency,
    dispatch: dispatch,
  }))

  const currency = fields.currencyField!.value as CountryISO

  const getString = (val: tInterval) => toIntervalString(val, currency)

  const parseEntry = (entry: string) => {
    const newData = proccessEntry(entry)
    if (newData) {
      setData({ parsed: newData, string: getString(newData) })
    }
  }

  const [data, setData] = useState<{ parsed: tInterval; string: string }>({
    parsed: dataField.value as tInterval,
    string: getString(dataField.value as tInterval),
  })
  const permissions = getPermissions({ args: props })

  return (
    <div
      style={{
        '--field-width': `${props.field.admin?.width || 'auto'}`,
        flexDirection: 'column',
        flex: '1 1 200px',
        ...props.field.admin?.style,
      }}
      className={cn(
        'field-type text shrink grow',
        !permissions.canWrite && 'read-only',
        `cost-field-${props.field.name}`,
        props.field.admin?.className
      )}>
      <div>
        <FlagLabel
          collectionSlug={'pathways'}
          field={props.field}
        />
        <input
          id={`field-${props.field.name}`}
          type='text'
          name={`field-${props.field.name}`}
          defaultValue={data.string}
          onChange={(e) => parseEntry(e.currentTarget.value)}
          onBlur={() => {
            dataField.setValue(data.parsed)
          }}
          disabled={!permissions.canWrite}
        />
        <FieldDescription
          description={props.field.admin?.description}
          path={props.path}
        />
      </div>
    </div>
  )
}

export default CostMinMax
