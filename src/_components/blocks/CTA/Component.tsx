import type { CTABtn, CTAProps } from '@/_components/blocks/CTA/_types'
import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import { removeParagraph } from '@/_components/lexicals/RenderRichText/removeParagraphs'
import { Button } from '@/components/Button'
import { Section, SectionHeading } from '@/components/Structure/Section'
import { cn } from '@/lib/cn'
import { isRootLike } from '@/lib/normalize/is'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

const Inner = ({ content }: { content: DefaultTypedEditorState | ReactNode }) => {
  return (
    <>
      {isRootLike(content) ?
        <RichTextComponent
          converterOverrides={{ paragraph: removeParagraph }}
          blockType='rich-text'
          content={content}
        />
      : content}
    </>
  )
}

const CTAWrapper = ({ hasSecondary, ...props }: Props<'section'> & { hasSecondary: boolean }) => (
  <Section
    {...props}
    className={cn(
      'my-12 grid gap-x-8 gap-y-2 sm:min-w-125 md:grid-cols-[auto_minmax(120px,200px)] lg:mx-auto lg:max-w-2xl',
      !hasSecondary && 'grid-cols-[auto_minmax(120px,200px)]',
      props.className
    )}
  />
)

const CTATitle = ({
  inner,
  ...props
}: Props<'h2'> & {
  inner?: DefaultTypedEditorState | ReactNode
}) => (
  <SectionHeading
    data-slot='title'
    {...props}
    className='col-start-1 mx-auto flex flex-col text-5xl leading-[0.85] text-balance text-accent *:saturate-50 dark:font-medium! *:[[id="spacer"]]:h-2!'>
    {inner && <Inner content={inner} />}
  </SectionHeading>
)

const CTASubtitle = ({
  inner,
  hasPrimary,
  hasSecondary,
  ...props
}: Omit<Props<'span'>, 'content'> & {
  hasPrimary: boolean
  hasSecondary: boolean
  inner?: DefaultTypedEditorState | ReactNode
}) => {
  return (
    inner
    && isRootLike(inner)
    && 'children' in inner.root.children[0]
    && inner.root.children[0].children.length > 0 && (
      <span
        data-slot='subtitle'
        {...props}
        className={cn(
          'col-start-1 flex w-full flex-col gap-y-2 text-[.95rem] leading-[1.85] text-base md:gap-y-6 md:pr-4 md:pl-2',
          !hasPrimary && !hasSecondary && 'max-w-[calc(100%-150px)]'
        )}>
        {<Inner content={inner} />}
      </span>
    )
  )
}

const CTAPrimary = ({ button }: { button: CTABtn }) => {
  if ('action' in button) return button.element ?? null

  return (
    <Button
      as='link'
      href={button.href}
      target={button.target}
      className='max-h-min border-0 bg-accent text-white!'
      variant='primary'>
      {button.text}
    </Button>
  )
}

const CTASecondary = ({ button }: { button?: CTABtn }) =>
  button
  && 'href' in button && (
    <a
      href={button.href}
      target={button.target}
      className='max-h-min text-xs/6 font-medium whitespace-nowrap text-soft hover:opacity-80'>
      {button?.text}
      <span
        aria-hidden='true'
        className='ml-1 text-accent'>
        →
      </span>
    </a>
  )

const CTAActions = ({ ...props }: Props) => (
  <div
    data-slot='actions'
    className={cn(
      'relative top-2 row-start-auto h-full content-start gap-x-6 gap-y-2 self-center max-sm:justify-center md:col-start-2 md:row-start-1',
      'mr-auto flex w-full flex-wrap'
    )}>
    {props.children}
  </div>
)

export const CTA = ({ title, subtitle, primaryButton, secondaryButton }: CTASwitchProps) => {
  const hasSecondary = !!secondaryButton
  const hasPrimary = !!primaryButton

  const hasSubtitle =
    isRootLike(subtitle) && convertLexicalToPlaintext({ data: subtitle }).length > 0

  return (
    <CTAWrapper
      className={!hasSubtitle ? '' : ''}
      hasSecondary={hasSecondary}>
      <CTATitle inner={title} />
      <CTASubtitle
        inner={subtitle}
        hasPrimary={hasPrimary}
        hasSecondary={hasSecondary}
      />
      {(primaryButton || secondaryButton) && (
        <CTAActions>
          <CTAPrimary button={primaryButton} />
          <CTASecondary button={secondaryButton} />
        </CTAActions>
      )}
    </CTAWrapper>
  )
}

type CTASwitchProps =
  | {
      primaryButton: CTABtn
      secondaryButton?: CTABtn
      subtitle?: DefaultTypedEditorState | null
      title?: DefaultTypedEditorState
    }
  | CTAProps
