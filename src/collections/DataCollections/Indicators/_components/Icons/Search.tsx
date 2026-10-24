import { P } from '@/collections/DataCollections/Indicators/_components/Icons/P'
import { SearchBtn } from '@/collections/DataCollections/Indicators/_components/Icons/SearchBtn'
import type { Dispatch, SetStateAction } from 'react'

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
      <P style={{ marginBottom: 6 }}>Custom Boxicon Icon</P>
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
            border: '1px solid var(--color-ui-150)',
            background: 'transparent',
            fontSize: 13,
          }}
        />

        <SearchBtn
          custom={custom}
          selectAction={selectAction}
          setCustomAction={setCustomAction}
        />
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
