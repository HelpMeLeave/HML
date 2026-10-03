'use client'

import { CheckboxInput } from '@payloadcms/ui'
import type { DefaultCellComponentProps } from 'payload'

const CheckboxCell = (props: DefaultCellComponentProps) => (
  <CheckboxInput
    onToggle={(e) => e.preventDefault()}
    checked={props.cellData}
  />
)

export default CheckboxCell
