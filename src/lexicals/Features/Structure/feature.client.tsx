'use client'

import { StructurePlugin } from '@/lexicals/Features/Structure/plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

export default createClientFeature({
  plugins: [{ Component: StructurePlugin, position: 'normal' }],
})
