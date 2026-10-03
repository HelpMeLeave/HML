import CellBase from '@/collections/_lib/CellBase'
import PathwaysCollectionConfig from '@/collections/DataCollections/Pathways'
import { Pill } from '@/components/Admin/Pill'
import type { PillColors } from '@/components/Admin/Pill/_types'
import {
  type CollectionConfig,
  type CollectionSlug,
  type DefaultCellComponentProps,
  type FlattenedField,
  type JSONFieldClient,
  flattenAllFields,
} from 'payload'

const colors: PillColors[] = ['blue', 'yellow', 'red', 'purple', 'green', 'orange', 'pink', 'lime']

type FlattenedCollection<S extends CollectionSlug> = (CollectionConfig<S>['fields'][number]
  & FlattenedField)['name']

type GetColorsFn = <S extends CollectionSlug>(
  collection: CollectionConfig<S>
) => Record<FlattenedCollection<S>, PillColors>

const getColorsFn: GetColorsFn = <S extends CollectionSlug>(collection: CollectionConfig<S>) => {
  let i = 0

  return Object.fromEntries(
    flattenAllFields({ fields: collection.fields })
      .map((ea) => ea.name)
      .filter(Boolean)
      .map((k) => {
        i = i >= colors.length ? 0 : i + 1
        return [k, colors[i]]
      })
  )
}

const collectionFieldPills = {
  pathways: getColorsFn(PathwaysCollectionConfig),
}

const FlagsCell = (props: DefaultCellComponentProps<JSONFieldClient, string[]>) => {
  return (
    <CellBase {...props}>
      {props.cellData.map((ea) => (
        <Pill
          key={ea}
          statusOpts={collectionFieldPills.pathways}
          status={ea}
        />
      ))}
    </CellBase>
  )
}

export default FlagsCell
