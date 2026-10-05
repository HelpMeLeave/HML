'use client'

import type { DonationData, Step } from '@/app/(www)/(Content)/donate/_types'
import { Button } from '@/components/Button'
import { toTitleCase } from '@/lib/textCasing/toTitleCase'
import { type LucideIcon, MoveLeft } from 'lucide-react'
import type { Dispatch } from 'react'

export const NextButton = ({
  label,
  Icon,
  ...props
}: Props<'button'> & { label: string; Icon: LucideIcon }) => {
  return (
    <Button
      {...props}
      type='button'
      variant={'accent'}
      size='small'
      className={'ml-auto flex max-w-[16em] flex-1 flex-row items-center justify-between gap-2'}>
      <span data-slot='content'>{toTitleCase(label)}</span>
      {Icon && (
        <Icon
          data-slot='icon'
          className='h-full w-auto'
        />
      )}
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
      variant={'accentMuted'}
      size='small'
      className={[
        'flex max-w-[16em] flex-row-reverse items-center justify-between gap-2 bg-transparent dark:bg-transparent',
      ].join(' ')}>
      <span data-slot='content'>{toTitleCase('Prev')}</span>
      <MoveLeft
        data-slot='icon'
        className='h-full w-auto'
      />
    </Button>
  )
