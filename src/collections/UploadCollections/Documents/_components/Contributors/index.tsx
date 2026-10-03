'use client'

import { toTitleCase } from '@/lib/textCasing'
import { type FieldType, FieldLabel, RelationshipInput, useField } from '@payloadcms/ui'
import type { CollectionSlug, RelationshipFieldClientProps, ValueWithRelation } from 'payload'

const RelationshipField = ({
  label,
  slug,
  authorField,
  onChange,
}: {
  label: string
  slug: CollectionSlug
  authorField: FieldType<
    {
      relationTo: CollectionSlug
      value: number
    }[]
  >

  onChange: (v: ValueWithRelation[], collection: CollectionSlug) => void
}) => (
  <RelationshipInput
    Label={<label className='field-label'>{toTitleCase(label)}</label>}
    relationTo={[slug]}
    path=''
    allowCreate={false}
    hasMany={true}
    onChange={(v) => onChange(v, slug)}
    value={authorField?.value?.filter((v) => v.relationTo == slug) ?? []}
  />
)

const AuthorsField = (props: RelationshipFieldClientProps) => {
  const authorField = useField<{ relationTo: CollectionSlug; value: number }[]>({
    path: props.path,
  })

  const handleChange = (v: ValueWithRelation[], collection: CollectionSlug) => {
    const strippedValue = authorField?.value.filter((v) => v.relationTo != collection)
    authorField.setValue([...strippedValue, ...v])
  }

  return (
    <div className='*:text-xl'>
      <FieldLabel label={props.field.label} />
      <div className='mt-2 flex flex-wrap gap-3 *:w-full *:grow *:basis-[250]'>
        <RelationshipField
          label={'Author(s)'}
          slug={'users'}
          authorField={authorField}
          onChange={handleChange}
        />
        <RelationshipField
          label={'Team(s)'}
          slug={'teams'}
          authorField={authorField}
          onChange={handleChange}
        />
        <RelationshipField
          label={'Pillar(s)'}
          slug={'pillar'}
          authorField={authorField}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default AuthorsField
