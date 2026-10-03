import { isNumber } from 'payload/shared'

/** Non-strict string check */
export const isText = (entry: unknown): entry is string =>
  typeof entry == 'string' && !isNumber(entry)

/** Strict Record check */
export const isRecord = (entry: unknown): entry is Record<string, unknown> =>
  entry != null && typeof entry == 'object' && !Array.isArray(entry)

/** Loose Object check -> includes Arrays as permissible*/
export const isTraversable = (
  entry: unknown
): entry is Record<string, unknown> | Record<number, unknown> =>
  entry != null && typeof entry == 'object'

export const isRootLike = (entry: unknown): entry is { root: Record<string, unknown> } =>
  Boolean(entry && typeof entry == 'object' && !Array.isArray(entry) && 'root' in entry)
