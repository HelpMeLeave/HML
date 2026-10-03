'use server'

import { initCheckout } from '@/app/(api)/stripe/initCheckout'
import type { CustomerDataType, DonationData } from '@/app/(www)/(Content)/donate/_types'

export const handleBtnClick = async (data: DonationData, customerData: CustomerDataType) => {
  try {
    const newSession = await initCheckout({
      amount: data.amount,
      currency: data.currency,
      ...(customerData as Valid<CustomerDataType>),
    })

    if (newSession.sessionId) {
      return {
        ...data,
        ...newSession,
      }
    } else {
      throw new Error('Stripe could not initiate')
    }
  } catch (e) {
    console.error(e)
  }
  return data
}
