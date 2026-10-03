'use client'

import { updateDonationAmount } from '@/app/(api)/stripe/_lib/updateDonationAmount'
import { getDonationResult } from '@/app/(api)/stripe/donate'
import { NextButton, PrevButton } from '@/app/(www)/(Content)/donate/_components/BtnGrp'
import { TransitionFieldset } from '@/app/(www)/(Content)/donate/_components/TransitionFieldset'
import { Skeleton } from '@/app/(www)/_components/Skeleton'
import {
  CurrencySelectorElement,
  PaymentElement,
  useCheckoutElements,
} from '@stripe/react-stripe-js/checkout'
import { Send } from 'lucide-react'
import type { Dispatch } from 'react'
import { useCallback, useRef, useState } from 'react'
import { AmountCards, customToMinor } from 'www/(Content)/donate/_components/AmountCards'
import { Err } from 'www/(Content)/donate/_components/Err'
import { isInBounds } from 'www/(Content)/donate/_lib/is'
import type { DonationData } from 'www/(Content)/donate/_types'

export const AmtFieldset = ({
  transactionData,
  dispatchTransactionDataAction,
}: {
  transactionData: DonationData
  dispatchTransactionDataAction: Dispatch<Partial<DonationData>>
}) => {
  const cke = useCheckoutElements()
  const { amount, custom, currency, sessionId, error } = transactionData
  const timer = useRef<ReturnType<typeof setTimeout>>(null)
  const [submitting, setSubmitting] = useState(false)

  const sync = useCallback(
    (minorEur: number, delay: number) => {
      if (!sessionId || !isInBounds(minorEur)) return
      if (timer.current) clearTimeout(timer.current)
      if (cke.type == 'success')
        timer.current = setTimeout(async () => {
          const result = await cke.checkout
            .runServerUpdate(() =>
              updateDonationAmount(sessionId, {
                amount: minorEur,
                currency,
              })
            )
            .catch((e: Error) => ({ type: 'error' as const, error: { message: e.message } }))

          dispatchTransactionDataAction({
            error: result.type == 'error' ? result.error.message : null,
          })
        }, delay)
    },
    // cke has to be a dependency: it is read inside, and sync is created above the early returns, so the first render captures cke.type == 'loading'. Without it here the callback is never rebuilt, the success branch never runs, and no amount change ever reaches the session.
    [cke, sessionId, currency, dispatchTransactionDataAction]
  )

  if (cke.type == 'loading') return <Skeleton />
  if (cke.type == 'error')
    return (
      <Err
        err
        message={cke.error.message}
      />
    )
  if (cke.type != 'success') {
    return <></>
  }

  const { checkout } = cke
  const display = checkout.currency ?? currency
  const fxRate =
    checkout.currencyOptions?.find((o) => o.currency == display)?.currencyConversion?.fxRate ?? 1

  const handlePreset = (minorEur: number) => {
    dispatchTransactionDataAction({ amount: minorEur, custom: null })
    sync(minorEur, 0)
  }

  const handleSubmit = async () => {
    if (!sessionId) return
    setSubmitting(true)
    dispatchTransactionDataAction({ error: null })

    // redirect: 'if_required' keeps cards on this page and resolves here. Only methods that must visit a bank — iDEAL, Bancontact, SEPA, a redirecting 3DS challenge — navigate away, and those come back to /donate?result= instead of resolving.
    const confirmed = await cke.checkout
      .confirm({ redirect: 'if_required' })
      .catch((e: Error) => ({ type: 'error' as const, error: { message: e.message } }))

    if (confirmed.type == 'error') {
      dispatchTransactionDataAction({ error: confirmed.error.message })
      setSubmitting(false)
      return
    }

    // the session is re-read rather than trusted from the confirm result: the receipt url lives on the charge, not on anything confirm hands back
    const result = await getDonationResult(sessionId)
    setSubmitting(false)
    dispatchTransactionDataAction({ result, prevStep: 'amount', step: 'confirmation' })
  }

  const handleCustom = (raw: string) => {
    const minorEur = Math.round(customToMinor(raw) / fxRate)
    dispatchTransactionDataAction(
      isInBounds(minorEur) ? { custom: raw, amount: minorEur } : { custom: raw }
    )
    sync(minorEur, 500)
  }

  return (
    <>
      <TransitionFieldset
        thisStep={'amount'}
        transactionData={transactionData}>
        <div className='flex flex-col gap-6'>
          {checkout.currencyOptions && checkout.currencyOptions.length > 1 && (
            <CurrencySelectorElement />
          )}
          <AmountCards
            amount={amount}
            custom={custom}
            display={display}
            fxRate={fxRate}
            onPreset={handlePreset}
            onCustom={handleCustom}
          />
          <PaymentElement />
          <Err
            err={Boolean(error)}
            message={error ?? ''}
          />
        </div>
      </TransitionFieldset>

      {transactionData.step == 'amount' && (
        <div className='mt-auto flex w-full justify-between gap-12'>
          <PrevButton
            transactionData={transactionData}
            dispatchTransactionDataAction={dispatchTransactionDataAction}
          />
          {isInBounds(transactionData.amount) && (
            <NextButton
              label={submitting ? 'Processing' : 'Submit'}
              Icon={Send}
              disabled={submitting}
              onClick={handleSubmit}
            />
          )}
        </div>
      )}
    </>
  )
}
