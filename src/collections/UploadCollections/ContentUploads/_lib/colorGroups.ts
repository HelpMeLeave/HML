import { ColumnConfig, columnField, RowConfig, rowField } from '@/collections/_fields/Flex'
import { CheckboxConfig } from '@/collections/_lib/Checkbox'
import { COLORS } from '@/lexicals/Features/Duotone/_lib/COLORS'
import { createColorString } from '@/lexicals/Features/Duotone/_lib/createColorString'
import type { DuotoneKey, HexColor } from '@/lexicals/Features/Duotone/_types'
import type { Theme } from '@payloadcms/ui'
import type { UIField } from 'payload'
import { ValueField } from '../_components/Preview/_lib'
import { DuotoneAttributes } from './attributes'

const PreviewField: UIField = {
  type: 'ui',
  name: 'preview',
  admin: {
    components: {
      Field: '@/collections/UploadCollections/ContentUploads/_components/Preview',
    },
  },
}

export const createThemeGrp = (theme: Theme, _hex: HexColor, color: DuotoneKey) =>
  ColumnConfig(
    createColorString(color, theme),
    { labelSize: 'small', width: '200px' },
    CheckboxConfig('activate'),
    rowField(
      {},
      columnField(
        {},
        ...Object.entries(DuotoneAttributes).map(([name, defaultValue]) =>
          ValueField(name, defaultValue)
        )
      ),
      PreviewField
    )
  )

export const createColorGroups = () =>
  Object.entries(COLORS).map(([color, themes]) =>
    RowConfig(
      color,
      { labelSize: 'base' },
      ...Object.entries(themes).map(([theme, hex]) =>
        createThemeGrp(theme as Theme, hex, color as DuotoneKey)
      )
    )
  )
