import type { ExplorerCommunityAttrs } from '@/app/(www)/(Content)/explorer/_types'
import { PrideFlag } from '@/components/Flag/PrideFlag'
import { TransFlag } from '@/components/Flag/TransFlag'
import { UNFlag } from '@/components/Flag/UN'
import { cn } from '@/lib/cn'
import type { Indicator } from '@/payload-types'
import type { JSX } from 'react'

export const IconAttributes = ({
  as,
  ...props
}: Props & {
  as?: keyof JSX.IntrinsicElements
  attr: ExplorerCommunityAttrs
}) => {
  const classNames = cn(
    'flex rounded-b-lg',
    'items-center justify-between',
    'px-2 *:px-2',
    props.className
  )

  if (!as) {
    return (
      <ul className={classNames}>
        {Object.entries(props.attr).map(([key, data]) => (
          <InnerAttributeLI
            key={key}
            attrData={{
              key: key as keyof ExplorerCommunityAttrs,
              data,
            }}
          />
        ))}
      </ul>
    )
  } else
    return (
      <span className={cn('flex', 'items-center justify-between', 'gap-x-4 px-2', props.className)}>
        <InnerAttributeSpan attr={props.attr} />
      </span>
    )
}

const InnerAttributeLI = ({
  attrData,
}: Props & {
  attrData: {
    key: keyof ExplorerCommunityAttrs | Valid<Indicator['icon']>
    data: ExplorerCommunityAttrs[keyof ExplorerCommunityAttrs]
  }
}) => {
  const { key, data } = attrData

  return Object(
    <li
      className={
        'mb-0 flex items-center gap-x-2 font-bold text-[#498DD5] uppercase no-underline! decoration-transparent decoration-0! empty:hidden'
      }>
      {(key == 'unMember' || key == 'un') && <UNFlag.Check attr={data} />}
      {(key == 'prideSafety' || key == 'pride') && <PrideFlag.Check attr={data} />}
      {(key == 'transSafety' || key == 'trans') && <TransFlag.Check attr={data} />}
    </li>
  )
}

const InnerAttributeSpan = ({ attr }: Props & { attr: ExplorerCommunityAttrs }) => {
  return (
    <>
      {attr.unMember && <UNFlag.Icon />}
      {attr.transSafety == true && (
        <span className={'text-current'}>
          <TransFlag.Icon />
        </span>
      )}
      {attr.prideSafety == true && (
        <span className='text-current/50'>
          <PrideFlag.Icon />
        </span>
      )}
    </>
  )
}
