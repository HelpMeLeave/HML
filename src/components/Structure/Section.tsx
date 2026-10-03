import { Heading } from '@/components/primitives'
import { Eyebrow } from '@/components/Structure/Eyebrow'
import { Subtitle } from '@/components/Structure/Subtitle'
import { cn } from '@/lib/cn'
import { slugify } from 'payload/shared'
import type { JSX } from 'react'

const Section = ({
  as,
  ...props
}: Props<'section'> & {
  as?: React.JSX.ElementType
}) => {
  const Component = as || 'section'

  return (
    <Component
      data-section
      {...props}>
      {props.children}
    </Component>
  )
}

const SectionWrapper = ({ ...props }: Props<'section'>) => {
  return (
    <section
      data-slot='section'
      {...props}
    />
  )
}

const SectionHGroup = ({ ...props }: Props<'hgroup'>) => {
  return (
    <hgroup
      {...props}
      className={cn('mt-[1em] mb-[0.25em] text-[2.75rem] print:break-after-avoid', props.className)}
    />
  )
}

const SectionHeading = ({ ...props }: Props<'h2'>) => (
  <Heading
    {...props}
    level={2}
  />
)

const SectionEyebrow = ({ children, ...props }: Props<'p'>) => {
  const parsedChildren = Array.isArray(children) ? children : [children]
  const id =
    parsedChildren.every((child) => typeof child == 'string') ?
      slugify(parsedChildren.join(' '))
    : undefined

  return (
    <Eyebrow
      {...props}
      id={id}
    />
  )
}

const SectionSubtitle = ({
  ...props
}: Props<'p'> & {
  as?: JSX.ElementType
}) => (
  <Subtitle
    {...props}
    className={cn('text-[0.4em]', props.className)}
    data-slot='subtitle'>
    {props.children}
  </Subtitle>
)

export {
  Section,
  SectionWrapper as SectionBase,
  SectionEyebrow,
  SectionHeading,
  SectionHGroup,
  SectionSubtitle,
}
