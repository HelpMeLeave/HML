import type {
  SerializedParagraphNode,
  SerializedRootNode,
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
