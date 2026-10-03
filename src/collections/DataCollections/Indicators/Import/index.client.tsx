'use client'

import { parseImport } from '@/collections/DataCollections/Indicators/_lib/parseImport'
import type { Indicator } from '@/payload-types'
import {
  Button,
  Drawer,
  DrawerToggler,
  TextareaInput,
  TextInput,
  toast,
  useConfig,
  useDocumentInfo,
  useFormFields,
  useFormModified,
  useModal,
} from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useMemo, useState } from 'react'

const slug = 'indicatorImportDrawer'

// An example line per kind, so the placeholder shows the exact format
const example: Record<Indicator['kind'], string> = {
  score: 'BRA\t48.2\nCAN\t71',
  rank: 'BRA\t1\nCAN\t2',
  'yes-no': 'BRA\tyes\nCAN\tno',
}

export const ImportDrawer = ({ countryCodes }: { countryCodes: string[] }) => {
  const { id } = useDocumentInfo()

  // Nothing to import into until the indicator has been created
  if (!id) return null

  return (
    <>
      <DrawerToggler
        className='btn btn--style-primary btn--size-medium'
        slug={slug}>
        Import
      </DrawerToggler>
      <Drawer
        slug={slug}
        title='Import values'>
        <ImportForm
          id={id}
          countryCodes={countryCodes}
        />
      </Drawer>
    </>
  )
}

const ImportForm = ({ id, countryCodes }: { id: number | string; countryCodes: string[] }) => {
  const kind = useFormFields(([fields]) => fields.kind?.value as Indicator['kind'] | undefined)
  // The endpoint reads the saved kind, so unsaved edits would make the preview disagree with the save
  const modified = useFormModified()
  const {
    config: { serverURL, routes },
  } = useConfig()
  const { closeModal } = useModal()
  const router = useRouter()

  const [year, setYear] = useState(String(new Date().getFullYear()))
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)

  const knownCountries = useMemo(() => new Set(countryCodes), [countryCodes])

  // Same parser the endpoint runs, so this preview is exactly what gets saved
  const { rows, skipped, blank } = useMemo(
    () =>
      kind ? parseImport({ text, kind, knownCountries }) : { rows: [], skipped: [], blank: 0 },
    [text, kind, knownCountries]
  )

  // Every valid code with an empty value column, built in the browser from the codes the server already sent
  const downloadTemplate = () => {
    const csv = ['country,value', ...[...countryCodes].sort().map((code) => `${code},`)].join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    link.download = 'indicator-import-template.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(`${serverURL}${routes.api}/indicators/${id}/import`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ year: Number(year), text }),
      })
      const result = await res.json()

      // Our own checks answer with `error`; Payload's (e.g. a missing indicator) answer with `errors`
      if (!res.ok) {
        toast.error(result.error ?? result.errors?.[0]?.message ?? 'Import failed.')
        return
      }

      toast.success(
        `Saved: ${result.inserted} added, ${result.updated} updated, ${result.unchanged} unchanged.`
      )
      setText('')
      closeModal(slug)
      // The values list on the indicator is server-rendered, so it needs a fresh read
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className='render-fields'>
      <p className='field-description'>
        One line per country: the 3-letter country code, then a tab or comma, then the value.
        {kind == 'rank' && ' Values are ranks, where 1 is best.'}
        {kind == 'yes-no' && ' Values are yes, no, 1 or 0.'} A header line is fine.
      </p>

      <Button
        buttonStyle='secondary'
        size='small'
        onClick={downloadTemplate}>
        Download template
      </Button>

      <TextInput
        path='importYear'
        label='Year the data describes'
        value={year}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
      />

      <TextareaInput
        path='importText'
        label='Values'
        rows={12}
        placeholder={kind ? example[kind] : ''}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {modified && (
        <p className='field-description'>
          Save the indicator first. The import uses its saved settings.
        </p>
      )}

      {text.trim() && (
        <p className='field-label'>
          {rows.length} ready to save · {blank} left blank · {skipped.length} skipped
        </p>
      )}

      {skipped.length > 0 && (
        <ul className='field-description'>
          {skipped.map(({ line, text: rowText, reason }) => (
            <li key={line}>
              Line {line}: <code>{rowText}</code> — {reason}
            </li>
          ))}
        </ul>
      )}

      <Button
        buttonStyle='primary'
        disabled={!rows.length || saving || modified}
        onClick={save}>
        {saving ? 'Saving…' : `Save ${rows.length} ${rows.length == 1 ? 'row' : 'rows'}`}
      </Button>
    </div>
  )
}
