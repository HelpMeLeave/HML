import { getAuthFromRequest } from '@/server/getAuthFromRequest'
import { getPayload } from '@/server/getPayload'
import type { File } from 'payload'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  documents: f(['pdf'])
    .middleware(async ({ req }) => {
      const { user } = await getAuthFromRequest(req)
      if (!user) throw new UploadThingError('Unauthorized')
      return { userId: user.id }
    })
    .onUploadError(({ error, fileKey }) => {
      console.error('Upload error', fileKey, error)
    })
    .onUploadComplete(async ({ file }) => {
      try {
        const res = await fetch(file.ufsUrl)
        const buffer = await res.arrayBuffer()

        const theFile = new File([buffer], file.name, { type: file.type }) as unknown as File

        const payload = await getPayload()
        const doc = await payload.create({
          collection: 'documents',
          file: theFile,
          data: {
            title: file.name,
            _key: file.key,
          },
        })
        return { id: doc.id }
      } catch (err) {
        console.error('[onUploadComplete] error', err)
        throw err
      }
    }),
} satisfies FileRouter
