import type { BlockRowLabelServerComponent } from 'payload'

const GroupTitleRow: BlockRowLabelServerComponent = (rowData) => {
  return (
    <span className='block w-full whitespace-pre-wrap text-base'>
      {rowData.siblingData?.title ?? '[Untitled]'}
    </span>
  )
}

export default GroupTitleRow
