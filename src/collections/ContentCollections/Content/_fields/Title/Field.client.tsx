'use client'

import { useSlugFields } from '@/collections/ContentCollections/Content/_lib/useSlugFields'
import { toSlug } from '@/lib/normalize/to'
import { type FieldAction, useField } from '@payloadcms/ui'
import { type ChangeEvent, type FocusEvent, useState } from 'react'

const BaseField = (props: Props<'input'>) => {
  return (
    <input
      placeholder='[Untitled]'
      {...props}
      type='text'
      id={'document'}
      className='doc-header__title render-title content-title h-lh w-full appearance-none border-0 bg-transparent font-header txt-6xl leading-header [--accessibility-outline:0px] focus-visible:border-transparent'
    />
  )
}

export const EditTitleField = () => {
  const field = useField<string | undefined>({ path: 'title' })
  return (
    <BaseField
      value={field.value ?? ''}
      onChange={(e: ChangeEvent<HTMLInputElement>) => field.setValue(e.currentTarget.value)}
    />
  )
}

export const CreateTitleField = () => {
  const {
    titleField,
    slugField,
    slugGeneratedField,
    dispatch,
    slugGenerated,
    slugValue,
    titleValue,
  } = useSlugFields()

  const [draft, setDraft] = useState(titleValue)

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e
    const dispatchObj = {
      type: 'UPDATE_MANY',
      formState: {
        title: { ...titleField, value },
      },
    }
    if (slugGenerated) {
      Object.assign(dispatchObj.formState, {
        slug: { ...slugField, value: toSlug(value) },
      })
    } else if (slugValue && toSlug(value) == slugValue) {
      Object.assign(dispatchObj.formState, {
        slugGenerated: { ...slugGeneratedField, value: true },
      })
    }
    dispatch(dispatchObj as FieldAction)
  }

  return (
    <BaseField
      onChange={(e: ChangeEvent<HTMLInputElement>) => setDraft(e.currentTarget.value)}
      onBlur={handleBlur}
      value={draft}
    />
  )
}
