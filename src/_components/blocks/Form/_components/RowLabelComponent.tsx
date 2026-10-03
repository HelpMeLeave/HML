'use client'

import { LabelBase } from '@/_components/blocks/Form/_components/LabelBase'

const RowLabelComponent = ({ title, titleKey }: { title: string; titleKey: string }) => (
  <LabelBase
    title={title}
    titleKey={titleKey}
    level={2}
  />
)

export default RowLabelComponent
