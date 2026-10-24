import { isTraversable } from '@/lib/normalize/is'

export const objHasKey = <T>(key: string, obj: unknown): obj is T =>
  isTraversable(obj) && key in obj
