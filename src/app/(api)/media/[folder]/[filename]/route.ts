import { env } from '@/env'
import { getPayload } from '@/server/getPayload'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ folder: string; filename: string }> }
) => {
  const { filename, folder } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'documents',
    where: { filename: { equals: filename }, folder: { equals: folder } },
    limit: 1,
    depth: 0,
  })

  const doc = docs[0]
  if (!doc?._key) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const file = await fetch(`https://${env.UPLOADTHING_APP}.ufs.sh/f/${doc._key}`)
  if (!file.ok) return NextResponse.json({ error: 'File not found' }, { status: 404 })

  return file
}
