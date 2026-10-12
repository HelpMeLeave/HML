'use client'
import { Upload, useDocumentInfo } from '@payloadcms/ui'
import type {
  ClientCollectionConfig,
  ClientGlobalConfig,
  CollectionSlug,
  Data,
  FormState,
} from 'payload'

const CustomUploadClient = () => {
  const { collectionSlug, docConfig, initialState } = useDocumentInfo() as {
    collectionSlug: CollectionSlug
    docConfig: ClientCollectionConfig | ClientGlobalConfig
    initialState: FormState
    data: Data
  }

  if ('upload' in docConfig) {
    return (
      <>
        <Upload
          collectionSlug={collectionSlug}
          initialState={initialState}
          uploadConfig={docConfig.upload}
        />
      </>
    )
  }
}

export default CustomUploadClient
