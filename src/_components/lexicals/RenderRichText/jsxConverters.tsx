import { CTABlockConverter } from '@/_components/blocks/CTA/Converter'
import { RichTextBlockConverter } from '@/_components/blocks/RichText/Converter'
import { TemplateConverter } from '@/_components/blocks/Templates/Converter'
import { VideoPlayerConverter } from '@/_components/blocks/VideoPlayer/Converter'
import { inlineBlocks } from '@/_components/inlineBlocks/converter'
import { headingID } from '@/_components/lexicals/Features/_lib/slugifyHeadingID'
import type { SerializedCheckmarkListItem } from '@/_components/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import { CheckmarkList } from '@/_components/lexicals/Features/CheckmarkList/Component'
import { definitionConverters } from '@/_components/lexicals/Features/DefinitionsFeature/Converter'
import type { LinkField } from '@/collections/_fields/LinkBase/_types'
import { Bold, Heading, Italic, OL, P, UL } from '@/components/primitives'
import { InlineLink } from '@/components/primitives/Link'
import { MainHeading } from '@/components/Structure/Main'
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionHGroup,
  SectionSubtitle,
} from '@/components/Structure/Section'
import {
  Subsection,
  SubsectionContent,
  SubsectionHeading,
} from '@/components/Structure/Subsection/Subsection'
import { cn } from '@/lib/cn'
import { resolveLinkNode } from '@/lib/normalize/resolveLink'
import type { Document } from '@/payload-types'
import type { SerializedListNode, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import type {
  SerializedElementNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical'
import type {
  JSXConverterArgs,
  JSXConverters,
  JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import type { ElementType, JSX, JSXElementConstructor } from 'react'
import { Fragment } from 'react'

const NTK = <T extends React.ElementType = 'div'>(
  El: ElementType,
  { node, nodesToJSX }: Pick<JSXConverterArgs<SerializedElementNode>, 'node' | 'nodesToJSX'>,
  props?: Props<T>
) => <El {...props}>{nodesToJSX({ nodes: node.children ?? [] })}</El>

type Comp<T extends keyof JSX.IntrinsicElements> = JSXElementConstructor<Props<T>>

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
    inlineBlocks,
    // #region ! ---------- SECTION ----------
    'section-container': (props) =>
      NTK<typeof Section>(Section, props, {
        className: 'mb-4',
        // @ts-expect-error non-standard attribute
        'data-slot': 'section',
      }),
    'section-hgroup': (props) => NTK(SectionHGroup, props),
    'section-heading': ({ node, nodesToJSX }) => {
      return (
        <SectionHeading id={headingID(node)}>{nodesToJSX({ nodes: node.children })}</SectionHeading>
      )
    },
    'section-subtitle': (props) => props.node.children && NTK(SectionSubtitle, props),
    'section-eyebrow': (props) => props.node.children && NTK(SectionEyebrow, props),
    'section-content': (props) => NTK(Fragment, props),
    // #endregion ! --------------------
    // ------------------------------------------------------------
    // #region ! ---------- TOGGLING SUBSECTION ----------
    'subsection-container': (props) => NTK<typeof Subsection>(Subsection, props),
    'subsection-heading': ({ node, nodesToJSX }) => (
      <SubsectionHeading>
        <span id={headingID(node)}>{nodesToJSX({ nodes: node.children })}</span>
      </SubsectionHeading>
    ),
    'subsection-content': (props) => NTK(SubsectionContent, props, { className: 'sm:pl-6' }),
    // #endregion ! --------------------
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
    bold: ({ node }) => <Bold className='font-semibold'>{node.text}</Bold>,
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
      return (
        <li
          data-indent={node.indent}
          className={cn(
            'my-1.5 first:mt-0 last:mb-3 has-[#spacer]:mb-2',
            isTitle ? 'list-title my-0 -ml-4 list-none pl-0 text-pretty' : 'pl-2',
            parent.type == 'listitem' && 'list-none'
          )}>
          {nodesToJSX({ nodes: node.children })}
        </li>
      )
    },
    'checkmark-list': ({ node, nodesToJSX }) =>
      nodesToJSX({ nodes: [{ ...node, type: 'list', listType: 'check' }] }),
    'checkmark-list-item': ({ node, nodesToJSX }) =>
      nodesToJSX({ nodes: [{ ...node, type: 'listitem' }] }),
    // #endregion ! --------------------
    // ------------------------------------------------------------
    // #region ! ---------- TABLE ----------
    table: ({ node, nodesToJSX }) => {
      // TODO: Design table
      return (
        <table className='overflow-hidden rounded-xl shadow-sm sm:mx-auto! dark:bg-black'>
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
    // #region ! ---------- HEADINGS ----------
    h4: ({ node, nodesToJSX }) => nodesToJSX({ nodes: [{ ...node, type: 'heading', tag: 'h4' }] }),
    heading: ({ node, nodesToJSX }) => {
      let El: Comp<'h1'> | Comp<'button'>
      const lvl = Number(node.tag[1])
      const props = {
        id: headingID(node),
        level: lvl > 3 ? lvl : undefined,
      }
      switch (node.tag) {
        case 'h1':
          El = MainHeading as Comp<'h1'>
          break
        case 'h2':
          El = SectionHeading as Comp<'h1'>
          break
        case 'h3':
          El = SubsectionHeading as Comp<'button'>
          break
        default:
          El = Heading
      }
      return <El {...props}>{nodesToJSX({ nodes: node.children })}</El>
    },
    // #endregion ! --------------------
    // ------------------------------------------------------------
    paragraph: (props) => {
      const child =
        props.node.children.length == 1
        && props.node.children[0].type == 'text'
        && (props.node.children[0] as SerializedTextNode)

      return NTK(P, props, {
        className: cn(
          'mt-[0.5em] mb-[0.5em] leading-loose peer-[h4]:mt-0 [:is(ol+p)]:mt-[2em] [:is(p+p)]:mt-[1em] [:is(ul+p)]:mt-[2em]',
          child
            && child.format == 2
            && 'px-6 text-[0.9rem] leading-relaxed text-balance *:saturate-75'
        ),
      })
    },
    upload: async ({ node }) => {
      const {
        value,
        value: { url },
      } = node as SerializedUploadNode & { value: Document }

      return (
        url && (
          <Image
            overrideSrc={url}
            width={`${value.width!}`}
            height={`${value.height!}`}
            src=''
            alt={value.meta?.title ?? value.filename?.replace(/\..+/, '') ?? ''}
          />
        )
      )
    },
    linebreak: () => (
      <span
        role='none'
        id='spacer'
        className='pointer-events-none block h-[0.5lh] select-none [:is(li>*)]:h-0'
      />
    ),
    blockquote: ({ node, nodesToJSX }) => {
      return (
        <blockquote className='border-l-2 border-accent'>
          {nodesToJSX({ nodes: node.children })}
        </blockquote>
      )
    },
    ...definitionConverters,
    ...overrides,
  })
