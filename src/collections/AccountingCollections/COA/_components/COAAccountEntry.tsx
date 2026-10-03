'use client'

import { normalizeAcct } from '@/collections/AccountingCollections/COA/_lib/normalizeAcct'
import { TextField } from '@/components/Form'
import { useField } from '@payloadcms/ui'
import type { NumberFieldClientProps } from 'payload'
import { type FocusEvent } from 'react'

const COAAccountEntry = (props: NumberFieldClientProps) => {
  const acctField = useField<number>({ path: props.path })

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    acctField.setValue(normalizeAcct(e.currentTarget.value).toNumber())
  }

  return (
    <TextField
      required

      name='account'
      onBlur={(e) => {
        e.currentTarget.value = normalizeAcct(e.currentTarget.value).toString()
        handleBlur(e)
      }}
      onKeyUp={(e) => {
        const value = e.currentTarget.value
        if (e.key != 'Backspace' && value.match(/^[^-]{4,}$/)) {
          e.currentTarget.value =
            e.currentTarget.value.slice(0, 4) + '-' + e.currentTarget.value.slice(4)
        } else if (e.key == 'Backspace' && value.match(/^.{4}-$/)) {
          e.currentTarget.value = e.currentTarget.value.replace('-', '')
        }
      }}
      Label={'Account'}
      defaultValue={acctField.value ? normalizeAcct(acctField.value).toString() : undefined}
    />
  )
}

export default COAAccountEntry
