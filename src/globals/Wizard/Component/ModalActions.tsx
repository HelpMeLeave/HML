import { Button } from '@/components/Button'
import { cn } from '@/lib/cn'
import { resolveLink } from '@/lib/normalize/resolveLink'
import type { SupportWizard } from '@/payload-types'

export type ActionInlineBtn = Valid<Valid<SupportWizard['modals']>[number]['actions']>[number]

export const WizardModalAction = ({
  onClick,
  node,
  node: { text, type },
}: {
  onClick: Props<'button'>['onClick']
  node: ActionInlineBtn
}) => {
  const action =
    type == 'link' ?
      ({
        href: resolveLink(node),
        type: 'link',
      } as Props<typeof Button>)
    : ({
        type: 'button',
        onClick,
      } as Props<typeof Button>)

  return (
    <Button
      className={cn('min-w-1/4 text-center')}
      variant={'wYellowMuted'}
      {...action}>
      {text as string}
    </Button>
  )
}
