import {
  ElementNode,
  type LexicalNode,
  type NodeKey,
  type SerializedElementNode,
  type Spread,
} from '@payloadcms/richtext-lexical/lexical'

export type SerializedDefinitionNode = Spread<{ termID: number }, SerializedElementNode>

export class DefinitionNode extends ElementNode {
  __termID: number

  constructor(termID: number, key?: NodeKey) {
    super(key)
    this.__termID = termID
  }

  static clone(node: DefinitionNode): DefinitionNode {
    return new DefinitionNode(node.__termID, node.__key)
  }

  static getType(): string {
    return 'definition'
  }

  static importJSON(serialized: SerializedDefinitionNode): DefinitionNode {
    return $createDefinitionNode(serialized.termID).updateFromJSON(serialized)
  }

  createDOM(): HTMLElement {
    const el = document.createElement('span')
    el.className = 'lexical__definition'
    el.dataset.termId = String(this.__termID)
    return el
  }

  exportJSON = (): SerializedDefinitionNode => ({
    ...super.exportJSON(),
    termID: this.__termID,
    type: this.getType(),
  })

  getTermID = (): number => this.getLatest().__termID

  isInline = (): boolean => true

  updateDOM = (): boolean => false
}

export const $createDefinitionNode = (termID: number) => new DefinitionNode(termID)

export const $isDefinitionNode = (node: LexicalNode | null | undefined): node is DefinitionNode =>
  node instanceof DefinitionNode
