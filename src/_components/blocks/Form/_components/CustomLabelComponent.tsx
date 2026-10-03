'use client'

import { toTitleCase } from '@/lib/textCasing'
import { useRowLabel } from '@payloadcms/ui'

const CustomLabelComponent = () => {
  const { data } = useRowLabel() as {
    data: {
      blockType: string
      blockName: string
    }
  }

  if (!data) return <></>

  return (
    <div className='pill pill--style-white pill--size-small blocks-field__block-pill blocks-field__block-pill-select flex! w-full text-lg! capitalize!'>
      {toTitleCase(data.blockType)} Field
    </div>
  )
}

export default CustomLabelComponent
