'use client'

import { COUNTRY_LANGUAGES } from '@/lib/constants/COUNTRY_LANGUAGES'
import type { JSONFieldClientProps, OptionObject } from 'payload'
import { SelectMultiField } from './SelectMultiField'

const languageOptions: OptionObject[] = Object.entries(COUNTRY_LANGUAGES)
  .map(([id, value]) => ({ label: value, value: id }))
  .sort((a, b) => a.label.localeCompare(b.label))

const Languages = (args: JSONFieldClientProps) => (
  <SelectMultiField
    {...args}
    label='Languages Spoken'
    name='language'
    description='Official languages spoken'
    options={languageOptions}
  />
)

export default Languages
