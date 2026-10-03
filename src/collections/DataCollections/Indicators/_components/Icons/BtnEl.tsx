'use client'
import { Button } from '@payloadcms/ui'

export const BtnEl = ({
  label,
  selectAction,
  iconId,
  ...props
}: Props<typeof Button> & {
  label?: string
  iconId: string
  selectAction: (id: string) => void
}) => (
  <Button
    {...props}
    onClick={() => selectAction(iconId)}
    className={['icon-btn icon-picker', props.className].join(' ')}
    margin={false}
    type='button'
    buttonStyle='icon-label'
    iconStyle='without-border'
    size='small'>
    {label ?? props.children}
  </Button>
)
