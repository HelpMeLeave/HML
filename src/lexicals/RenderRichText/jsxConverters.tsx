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
import { removeParagraph } from '@/lexicals/RenderRichText/removeParagraphs'
import { cn } from '@/lib/cn'
import { resolveLinkNode } from '@/lib/normalize/resolveLink'
import type { Document } from '@/payload-types'
import type {
  SerializedTableCellNode,
  SerializedTableNode,
  SerializedTableRowNode,
  SerializedUploadNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedTextNode } from '@payloadcms/richtext-lexical/lexical'
import type {
  JSXConverterArgs,
  JSXConverters,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import { BookOpenText, Lightbulb, Pin, Siren } from 'lucide-react'
import Image from 'next/image'

const hasHeaderCells = (firstRow: SerializedTableRowNode) => {
  const firstCell = firstRow.children[0]
  return firstCell.type == 'tablecell' && isHeaderCell(firstCell as SerializedTableCellNode)
}

const isHeaderCell = (node: SerializedTableCellNode) => node.headerState == 1

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
    table: ({ node, nodesToJSX }: JSXConverterArgs<SerializedTableNode>) => {
      const [firstRow, ...rows] = node.children as SerializedTableRowNode[]
      return (
        <table
          data-slot='table'
          className='max-w-max overflow-hidden rounded-xl shadow-sm dark:bg-ui-900/50'>
          {hasHeaderCells(firstRow) ?
            <>
              <thead>{nodesToJSX({ nodes: [firstRow] })}</thead>
              <tbody className='*:odd:bg-slate-0 *:odd:dark:bg-ui-900/75'>
                {nodesToJSX({ nodes: rows })}
              </tbody>
            </>
          : <tbody>{nodesToJSX({ nodes: [firstRow, ...rows] })}</tbody>}
        </table>
      )
    },
    tablerow: ({ node, nodesToJSX }: JSXConverterArgs<SerializedTableRowNode>) => (
      <tr>{nodesToJSX({ nodes: node.children })}</tr>
    ),
    tablecell: ({ node, nodesToJSX, converters }) => {
      const isTH = isHeaderCell(node)
      const El = isTH ? 'th' : 'td'
      return (
        <El
          data-variant={isTH ? 'header' : 'cell'}
          className={cn(
            'border-current font-[monospace] font-thin',
            isTH ?
              'pt-4 pb-2 align-bottom text-[1rem] tracking-widest text-accent uppercase italic'
            : 'px-4 py-4 align-top text-sm',
            'first:pl-8 last:pr-8'
          )}>
          {nodesToJSX({
            nodes: node.children,
            converters: {
              ...converters,
              paragraph: removeParagraph,
            },
          })}
        </El>
      )
    },
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
    callout: ({ node, nodesToJSX, converters }) => {
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
            {nodesToJSX({
              nodes: node.children,
              converters: {
                ...converters,
                paragraph: ({ node, nodesToJSX }) => <>{nodesToJSX({ nodes: node.children })}</>,
              },
            })}
          </P>
        </div>
      )
    },
    ...definitionConverters,
    ...overrides,
  })
