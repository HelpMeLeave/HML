'use client'

import { BlockGatePlugin } from '@/lexicals/Features/BlockGate/Plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

export default createClientFeature({
  plugins: [{ Component: BlockGatePlugin, position: 'normal' }],
})
