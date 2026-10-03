import type { CurrencyCode } from '../_types'
import { CURRENCIES, MIN_MAX } from './constants'

export const isCurrency = (v: string): v is CurrencyCode => v in CURRENCIES

export const isInBounds = (amount: number) =>
  amount >= MIN_MAX.MIN_AMOUNT && amount <= MIN_MAX.MAX_AMOUNT
