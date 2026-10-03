import type { CustomerDataType } from '@/app/(www)/(Content)/donate/_types'

export type InitSesionData = Omit<
  { currency: string; amount: number } & Valid<CustomerDataType>,
  'step' | 'prevStep' | 'clientSecret' | 'error' | 'sessionId' | 'custom'
>

export type ReturnSesstionData = {
  clientSecret: string
  sessionId: string
  amount: number
  error: string | null
}

export type DonationResult = {
  paid: boolean
  pending: boolean
  total: string
  receiptUrl: string | null
  email: string | null
  lineItems: { name: string; amount: string }[]
  /** The PaymentIntent id (`pi_...`) — the same value the webhook writes to donations.paymentId, so a row in the CMS can be traced back to what the donor saw. */
  transactionId: string | null
}

export type StripeMetaData = {
  firstName: string
  lastName: string | null
  newsletter: string | number
  email: string
}
