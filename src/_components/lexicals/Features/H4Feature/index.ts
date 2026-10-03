import { H4Node } from '@/_components/lexicals/Features/H4Feature/H4Node'
import { createServerFeature } from '@payloadcms/richtext-lexical'

export const H4Feature = createServerFeature({
  feature: {
    ClientFeature: '@/_components/lexicals/Features/H4Feature/feature.client#H4Client',
    nodes: [{ node: H4Node }],
  },
  key: 'h4',
})
