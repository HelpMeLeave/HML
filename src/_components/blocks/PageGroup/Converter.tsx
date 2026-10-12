import { PageGroupBlockComponent } from '@/_components/blocks/PageGroup/Component'
import type { BlockConverterProps } from '@/lexicals/_types'
import type { PageGroupBlock } from '@/payload-types'

export const PageGroupBlockConverter = async ({ node }: BlockConverterProps<PageGroupBlock>) => {
  const { fields } = node
  return <PageGroupBlockComponent {...fields} />
}
