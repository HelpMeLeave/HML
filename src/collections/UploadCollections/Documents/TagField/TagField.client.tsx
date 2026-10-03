'use client'

import {
  asOption,
  asValue,
  clearDescendants,
  grpHasTag,
  normalize,
} from '@/collections/UploadCollections/Documents/TagField/_lib'
import { fromCamelCase } from '@/lib/textCasing'
import type { Tag } from '@/payload-types'
import { SelectInput, useField } from '@payloadcms/ui'
import type { SelectInputProps } from '@payloadcms/ui/fields/Select'
import type { OptionObject, RelationshipFieldClientProps } from 'payload'
import { useMemo, useState } from 'react'

const Select = ({
  id,
  label,
  onChange,
  value,
  options,
}: {
  id: string
  label: string
  onChange: SelectInputProps['onChange']
  value: SelectInputProps['value']
  options: SelectInputProps['options']
}) => {
  return (
    <div className={`field-type relationship`}>
      <SelectInput
        Label={<label>{label}</label>}
        name={'tags-' + id}
        path={''}
        onChange={onChange}

        value={value}
        hasMany
        options={options}
      />
    </div>
  )
}

const TagClientField = ({
  dimensions,
  path,
}: RelationshipFieldClientProps & { dimensions: Tag[] }) => {
  const { value, setValue } = useField<(number | Tag)[]>({ path })

  const byParent = useMemo(
    () => Object.groupBy(dimensions, (ea) => ea.parentTitle?.[0] as string),
    [dimensions]
  )

  const [tags, setTags] = useState<Tag[]>(() =>
    dimensions.filter((t) => normalize(value).includes(t.id))
  )

  const commit = (next: Tag[]) => {
    setTags(next)
    setValue(next.map((t) => t.id))
  }

  const makeHandler =
    (grp: string): SelectInputProps['onChange'] =>
    (val) => {
      const options = (val ?? []) as OptionObject[]
      const newInGroup = dimensions.filter((f) => options.some((ea) => ea.value === f.title))
      const currentInGroup = tags.filter((t) => grpHasTag(byParent[grp], t))
      const removed = currentInGroup.filter((t) => !newInGroup.some((n) => n.id === t.id))
      const toRemove = new Set(
        [...removed, ...clearDescendants(removed, dimensions)].map((t) => t.id)
      )

      commit([
        ...tags.filter((t) => !toRemove.has(t.id) && !grpHasTag(byParent[grp], t)),
        ...newInGroup,
      ])
    }

  const getSelectedByParent = (grp?: string) =>
    tags.filter((t) => grpHasTag(byParent[grp ?? 'undefined'], t))

  return (
    <>
      <div className={`field-type relationship`}>
        <SelectInput
          Label={<label>Tagged Information</label>}
          name={'tags'}
          path={''}
          onChange={makeHandler('undefined')}

          value={asValue(getSelectedByParent())}
          hasMany
          options={asOption(byParent['undefined'] ?? [])}
        />
      </div>
      {Object.entries(byParent)
        .filter(([grp]) => tags.some((t) => t.title === grp))
        .map(([grp, options]) => (
          <Select
            key={grp}
            id={grp}
            label={fromCamelCase(grp)}
            onChange={makeHandler(grp)}
            value={asValue(getSelectedByParent(grp))}
            options={asOption(options ?? [])}
          />
        ))}
    </>
  )
}

export default TagClientField
