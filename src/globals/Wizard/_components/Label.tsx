'use client'

import { useRowLabel } from '@payloadcms/ui'

const BlockLabel = () => {
  const { data } = useRowLabel() as {
    data: {
      text: string
    }
  }
  return data?.text ? data?.text : '[Action]'
}

export default BlockLabel
