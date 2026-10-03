'use client'

import { TemplateGutter } from '@/_components/views/Base/TemplateGutter'
import { CreateNewBtn } from '@/collections/AccountingCollections/COA/_components/createNewBtn'
import { parseColumns } from '@/collections/AccountingCollections/COA/_lib/parseColumns'
import type { Coa } from '@/payload-types'
import { Table, useDocumentDrawer } from '@payloadcms/ui'
import { type Column } from 'payload'

export const COAClient = (props: { data: Coa[]; columnState: Column[] }) => {
  const [DocumentDrawer, DocumentDrawerToggler, { openDrawer, closeDrawer }] = useDocumentDrawer({
    collectionSlug: 'coa',
  })

  const handleSave = async () => {
    closeDrawer()
    if (window) {
      window.navigation.reload()
    }
  }

  return (
    <TemplateGutter
      title={
        <span>
          <h1>Chart of Accounts</h1>
          <CreateNewBtn openDrawerAction={openDrawer}>
            <DocumentDrawer
              drawerSlug='coa-new'
              onSave={handleSave}
            />
          </CreateNewBtn>
        </span>
      }>
      <div>
        <Table
          appearance='condensed'
          columns={parseColumns(props.data as Coa[], props.columnState, DocumentDrawerToggler)}
          data={props.data as unknown as Record<string, unknown>[]}
        />
        <DocumentDrawer
          drawerSlug='coa-iteme'
          onSave={handleSave}
        />
      </div>
    </TemplateGutter>
  )
}
