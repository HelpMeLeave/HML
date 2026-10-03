import type { GlossaryTerm } from '@/payload-types'
import type { CollectionBeforeChangeHook, RequestContext } from 'payload'
import { extractID } from 'payload/shared'

type RelatedTerms = {
  baseTerm: number
  addedTerms: number[]
  removedTerms: number[]
}

type RelatedTermsCTX = RequestContext & {
  relatedTerms: RelatedTerms
}

type HandleCTXProps = {
  originalTerms: number[]
  id: number
  data: Partial<GlossaryTerm>
  context: RelatedTermsCTX
}

const updateCTX = (id: number, key: 'addedTerms' | 'removedTerms', ctx: RelatedTermsCTX) => {
  ctx.relatedTerms[key] = ctx.relatedTerms[key].filter((t) => t != id)
  return ctx
}

const handleContext = ({ data, context, id, originalTerms }: HandleCTXProps) => {
  const { baseTerm, addedTerms, removedTerms } = context.relatedTerms

  if (addedTerms.includes(id)) {
    originalTerms = [...originalTerms, baseTerm]
    updateCTX(id, 'addedTerms', context)
  }

  if (removedTerms.includes(id)) {
    originalTerms = originalTerms.filter((t) => t != baseTerm)
    updateCTX(id, 'removedTerms', context)
  }

  data.relatedTerms = [...new Set(originalTerms)]

  return { data, context }
}

export const relatedTerms: CollectionBeforeChangeHook<GlossaryTerm> = async ({
  data,
  data: { relatedTerms },
  originalDoc: { relatedTerms: originalTerms, id: baseTerm } = {
    relatedTerms: [],
  },
  req,
  req: { context },
  operation,
}) => {
  if (!data) return
  if (operation == 'create') return data
  if (baseTerm && context.relatedTerms) {
    const thisCTX = context as RelatedTermsCTX
    if (
      [...thisCTX.relatedTerms.addedTerms, ...thisCTX.relatedTerms.removedTerms].includes(baseTerm)
    ) {
      const ctxUpdate = handleContext({
        data,
        context: context as RelatedTermsCTX,
        id: baseTerm,
        originalTerms: (originalTerms ?? []).map(extractID),
      })

      req.context = ctxUpdate.context
      return ctxUpdate.data
    }
  }

  const oldTerms = originalTerms?.map(extractID<number>) ?? []
  const relatedIDS = (relatedTerms ?? []).map(extractID<number>)

  const addedTerms = relatedIDS.filter((t) => !oldTerms.includes(t))
  const removedTerms = oldTerms.filter((t) => !relatedIDS.includes(t))

  await req.payload.update({
    collection: 'glossary-term',
    where: {
      id: { in: [...addedTerms, ...removedTerms] },
    },
    req,
    data: {
      relatedTerms: [baseTerm],
    },
    context: {
      relatedTerms: {
        baseTerm,
        addedTerms,
        removedTerms,
      },
    },
  })

  return data
}
