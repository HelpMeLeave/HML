import type { WorkflowCollections, WorkflowCollectionSlug } from '@/payload-types'

export const updateLifecycle = (
  data: Partial<WorkflowCollections[WorkflowCollectionSlug]>,
  update: Partial<WorkflowCollections[WorkflowCollectionSlug]['currentLifecycle']>
) => {
  return {
    ...data.currentLifecycle,
    ...update,
  }
}
