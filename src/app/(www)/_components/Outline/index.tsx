'use client'

import {
  headingPlainText,
  slugifyHeadingID,
} from '@/_components/lexicals/Features/_lib/slugifyHeadingID'
import { SmLeftRail } from '@/app/(www)/_components/LeftRail'
import { InlineLink } from '@/components/primitives/Link'
import { useScrollProgress } from '@/hooks/useInView'
import { cn } from '@/lib/cn'
import { getNodesFromRichText } from '@/lib/getNodesFromRichText'
import type { DefaultTypedEditorState, SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import type { SerializedLexicalNode } from '@payloadcms/richtext-lexical/lexical'
import { useMemo } from 'react'

type HeadingGrp = {
  section: SerializedLexicalNode
  children: SerializedLexicalNode[]
}

// the slug has to be the id the converters rendered, so it comes from the same helper
const getRootText = (node: SerializedLexicalNode) => ({
  slug: slugifyHeadingID(node),
  plain: headingPlainText(node),
})

const Grp = ({
  level,
  headings,
  progress,
}: {
  level: number
  headings: HeadingGrp[]
  progress?: number
}) => {
  return (
    <ul className='relative text-base'>
      <span
        style={{
          height: `100%`,
        }}
        className='absolute left-0 w-0.5 bg-ui-150'
      />
      <span
        style={{
          transition: 'height 0.1s cubic-bezier(0.16, 1, 0.3, 1)',
          height: `${progress}%`,
        }}
        className='absolute left-0 w-0.5 bg-accent'
      />
      {headings.map((ea, i) => (
        <Link
          key={i}
          level={level}
          {...ea}
        />
      ))}
    </ul>
  )
}

const Link = ({
  section,
  children,
  level,
}: {
  section: SerializedLexicalNode
  children?: SerializedLexicalNode[]
  level: number
}) => {
  const { slug, plain } = getRootText(section)

  return (
    <li
      className={cn(
        level == 1 ? 'pl-3 text-body/95' : 'pl-5',
        'my-0 -ml-0.5',
        'transition-all ease-out'
        // isInView ? 'border-accent' : 'border-ui-100'
      )}>
      <InlineLink
        className={cn(
          'w-full py-1 leading-snug font-normal transition not-hocus:no-underline! not-hocus:decoration-0! hocus:underline hocus:decoration-2!',
          level == 1 && 'block text-pretty',
          level > 1 && 'line-clamp-2'
        )}
        title={level > 1 ? plain : undefined}
        prefetch={false}
        href={`#${slug}`}
        target='_self'>
        {plain}
      </InlineLink>
      {children && children.length > 0 && (
        <ul className={cn('my-0 -ml-3 list-none pl-0 text-sm text-body/75')}>
          {children.map((child, i) => (
            <Link
              key={`${slug}-${i}`}
              section={child}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export const TOC = ({
  content,
}: {
  content: DefaultTypedEditorState
  url: string
  title: string
  docPreview: string
}) => {
  const headings = useMemo(
    () =>
      getNodesFromRichText(
        content.root,
        (node) =>
          node.type == 'heading'
          || node.type == 'section-heading'
          || node.type == 'subsection-heading',
        (node) => ({
          node: node as SerializedHeadingNode,
          // section-heading carries no `tag`, so its level comes from the type
          level:
            node.type == 'section-heading' ?
              2
            : Number((node as SerializedHeadingNode)?.tag?.[1] ?? 3),
        })
      ).reduce((final, current) => {
        if (current.level == 2) {
          final.push({
            section: current.node,
            children: [] as SerializedLexicalNode[],
          })
        } else {
          final[final.length - 1]?.children.push(current.node)
        }
        return final
      }, [] as HeadingGrp[]),
    [content.root]
  )

  const { progress } = useScrollProgress({
    root: null, // Watch relative to the window browser viewport
    rootMargin: '-20% 0px 90% 0px',
    threshold: 0.25,
    queryDomSelector: 'main',
  })

  if (headings.length > 0) {
    return (
      <SmLeftRail>
        <h4 className='mb-1 text-lg font-bold'>ON THIS PAGE</h4>
        <Grp
          headings={headings}
          level={1}
          progress={progress}
        />
      </SmLeftRail>
    )
  }
}
