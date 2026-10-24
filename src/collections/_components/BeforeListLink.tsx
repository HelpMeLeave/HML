import type { BoxIcon } from '@boxicons-pro/react'
import Link from 'next/link'

export const BeforeListLink = ({
  href,
  Icon,
  children,
}: {
  href: Props<typeof Link>['href']
  children: Props<typeof Link>['children']
  Icon: BoxIcon
}) => {
  return (
    <Link
      style={{
        alignItems: 'center',
        display: 'flex',
        columnGap: '0.25rem',
        paddingInline: '16px',
        paddingBlock: '4px',
        borderRadius: 0,
      }}
      className='btn btn--style-primary btn--size-medium'
      href={href}>
      <Icon
        size={'sm'}
        strokeWidth={'1.5px'}
        className='pb-px'
      />
      {children}
    </Link>
  )
}
