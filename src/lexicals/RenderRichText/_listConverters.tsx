import { OL, P, UL } from '@/components/primitives'
import type { SerializedCheckmarkListItem } from '@/lexicals/Features/CheckmarkList/CheckmarkListItemNode'
import { CheckmarkList } from '@/lexicals/Features/CheckmarkList/Component'
import { NTK } from '@/lexicals/RenderRichText/_lib'
import { cn } from '@/lib/cn'
import type { SerializedListItemNode, SerializedListNode } from '@payloadcms/richtext-lexical'
import type {
  SerializedElementNode,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverter } from '@payloadcms/richtext-lexical/react'

const isTitledListNode = (node: SerializedListNode) =>
  ('titled' in node && node.titled == true) || ('title' in node && node.title == true)
const isRich = (node: SerializedListNode) =>
  'children' in node && node.children.some((t) => t.type == 'rich-list-item-title')

const isListItem = (node: SerializedLexicalNode): node is SerializedListItemNode =>
  node.type == 'listitem'
const isCheckmarkListItem = (node: SerializedLexicalNode): node is SerializedCheckmarkListItem =>
  node.type == 'checkmark-list-item'

const isListNode = (node: SerializedLexicalNode): node is SerializedListNode => node?.type == 'list'

const isUL = (node: SerializedListNode) => node.listType == 'bullet'
const isOL = (node: SerializedListNode) => node.listType == 'number'
const isCk = (node: SerializedLexicalNode) => isListNode(node) && node.listType == 'check'

export const listConverters: Record<string, JSXConverter<SerializedListNode>> = {
  // #region ! ---------- LIST ITEMS ----------
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: (node.children as SerializedCheckmarkListItem[]).reduce((prev, original, i) => {
        // work on a copy so rendering never rewrites the stored doc
        const child = { ...original }
        isTitledListNode(node) && i == 0 && Object.assign(child, { title: true })

        if (isCheckmarkListItem(child)) child.type = 'listitem'
        if (isListItem(child)) child.indent = node.indent + 1

        if (prev.length == 0) {
          prev.push(child)
        } else if (isListNode(child.children[0])) {
          const newParentIndex = prev.length - 1

          // replace the previous item with a copy instead of pushing into its stored children
          const newChildren = [
            ...prev[newParentIndex].children,
            { ...child.children[0], indent: node.indent + 1 },
          ]

          prev[newParentIndex] = { ...prev[newParentIndex], children: newChildren }
        } else {
          prev.push(child)
        }

        return prev
      }, [] as SerializedElementNode[]),
    })

    return (
      isUL(node) ? <UL className={cn('list-disc')}>{children}</UL>
      : isOL(node) ? <OL className={cn('list-decimal')}>{children}</OL>
      : <CheckmarkList className={cn('list-checkmark')}>{children}</CheckmarkList>
    )
  },
  'titled-list': ({ node, nodesToJSX }) => nodesToJSX({ nodes: [{ ...node, type: 'list' }] }),
  listitem: ({ node, nodesToJSX, parent }) => {
    return (
      <li
        data-slot='list-item'
        data-indent={isTitledListNode(node) ? node.indent - 2 : node.indent}
        className={cn(
          'my-1.5 pl-2 first:mt-0 last:mb-3 has-data-[slot=spacer]:mb-2',
          'data-[indent="-1"]:-ml-6 data-[indent="0"]:pl-0',
          isTitledListNode(node) && 'list-title my-0 text-pretty',
          (isTitledListNode(node) || isListItem(parent)) && 'list-none',
          isCk(parent) && 'pl-6!',
          isRich(node) && 'mt-0'
        )}>
        {nodesToJSX({ nodes: node.children })}
      </li>
    )
  },
  'checkmark-list': ({ node, nodesToJSX }) =>
    nodesToJSX({ nodes: [{ ...node, type: 'list', listType: 'check' } as SerializedListNode] }),
  'checkmark-list-item': ({ node, nodesToJSX }) =>
    nodesToJSX({ nodes: [{ ...node, type: 'listitem' }] }),
  'rich-list-item': ({ node, nodesToJSX, parent }) =>
    nodesToJSX({ nodes: [{ ...node, type: 'listitem' }], parent }),
  'rich-list-item-title': (props) =>
    //@ts-expect-error dataSet attribute
    NTK(P, props, { className: 'text-accent font-medium', 'data-slot': 'heading' }),
  'rich-list-item-body': (props) =>
    //@ts-expect-error dataSet attribute
    NTK('div', props, { className: 'flow mb-3 -mt-[0.25em]', 'data-slot': 'content' }),
  // #endregion ! --------------------
  // ------------------------------------------------------------
}
