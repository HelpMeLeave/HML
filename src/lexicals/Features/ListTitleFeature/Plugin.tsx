'use client'

import { TitledListNode } from '@/lexicals/Features/ListTitleFeature'
import { $enterAtTitleStart } from '@/lexicals/Features/ListTitleFeature/_lib/enterAtTitleStart'
import { $untitleOnTitleRemoval } from '@/lexicals/Features/ListTitleFeature/_lib/untitleOnTitleRemoval'
import { COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { mergeRegister } from '@payloadcms/richtext-lexical/lexical/utils'
import { useEffect } from 'react'
import './style.css'

export const ListTitlePlugin = () => {
  const [editor] = useLexicalComposerContext()
  useEffect(
    () =>
      mergeRegister(
        editor.registerNodeTransform(TitledListNode, $untitleOnTitleRemoval),
        editor.registerCommand(KEY_ENTER_COMMAND, $enterAtTitleStart, COMMAND_PRIORITY_HIGH)
      ),
    [editor]
  )
  return null
}
