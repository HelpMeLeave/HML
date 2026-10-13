'use client'

import type { tNavFetchTopNavItem } from '@/app/(www)/_providers/_types'
import { ButtonLink } from '@/components/Navigation/ButtonLink'
import { InlineLink } from '@/components/primitives/Link'
import { ExternalLinkIcon } from 'lucide-react'

export const SectionPanel = ({
  section,
  onClose,
}: Props & {
  section: tNavFetchTopNavItem
  onClose: () => void
}) => (
  <div
    onMouseEnter={() => {}}
    onMouseLeave={onClose}
    className='absolute inset-x-0 top-full border-t border-b border-hr-muted/20 bg-background/90 shadow-[0_24px_48px_-28px] shadow-black/20 backdrop-blur-sm max-md:hidden dark:border-hr-muted'>
    <div className='relative z-1 mx-auto grid max-w-350 grid-cols-[minmax(0,17rem)_1fr_1fr] gap-x-12 px-12 pt-10 pb-9'>
      <div>
        <p className='mb-3 text-xs font-semibold tracking-[0.26em] text-soft uppercase'>
          {section.displayText}
        </p>
        <p className='max-w-60 text-sm leading-relaxed font-medium text-accent/75'>
          {section.description ?? `Everything filed under ${section.displayText?.toLowerCase()}.`}
        </p>
        {section.url && (
          <ButtonLink
            href={section.url}
            onClick={onClose}
            className='mt-5 inline-flex border-b-2 border-accent pb-1 text-[0.8rem] font-semibold text-body transition-colors hocus:text-accent hocus:outline-0'>
            Overview
          </ButtonLink>
        )}
      </div>

      {[0, 1].map((col) => (
        <ul
          key={col}
          className='flex flex-col'>
          {section.links
            .slice(
              col == 0 ? 0 : Math.ceil(section.links.length / 2),
              col == 0 ? Math.ceil(section.links.length / 2) : undefined
            )
            .map((child, i) => (
              <li key={`${child.url}-${i}`}>
                <InlineLink
                  href={child.url}
                  prefetch={false}
                  onClick={onClose}
                  className='group block border-b border-hr-muted py-2.5 text-soft! no-underline! decoration-0! last:border-b-0'>
                  <span className='mb-0.5 block text-[0.95rem] font-semibold underline decoration-accent/50 decoration-[1.75px] underline-offset-2 transition-colors group-hocus:text-accent group-hocus:decoration-accent group-hocus:decoration-1'>
                    {child.displayText}
                    {child.type == 'external' && (
                      <ExternalLinkIcon className='ml-2 inline-block size-2.5 text-current/50' />
                    )}
                  </span>
                  <span className='block text-[0.8rem] leading-snug font-normal text-muted'>
                    {child.description}
                  </span>
                </InlineLink>
              </li>
            ))}
        </ul>
      ))}
    </div>
  </div>
)
