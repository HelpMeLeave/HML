import type {
  SerializedParagraphNode,
  SerializedRootNode,
  SerializedTextNode,
} from '@payloadcms/richtext-lexical/lexical'

export const RootNode = (withChildren: boolean = true) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [
        withChildren ?
          ({
            type: 'paragraph',
            direction: 'ltr',
            version: 1,
            format: 'start',
            indent: 0,
            textFormat: 0,
            textStyle: '',
            children: [],
          } as SerializedParagraphNode)
        : undefined,
      ].filter(Boolean),
      direction: null,
    },
  }) as { root: SerializedRootNode }

export const creatRootNode = (text?: string) => {
  const node = { ...RootNode() }
  if (text) {
    const firstChild = node.root.children[0] as SerializedParagraphNode
    firstChild.children[0] = {
      text,
      version: 1,
      type: 'text',
      style: '',
      mode: 'normal',
      format: 0,
      detail: 0,
    } as SerializedTextNode
  }
  return node
}
