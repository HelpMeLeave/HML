'use client'
import { Button } from '@payloadcms/ui'
import type { Dispatch, SetStateAction } from 'react'
import { P } from './P'

export const Search = ({
  custom,
  selectAction,
  setCustomAction,
}: {
  custom: string
  setCustomAction: Dispatch<SetStateAction<string>>
  selectAction: (id: string) => void
}) => {
  return (
    <div
      id='iconSearch'
      className='w-full'>
      <P style={{ marginBottom: 6 }}>Custom Lucide Icon</P>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type='text'
          placeholder='e.g. Accessibility'
          value={custom}
          onChange={(e) => setCustomAction(e.target.value)}
          style={{
            flex: 1,
            padding: '6px 10px',
            borderRadius: 6,
            border: '1px solid var(--theme-elevation-150)',
            background: 'transparent',
            fontSize: 13,
          }}
        />
        <Button
          margin={false}
          type='button'
          className='btn btn--style-secondary btn--size-small'
          disabled={!custom.trim()}
          onClick={() => {
            selectAction(custom.trim())
            setCustomAction('')
          }}>
          Use
        </Button>
      </div>

      <p style={{ fontSize: '0.65rem', opacity: 0.5, marginTop: 4 }}>
        Enter any PascalCase name from the{' '}
        <a
          href='https://lucide.dev/icons/'
          target='_blank'
          rel='noreferrer'
          style={{ textDecoration: 'underline' }}>
          Lucide icon library
        </a>
      </p>
    </div>
  )
}
