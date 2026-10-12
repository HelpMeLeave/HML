import { SectionHGroup, SectionSubtitle } from '@/components/Structure/Section'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import type { DuotoneFields, DuotoneThemed } from '@/lexicals/Features/Duotone/_types'
import {
  duotoneAccent,
  duotoneChipVars,
  getDuotonePreset,
} from '@/lexicals/Features/Duotone/presets'
import { textOf } from '@/lexicals/RenderRichText/_lib'
import { cn } from '@/lib/cn'
import type { SerializedElementNode } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverterArgs } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { CSSProperties } from 'react'

type ConverterArgProps = Pick<JSXConverterArgs<SerializedElementNode>, 'nodesToJSX' | 'node'>

type SectionCoverProps = Props<'div'>
  & ConverterArgProps & {
    cover: {
      url: string
      duotone?: DuotoneFields['duotone']
    }
  }

const Subtitle = ({
  nodesToJSX,
  color,
  subtitle,
}: {
  nodesToJSX: ConverterArgProps['nodesToJSX']
  color?: DuotoneThemed
  subtitle: SerializedElementNode
}) =>
  subtitle && (
    <SectionSubtitle
      style={{ '--accent': duotoneAccent(color) } as CSSProperties}
      className='mt-2 mb-8 w-full px-4 text-center text-[0.9em] text-wrap text-body!'>
      <span>{nodesToJSX({ nodes: subtitle.children })}</span>
    </SectionSubtitle>
  )

export const SectionCover = ({
  cover,
  className,
  node,
  nodesToJSX,
  ...props
}: SectionCoverProps) => {
  const { url, duotone } = cover
  const filter =
    duotone?.color && getDuotonePreset(duotone.color) && duotoneFilter(duotone.color, duotone)

  const { heading, eyebrow, subtitle } = node.children.slice(1).reduce(
    (final, current) => {
      Object.assign(final, {
        [current.type.replace('section-', '')]: current,
      })
      return final
    },
    {} as Record<'heading' | 'eyebrow' | 'subtitle', SerializedElementNode>
  )

  const duotoneClassName = [
    duotone?.position?.includes('top') && 'content-start',
    duotone?.position?.includes('bottom') && 'content-end',
    duotone?.position?.includes('middle') && 'content-center',
    duotone?.position?.includes('left') && 'justify-start *:[hgroup]:items-start',
    duotone?.position?.includes('center') && 'justify-center *:[hgroup]:items-center',
    duotone?.position?.includes('right') && 'justify-end *:[hgroup]:items-end',
  ]

  return (
    <>
      <div className='relative'>
        <div
          data-slot='section-cover'
          {...props}
          style={{
            ...duotoneChipVars(duotone?.color),
            // @ts-expect-error custom variable
            '--chars': textOf(heading).length || undefined,
            ...props.style,
          }}
          className={cn(
            'rounded-xl shadow-md',
            '@container relative isolate mt-(--heading-size,1em) grid min-h-[min(40vh,32rem)] overflow-hidden p-[0.25em] text-[2em] md:text-[2.25em]',
            // 0.35 = average letter width; raise if headings clip, lower if they fall short of the cover's width
            duotoneClassName,
            'max-sm:max-w-full md:-right-6 md:-left-6 md:w-[calc(100%+3rem)]',
            className
          )}>
          <Image
            fill
            src={url.replace(/(\.[a-z]+$)/, '-medium$1')}
            alt=''
            sizes='100vw,600px'
            className='-z-10 object-cover'
            style={filter ? { filter } : undefined}
            unoptimized
          />
          <SectionHGroup
            className={cn(
              '*:bg-(--chip-bg) **:text-(--chip-text)',
              '*:text-nowrap',
              'flex max-w-max flex-col-reverse text-[2em] *:font-normal',
              '*:slot-eyebrow:text-[.25em] *:slot-eyebrow:text-balance',
              '*:slot-heading:max-w-min *:slot-heading:px-1 *:slot-heading:pt-2.5 *:slot-heading:text-[min(1em,calc((100cqi-3rem)/(var(--chars,20)*0.35)))] *:slot-heading:leading-[0.85]'
            )}>
            {nodesToJSX({ nodes: [eyebrow, heading].filter(Boolean) })}
          </SectionHGroup>
        </div>
      </div>
      <Subtitle
        subtitle={subtitle}
        color={cover.duotone?.color}
        nodesToJSX={nodesToJSX}
      />
    </>
  )
}
