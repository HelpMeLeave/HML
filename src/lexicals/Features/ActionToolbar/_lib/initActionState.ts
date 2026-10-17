import type { ActionStateInitFn } from '@/lexicals/Features/ActionToolbar/_types'
import { AllActions } from '@/lexicals/Features/ActionToolbar/Actions'

export const initActionState: ActionStateInitFn = (startingVal) =>
  Object.fromEntries(Object.keys(AllActions).map((ea) => [ea, startingVal]))
