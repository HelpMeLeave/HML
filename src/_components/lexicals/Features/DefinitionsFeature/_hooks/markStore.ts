import type { MarkState } from '@/_components/lexicals/Features/DefinitionsFeature/_types'
import type { LexicalEditor } from '@payloadcms/richtext-lexical/lexical'
import { useSyncExternalStore } from 'react'

// Module constant so the snapshot is referentially stable; returning a fresh object would loop useSyncExternalStore.
const EMPTY: MarkState = { active: false, matches: [] }

const states = new WeakMap<LexicalEditor, MarkState>()
const listeners = new WeakMap<LexicalEditor, Set<() => void>>()
const subscribers = new WeakMap<LexicalEditor, (onChange: () => void) => () => void>()

export const getMarkState = (editor: LexicalEditor): MarkState => states.get(editor) ?? EMPTY

export const setMarkState = (editor: LexicalEditor, next: MarkState) => {
  states.set(editor, next)
  listeners.get(editor)?.forEach((notify) => notify())
}

export const clearMarkState = (editor: LexicalEditor) => {
  setMarkState(editor, EMPTY)
}

// Memoised per editor: a fresh subscribe function each render would resubscribe on every render.
const getSubscribe = (editor: LexicalEditor) => {
  let subscribe = subscribers.get(editor)
  if (!subscribe) {
    subscribe = (onChange: () => void) => {
      let set = listeners.get(editor)
      if (!set) {
        set = new Set()
        listeners.set(editor, set)
      }
      set.add(onChange)
      return () => {
        set.delete(onChange)
      }
    }
    subscribers.set(editor, subscribe)
  }
  return subscribe
}

export const useMarkState = (editor: LexicalEditor): MarkState =>
  useSyncExternalStore(
    getSubscribe(editor),
    () => getMarkState(editor),
    () => EMPTY
  )
