import { env } from '@/env'
import type { UIFieldServerProps } from 'payload'

const uploadThingLinkByKey = (key: string) => {
  return `https://${env.UPLOADTHING_APP}.ufs.sh/f/${key}`
}

const DocumentPreview = async ({ id, payload, req }: UIFieldServerProps) => {
  if (!id) return
  const doc = await payload.findByID({
    collection: 'documents',
    id,
    depth: 0,
    req,
  })
  if (!doc || !doc._key) return

  return (
    <div id='embedded'>
      <iframe src={uploadThingLinkByKey(doc._key)} />
    </div>
  )
}

export default DocumentPreview
