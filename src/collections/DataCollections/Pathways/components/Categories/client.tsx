'use client'

import {
  getFilterBy,
  handleChange,
  parseFilter,
} from '@/collections/DataCollections/Pathways/components/Categories/_lib'
import type {
  Doc,
  Docs,
  Option,
} from '@/collections/DataCollections/Pathways/components/Categories/types'
import FlagLabel from '@/collections/_labels/FlagLabel'
import { getPermissions } from '@/hooks/usePermissions'
import { SelectInput, useField } from '@payloadcms/ui'
import type { RelationshipFieldClientProps } from 'payload'

export const CategorySelectClient = ({
  data: docs,
  ...props
}: RelationshipFieldClientProps & {
  data: Docs
}) => {
  const field = useField<number[]>({
    path: props.path,
  })

  const filterBy = getFilterBy(docs, field)

  const permissions = getPermissions({ args: props })

  return (
    <SelectInput
      {...props.field}
      Label={
        <FlagLabel
          collectionSlug='pathways'
          field={props.field}
        />
      }
      description={props.field.admin?.description}
      onChange={(val) => handleChange(val as Option[], docs, field)}
      options={Object.values(docs)}
      filterOption={(args, search) => parseFilter(args.data as unknown as Doc, filterBy, search)}
      hasMany={true}
      name={'category'}
      path={'cats'}
      value={field.value?.map((ea) => String(ea))}
      readOnly={!permissions.canWrite}
    />
  )
}
