import { ColumnsConverter } from '@/_components/blocks/Columns/Converter'
import { CTABlockConverter } from '@/_components/blocks/CTA/Converter'
import { FormBlockConverter } from '@/_components/blocks/Form/FormBlockConverter'
import { PageGroupBlockConverter } from '@/_components/blocks/PageGroup/Converter'
import { TemplateConverter } from '@/_components/blocks/Templates/Converter'
import type { FormBlock, PageGroupBlock } from '@/payload-types'
import type { JSXConverters } from '@payloadcms/richtext-lexical/react'

export const pageConverters: JSXConverters<FormBlock | PageGroupBlock>['blocks'] = {
  blocks: {
    'page-group': PageGroupBlockConverter,
    form: FormBlockConverter,
    columns: ColumnsConverter,
    cta: CTABlockConverter,
    template: TemplateConverter,
  },
}
