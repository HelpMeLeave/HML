import type { BaseFieldProps, BaseValidField } from '@/collections/_lib/_types'
import type { NumberField } from 'payload'

export type CurrencyProps = BaseFieldProps<NumberField>
export type ValidCurrencyField = BaseValidField<NumberField>
