'use client'

import type { ParsedJsonModal } from '@/globals/Wizard/_types'
import type { SupportWizard } from '@/payload-types'
import { SelectInput, useField, usePayloadAPI } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

const SwitchModals = ({ path }: TextFieldClientProps) => {
  const thisModal = path.split('.')[1]
  const [{ data }] = usePayloadAPI('/api/globals/support-wizard?select[modals][name]=true')

  const modalOpts = ((data?.modals as SupportWizard['modals']) ?? [])
    ?.filter((_m, i) => i != Number(thisModal))
    .map((m) => ({ value: m.id ?? '', label: m.name ?? '' }))

  const { value, setValue } = useField({ path })

  return (
    modalOpts
    && modalOpts.length > 0 && (
      <SelectInput
        name={'modal'}
        path={'modal'}
        options={modalOpts}
        value={modalOpts.find((v) => v.value == value)?.value}
        onChange={(option) => setValue((option as Pick<ParsedJsonModal, 'id'>).id)}
      />
    )
  )
}

export default SwitchModals
