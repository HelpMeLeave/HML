import { rowField } from '@/collections/_fields/Flex'
import { Tab, Tabs } from '@/collections/_lib/Tabs'
import { TextConfig } from '@/collections/_lib/Text'
import { BeforeChange } from '@/globals/GlobalSettings/NavTabs/_hooks'
import { DropdownBlock, DropdownMenu } from '@/globals/GlobalSettings/NavTabs/DropDownBlock'
import { toTitleCase } from '@/lib/textCasing'
import type { Block, BlocksField } from 'payload'

const StaticBlocks: Block = {
  slug: 'nav-static-link',
  labels: { singular: 'Static Link', plural: 'Static Links' },
  admin: {
    components: {
      Label: '@/globals/GlobalSettings/NavTabs/Label#StaticLabel',
    },
  },
  fields: [
    rowField({}, TextConfig('displayText'), {
      type: 'relationship',
      relationTo: ['routes', 'externalResources'],
      name: 'item',
      required: true,
      hooks: {
        beforeChange: [await BeforeChange('blockData')],
      },
    }),
  ],
}

const NavTabs = (name: string, ...blocks: Block[]): BlocksField => ({
  type: 'blocks',
  name,
  label: false,
  labels: { singular: toTitleCase(name), plural: `${toTitleCase(name)}s` },
  admin: { readOnly: false, initCollapsed: true },
  blocks,
  required: true,
})

export const NavigationTabs = Tabs(
  Tab('header', [NavTabs('tab', StaticBlocks, DropdownBlock, DropdownMenu)]).named(),
  Tab('footer', [NavTabs('link', StaticBlocks)]).named()
).field()
