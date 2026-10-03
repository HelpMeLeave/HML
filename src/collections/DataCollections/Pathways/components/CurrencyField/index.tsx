'use client'

import FlagLabel from '@/collections/_labels/FlagLabel'
import { getPermissions } from '@/hooks/usePermissions'
import { CURRENCIES } from '@/lib/constants/COUNTRY_CURRENCIES'
import type { FieldAction } from '@payloadcms/ui'
import { SelectInput, useFormFields } from '@payloadcms/ui'
import type { FieldState, SelectFieldClientProps } from 'payload'
import { useEffect, useEffectEvent, useState, type Dispatch } from 'react'

const CurrencyField = ({ ...args }: SelectFieldClientProps) => {
  const {
    dispatch,
    currency,
    country,
  }: {
    dispatch: Dispatch<FieldAction>
    currency: FieldState
    country: FieldState
  } = useFormFields(([fields, dispatch]) => ({
    dispatch,
    country: fields.country,
    currency: fields.currency,
  }))

  const formOptions = Object.entries(CURRENCIES).map(([id, data]) => ({
    label: `${data.name} (${data.symbol})`,
    value: id,
  }))

  const [formOpt, setFormOpt] = useState([] as typeof formOptions)

  const updateOptions = useEffectEvent((data: { currency: string[] }) =>
    setFormOpt(
      [...formOptions]
        .filter((opt) => {
          return (
            opt.value == 'USD'
            || (data.currency as string[])?.includes(opt.value)
            || (data.currency as string[])?.includes(opt.value)
          )
        })
        .sort((a) => (a.value == 'USD' ? 1 : -1))
    )
  )

  useEffect(() => {
    const getCurrencies = async () => {
      const data = await fetch('/api/countries/' + country?.value).then((data) => data.json())
      if (data.currency) updateOptions(data)
    }
    if (country?.value) {
      getCurrencies()
    }
  }, [country?.value])

  const permissions = getPermissions({ args })

  return (
    <SelectInput
      description={args.field.admin?.description}
      Label={
        <FlagLabel
          collectionSlug={'pathways'}
          field={args.field}
        />
      }
      name={'currency'}
      path={args.path}
      value={currency.value as string}
      onChange={(v) =>
        dispatch({
          type: 'UPDATE',
          path: args.path,
          value: Array.isArray(v) ? v.map((ea) => ea.value) : v.value,
        })
      }
      options={formOpt}
      style={{
        flex: '50 1 200px',
      }}
      readOnly={!permissions.canWrite}
      className=''
    />
  )
}

export default CurrencyField
