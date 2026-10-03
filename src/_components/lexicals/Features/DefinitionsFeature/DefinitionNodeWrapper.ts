import { $collectWrapperNodes } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/collectWrappers'
import {
  $isTextNode,
  $parseSerializedNode,
  ElementNode,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
  type SerializedLexicalNode,
  type Spread,
} from '@payloadcms/richtext-lexical/lexical'

export type SerializedDefinitionNodeWrapper = Spread<
  { termID: number; instance: number },
  SerializedElementNode
>

export class DefinitionNodeWrapper extends ElementNode {
  __termID: number
  __className: string = 'lexical__definition-wrapper'
  __instance: number

  constructor(termID: number, instance: number, key?: NodeKey) {
    super(key)
    this.__termID = termID
    this.__instance = instance
  }

  static clone = (node: DefinitionNodeWrapper): DefinitionNodeWrapper =>
    new DefinitionNodeWrapper(node.__termID, node.__instance, node.__key)

  static getType = (): string => 'definition-wrapper'

  static importJSON = (serialized: SerializedDefinitionNodeWrapper): DefinitionNodeWrapper =>
    $createDefinitionNodeWrapper(serialized.termID, serialized.instance).updateFromJSON(serialized)

  createDOM = (): HTMLElement => {
    const el = document.createElement('span')
    el.className = this.__className
    el.dataset.termId = String(this.getTermID())
    el.dataset.wrappedText = this.getFullTextContent()

    return el
  }

  exportJSON = (): SerializedDefinitionNodeWrapper => ({
    ...super.exportJSON(),
    termID: this.__termID,
    type: this.getType(),
    instance: this.__instance,
  })

  getTermID = (): number => this.getLatest().__termID

  isInline = (): boolean => true

  updateDOM = (): boolean => false

  insertChildren = (...children: SerializedLexicalNode[]) =>
    children.forEach((child) => {
      const node = $parseSerializedNode(child)
      if ($isTextNode(node)) {
        this.append(node)
      }
    })

  getFullTextContent = () =>
    this.getAllTextNodes()
      .map((child) => child.getTextContent())
      .join(' ')

  empty = () => {
    for (const child of this.getChildren()) this.insertBefore(child)
  }
}

export const $createDefinitionNodeWrapper = (termID: number, instance: number) =>
  new DefinitionNodeWrapper(termID, instance)

export const $isDefinitionNodeWrapper = (
  node: LexicalNode | null | undefined
): node is DefinitionNodeWrapper => node instanceof DefinitionNodeWrapper

export const $purgeWrappers = (remove: boolean = true): number => {
  const wrappers = $collectWrapperNodes()

  for (const wrapper of wrappers) {
    wrapper.empty()
    remove && wrapper.remove()
  }

  return wrappers.length
}

export const $reject = (node: LexicalNode | null) => {
  if (!$isDefinitionNodeWrapper(node)) return
  node.empty()
}
