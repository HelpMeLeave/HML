import { env } from '@/env'
import { getPayload } from '@/server/getPayload'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (_req: NextRequest, ctx: RouteContext<'/documents/[type]'>) => {
  const { type } = await ctx.params
  const payload = await getPayload()
  const { values } = await payload.findDistinct({
    collection: 'documents',
    where: {
      filename: {
        like: type.toLowerCase(),
      },
    },
    field: '_key',
    limit: 1,
    depth: 0,
  })

  const data = await fetch(`https://${env.UPLOADTHING_APP}.ufs.sh/f/${values[0]._key}`)

  if (data.ok) {
    return data
  }

  return NextResponse.json({
    error: 'Not a valid address',
  })
}
