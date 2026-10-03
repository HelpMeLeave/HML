import { cn } from '@/lib/cn'
import { Link } from '@payloadcms/ui'
import { type LucideIcon } from 'lucide-react'

type LinkSectionItem = {
  name: string
  Icon: LucideIcon
  href: string
  description: string
  status: boolean
  extraAction?: {
    icon: LucideIcon
    link: string
    label: string
  }
}

const WrapperLink = (props: Props<typeof Link>) => {
  return (
    <Link
      prefetch={false}
      {...props}
      className='group relative flex items-center gap-x-6 rounded-none! px-4 py-3 focus-within:bg-accent/5'
    />
  )
}

const WrapperSpan = (props: Props<'span'>) => {
  return (
    <span
      {...props}
      className='group relative flex items-center gap-x-6 rounded-none! px-4 py-3 focus-within:bg-accent/5'
    />
  )
}

const Inner = ({ name, Icon }: { Icon: LucideIcon; name: string }) => {
  return (
    <>
      <div className='dark:bg-slate-0/30 mt-0 flex size-8 flex-none items-center justify-center rounded-lg *:[svg]:text-accent'>
        <Icon
          aria-hidden='true'
          className='size-4 text-accent'
        />
      </div>
      <span className='translate-x-0 transition-transform focus-within:motion-safe:translate-x-12'>
        <div className='block overflow-hidden font-[450] text-nowrap text-ellipsis focus:text-lg focus-visible:text-accent! dark:text-accent'>
          {name}
          <span className='absolute inset-0' />
        </div>
      </span>
    </>
  )
}

export const LinkSection = ({ title, items }: { title: string; items: LinkSectionItem[] }) => {
  return (
    <section className='flex w-full flex-col gap-2'>
      <h2>{title}</h2>
      <menu
        role='list'
        className='mt-3 flex flex-wrap gap-0 overflow-hidden rounded-2xl bg-highlight/50 p-0! *:shrink *:grow *:basis-sm'>
        {items.map((item) => (
          <li
            key={item.name}
            className={cn(!item.status && 'opacity-50 **:cursor-not-allowed!')}>
            {item.status == true ?
              <WrapperLink href={item.href}>
                <Inner
                  Icon={item.Icon}
                  name={item.name}
                />
              </WrapperLink>
            : <WrapperSpan>
                <Inner
                  Icon={item.Icon}
                  name={item.name}
                />
              </WrapperSpan>
            }
          </li>
        ))}
      </menu>
    </section>
  )
}
