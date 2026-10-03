'use client'

import { definitionCommands } from '@/_components/lexicals/Features/_lib/commands'
import {
  getMarkState,
  useMarkState,
} from '@/_components/lexicals/Features/DefinitionsFeature/_hooks/markStore'
import { DefinitionNode } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNode'
import { DefinitionNodeWrapper } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNodeWrapper'
import { DefinitionsPlugin } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionsPlugin'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { type LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { BookMarked } from 'lucide-react'
import './style.scss'

const DefinitionsIcon = () => {
  const [editor] = useLexicalComposerContext()
  const { active, matches } = useMarkState(editor)

  return (
    <span className={'definitions definitions-toolbar'}>
      <BookMarked className='icon definitions-toolbar__icon' />
      {active && <span className={'definitions-toolbar__count'}>{matches.length}</span>}
    </span>
  )
}

export default createClientFeature({
  nodes: [DefinitionNode, DefinitionNodeWrapper],
  plugins: [{ Component: DefinitionsPlugin, position: 'floatingAnchorElem' }],
  toolbarFixed: {
    groups: [
      {
        key: 'features',
        type: 'buttons',
        items: [
          {
            key: 'scan-definitions',
            label: 'Glossary suggestions',
            ChildComponent: DefinitionsIcon,
            onSelect: ({ editor }: { editor: LexicalEditor }) => {
              const { active } = getMarkState(editor)
              if (active) {
                editor.dispatchCommand(definitionCommands.CLEAR, undefined)
              } else {
                editor.dispatchCommand(definitionCommands.SCAN, undefined)
              }
            },
          },
        ],
      },
    ],
  },
})
