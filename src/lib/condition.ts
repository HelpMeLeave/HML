import type { Config } from '@/payload-types'
import type { Condition, Data } from 'payload'

type FnKeys =
  | 'isCreate'
  | 'isNotCreate'
  | 'siblingDataEq'
  | 'siblingDataNotEq'
  | 'siblingDataTruthy'
  | 'siblingDataFalsy'
  | 'siblingDataIncludes'
  | 'siblingDataExcludes'
type FnArgs = Record<FnKeys, Condition>

// condition: conditionFn({ key: 'useTemplate' }).siblingDataFalsy
// condition: conditionFn({ key: 'selectionType', equals: 'filter' }).siblingDataEq

type FnCollection = Config['collections']
type FnGlobal = Config['globals']

type FnCollectionKeys = Keys<FnCollection>
type FnGlobalKeys = Keys<FnGlobal>

export const conditionFn = <
  C extends FnCollection[FnCollectionKeys] | FnGlobal[FnGlobalKeys],
  Key extends keyof C,
>(props?: {
  key?: Key extends keyof C ?
    C[Key] extends unknown[] ? keyof C[Key][number]
    : C[Key] extends Record<string, unknown> ? keyof C[Key]
    : Key
  : keyof C
  equals?: unknown
  in?: unknown[]
}) => {
  const options = {
    isCreate: (_data, _siblingData, args) => args.operation == 'create',
    isNotCreate: (_data, _siblingData, args) => args.operation != 'create',
    siblingDataEq: (_data, siblingData) =>
      Boolean(props?.key && siblingData[props.key] == props?.equals),
    siblingDataNotEq: (_data, siblingData) =>
      Boolean(props?.key && siblingData[props.key] != props?.equals),
    siblingDataTruthy: (_data, siblingData) => truthy(siblingData, props?.key as string),
    siblingDataFalsy: (_data, siblingData) => falsy(siblingData, props?.key as string),
    siblingDataIncludes: (_data, siblingData) =>
      includes(siblingData, props?.key as string, props?.in),
    siblingDataExcludes: (_data, siblingData) =>
      excludes(siblingData, props?.key as string, props?.in),
  } as FnArgs

  return options
}

const optsHasIn = (entry?: unknown[]): entry is unknown[] =>
  Boolean(entry && Array.isArray(entry) && entry.length > 0)

const hasKey = (entry?: string): entry is string => (!entry ? false : typeof entry == 'string')
const isTruthy = (entry: unknown) => typeof entry != 'undefined' && Boolean(entry) == true
const isFalsy = (entry: unknown) => typeof entry == 'undefined' || Boolean(entry) == false

type ListCkFn = (siblingData: Data, key?: string, optsIn?: unknown[]) => boolean
type TFCkFn = (siblingData: Data, key?: string) => boolean

const excludes: ListCkFn = (siblingData, key, optsIn) =>
  hasKey(key) && optsHasIn(optsIn) && !optsIn.includes(siblingData[key])

const includes: ListCkFn = (siblingData, key, optsIn) => {
  return hasKey(key) && optsHasIn(optsIn) && optsIn.includes(siblingData[key])
}

const truthy: TFCkFn = (siblingData, key) => hasKey(key) && isTruthy(siblingData[key])
const falsy: TFCkFn = (siblingData, key) => hasKey(key) && isFalsy(siblingData[key])

export const conditionFnBlock = (props?: { key?: string; equals?: unknown; in?: unknown[] }) => {
  const options = {
    isCreate: (_data, _siblingData, args) => args.operation == 'create',
    isNotCreate: (_data, _siblingData, args) => args.operation != 'create',
    siblingDataEq: (_data, siblingData) =>
      Boolean(props?.key && siblingData[props.key] == props?.equals),
    siblingDataNotEq: (_data, siblingData) =>
      Boolean(props?.key && siblingData[props.key] != props?.equals),
    siblingDataTruthy: (_data, siblingData) => truthy(siblingData, props?.key),
    siblingDataFalsy: (_data, siblingData) => falsy(siblingData, props?.key),
    siblingDataIncludes: (_data, siblingData) => includes(siblingData, props?.key, props?.in),
    siblingDataExcludes: (_data, siblingData) => excludes(siblingData, props?.key, props?.in),
  } as FnArgs

  return options
}

// : (_data, _siblingData, args) => operation(args).notCreate
