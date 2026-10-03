'use client'
import type { LexicalInlineBlockLabelClientProps } from '@payloadcms/richtext-lexical'

import { useField } from '@payloadcms/ui'

const DynamicTextLabel: React.FC<LexicalInlineBlockLabelClientProps> = () => {
  const { value } = useField<string>({ path: 'value' })

  return <span>{value}</span>
}

export default DynamicTextLabel
