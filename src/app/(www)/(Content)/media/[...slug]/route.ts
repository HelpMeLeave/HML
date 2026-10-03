import { env } from '@/env'

export const GET = async (
  req: Request,
  { params }: { params: Promise<Record<'slug', string[]>> }
) => {
  const { slug } = await params
  const mediaUrl = `${env.NEXT_PUBLIC_BASE_URL}/api/media/file/${slug[slug.length - 1]}`

  return await fetch(mediaUrl)
}
