import { env } from '@/env'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'
import { APIError } from 'payload'
import { UTApi, UTFile } from 'uploadthing/server'

const getUtApi = () => new UTApi({ token: env.UPLOADTHING_TOKEN })

const getKey = (doc: unknown): string | undefined => {
  if (
    doc
    && typeof doc === 'object'
    && '_key' in doc
    && typeof (doc as Record<string, unknown>)._key === 'string'
  ) {
    return (doc as Record<string, unknown>)._key as string
  }
}

export const uploadthingAdapter = (): Adapter => () => ({
  name: 'uploadthing',

  fields: [
    {
      name: '_key',
      type: 'text',
      admin: {
        disableBulkEdit: true,
        disableListColumn: true,
        disableListFilter: true,
        hidden: true,
      },
    },
  ],

  generateURL: ({ filename }) => `/media/pdfs/${filename}`,

  handleUpload: async ({ data, file }) => {
    if (data._key) return data
    const utapi = getUtApi()
    const blob = new Blob([file.buffer as unknown as ArrayBuffer], { type: file.mimeType })
    const res = await utapi.uploadFiles(new UTFile([blob], file.filename))
    if (res.error) {
      throw new APIError(`UploadThing upload failed: ${res.error.message}`)
    }
    data._key = res.data.key
    return data
  },

  handleDelete: async ({ doc }) => {
    const key = getKey(doc)
    if (!key) return
    await getUtApi().deleteFiles(key)
  },

  staticHandler: async (_req, { doc }) => {
    const key = getKey(doc)
    if (!key) return new Response('Not found', { status: 404 })
    return Response.redirect(`https://${env.UPLOADTHING_APP}.ufs.sh/f/${key}`)
  },
})
