import { Heading } from '@/components/primitives'
import { Eyebrow } from '@/components/Structure/Eyebrow'
import { Subtitle } from '@/components/Structure/Subtitle'
import { cn } from '@/lib/cn'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { slugify } from 'payload/shared'
import type { JSX } from 'react'
import { LexicalOrComponent } from '../LexicalOrComponent'

const Section = ({
  as,
  ...props
}: Props<'section'> & {
  as?: React.JSX.ElementType
  heading?: ReactNode | DefaultTypedEditorState
  brow?: ReactNode | DefaultTypedEditorState
  subtitle?: ReactNode | DefaultTypedEditorState
}) => {
  const Component = as || 'section'
  const { heading, brow, subtitle, ...baseProps } = props

  return (
    <Component
      data-section
      {...baseProps}>
      {heading && (
        <SectionHGroup>
          <SectionHeading>
            {brow && (
              <SectionEyebrow>
                <LexicalOrComponent content={brow} />
              </SectionEyebrow>
            )}
            <LexicalOrComponent content={heading} />
          </SectionHeading>
          {subtitle && (
            <SectionSubtitle>
              <LexicalOrComponent content={subtitle} />
            </SectionSubtitle>
          )}
        </SectionHGroup>
      )}
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

const SectionHGroup = ({ ...props }: Props<'hgroup'>) => (
  <hgroup
    {...props}
    className={cn('mt-[1em] mb-[0.25em] text-[2.75rem] print:break-after-avoid', props.className)}
  />
)

const SectionHeading = ({ ...props }: Props<'h2'>) => (
  <Heading
    {...props}
    level={2}
  />
)

const SectionEyebrow = ({ ...props }: Props<'p'>) => {
  const { children } = props
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
