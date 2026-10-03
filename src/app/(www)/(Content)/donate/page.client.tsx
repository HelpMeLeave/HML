'use client'

import type { DonationResult } from '@/app/(api)/stripe/_types/SessionData'
import { AmtFieldset } from '@/app/(www)/(Content)/donate/_components/AmtFieldset'
import { Confirmation } from '@/app/(www)/(Content)/donate/_components/Confirmation'
import { ContactFieldset } from '@/app/(www)/(Content)/donate/_components/ContactFieldset'
import { TransitionFieldset } from '@/app/(www)/(Content)/donate/_components/TransitionFieldset'
import { Main } from '@/components/Structure/Main'
import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout'
import { type ChangeEvent, useReducer, useState } from 'react'
import { useStripeTheme } from 'www/(Content)/donate/_hooks/useStripeTheme'
import { CURRENCIES } from 'www/(Content)/donate/_lib/constants'
import { stripePromise } from 'www/(Content)/donate/_lib/stripePromise'
import type { CustomerDataType, DonationData } from 'www/(Content)/donate/_types'
import { MdLeftRail } from 'www/_components/LeftRail'

const donationReducer = (state: DonationData, action: Partial<DonationData>) => {
  return { ...state, ...action }
}

export const DonationPageClient = ({
  initialResult,
  ...props
}: Props & { initialResult: DonationResult | null }) => {
  const appearance = useStripeTheme()

  const [customerData, setCustomerData] = useState<CustomerDataType>({
    firstName: null,
    lastName: null,
    newsletter: false,
    email: null,
  })

  const [transactionData, dispatchTransactionData] = useReducer(donationReducer, {
    currency: 'eur',
    amount: CURRENCIES['eur'].presets[1],
    custom: null,
    // a donor returning from iDEAL or a 3DS challenge arrives with the result already resolved server-side, so the stepper opens on the confirmation rather than on an empty contact form
    step: initialResult ? 'confirmation' : 'contact',
    prevStep: null,
    clientSecret: null,
    sessionId: null,
    error: null,
    result: initialResult,
  })

  const handleCustomerData = ({
    currentTarget: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (['firstName', 'lastName', 'newsletter', 'email'].includes(name))
      setCustomerData({
        ...customerData,
        [name]: name == 'newsletter' ? value == 'true' : value,
      })
  }

  return (
    <>
      <form
        id='donations'
        autoComplete='on'
        className='z-1 col-start-1 bg-background'
      />
      <MdLeftRail className='z-1 border-0 bg-background px-1'>{props.children}</MdLeftRail>
      <Main
        className='z-0 flex flex-col gap-4'
        data-layout='half'
        data-page='donate'>
        <div className='relative flex h-full flex-col justify-between gap-6'>
          <ContactFieldset
            transactionData={transactionData}
            dispatchTransactionDataAction={dispatchTransactionData}
            customerData={customerData}
            customerDataAction={handleCustomerData}
          />
          {transactionData.clientSecret && (
            <CheckoutElementsProvider
              key={transactionData.sessionId}
              stripe={stripePromise}
              options={{
                clientSecret: transactionData.clientSecret,
                adaptivePricing: { allowed: true },
                elementsOptions: {
                  appearance,
                },
              }}>
              <AmtFieldset
                transactionData={transactionData}
                dispatchTransactionDataAction={dispatchTransactionData}
              />
            </CheckoutElementsProvider>
          )}
          {transactionData.result && (
            <TransitionFieldset
              thisStep='confirmation'
              transactionData={transactionData}>
              <Confirmation result={transactionData.result} />
            </TransitionFieldset>
          )}
        </div>
      </Main>
    </>
  )
}
