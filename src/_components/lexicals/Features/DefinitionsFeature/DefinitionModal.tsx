import { RichTextComponent } from '@/_components/blocks/RichText/Component'
import type { DefinitionMatch } from '@/_components/lexicals/Features/DefinitionsFeature/_types'
import type { GlossaryTerm } from '@/payload-types'
import { sdk } from '@/server/sdk'
import { useLexicalDrawer } from '@payloadcms/richtext-lexical/client'
import { $getNodeByKey } from '@payloadcms/richtext-lexical/lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import { Drawer } from '@payloadcms/ui'
import { DrawerActionHeader } from '@payloadcms/ui/elements/DrawerActionHeader'
import { type Dispatch, type SetStateAction, useEffect, useMemo } from 'react'

export const MatchModals = ({
  nodeKey,
  text,
  termID,
  terms,
  setTermsAction,
  acceptAction,
  rejectAction,
}: {
  nodeKey: string
  text: string
  termID: number
  terms: GlossaryTerm[]
  setTermsAction: Dispatch<SetStateAction<GlossaryTerm[]>>
  acceptAction: (match: Pick<DefinitionMatch, 'nodeKey' | 'termID'>) => void
  rejectAction: (match: Pick<DefinitionMatch, 'nodeKey' | 'termID'>) => void
}) => {
  const [editor] = useLexicalComposerContext()
  const slug = `definition-drawer-${termID}`
  const { toggleDrawer } = useLexicalDrawer(`definition-drawer-${termID}`, false)

  const term = useMemo(() => terms.find((t) => t.id == termID) ?? null, [terms])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const element = target?.closest<HTMLElement>('.lexical__definition-wrapper')
      if (!element) return

      if (termID == Number(element.dataset.termId)) {
        // useLexicalDrawer captures the selection as the drawer opens and re-applies a clone of it on close. Reject unwraps this node in between, so a selection captured inside it would restore against keys that no longer exist. Parking the caret just past the wrapper keeps the stored selection valid whichever button is pressed.
        // Discrete because storeSelection reads the editor synchronously inside toggleDrawer — a queued update would not have landed yet.
        editor.update(
          () => {
            $getNodeByKey(nodeKey)?.selectNext(0, 0)
          },
          { discrete: true }
        )
        toggleDrawer()
      }
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [editor, nodeKey, termID, toggleDrawer])

  useEffect(() => {
    const getTerm = async () => {
      const thisTerm = await sdk.findByID({
        collection: 'glossary-term',
        id: termID,
      })
      // functional update: every drawer fetches at mount, and spreading the stale `terms` let the last write erase the others
      thisTerm && setTermsAction((prev) => [...prev, thisTerm])
    }
    if (!term) {
      getTerm()
    }
  }, [term])

  const heading = term?.abbreviation ? `${term.term} (${term.abbreviation})` : (term?.term ?? text)

  const handleAccept = () => {
    toggleDrawer()
    acceptAction({ nodeKey, termID })
  }
  const handleReject = () => rejectAction({ nodeKey, termID })

  return (
    <Drawer
      className='definition-drawer'
      slug={slug}
      Header={
        <DrawerActionHeader
          className='definition-drawer__header'
          title={heading}
          saveLabel='Approve'
          cancelLabel='Reject'
          onCancel={() => {
            handleReject()
            toggleDrawer()
          }}
          onSave={handleAccept}
        />
      }
      gutter={true}>
      {!term ?
        <p>Loading definition…</p>
      : term.definition ?
        <RichTextComponent
          blockType='rich-text'
          content={term.definition}
        />
      : <p>No definition has been written for this term yet.</p>}
    </Drawer>
  )
}
