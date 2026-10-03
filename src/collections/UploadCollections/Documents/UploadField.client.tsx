'use client'
import { Dropzone } from '@/collections/UploadCollections/Documents/_components/Dropzone'
import { TextInput, useConfig } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useState, type ChangeEvent } from 'react'

export const UploadFieldClient = () => {
  const router = useRouter()
  const { config } = useConfig()
  const [filename, setFilename] = useState<string | null>(null)

  return (
    <div>
      <Dropzone
        filename={filename}
        onUploadCompleteAction={({ id }) => {
          router.push(`${config.routes.admin}/collections/documents/${id}`)
        }}
        onFileSelectedAction={setFilename}
        pendingFilename={filename ?? undefined}>
        {filename && (
          <div>
            <TextInput
              path='fileName'
              Label={<label htmlFor='field-fileName'>File Name</label>}
              value={filename}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFilename(e.currentTarget.value)}
            />
          </div>
        )}
      </Dropzone>
    </div>
  )
}
