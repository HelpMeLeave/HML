import type { InputDateType } from '@/components/Form/_types'

export const dateTypes: InputDateType[] = ['date', 'datetime-local', 'month', 'time', 'week']

export const isDateType = (entry: unknown): entry is InputDateType =>
  typeof entry == 'string' && dateTypes.some((t) => t == entry)
