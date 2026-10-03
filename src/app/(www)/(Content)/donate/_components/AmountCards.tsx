'use client'

import { Input } from '@/components/Form/Input'
import { cn } from '@/lib/cn'
import { Radio, RadioGroup } from '@headlessui/react'
import { useId } from 'react'
import { Err } from 'www/(Content)/donate/_components/Err'
import { CURRENCIES, MIN_MAX } from 'www/(Content)/donate/_lib/constants'
import { formatMoney } from 'www/(Content)/donate/_lib/formatMoney'
import { isInBounds } from 'www/(Content)/donate/_lib/is'

const OTHER = 'other' as const
type Value = number | typeof OTHER

export const customToMinor = (raw: string) => Math.round(Number(raw.replace(/[^0-9.]/g, '')) * 100)

const CHARGE = 'eur'

const card = cn([
  'group relative flex cursor-pointer flex-col justify-center gap-0.5 rounded-lg border p-4',
  'transition-[colors,transform,box-shadow] duration-150',
  'border-input-border bg-card',
  'hover:-translate-y-px hover:border-accent/50 hover:shadow-xs',
  'data-checked:border-accent data-checked:bg-accent/10 data-checked:shadow-xs',
  'focus:outline-none data-focus:outline-2 data-focus:outline-offset-2 data-focus:outline-accent',
])

export const AmountCards = ({
  amount,
  custom,
  display = CHARGE,
  fxRate = 1,
  onPreset,
  onCustom,
}: {
  amount: number
  custom: string | null
  display?: string
  fxRate?: number
} & {
  onPreset: (minorEur: number) => void
  onCustom: (raw: string) => void
}) => {
  const customId = useId()
  const converted = (minorEur: number) => Math.round(minorEur * fxRate)
  const showsBoth = display.toLowerCase() != CHARGE

  const selected: Value = custom === null ? amount : OTHER

  const customToEUR = Math.round(customToMinor(custom ?? '') / fxRate)
  const customIsValid = Boolean(custom !== null && custom.trim() !== '') && isInBounds(customToEUR)

  return (
    <RadioGroup
      value={selected}
      onChange={(next: Value) => (next == OTHER ? onCustom('') : onPreset(next))}
      aria-label='Donation amount'
      className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
      {CURRENCIES[CHARGE].presets.map((minorEur) => (
        <Radio
          key={minorEur}
          value={minorEur}
          className={card}>
          <span className='text-xl/5 font-semibold text-body group-data-checked:text-accent'>
            {formatMoney(converted(minorEur), display)}
          </span>

          {showsBoth && (
            <span className='text-[0.8rem] tracking-wide text-muted'>
              {formatMoney(minorEur, CHARGE)} charged
            </span>
          )}
        </Radio>
      ))}

      <Radio
        value={OTHER}
        className={cn(card, 'col-span-2 lg:col-span-4')}>
        <span className='font-semibold text-base text-body group-data-checked:text-accent'>
          Other amount
        </span>
        {selected != OTHER && <span className='text-sm text-muted'>Choose your own amount</span>}
      </Radio>

      {selected == OTHER && (
        <div className='col-span-2 sm:col-span-4'>
          <label
            htmlFor={customId}
            className='sr-only'>
            Custom donation amount
          </label>
          <div className='flex items-center gap-2'>
            <span
              aria-hidden
              className='text-md font-semibold text-muted'>
              {formatMoney(0, display).replace(/[\d.,\s]/g, '')}
            </span>
            <Input
              id={customId}
              inputMode='decimal'
              autoFocus
              value={custom ?? ''}
              invalid={!customIsValid}
              onChange={(e) => onCustom(e.target.value)}
              placeholder='0.00'
              className='max-w-40 interactive'
            />
            {showsBoth && customIsValid && (
              <span className='text-sm text-muted'>
                ≈ {formatMoney(customToEUR, CHARGE)} charged
              </span>
            )}
          </div>
          <Err
            role='alert'
            className='mt-2 text-xs'
            err={!customIsValid}
            message={`Donations must be between ${formatMoney(converted(MIN_MAX.MIN_AMOUNT), display)} and ${formatMoney(converted(MIN_MAX.MAX_AMOUNT), display)}`}
          />
        </div>
      )}
    </RadioGroup>
  )
}
