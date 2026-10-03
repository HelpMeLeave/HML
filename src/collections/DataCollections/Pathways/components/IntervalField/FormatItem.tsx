'use client'

import { proccessEntry } from '@/collections/DataCollections/Pathways/components/IntervalField/processEntry'
import { getPermissions } from '@/hooks/usePermissions'
import { cn } from '@/lib/cn'
import { TextInput, useField } from '@payloadcms/ui'
import type { JSONFieldClientProps } from 'payload'
import { type CSSProperties, useEffect, useEffectEvent, useRef, useState } from 'react'
import type { tInterval, tIntervalKey, tItem } from './util'
import { toIntervalString } from './util'

const IntervalTextField = ({ ...props }: JSONFieldClientProps) => {
  const field = useField<tInterval>({ path: props.path })

  const [entry, setEntry] = useState(field.value)
  const inputRef = useRef<HTMLInputElement>(null as unknown as HTMLInputElement)

  const parseEntry = (e: string) => {
    const afterCalc = proccessEntry(e)
    if (afterCalc && [1, 2].includes(afterCalc.length)) {
      const min = afterCalc[0] as tItem
      const max = afterCalc[afterCalc.length - 1] as tItem

      setEntry({ ...entry, min, max })
    }
  }

  const checkEqual = (check: tItem, key: tIntervalKey) =>
    Object.values(check).every((k) => {
      const checked = entry[key][k as keyof tItem] == k
      return checked
    })

  const watcher = useEffectEvent(() => {
    if (inputRef.current) {
      const el = inputRef.current as HTMLInputElement
      if (!checkEqual(entry.max, 'max') && !checkEqual(entry.min, 'min')) {
        field.setValue(entry)
        if (el && el.value) el.value = toIntervalString(entry)
      }
    }
  })

  useEffect(() => {
    const listener = (el: FocusEvent) => {
      el.currentTarget?.addEventListener('focusout', () => watcher())
    }

    if (inputRef.current) {
      inputRef.current.addEventListener('focusin', listener)
      return inputRef.current.removeEventListener('focusin', listener)
    }
  }, [])

  const permissions = getPermissions({ args: props })
  const styles = {
    '--field-width': `${props.field.admin?.width || 'auto'}`,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 200px',
  } as CSSProperties

  return (
    <span style={styles}>
      <TextInput
        hasMany={false}
        className={cn(
          `field-type text shrink grow duration-${`field-${props.field.name}`}`,
          permissions.canWrite ? '' : 'read-only'
        )}
        readOnly={permissions.readOnly}
        Label={field.customComponents?.Label}
        label={props.field.label}
        path=''
        value={toIntervalString(entry)}
        onChange={(e) => parseEntry(e.currentTarget.value)}
        inputRef={inputRef}
        Description={field.customComponents?.Description}
        description={props.field.admin?.description}
        required={props.field.required}
      />
    </span>
  )
}

export default IntervalTextField
