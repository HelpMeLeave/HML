'use client'
import { registerHeadingToContainer } from '@/lexicals/Features/_lib/registerHeadingToContainer'
import { SectionHGroupNode } from '@/lexicals/Features/SectionFeature/SectionHGroupNodes'
import {
  $isSectionContainer,
  $isSectionContent,
} from '@/lexicals/Features/SectionFeature/SectionStructureNodes'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { $createFullSection } from './createFullSection'

export const SectionPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      registerHeadingToContainer(editor, {
        tag: 'h2',
        skipParent: (parent) => parent instanceof SectionHGroupNode || $isSectionContent(parent),
        isContainer: $isSectionContainer,
        build: $createFullSection,
      }),
    [editor]
  )

  return null
}
