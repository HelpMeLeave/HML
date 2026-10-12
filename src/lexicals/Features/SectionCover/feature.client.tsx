'use client'

import { SectionCoverPlugin } from '@/lexicals/Features/SectionCover/Plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

export default createClientFeature({
  plugins: [{ Component: SectionCoverPlugin, position: 'normal' }],
})
