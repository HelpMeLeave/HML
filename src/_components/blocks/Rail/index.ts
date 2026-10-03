import { editorPlainRich } from '@/_components/lexicals/plainRich'
import type { Block, RichTextField } from 'payload'

export const LeftRailBlockConfig: Block = {
  slug: 'leftRail',
  interfaceName: 'LeftRailBlock',
  fields: [
    {
      type: 'richText',
      name: 'content',
    },
  ],
}
export const RightRailBlockConfig: Block = {
  slug: 'rightRail',
  interfaceName: 'RightRailBlock',
  fields: [
    {
      type: 'richText',
      name: 'content',
    },
  ],
}

export const LayoutBlockConfig = (): Block => {
  const [lr, rr, c] = ['lRail', 'rRail', 'content']
  const options = (...atoms: string[]) => atoms.join('-')

  const createRT = (name: string): RichTextField => ({
    type: 'richText',
    name,
    editor: editorPlainRich,
    admin: {
      condition: (_data, siblingData) => {
        return siblingData?.type?.includes(name)
      },
    },
  })

  return {
    slug: 'layout',
    interfaceName: 'LayoutBlock',
    fields: [
      {
        type: 'select',
        name: 'type',
        options: [c, options(lr, c), options(c, rr), options(lr, c, rr), 'custom'],
      },
      createRT(lr),
      createRT(c),
      createRT(rr),
    ],
  }
}
