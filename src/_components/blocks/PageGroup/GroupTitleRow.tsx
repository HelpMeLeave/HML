import type { BlockRowLabelServerComponent } from 'payload'

const GroupTitleRow: BlockRowLabelServerComponent = (rowData) => {
  return (
    <span className='block w-full text-base whitespace-pre-wrap'>
      {rowData.siblingData?.title ?? '[Untitled]'}
    </span>
  )
}

export default GroupTitleRow
