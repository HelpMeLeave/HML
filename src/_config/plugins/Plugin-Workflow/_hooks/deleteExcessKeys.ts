import type { Data } from 'payload'

export const deleteExcessKeys = (data: Data) => {
  delete data.transitionTo
  delete data.actionKey
  delete data.transitionNote
}
