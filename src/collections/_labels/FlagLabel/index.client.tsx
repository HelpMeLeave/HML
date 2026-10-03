'use client'

import { cn } from '@/lib/cn'
import { useField } from '@payloadcms/ui'
import { Flag } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { StaticLabel } from 'payload'
import './style.scss'

const EditFlagLabel = ({
  required,
  label,
  name,
  children,
}: {
  required?: boolean
  label?: StaticLabel | boolean | undefined
  name: string
  children?: ReactNode
}) => {
  const { value, setValue } = useField<string[]>({ path: 'flags' })
  const isFlagged = value?.includes(name)

  return (
    <label className='field-label'>
      <span className={isFlagged ? 'flagged' : ''}>
        {children ?? (label && typeof label == 'string' ? label : '')}
      </span>
      {required && <span className='required'>*</span>}
      <button
        style={
          {
            '--border-radius': '999px',
          } as Props['style']
        }
        className='btn btn--withoutPopup btn--style-flag btn--icon-style-without-border btn--size-xsmall btn--no-margin icon-btn--wrapper'
        type='button'
        onClick={(e) => {
          e.preventDefault()
          const newValues = new Set(value)
          if (!newValues.delete(name)) {
            newValues.add(name)
          }
          setValue([...newValues])
        }}>
        <Flag
          size={'var(--btn-icon-size)'}
          className={cn('btn__icon .stroke', isFlagged ? 'fill-accent stroke-accent' : '')}
        />
      </button>
    </label>
  )
}

export const FlagLabelClient = ({
  required,
  label,
  name,
  children,
  collectionSlug,
}: {
  collectionSlug: string
  required?: boolean
  label?: StaticLabel | boolean | undefined
  name: string
  children?: ReactNode
}) => {
  const path = usePathname()
  const isList = path.replace(/.+collections\//, '').split('/')
  if (isList.length == 1 || collectionSlug != isList[0]) {
    return <span>{label as string}</span>
  }
  return (
    <EditFlagLabel
      label={label}
      required={required}
      name={name}>
      {children}
    </EditFlagLabel>
  )
}
