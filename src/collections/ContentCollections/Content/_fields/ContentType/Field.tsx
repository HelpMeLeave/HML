import { contentTypes } from '@/collections/ContentCollections/Content/_lib/conditions'
import type { tContentType } from '@/collections/ContentCollections/Content/_lib/types'
import { env } from '@/env'
import { cn } from '@/lib/cn'
import { fromCamelCase, toTitleCase } from '@/lib/textCasing'
import { Link } from '@payloadcms/ui'
import {
  ArrowRightLeftIcon,
  Hammer,
  Library,
  NotebookPen,
  Scale,
  Speech,
  TextAlignStartIcon,
  type LucideIcon,
} from 'lucide-react'
import type { UIFieldServerProps } from 'payload'
import type { ParamSegments } from 'payload-types'
import './style.scss'

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
  const Actions: Record<tContentType, LucideIcon> = {
    blog: Library,
    newsCommentary: Scale,
    report: NotebookPen,
    resource: Hammer,
    statement: Speech,
    hub: ArrowRightLeftIcon,
    other: TextAlignStartIcon,
  }

  const contentType = props.req.searchParams.get('type') ?? getContentTypeFromParams(props.req.url)

  return (
    !props.id
    && !contentType && (
      <>
        <div id={'contentTypeChoice'}>
          {contentTypes.map((type) => {
            const Icon = Actions[type]

            return (
              <Link
                className='card'
                id={'contentType' + toTitleCase(type)}
                key={type}
                href={`${env.NEXT_PUBLIC_BASE_URL}/admin/collections/content/create?type=${type}`}>
                <span>{fromCamelCase(type).replace(' ', ' & ')}</span>
                <Icon
                  className={cn(
                    type == 'blog'
                      && '*:stroke-2! *:odd:stroke-brand-mulberry *:odd:dark:stroke-yellow-700',
                    type == 'statement' && '*:first:fill-current *:first:stroke-0',
                    (type == 'report' || type == 'resource')
                      && '*:last:fill-current *:last:stroke-0',
                    'stroke-[1.5px]! text-accent'
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
