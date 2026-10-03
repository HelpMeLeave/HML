import { MAX_UPLOAD_BYTES, resolveMimes } from '@/_components/blocks/Form/_lib/fileTypes'
import { getPayload } from '@/server/getPayload'
import { NextResponse } from 'next/server'

// Handles a single file upload from a public Form Upload field. All validation is
// derived from the trusted Form document (never the client), then the file is stored
// in the `form-uploads` collection with access overridden.
export const POST = async (req: Request) => {
  const formData = await req.formData()
  const file = formData.get('file')
  const formId = formData.get('formId')
  const blockId = formData.get('blockId')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 })
  }
  if (!formId || !blockId) {
    return NextResponse.json({ error: 'Missing form context.' }, { status: 400 })
  }

  if (file.size === 0) {
    return NextResponse.json({ error: 'File is empty.' }, { status: 400 })
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File exceeds the ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB limit.` },
      { status: 400 }
    )
  }

  const payload = await getPayload()

  const form = await payload.findByID({
    collection: 'forms',
    id: Number(formId),
    depth: 0,
    overrideAccess: true,
  })

  const block = form.fields?.find((f) => f.blockType === 'formFieldUpload' && f.id === blockId)
  if (!block || block.blockType !== 'formFieldUpload') {
    return NextResponse.json({ error: 'Upload field not found on this form.' }, { status: 400 })
  }

  const allowedMimes = resolveMimes(block.allowedFileTypes)
  if (allowedMimes.length && !allowedMimes.includes(file.type)) {
    return NextResponse.json({ error: 'File type is not allowed.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const doc = await payload.create({
    collection: 'form-uploads',
    data: {},
    file: {
      data: buffer,
      name: file.name,
      mimetype: file.type,
      size: file.size,
    },
    overrideAccess: true,
  })

  return NextResponse.json({ id: doc.id, url: doc.url, filename: doc.filename })
}
