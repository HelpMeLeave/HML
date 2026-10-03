import { updateLifecycle } from '@/_config/plugins/Plugin-Workflow/_hooks/updateLifecycle'
import type { Data } from 'payload'

export const createPushFn = (data: Data, originalDoc?: Data) => {
  const records = [...((originalDoc?.currentLifecycle?.records ?? []) as number[])]

  return (id: number) => {
    records.push(id)
    data.currentLifecycle = updateLifecycle(data, { records })
  }
}
