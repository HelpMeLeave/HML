import { env } from '@/env'
import { getPayload } from '@/server/getPayload'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (_req: NextRequest, ctx: RouteContext<'/documents/[type]/[val]'>) => {
  const { type, val } = await ctx.params

  if (type == 'key') {
    const data = await fetch(`https://${env.UPLOADTHING_APP}.ufs.sh/f/${val}`)
    if (data.ok) {
      return data
    }
  } else if (type == 'filename' || type == 'file') {
    const payload = await getPayload()

    const { values } = await payload.findDistinct({
      collection: 'documents',
      where: {
        filename: {
          equals: val.toLowerCase(),
        },
      },
      field: '_key',
      limit: 1,
      depth: 0,
    })

    return await fetch(`https://${env.UPLOADTHING_APP}.ufs.sh/f/${values[0]._key}`)
  }

  return NextResponse.json({
    error: 'Not a valid address',
  })
}
