import { uploadthingAdapter } from '@/_config/plugins/upload-thing/adapter'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'

export const UploadThingConfig = cloudStoragePlugin({
  collections: {
    documents: {
      adapter: uploadthingAdapter(),
      disablePayloadAccessControl: true,
    },
  },
})
