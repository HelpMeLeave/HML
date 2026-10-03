import { cn } from '@/lib/cn'

export const UNFlag = {
  Check: ({ attr }: { attr?: boolean | null | undefined | number }) => {
    return attr === true ? <UNFlag.Icon /> : <></>
  },
  Match: () => <UNFlag.Icon />,
  Icon: ({ ...props }: Props<'span'>) => (
    <span
      {...props}
      className={cn(
        'font-bold text-[#498DD5] uppercase no-underline! decoration-transparent decoration-0!',
        props.className
      )}>
      UN
    </span>
  ),
}
