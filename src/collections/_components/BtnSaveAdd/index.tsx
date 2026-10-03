'use client'

import type { NewTranslationKeys, NewTranslationObj } from '@/_config/i18n/_types'
import {
  FormSubmit,
  useDocumentInfo,
  useForm,
  useFormModified,
  useHotkey,
  useOperation,
  useTranslation,
} from '@payloadcms/ui'
import type { Route } from 'next'
import { redirect } from 'next/navigation'
import { useRef } from 'react'
import { createBtnHotkey, formIsUploading, isDisabled } from './_lib'

const BtnSaveAdd = () => {
  const { t } = useTranslation<NewTranslationObj, NewTranslationKeys>()

  const { submit } = useForm()
  const { uploadStatus } = useDocumentInfo()
  const label = t('label:saveAdd')
  const ref = useRef<HTMLButtonElement>(null)

  const disabled = isDisabled({
    operation: useOperation(),
    uploadStatus,
    isModified: useFormModified(),
  })

  const handleSubmit = () => {
    if (formIsUploading(uploadStatus)) {
      return
    }
    return void submit().then((data) => {
      if (data && data.res.ok) {
        redirect('create' as Route)
      }
    })
  }

  const hotkeyConfig = createBtnHotkey({
    keys: ['e'],
    withCtrl: true,
    depth: 1,
    disabled: disabled,
  })

  useHotkey(hotkeyConfig.config, (e) => hotkeyConfig.fn(e, ref))

  return (
    <FormSubmit
      buttonId='action-save-add'
      disabled={disabled}
      onClick={handleSubmit}
      ref={ref}
      size='medium'
      type='button'>
      {label}
    </FormSubmit>
  )
}

export default BtnSaveAdd
