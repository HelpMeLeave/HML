'use client'
import { Upload, useDocumentInfo } from '@payloadcms/ui'

export const CustomUploadClient = () => {
  const { docConfig, initialState } = useDocumentInfo()
  return (
    <div>
      <Upload
        collectionSlug={'country-images'}
        initialState={initialState}
        // @ts-expect-error Payload CMS type mismatch
        uploadConfig={docConfig && 'upload' in docConfig && docConfig.upload}
      />
    </div>
  )
}
