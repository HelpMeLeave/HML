import { env } from '@/env'
import { getPayload } from '@/server/getPayload'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) => {
  const { filename } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'documents',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
  })

  const doc = docs[0]
  if (!doc?._key) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const file = await fetch(`https://${env.UPLOADTHING_APP}.ufs.sh/f/${doc._key}`)
  if (!file.ok) return NextResponse.json({ error: 'File not found' }, { status: 404 })

  return file
}
