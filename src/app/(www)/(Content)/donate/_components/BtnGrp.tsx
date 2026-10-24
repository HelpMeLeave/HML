'use client'

import type { DonationData, Step } from '@/app/(www)/(Content)/donate/_types'
import { Button } from '@/components/Button'
import { cn } from '@/lib/cn'
import { toTitleCase } from '@/lib/textCasing/toTitleCase'
import { CaretLeft, CaretRight, SendAlt } from '@boxicons-pro/react'
import type { Dispatch } from 'react'

export const NextButton = ({
  label,
  actionType,
  ...props
}: Props<'button'> & { label: string; actionType: 'submit' | 'next' }) => {
  return (
    <Button
      {...props}
      type='button'
      btnStyle={'accent'}
      className={cn(
        'w-full max-w-2/5 justify-between',
        actionType == 'submit' ? 'btn-icon:-mt-1 btn-icon:-rotate-20' : 'ml-auto',
        props.className
      )}
      Icon={actionType == 'submit' ? SendAlt : CaretRight}
      iconAttributes={{
        iconPosition: 'right',
      }}
      size='medium'>
      {toTitleCase(label)}
    </Button>
  )
}

export const PrevButton = ({
  transactionData,
  dispatchTransactionDataAction,
}: {
  transactionData: DonationData
  dispatchTransactionDataAction: Dispatch<Partial<DonationData>>
}) =>
  transactionData.prevStep && (
    <Button
      type='button'
      onClick={() => {
        dispatchTransactionDataAction({
          prevStep: null,
          step: transactionData.prevStep as Step,
        })
      }}
      btnStyle='accentMuted'
      className='bg-transparent dark:bg-transparent'
      Icon={CaretLeft}
      size='small'
      iconAttributes={{
        iconPosition: 'left',
      }}>
      {toTitleCase('Prev')}
    </Button>
  )
