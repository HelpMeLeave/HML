import { type DuotoneTweaks, duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import type { DuotoneThemed } from '@/lexicals/Features/Duotone/_types'
import { duotoneChipVars, getDuotonePreset } from '@/lexicals/Features/Duotone/presets'
import { cn } from '@/lib/cn'
import Image from 'next/image'

export const SectionCover = ({
  image,
  className,
  children,
  ...props
}: Props<'div'> & {
  image: {
    url: string
    duotone?: {
      color: DuotoneThemed
      position?: string
    } & DuotoneTweaks
  }
}) => {
  const { url, duotone } = image
  const filter =
    duotone?.color && getDuotonePreset(duotone.color) && duotoneFilter(duotone.color, duotone)
  // const filter = duotone?.color && getDuotonePreset(duotone?.color)?.image

  return (
    <div className='relative'>
      <span className='absolute top-0 right-0 bottom-0 left-0 block h-full w-full rounded-xl bg-accent outline-2 outline-offset-4 outline-accent' />
      <div
        data-slot='section-cover'
        {...props}
        style={{ ...duotoneChipVars(duotone?.color), ...props.style }}
        className={cn(
          'rounded-xl shadow-md',
          // '@container relative isolate mt-[1em] grid min-h-[min(40vh,32rem)] overflow-hidden p-[0.25em] text-[2em] *:flex *:flex-col-reverse *:text-[2em] **:font-normal md:text-[2.25em] *:[hgroup]:max-w-max',
          '@container relative isolate mt-[1em] grid min-h-[min(40vh,32rem)] overflow-hidden p-[0.25em] text-[2em] *:flex *:flex-col-reverse *:text-[2em] **:font-normal *:data-[slot=header]:max-w-max md:text-[2.25em]',
          // 0.35 = average letter width; raise if headings clip, lower if they fall short of the cover's width
          // '**:text-nowrap **:data-[slot="heading-text"]:max-w-min **:data-[slot="heading-text"]:px-4 **:data-[slot="heading-text"]:pt-2.5 **:data-[slot="heading-text"]:text-[min(1em,calc((100cqi-3rem)/(var(--chars,20)*0.35)))] **:data-[slot="heading-text"]:leading-[0.85]',
          '**:text-nowrap **:data-[slot=heading]:max-w-min **:data-[slot=heading]:px-4 **:data-[slot=heading]:pt-2.5 **:data-[slot=heading]:text-[min(1em,calc((100cqi-3rem)/(var(--chars,20)*0.35)))] **:data-[slot=heading]:leading-[0.85]',
          '**:data-[slot="eyebrow"]:text-[.25em] **:data-[slot="eyebrow"]:text-balance',
          '*:*:bg-(--chip-bg) **:text-(--chip-text)',
          duotone?.position?.includes('top') && 'content-start',
          duotone?.position?.includes('bottom') && 'content-end',
          duotone?.position?.includes('middle') && 'content-center',
          duotone?.position?.includes('left') && 'justify-start *:[hgroup]:items-start',
          duotone?.position?.includes('center') && 'justify-center *:[hgroup]:items-center',
          duotone?.position?.includes('right') && 'justify-end *:[hgroup]:items-end',
          className
        )}>
        <Image
          fill
          src=''
          overrideSrc={url}
          alt=''
          sizes='100vw,600px'
          className='-z-10 object-cover'
          style={filter ? { filter } : undefined}
        />
        {children}
      </div>
    </div>
  )
}
