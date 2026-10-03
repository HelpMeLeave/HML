import { isTraversable } from '@/lib/normalize/is'
import Link from 'next/link'

const isLink = (entry: unknown): entry is Props<typeof Link> =>
  isTraversable(entry) && 'href' in entry && Boolean(entry.href)

export const ButtonLink = (props: Props<'button'> | Props<typeof Link>) => {
  if (isLink(props)) {
    return (
      <Link
        {...props}
        prefetch={false}
        href={props.href}
      />
    )
  }
  return (
    <button
      {...props}
      type='button'
    />
  )
}
