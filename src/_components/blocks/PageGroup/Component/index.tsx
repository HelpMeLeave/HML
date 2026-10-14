import { parsePageGroup } from '@/_components/blocks/PageGroup/Component/_lib'
import type { CardBageProps, ItemCardProps } from '@/_components/blocks/PageGroup/Component/_types'
import { Badge } from '@/components/Badge'
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from '@/components/Card'
import { P } from '@/components/primitives'
import { SectionBase, SectionHeading, SectionHGroup } from '@/components/Structure/Section'
import type { PageGroupBlock } from '@/payload-types'
import { Suspense } from 'react'

const CardNumber = ({ i }: { i: number }) => (
  <span className='font-mono text-xs text-grey-600 tabular-nums'>
    {String(i + 1).padStart(2, '0')}
  </span>
)

const CardBadge = ({ isInternal, category }: CardBageProps) => {
  const processCat = () => {
    const initCat = (category?.toLowerCase() ?? '').trim()
    if (initCat == '' || !initCat) return isInternal ? 'in-house' : 'external'
    return initCat
  }

  const thisCat = processCat()

  return (
    <Badge
      color={
        !isInternal ? 'yellow'
        : thisCat == 'guide' ?
          'blue'
        : thisCat == 'how to' ?
          'amber'
        : thisCat == 'press release' ?
          'rose'
        : thisCat == 'in-house' ?
          'zinc'
        : thisCat == 'news & commentary' ?
          'violet'
        : 'emerald'
      }
      className='font-mono font-normal tracking-widest uppercase sm:text-[0.65rem]/4'>
      {thisCat}
    </Badge>
  )
}
const ItemCard = ({ isInternal, item, i, className }: ItemCardProps) => {
  return (
    <Card
      className={className}
      as='a'
      href={item.url ?? '/'}
      target={item.target}
      data-external={isInternal ? undefined : 'true'}
      key={item.url}>
      <CardMeta>
        <CardNumber i={i} />
        <CardBadge
          isInternal={isInternal}
          category={item.category}
        />
      </CardMeta>

      <CardTitle>{item.text}</CardTitle>
      {item.preview && <CardBody>{item.preview}</CardBody>}
      {item.author && <CardFooter>by {item.author}</CardFooter>}
    </Card>
  )
}

export const PageGroupBlockComponent = async ({ title, filters }: PageGroupBlock) => {
  return (
    <SectionBase>
      <SectionHGroup>
        <SectionHeading>{title}</SectionHeading>
      </SectionHGroup>

      <Suspense fallback={<P>Loading items...</P>}>
        <ul className='grid grid-cols-1 gap-4 pl-0 sm:grid-cols-2'>
          {(await parsePageGroup(filters))?.map((ea, i, arr) => (
            <ItemCard
              key={`${ea.category}-${ea.url}`}
              isInternal={ea.target === '_self'}
              item={ea}
              i={i}
              className={i % 2 == 0 && arr.length - 1 == i ? 'col-span-full' : ''}
            />
          ))}
        </ul>
      </Suspense>
    </SectionBase>
  )
}
