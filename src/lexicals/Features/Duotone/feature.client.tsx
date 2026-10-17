'use client'

import { DuotonePreviewPlugin } from '@/lexicals/Features/Duotone/Plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

export default createClientFeature({
  plugins: [{ Component: DuotonePreviewPlugin, position: 'normal' }],
})
