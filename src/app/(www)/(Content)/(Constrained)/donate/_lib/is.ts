import type { CurrencyCode, Frequency } from '../_types'
import { CURRENCIES, FREQUENCIES, MIN_MAX } from './constants'

export const isCurrency = (v: string): v is CurrencyCode => v in CURRENCIES

export const isFrequency = (v: string): v is Frequency => FREQUENCIES.some(f => f.id === v)

export const isInBounds = (amount: number) =>
	amount >= MIN_MAX.MIN_AMOUNT && amount <= MIN_MAX.MAX_AMOUNT
