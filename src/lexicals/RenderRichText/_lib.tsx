import type {
  SerializedElementNode,
  SerializedLexicalNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical'
import type { JSXConverterArgs } from '@payloadcms/richtext-lexical/react'
import type { ElementType, JSX, JSXElementConstructor } from 'react'

export const NTK = <T extends React.ElementType = 'div'>(
  El: ElementType,
  { node, nodesToJSX }: Pick<JSXConverterArgs<SerializedElementNode>, 'node' | 'nodesToJSX'>,
  props?: Props<T>
) => <El {...props}>{nodesToJSX({ nodes: node.children ?? [] })}</El>

export const textOf = (node?: SerializedLexicalNode): string =>
  node ?
    ((node as SerializedTextNode).text
    ?? (node as SerializedElementNode).children?.map(textOf).join('')
    ?? '')
  : ''

export type Comp<T extends keyof JSX.IntrinsicElements> = JSXElementConstructor<Props<T>>

export type StyledContainer = SerializedElementNode & {
  sectionHeadingStyle?: string
  subsectionHeadingStyle?: string
}

export const childOf = (node: Nullish<SerializedElementNode>, type: string) =>
  node?.children?.find((ea) => ea.type == type) as SerializedElementNode | undefined
