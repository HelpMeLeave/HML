'use client'

import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { tNavFetchCTX } from '@/app/(www)/_providers/_types'
import { InlineLink } from '@/components/primitives/Link'
import { env } from '@/env'
import { cn } from '@/lib/cn'
import type { RichTextBlock } from '@/payload-types'
import { X } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'

export const AnnouncementInnerWrapper = ({ banner }: { banner: tNavFetchCTX['banner'] }) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    isVisible
    && banner && (
      <div
        data-show={isVisible ? '' : undefined}
        className='grid h-full w-full grid-cols-[1fr_auto] items-center gap-6 bg-accent-800 px-6 py-3.5 text-ui-25 transition hover:bg-accent-900 sm:px-6.5'>
        <Link
          className='block flex-1 no-underline decoration-0'
          tagline={banner.tagline}
          url={banner.url}
        />
        <AnnouncementCloseButton handleClick={setIsVisible} />
      </div>
    )
  )
}

const AnnouncementCloseButton = ({
  handleClick,
}: {
  handleClick: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <div className='flex justify-end'>
      <button
        title='Dismiss'
        type='button'
        onClick={() => handleClick(false)}
        className='-m-3 click rounded-xl p-3 text-accent-50 outline-accent transition hover:bg-accent focus-visible:-outline-offset-4 active:shadow-inner'>
        <span className='sr-only'>Dismiss</span>
        <X
          aria-hidden={true}
          className={'size-4'}
        />
      </button>
    </div>
  )
}

type BannkerLinkProps = {
  tagline: RichTextBlock['content']
  url: string
}

const Link = ({ url, tagline, className }: BannkerLinkProps & Pick<Props, 'className'>) => {
  return (
    <InlineLink
      className={cn(
        'flex h-full w-full max-w-full items-center justify-center gap-x-3 overflow-hidden text-center font-medium tracking-wider italic dark:text-accent',
        className
      )}
      href={`${env.NEXT_PUBLIC_BASE_URL}${url}`}
      target={'_self'}
      rel='noopener noreferrer'>
      <span>
        <RichTextComponent
          content={tagline}
          blockType={'rich-text'}
          converterOverrides={{
            paragraph: ({ node, nodesToJSX }) => <>{nodesToJSX({ nodes: node.children })}</>,
          }}
        />
      </span>
    </InlineLink>
  )
}
