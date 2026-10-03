'use client'

import { useSlugFields } from '@/collections/ContentCollections/Content/_lib/useSlugFields'
import { cn } from '@/lib/cn'
import { toSlug } from '@/lib/normalize/to'
import { type FieldAction, TextInput } from '@payloadcms/ui'
import { LockKeyhole, UnlockKeyhole } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import './style.scss'

type SlugLockElProps = {
  disabled: boolean
  handleLockClick: () => void
  locked: boolean
}

const SlugLockEl = ({ disabled, handleLockClick, locked }: SlugLockElProps) => (
  <button
    disabled={disabled}
    className={cn(
      'btn btn--style-none btn--no-margin btn--icon slug-lock',
      locked ? 'locked' : 'unlocked'
    )}
    type='button'
    onClick={handleLockClick}>
    <span className='sr-only'>{locked ? 'Unlock' : 'Lock'} Slug Field</span>
    {locked ?
      <LockKeyhole size={14} />
    : <UnlockKeyhole size={14} />}
  </button>
)

type SlugInputElProps = {
  value: string
  locked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SlugInputEl = ({ value, locked, onChange }: SlugInputElProps) => (
  <TextInput
    readOnly={locked}
    path='slug'
    onChange={onChange}
    required={true}
    value={value}
  />
)

const GenerateBtn = ({ locked, ...props }: Props<'button'> & { locked: boolean }) =>
  !locked && (
    <button
      {...props}
      style={{
        lineHeight: 'inherit',
      }}
      type='button'
      className={cn('slug-generate btn--style-none btn btn--size-small btn--no-margin')}>
      Generate
    </button>
  )

export const SlugComponentClient = ({ canEdit }: { canEdit: boolean }) => {
  const { slugGeneratedField, slugField, dispatch, slugGenerated, slugValue, titleValue } =
    useSlugFields()

  const [locked, setLocked] = useState(true)
  const [draft, setDraft] = useState<string | null>(null)

  const handleGenerateClick = () => {
    titleValue
      && dispatch({
        type: 'UPDATE_MANY',
        formState: {
          slug: { ...slugField, value: toSlug(titleValue) },
          slugGenerated: { ...slugGeneratedField, value: true },
        },
      })
  }

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => setDraft(e.currentTarget.value)

  const handleFieldBlur = () => {
    if (draft == null) return

    const value = toSlug(draft)
    setDraft(null)

    if (slugValue != value) {
      const dispatchObj = {
        type: 'UPDATE_MANY',
        formState: {
          slug: { ...slugField, value },
        },
      }

      const matchesTitle = !!titleValue && toSlug(titleValue) == value

      matchesTitle != slugGenerated
        && Object.assign(dispatchObj.formState, {
          slugGenerated: { ...slugGeneratedField, value: matchesTitle },
        })

      dispatch(dispatchObj as FieldAction)
    }
  }

  return (
    <div className={cn('field-type text', locked && 'read-only')}>
      <span className='slug-label-wrapper'>
        <label
          className='field-label'
          htmlFor='field-slug'>
          Slug
        </label>
        <GenerateBtn
          onClick={handleGenerateClick}
          disabled={!titleValue}
          locked={locked}
        />
      </span>

      <div
        className={'field-type__wrap slug-wrapper'}
        onBlur={handleFieldBlur}>
        <SlugInputEl
          value={draft ?? slugValue}
          onChange={handleFieldChange}
          locked={locked}
        />
        <SlugLockEl
          locked={locked}
          disabled={!canEdit}
          handleLockClick={() => (canEdit ? setLocked((prev) => !prev) : setLocked(true))}
        />
      </div>
    </div>
  )
}
