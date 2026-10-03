import { UploadThingConfig } from '@/_config/plugins/upload-thing'
import { env } from '@/env'
import { s3Storage, type S3StorageOptions } from '@payloadcms/storage-s3'
import type { CollectionSlug } from 'payload'

const r2Bucket = ({
  endpointFolderName,
  collections,
}: {
  endpointFolderName?: string
  collections: CollectionSlug[]
}): S3StorageOptions => ({
  bucket: env.NEXT_PUBLIC_R2_BUCKET,
  collections: collections.reduce(
    (acc, current) => {
      acc[current] = true
      return acc
    },
    {} as Record<CollectionSlug, true>
  ),
  enabled: true,
  config: {
    endpoint: `https://${env.R2_ACCT}.r2.cloudflarestorage.com${endpointFolderName ? '/' + endpointFolderName : ''}`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_KEY,
    },
    region: 'auto',
  },
})

const MediaCredentials = s3Storage(r2Bucket({ collections: ['media'] }))

const FormUploadsCredentials = s3Storage(
  r2Bucket({
    endpointFolderName: 'form-uploads',
    collections: ['form-uploads'],
  })
)

const CountryImageCredentials = s3Storage(
  r2Bucket({
    endpointFolderName: 'countries',
    collections: ['country-images'],
  })
)

export const upload = [
  UploadThingConfig,
  CountryImageCredentials,
  MediaCredentials,
  FormUploadsCredentials,
]
