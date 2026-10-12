import {
  RichListItemBodyNode,
  RichListItemNode,
  RichListItemTitleNode,
} from '@/lexicals/Features/RichListItem/nodes'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const RichListItemFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexicals/Features/RichListItem/feature.client',
    nodes: [
      { node: RichListItemNode },
      { node: RichListItemTitleNode },
      { node: RichListItemBodyNode },
    ],
  },
  key: 'rich-list-item',
})
