'use client'

import { EditableSyncPlugin } from '@/lexicals/Features/EditableSync/Plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

export default createClientFeature({
  plugins: [{ Component: EditableSyncPlugin, position: 'normal' }],
})
