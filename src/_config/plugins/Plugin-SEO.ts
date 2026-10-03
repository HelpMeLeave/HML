import { env } from '@/env'
import type { Media } from '@/payload-types'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { Document } from 'payload'

export const SEOConfig = seoPlugin({
  collections: ['media'],
  tabbedUI: true,
  uploadsCollection: 'media',
  generateTitle: ({ doc }: { doc: Document }) => {
    let { title } = doc
    if ('subtitle' in doc) {
      const { brow } = doc as Document
      if (brow) {
        title = `${brow} - ${title}`
      }
    }
    return `Help Me Leave: ${title}`
  },
  generateURL: ({ ...props }) => {
    const { collectionConfig: collection } = props
    return `${env.NEXT_PUBLIC_BASE_URL}/${collection?.slug}` + `{/${(props.doc as Document).slug}`
  },
  generateImage: async (args) => {
    if (args.collectionSlug == 'media') {
      const { doc } = args as { doc: Media }
      if (doc.mimeType?.includes('image')) {
        return await args.req.payload.findByID({
          collection: 'media',
          id: doc.id,
          req: args.req,
        })
      }
    }
    return ''
  },
})
