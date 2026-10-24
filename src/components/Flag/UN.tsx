import { cn } from '@/lib/cn'

const Icon = ({ ...props }: Props<'span'>) => (
  <span
    {...props}
    className={cn(
      'font-bold text-[#498DD5] uppercase no-underline decoration-transparent decoration-0',
      props.className
    )}>
    UN
  </span>
)

export const UNFlag = {
  Check: ({ attr }: { attr?: Nullish<boolean | number> }) => (attr === true ? <Icon /> : <></>),
  Match: () => <Icon />,
  Icon,
}
