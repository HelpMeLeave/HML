'use client'

import { cn } from '@/lib/cn'
import { type FC, useEffect, useState } from 'react'

export const Checkbox = ({
  onToggle,
  ...props
}: Props<'input'> & {
  label?: string
  showLabel?: boolean
  Label?: FC
  className?: string
  onToggle?: (value: boolean) => void
}) => {
  const { label, Label } = props
  const [checked, setChecked] = useState(props.checked ?? true)

  useEffect(() => {
    if (props.checked !== undefined) setChecked(props.checked)
  }, [props.checked])

  const handleClick = () => {
    const next = !checked
    setChecked(next)
    onToggle?.(next)
  }

  const checkedProp = checked ? { ['data-checked']: '' } : {}
  return (
    <>
      <span data-slot='outerWrapper'>
        <label
          data-slot='innerWrapper'
          className='flex w-max cursor-pointer items-center-safe gap-x-2 px-2 py-1 transition-colors hover:text-current/70'>
          <input
            onChange={handleClick}
            data-slot='actualField'
            data-hidden='true'
            type='checkbox'
            className={cn(!props.showLabel && 'sr-only', '')}
            name='cb'
            id='cb'
            defaultChecked={checked}
          />
          <span
            data-slot='field'
            className={cn(
              'has-data-checked:[--checkbox-bg:var(--color-red-100)]',
              '[--checkbox-border:var(--color-red-600)]/50 has-data-checked:[--checkbox-border:var(--color-red-200)]/90',
              '[--checkbox-check:var(--color-red-500)]',
              'shadow-red-900/10 has-data-checked:shadow-[inset_-1px_-1px_0.25px_0px]',
              'relative block size-3 rounded-sm',
              'outline-1 [outline-offset:-0.5px] outline-(--checkbox-border)',
              'bg-(--checkbox-bg)',
              'transition-all'
            )}>
            <svg
              {...checkedProp}
              className='group absolute top-1/2 h-auto w-full -translate-y-1/2 pr-[0.25px]'
              viewBox='0 0 14 14'
              fill='none'>
              {/* Checkmark icon */}
              <path
                className='translate-x-[0.15px] translate-y-[0.75px] stroke-transparent blur-[0.05px] brightness-90 saturate-150 group-data-checked:stroke-(--checkbox-bg)'
                d='M3 8L6 11L11 3.5'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                className='stroke-transparent group-data-checked:stroke-(--checkbox-check)'
                d='M3 8L6 11L11 3.5'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              {/* Indeterminate icon */}
              <path
                className='group-data-indeterminate:stroke-(--checkbox-check)'
                d='M3 7H11'
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </span>
          {label ?
            <span
              data-slot='label'
              className='text-[0.8rem] font-bold tracking-tight text-slate-500 uppercase'>
              {label}
            </span>
          : Label ?
            <Label />
          : <></>}
        </label>
        <p data-slot='error'></p>
      </span>
    </>
  )
}
