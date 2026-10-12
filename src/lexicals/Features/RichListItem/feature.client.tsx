'use client'

import {
  RichListItemBodyNode,
  RichListItemNode,
  RichListItemTitleNode,
} from '@/lexicals/Features/RichListItem/nodes'
import { RichListItemPlugin } from '@/lexicals/Features/RichListItem/Plugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import './style.scss'

export default createClientFeature({
  nodes: [RichListItemNode, RichListItemTitleNode, RichListItemBodyNode],
  plugins: [{ Component: RichListItemPlugin, position: 'normal' }],
})
