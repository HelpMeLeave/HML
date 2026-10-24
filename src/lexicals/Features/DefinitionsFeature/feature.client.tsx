'use client'

import { definitionCommands } from '@/lexicals/Features/_lib/commands'
import { getMarkState, useMarkState } from '@/lexicals/Features/DefinitionsFeature/_hooks/markStore'
import { DefinitionNode } from '@/lexicals/Features/DefinitionsFeature/DefinitionNode'
import { DefinitionNodeWrapper } from '@/lexicals/Features/DefinitionsFeature/DefinitionNodeWrapper'
import { DefinitionsPlugin } from '@/lexicals/Features/DefinitionsFeature/DefinitionsPlugin'
import { cn } from '@/lib/cn'
import { BookBookmark } from '@boxicons-pro/react'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { type LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'

const DefinitionsIcon = () => {
  const [editor] = useLexicalComposerContext()
  const { active, matches } = useMarkState(editor)

  return (
    <span className={'definitions definitions-toolbar inline-flex items-center'}>
      <BookBookmark
        style='rounded'
        size='xs'
        className={cn('icon definitions-toolbar__icon p-0.5', active && 'text-accent-500')}
      />
      {active && (
        <span className={'definitions-toolbar__count txt-[0.6875] leading-none text-accent-500'}>
          {matches.length}
        </span>
      )}
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
