import type { BlockConverterProps } from '@/_components/blocks/_types'
import { PageGroupBlockComponent } from '@/_components/blocks/PageGroup/Component'
import type { PageGroupBlock } from '@/payload-types'

export const PageGroupBlockConverter = async ({ node }: BlockConverterProps<PageGroupBlock>) => {
  const { fields } = node
  return <PageGroupBlockComponent {...fields} />
}
