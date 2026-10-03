import { COAClient } from '@/collections/AccountingCollections/COA/view/index.client'
import type { Coa } from '@/payload-types'
import { type ListViewServerProps } from 'payload'

const COAListView = (props: ListViewServerProps) => {
  return (
    <COAClient
      data={props.data?.docs as Coa[]}
      columnState={props.columnState}
    />
  )
}

export default COAListView
