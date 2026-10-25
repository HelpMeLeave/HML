'use client'

import { ActionToolbarPlugin } from '@/lexicals/Features/ActionToolbar/Plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

export default createClientFeature({
  plugins: [{ Component: ActionToolbarPlugin, position: 'floatingAnchorElem' }],
})
