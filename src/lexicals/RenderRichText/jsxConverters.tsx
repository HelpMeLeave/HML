import { CTABlockConverter } from '@/_components/blocks/CTA/Converter'
import { RichTextBlockConverter } from '@/_components/blocks/RichText/Converter'
import { TemplateConverter } from '@/_components/blocks/Templates/Converter'
import { VideoPlayerConverter } from '@/_components/blocks/VideoPlayer/Converter'
import type { LinkField } from '@/collections/_fields/LinkBase/_types'
import { Bold, Italic, P } from '@/components/primitives'
import { InlineLink } from '@/components/primitives/Link'
import { definitionConverters } from '@/lexicals/Features/DefinitionsFeature/Converter'
import { hasDuotoneColor } from '@/lexicals/Features/Duotone/_lib/coverOf'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import type { DuotoneThemed } from '@/lexicals/Features/Duotone/_types'
import { NTK } from '@/lexicals/RenderRichText/_lib'
import { listConverters } from '@/lexicals/RenderRichText/_listConverters'
import { structureConverters } from '@/lexicals/RenderRichText/_structureConverters'
import { cn } from '@/lib/cn'
import { resolveLinkNode } from '@/lib/normalize/resolveLink'
import type { Document } from '@/payload-types'
import type { SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type { SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverters, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { BookOpenText, Lightbulb, Pin, Siren } from 'lucide-react'
import Image from 'next/image'

const CALLOUTS = {
  note: {
    label: 'Note',
    Icon: Pin,
    className: 'text-slate-500 dark:text-slate-300',
  },
  tip: {
    label: 'Good To Know',
    Icon: Lightbulb,
    className: 'text-slate-500 dark:text-slate-300',
  },
  urgent: {
    label: 'Urgent',
    Icon: Siren,
    className: 'text-poppy-500 dark:text-poppy-300',
  },
  'case-study': {
    label: 'Case study',
    Icon: BookOpenText,
    className: 'text-purple-500 dark:text-purple-400',
  },
}

export const jsxConverters: (overrides?: JSXConverters) => JSXConvertersFunction =
  (overrides) =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    blocks: {
      'rich-text': RichTextBlockConverter,
      videoPlayer: VideoPlayerConverter,
      cta: CTABlockConverter,
      template: TemplateConverter,
    },
    ...structureConverters,
    ...listConverters,
    // ------------------------------------------------------------
    // #region ! ---------- TEXT ----------
    text: ({ node, parent }) => {
      if (node.type !== 'text') return null
      switch (node.format) {
        case 1:
          return <Bold>{node.text}</Bold>
        case 2:
          return (
            <Italic
              className={parent.type == 'checkmark-list' ? 'text-sm text-current' : undefined}>
              {node.text}
            </Italic>
          )
        case 3:
          return (
            <Italic>
              <Bold>{node.text}</Bold>
            </Italic>
          )
        default:
          return node.text
      }
    },
    bold: ({ node }) => <Bold>{node.text}</Bold>,
    italic: ({ node }) => <Italic>{node.text}</Italic>,
    link: ({ node, nodesToJSX }) => {
      const { url, target, offsite } = resolveLinkNode(node.fields as LinkField)
      const children = nodesToJSX({ nodes: node.children })
      if (!url) return <>{children}</>
      return (
        <InlineLink
          data-external={offsite ? '' : undefined}
          className='[word-spacing:0px] focus-visible:text-accent hocus:decoration-1 hocus:opacity-80'
          href={url}
          target={target}
          prefetch={false}>
          {children}
        </InlineLink>
      )
    },
    // #endregion ! --------------------
    // ------------------------------------------------------------
    // #region ! ---------- TABLE ----------
    table: ({ node, nodesToJSX }) => {
      // TODO: Design table
      return (
        <table
          data-slot='table'
          className='overflow-hidden rounded-xl shadow-sm sm:mx-auto! dark:bg-black'>
          <tbody>{nodesToJSX({ nodes: node.children })}</tbody>
        </table>
      )
    },
    tablerow: ({ node, nodesToJSX }) => {
      return (
        <tr
          className={cn(
            'dark:bg-black',
            'not-first:even:bg-slate-0',
            'not-first:even:dark:bg-slate-500/15',
            'first:**:font-normal',
            'first:**:uppercase',
            'first:*:py-2 first:*:align-bottom first:**:italic'
          )}>
          {nodesToJSX({ nodes: node.children })}
        </tr>
      )
    },
    tablecell: ({ node, nodesToJSX }) => (
      <td className='border-current px-4 py-4 align-top font-[monospace] text-xs font-thin'>
        {nodesToJSX({ nodes: node.children })}
      </td>
    ),
    // #endregion ! --------------------
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    paragraph: (props) => {
      const child =
        props.node.children.length == 1
        && props.node.children[0].type == 'text'
        && (props.node.children[0] as SerializedTextNode)

      return NTK(P, props, {
        className: cn(
          'leading-loose',
          child
            && child.format == 2
            && 'px-6 text-[0.9rem] leading-relaxed text-balance *:saturate-75'
        ),
      })
    },
    upload: async ({ node }) => {
      if (!node.value || typeof node.value != 'object') return null
      type FieldVals = SerializedUploadNode & {
        value: Document
        fields?: { duotone?: { color: DuotoneThemed | null } }
      }

      const { value, fields } = node as FieldVals
      const { url, meta, filename, width, height } = value

      const filter =
        hasDuotoneColor(fields) ? duotoneFilter(fields.duotone.color, fields.duotone) : undefined

      if (url) {
        return (
          <Image
            data-slot='media'
            overrideSrc={url}
            width={Number(width)}
            height={Number(height)}
            src=''
            style={filter ? { filter } : undefined}
            alt={meta?.title ?? filename?.replace(/\..+/, '') ?? ''}
          />
        )
      }
    },
    linebreak: () => (
      <span
        role='none'
        data-slot='spacer'
        className='pointer-events-none block h-[0.5lh] select-none [:is(li>*)]:h-0'
      />
    ),
    blockquote: ({ node, nodesToJSX }) => {
      return (
        <blockquote
          data-slot='quote'
          className='border-l-2 border-accent'>
          {nodesToJSX({ nodes: node.children })}
        </blockquote>
      )
    },
    callout: ({ node, nodesToJSX }) => {
      const variant =
        node.calloutType in CALLOUTS ? (node.calloutType as keyof typeof CALLOUTS) : 'note'
      const { label, Icon, className: color } = CALLOUTS[variant]

      return (
        <div
          className={cn(
            'relative grid grid-cols-[1.5em_auto_.75em] grid-rows-[1.5em_auto] items-center gap-x-3.5 rounded-lg bg-current/6 px-3.5 py-4.5 text-sm dark:bg-current/9',
            color
          )}
          data-slot='callout'
          data-variant={variant}>
          <Icon
            aria-hidden
            strokeWidth={1.5}
            className='col-[1/1] row-[1/1] mx-auto size-[1.25em]'
          />

          <span
            className={cn(
              'col-[2/2] row-[1/1] basis-full font-mono uppercase not-italic not-dark:font-semibold'
            )}>
            {label}
          </span>
          <P className='col-[2/2] row-[2/2] text-sm leading-relaxed text-body/85 italic *:font-normal'>
            {nodesToJSX({ nodes: node.children })}
          </P>
        </div>
      )
    },
    ...definitionConverters,
    ...overrides,
  })
