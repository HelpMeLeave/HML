'use client'

import { useFormFields } from '@payloadcms/ui'
import { BLOCK_GATES } from './_lib'

export const BlockGatePlugin = () => {
  const contentType = useFormFields(([fields]) => fields.contentType?.value) as string | undefined

  const hidden = Object.entries(BLOCK_GATES)
    .filter(([, types]) => !contentType || !types.includes(contentType))
    .map(([slug]) => `[data-item-key='block-${slug}'],.slash-menu-popup__item-block-${slug}`)

  return hidden.length ? <style>{`${hidden.join(',')}{display:none!important}`}</style> : null
}
