import { parsePageGroup } from '@/_components/blocks/PageGroup/Component/_lib'
import type { Item } from '@/_components/blocks/PageGroup/Component/_types'
import { I } from '@/_components/blocks/PageGroup/Component/I'
import { Badge } from '@/components/Badge'
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from '@/components/Card'
import { P } from '@/components/primitives'
import { SectionBase, SectionHeading, SectionHGroup } from '@/components/Structure/Section'
import type { PageGroupBlock } from '@/payload-types'
import { Suspense } from 'react'

const ItemCard = ({ isInternal, item, i }: { isInternal: boolean; item: Item; i: number }) => {
  return (
    <Card
      as='a'
      href={item.url ?? '/'}
      target={item.target}
      data-external={isInternal ? undefined : 'true'}
      key={item.url}>
      <CardMeta>
        <I i={i} />
        <Badge
          color={
            !isInternal ? 'yellow'
            : item.category?.toLowerCase() == 'guide' ?
              'blue'
            : item.category?.toLowerCase() == 'how to' ?
              'amber'
            : 'blue'
          }
          className='font-mono font-normal tracking-widest uppercase sm:text-[0.65rem]/4'>
          {isInternal ? (item.category ?? 'in-house') : 'External'}
        </Badge>
      </CardMeta>

      <CardTitle>{item.text}</CardTitle>
      {item.preview && <CardBody>{item.preview}</CardBody>}
      {item.author && <CardFooter>by {item.author}</CardFooter>}
    </Card>
  )
}

export const PageGroupBlockComponent = async ({ title, filters }: PageGroupBlock) => {
  const items = await parsePageGroup(filters)

  return (
    <SectionBase>
      <SectionHGroup>
        <SectionHeading>{title}</SectionHeading>
      </SectionHGroup>

      <Suspense fallback={<P>Loading items...</P>}>
        <ul className='grid grid-cols-1 gap-4 pl-0 sm:grid-cols-2 lg:grid-cols-3'>
          {items?.map((ea, i) => {
            return (
              <ItemCard
                key={`${ea.category}-${ea.url}`}
                isInternal={ea.target === '_self'}
                item={ea}
                i={i}
              />
            )
          })}
        </ul>
      </Suspense>
    </SectionBase>
  )
}
