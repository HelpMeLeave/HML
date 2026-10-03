'use client'

import { CURRENCIES } from '@/lib/constants/COUNTRY_CURRENCIES'
import type { JSONFieldClientProps, OptionObject } from 'payload'
import { SelectMultiField } from './SelectMultiField'

const currencyOptions: OptionObject[] = Object.entries(CURRENCIES).map(([id, value]) => ({
  label: `${value.name} (${value.symbol})`,
  value: id,
}))

const Currencies = (args: JSONFieldClientProps) => (
  <SelectMultiField
    {...args}
    label='Currencies'
    name='currency'
    description='Official currencies used'
    options={currencyOptions}
  />
)

export default Currencies
