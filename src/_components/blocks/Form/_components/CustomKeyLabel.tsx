'use client'

import { toTitleCase } from '@/lib/textCasing'
import { useRowLabel } from '@payloadcms/ui'

const CustomLabelComponent = ({ dataKey }: { dataKey: string }) => {
  const { data } = useRowLabel() as {
    data: {
      blockType: string
      blockName: string
    } & Record<typeof dataKey, string>
  }

  if (!data) return <></>

  return (
    data[dataKey] && (
      <div className='pill pill--size-small blocks-field__block-pill blocks-field__block-pill-select flex! w-full text-lg! capitalize!'>
        {toTitleCase(data[dataKey])}
      </div>
    )
  )
}

export default CustomLabelComponent
