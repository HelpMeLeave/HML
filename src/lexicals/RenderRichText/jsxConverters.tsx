import { CTABlockConverter } from '@/_components/blocks/CTA/Converter'
import { RichTextBlockConverter } from '@/_components/blocks/RichText/Converter'
import { TemplateConverter } from '@/_components/blocks/Templates/Converter'
import { VideoPlayerConverter } from '@/_components/blocks/VideoPlayer/Converter'
import type { LinkField } from '@/collections/_fields/LinkBase/_types'
import { Bold, Italic, OL, P, UL } from '@/components/primitives'
import { InlineLink } from '@/components/primitives/Link'
import type { SerializedCheckmarkListItem } from '@/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import { CheckmarkList } from '@/lexicals/Features/CheckmarkList/Component'
import { definitionConverters } from '@/lexicals/Features/DefinitionsFeature/Converter'
import { hasDuotoneColor } from '@/lexicals/Features/Duotone/_lib/coverOf'
import { duotoneFilter } from '@/lexicals/Features/Duotone/_lib/filter'
import type { DuotoneThemed } from '@/lexicals/Features/Duotone/_types'
import { NTK } from '@/lexicals/RenderRichText/_lib'
import { structureConverters } from '@/lexicals/RenderRichText/_structureConverters'
import { cn } from '@/lib/cn'
import { resolveLinkNode } from '@/lib/normalize/resolveLink'
import type { Document } from '@/payload-types'
import type { SerializedListNode, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type {
  SerializedElementNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverters, JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { Star } from 'lucide-react'
import Image from 'next/image'

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
    // #region ! ---------- LIST ITEMS ----------
    list: ({ node, nodesToJSX }) => {
      const isTitledNode = 'titled' in node && node.titled == true

      const children = nodesToJSX({
        nodes: (node.children as SerializedCheckmarkListItem[]).reduce((prev, original, i) => {
          // work on a copy so rendering never rewrites the stored doc
          const child = { ...original }
          if (isTitledNode && i == 0) {
            Object.assign(child, { title: true })
          }
          if (child.type == 'checkmark-list-item') {
            child.type = 'listitem'
          }
          if (child.type == 'listitem') {
            child.indent = node.indent + 1
          }

          if (prev.length == 0) {
            prev.push(child)
            return prev
          }
          if (child.children[0]?.type == 'list') {
            const listChild = {
              ...(child.children[0] as SerializedListNode),
              indent: node.indent + 1,
            }
            const newParentIndex = prev.length - 1

            // replace the previous item with a copy instead of pushing into its stored children
            prev[newParentIndex] = {
              ...prev[newParentIndex],
              children: [...prev[newParentIndex].children, listChild],
            }
          } else {
            prev.push(child)
          }

          return prev
        }, [] as SerializedElementNode[]),
      })

      if (node.listType == 'bullet') {
        return <UL className={cn('list-disc', isTitledNode && '*:first:list-none')}>{children}</UL>
      } else if (node.listType == 'number')
        return <OL className={cn('list-decimal')}>{children}</OL>
      return <CheckmarkList className={cn('list-checkmark')}>{children}</CheckmarkList>
    },
    'titled-list': ({ node, nodesToJSX }) => nodesToJSX({ nodes: [{ ...node, type: 'list' }] }),
    listitem: ({ node, nodesToJSX, parent }) => {
      const isTitle = 'title' in node && node.title == true
      const isRich =
        'children' in node && node.children.some((t) => t.type == 'rich-list-item-title')

      return (
        <li
          data-indent={node.indent}
          className={cn(
            // 'my-1.5 first:mt-0 last:mb-3 has-[#spacer]:mb-2',
            'my-1.5 first:mt-0 last:mb-3 has-data-[slot=spacer]:mb-2',
            isTitle ? 'list-title my-0 -ml-4 list-none pl-0 text-pretty' : 'pl-2',
            parent.type == 'listitem' && 'list-none',
            parent.type == 'list' && (parent as SerializedListNode).listType == 'check' && 'pl-6!',
            isRich && 'mt-0'
          )}>
          {nodesToJSX({ nodes: node.children })}
        </li>
      )
    },
    'checkmark-list': ({ node, nodesToJSX }) =>
      nodesToJSX({ nodes: [{ ...node, type: 'list', listType: 'check' }] }),
    'checkmark-list-item': ({ node, nodesToJSX }) =>
      nodesToJSX({ nodes: [{ ...node, type: 'listitem' }] }),
    'rich-list-item': ({ node, nodesToJSX, parent }) =>
      nodesToJSX({ nodes: [{ ...node, type: 'listitem' }], parent }),
    'rich-list-item-title': (props) => NTK(P, props, { className: 'text-accent' }),
    // 'rich-list-item-body': (props) => NTK('div', props, { className: '*:mt-0 space-y-4 mb-3' }),
    'rich-list-item-body': (props) => NTK('div', props, { className: 'flow mb-3 -mt-[0.25em]' }),
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
          // 'mt-[0.5em] mb-[0.5em] leading-loose peer-[h4]:mt-0 [:is(ol+p)]:mt-[2em] [:is(p+p)]:mt-[1em] [:is(ul+p)]:mt-[2em]',
          // 'mt-[0.5em] mb-[0.5em] leading-loose peer-data-[slot=heading]:peer-data-[variant=minor]:mt-0 [:is(ol+p)]:mt-[2em] [:is(p+p)]:mt-[1em] [:is(ul+p)]:mt-[2em]',
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
        // id='spacer'
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
      const { calloutType } = node
      console.log(calloutType)

      return (
        <P
          data-slot='callout'
          // className='mx-auto my-6 flex w-fit max-w-4/5 gap-4 rounded-md bg-accent/50 px-4 py-2 pl-3 text-sm text-accent-50 outline outline-accent/20'>
          className='mx-auto flex w-fit max-w-4/5 gap-4 rounded-md bg-accent/50 px-4 py-2 pl-3 text-sm text-accent-50 outline outline-accent/20'>
          <Star
            size={14}
            className='mt-px fill-current stroke-0'
          />
          <span className='font-thin text-current *:[i]:saturate-100'>
            {nodesToJSX({ nodes: node.children })}
          </span>
        </P>
      )
    },
    ...definitionConverters,
    ...overrides,
  })
