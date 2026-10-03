import type { Coa } from '@/payload-types'
import { type UseDocumentDrawer, SortColumn } from '@payloadcms/ui'
import type { Column } from 'payload'

const getColumns = (columnState: Column[]) =>
  Object.fromEntries(columnState.map((col) => [col.accessor, col])) as Record<keyof Coa, Column>

export const parseColumns = (
  data: Coa[],
  columns: Column[],
  DocumentDrawerToggler: ReturnType<UseDocumentDrawer>['1']
): Column[] => {
  const cols = getColumns(columns)
  return [
    {
      ...cols.id,
      Heading: (
        <SortColumn
          Label={<div>Account</div>}
          name={'id'}
        />
      ),
      active: true,
      renderedCells: data.map((doc) => (
        <DocumentDrawerToggler
          drawerSlug='coa-item'

          id={String(doc.id)}
          key={`${doc.id}-acct`}>
          {String(doc.id).replace(/^(.{4})(.+)$/g, '$1-$2')}
        </DocumentDrawerToggler>
      )),
    },
    {
      ...cols.name,
      Heading: (
        <SortColumn
          Label={<div>Name</div>}
          name={'name'}
        />
      ),
      active: true,
      renderedCells: data.map((doc) => <span key={`name-${doc.id}`}>{doc.name}</span>),
    },
  ]
}
