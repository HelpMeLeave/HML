import type { ActionStateInitFn } from '@/lexicals/Features/ActionToolbar/_types'
import { AllActions } from '../AllActions'

export const initActionState: ActionStateInitFn = (startingVal) =>
  Object.fromEntries(Object.keys(AllActions).map((ea) => [ea, startingVal]))
