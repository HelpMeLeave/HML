'use client'

import { LabelBase } from '@/_components/blocks/Form/_components/LabelBase'

const BlockLabelComponent = ({ title, titleKey }: { title: string; titleKey: string }) => (
  <LabelBase
    title={title}
    titleKey={titleKey}
    level={1}
  />
)

export default BlockLabelComponent
