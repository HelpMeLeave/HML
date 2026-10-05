'use client'

import {
  definitionCommands,
  definitionWrapperCommands,
} from '@/_components/lexicals/Features/_lib/commands'
import {
  clearMarkState,
  getMarkState,
  setMarkState,
  useMarkState,
} from '@/_components/lexicals/Features/DefinitionsFeature/_hooks/markStore'
import { $collectWrapperMarks } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/collectWrappers'
import { fetchTermIndex } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/fetchTermIndex'
import { $scanForTerms } from '@/_components/lexicals/Features/DefinitionsFeature/_lib/scan'
import type { DefinitionMatch } from '@/_components/lexicals/Features/DefinitionsFeature/_types'
import { MatchModals } from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionModal'
import {
  $createDefinitionNode,
  $isDefinitionNode,
} from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNode'
import {
  $createDefinitionNodeWrapper,
  $isDefinitionNodeWrapper,
  $purgeWrappers,
  $reject,
} from '@/_components/lexicals/Features/DefinitionsFeature/DefinitionNodeWrapper'
import type { GlossaryTerm } from '@/payload-types'
import {
  $getNodeByKey,
  $getRoot,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
} from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { $descendantsMatching, mergeRegister } from '@payloadcms/richtext-lexical/lexical/utils'
import { toast } from '@payloadcms/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

export const DefinitionsPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const markState = useMarkState(editor)
  const [terms, setTerms] = useState<GlossaryTerm[]>([])

  const syncFromDocument = useCallback(
    (active?: boolean) => {
      editor.getEditorState().read(() => {
        const matches = $collectWrapperMarks()
        const state = getMarkState(editor)
        const nextActive = active ?? state.active

        const unchanged =
          state.active === nextActive
          && state.matches.length === matches.length
          && state.matches.every((mark, index) => mark.nodeKey === matches[index].nodeKey)
        if (unchanged) return

        setMarkState(editor, { active: nextActive, matches })
      })
    },
    [editor]
  )

  // Session-only: per term, how many leading occurrences were rejected. Cleared with the suggestions.
  const skipsRef = useRef(new Map<number, number>())

  const runScan = useCallback(async () => {
    try {
      const skippedTerms: number[] = []

      editor.getEditorState().read(() => {
        $descendantsMatching($getRoot().getChildren(), $isDefinitionNode).forEach((node) =>
          skippedTerms.push(node.getTermID())
        )
      })
      const index = await fetchTermIndex(skippedTerms)

      editor.update(() => {
        // Right to left: splitText keeps the original key on the left piece, so earlier offsets in the same node stay valid.
        const matches = $scanForTerms(index, skipsRef.current).sort((a, b) => b.start - a.start)
        const textNodes = $getRoot().getAllTextNodes()

        for (const match of matches) {
          const child = textNodes.find((node) => node.getKey() === match.nodeKey)
          if (!$isTextNode(child)) continue
          if ($isDefinitionNodeWrapper(child.getParent())) continue

          const target = child
            .splitText(match.start, match.end)
            .find((part) => part.getTextContent().toLowerCase() === match.text.toLowerCase())
          if (!$isTextNode(target)) continue

          // Move the original text node in rather than building a fresh one, so bold/italic already applied to the matched word survives being wrapped.
          const wrapper = $createDefinitionNodeWrapper(match.termID, match.instance)
          target.replace(wrapper)
          wrapper.append(target)
        }
      })

      syncFromDocument(true)
    } catch (error) {
      toast.error(`Glossary term scan failed: ${(error as Error).message}`)
      editor.update(() => {
        $purgeWrappers()
      })
      clearMarkState(editor)
    }
  }, [editor, syncFromDocument])

  const purge = useCallback(() => {
    skipsRef.current.clear()
    editor.update(() => {
      $purgeWrappers()
    })
    clearMarkState(editor)
  }, [editor])

  // Wrappers are added and removed by ordinary editing too (undo, paste, delete), so the count has to follow the tree rather than whatever the last scan recorded.
  useEffect(
    () => editor.registerUpdateListener(() => syncFromDocument()),
    [editor, syncFromDocument]
  )

  const accept = useCallback(
    (match: Pick<DefinitionMatch, 'nodeKey' | 'termID'>) => {
      editor.update(() => {
        const wrapper = $getNodeByKey(match.nodeKey)
        if (!$isDefinitionNodeWrapper(wrapper)) return

        // Promote the transient wrapper to a kept definition, carrying its children across so the text and its formatting survive.
        const node = $createDefinitionNode(match.termID)
        for (const child of wrapper.getChildren()) node.append(child)
        wrapper.replace(node)
      })
    },
    [editor]
  )

  const dismiss = useCallback(
    (match: Pick<DefinitionMatch, 'nodeKey'>) => {
      let rejected = false
      editor.update(() => {
        try {
          const wrapper = $getNodeByKey(match.nodeKey)
          if ($isDefinitionNodeWrapper(wrapper)) {
            // only this term moves on to its next occurrence; the others keep their spot
            skipsRef.current.set(wrapper.getTermID(), wrapper.getInstance() + 1)
            $reject(wrapper)
            rejected = true
          }
        } catch (e) {
          console.warn((e as Error).message)
        }
      })
      // outside the update: runScan opens its own read and update
      if (rejected) void runScan()
    },
    [editor, runScan]
  )

  useEffect(
    () =>
      mergeRegister(
        editor.registerCommand(
          definitionCommands.SCAN,
          () => {
            // Command handlers are synchronous; the fetch resolves into the store on its own.
            void runScan()
            return true
          },
          COMMAND_PRIORITY_LOW
        ),
        editor.registerCommand(
          definitionCommands.CLEAR,
          () => {
            purge()
            return true
          },
          COMMAND_PRIORITY_LOW
        ),
        editor.registerCommand(
          definitionWrapperCommands.PURGE,
          () => {
            purge()
            return true
          },
          COMMAND_PRIORITY_LOW
        )
      ),
    [editor, purge, runScan]
  )

  if (!markState.active) return null

  return (
    <>
      {markState.matches.map(({ termID, text, nodeKey, instance }) => (
        <MatchModals
          key={`${termID}-${instance}`}
          nodeKey={nodeKey}
          text={text}
          termID={termID}
          terms={terms}
          setTermsAction={setTerms}
          acceptAction={accept}
          rejectAction={dismiss}
        />
      ))}
    </>
  )
}
