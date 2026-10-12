'use client'

import { registerHeadingToContainer } from '@/lexicals/Features/_lib/registerHeadingToContainer'
import { $createFullSubSection } from '@/lexicals/Features/SubSectionFeature/_lib'
import {
  $isSubSectionContainer,
  SubSectionContainerNode,
} from '@/lexicals/Features/SubSectionFeature/SubSectionContainerNode'
import { $isSubSectionContentNode } from '@/lexicals/Features/SubSectionFeature/SubSectionContentNode'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect } from 'react'

export const SubSectionPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      registerHeadingToContainer(editor, {
        tag: 'h3',
        skipParent: (parent) =>
          parent instanceof SubSectionContainerNode || $isSubSectionContentNode(parent),
        isContainer: $isSubSectionContainer,
        build: $createFullSubSection,
      }),
    [editor]
  )

  return null
}
