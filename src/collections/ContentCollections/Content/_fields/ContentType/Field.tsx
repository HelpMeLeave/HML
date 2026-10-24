import { contentTypes } from '@/collections/ContentCollections/Content/_lib/conditions'
import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import { env } from '@/env'
import { cn } from '@/lib/cn'
import { fromCamelCase, toTitleCase } from '@/lib/textCasing'
import type { BoxIcon } from '@boxicons-pro/react'
import {
  ArrowRightLeft,
  BookLibrary,
  ComicBubble,
  DiamondAlt,
  Newspaper,
  ReadingGlass,
  Receipt,
} from '@boxicons-pro/react'
import { Link } from '@payloadcms/ui'
import type { UIFieldServerProps } from 'payload'
import type { ParamSegments } from 'payload-types'

const getContentTypeFromParams = (params?: ParamSegments | string) => {
  if (!params) return
  if (typeof params != 'string') {
    params = params.segments!.join('/')
  }
  params = params.replace(/.+create\/?/, '')
  if (params.length == 0) return

  return params.replace(/[^=]+([^/]+).*/, '$1')
}

const ContentTypeChoice = (props: UIFieldServerProps) => {
  const Actions: Record<tContentType, BoxIcon> = {
    blog: BookLibrary,
    newsCommentary: Newspaper,
    report: Receipt,
    resource: DiamondAlt,
    statement: ComicBubble,
    hub: ArrowRightLeft,
    other: ReadingGlass,
  }

  const contentType = props.req.searchParams.get('type') ?? getContentTypeFromParams(props.req.url)

  return (
    !props.id
    && !contentType && (
      <>
        <div
          id={'contentTypeChoice'}
          className='mt-8 flex flex-wrap gap-4'>
          {contentTypes.map((type) => {
            const Icon = Actions[type]

            return (
              <Link
                className='card flex h-25 flex-[1_1_400px] items-center justify-between rounded-(--style-radius-l) bg-ui-100 p-6 font-light uppercase no-underline hover:bg-ui-800 hover:text-ui-100 hover:transition-all hover:duration-250 hover:ease-in-out'
                id={'contentType' + toTitleCase(type)}
                key={type}
                href={`${env.NEXT_PUBLIC_BASE_URL}/admin/collections/content/create?type=${type}`}>
                <span className='text-2xl/[auto]'>{fromCamelCase(type).replace(' ', ' & ')}</span>
                <Icon
                  className={cn(
                    type == 'blog'
                      && '*:stroke-2 *:odd:stroke-mulberry-700 *:odd:dark:stroke-yellow-700',
                    type == 'statement' && '*:first:fill-current *:first:stroke-0',
                    (type == 'report' || type == 'resource')
                      && '*:last:fill-current *:last:stroke-0',
                    'size-8 stroke-15 text-accent'
                  )}
                />
              </Link>
            )
          })}
        </div>
      </>
    )
  )
}

export default ContentTypeChoice
