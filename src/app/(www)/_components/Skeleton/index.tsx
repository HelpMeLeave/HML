import { P } from '@/components/primitives'
import { Main, MainHeading, MainHGroup } from '@/components/Structure/Main'
import { Section } from '@/components/Structure/Section'
import { cn } from '@/lib/cn'
import type { ClassNameValue } from 'tailwind-merge'

const SkeletonLine = ({
  size,
  className,
}: {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: ClassNameValue
}) => {
  return (
    <span
      className={cn(
        'block h-4 w-full rounded-2xl bg-highlight',
        size == 'sm' && 'max-w-25',
        size == 'md' && 'max-w-50',
        size == 'lg' && 'max-w-75',
        size == 'xl' && 'max-w-110',
        size == '2xl' && 'max-w-125',
        className
      )}
    />
  )
}

export const Skeleton = () => {
  return (
    <Main
      data-layout='constrained'
      data-page='skeleton'>
      <MainHGroup>
        <MainHeading>
          <SkeletonLine
            size='lg'
            className='mb-1'
          />
          <SkeletonLine
            size='sm'
            className='mb-1'
          />
          <SkeletonLine size='md' />
        </MainHeading>
      </MainHGroup>
      <Section
        heading={<SkeletonLine size='md' />}
        brow={<SkeletonLine size='sm' />}>
        <P className='flex flex-col gap-y-4'>
          {['xl', '2xl', 'xl', '2xl', '2xl', 'xl', 'xl', '2xl', 'xl', '2xl', '2xl'].map((ea, i) => (
            <SkeletonLine
              size={ea as '2xl' | 'xl'}
              key={i}
            />
          ))}
        </P>
      </Section>
    </Main>
  )
}
