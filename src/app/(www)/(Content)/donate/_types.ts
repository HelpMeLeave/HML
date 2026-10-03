import type { DonationResult } from '@/app/(api)/stripe/_types/SessionData'
import type { CURRENCIES } from './_lib/constants'

export type CurrencyCode = keyof typeof CURRENCIES

export type Step = 'contact' | 'amount' | 'confirmation'

export type DonationData = {
  currency: CurrencyCode
  amount: number
  custom: string | null
  step: Step
  prevStep: Step | null
  clientSecret: string | null
  sessionId: string | null
  error: string | null
  /** What getDonationResult returned after confirm, or after landing back on /donate?result=. Null until the payment settles; its presence is what puts the stepper on the confirmation step. */
  result: DonationResult | null
}

export type CustomerDataType = {
  firstName: string | null
  lastName: string | null
  newsletter: boolean
  email: string | null
}
