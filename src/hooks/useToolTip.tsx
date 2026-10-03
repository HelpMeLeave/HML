import { cn } from '@/lib/cn'
import { Tooltip } from '@payloadcms/ui'
import { useEffect, useRef, useState } from 'react'

export const useToolTip = <E extends HTMLElement = HTMLElement>({
  tooltip,
  ...props
}: Omit<Props<typeof Tooltip>, 'children'> & {
  tooltip: string
}) => {
  const [showTip, setShow] = useState<string>('hide')
  const ref = useRef<E>(null)

  useEffect(() => {
    const handleEv = (e: MouseEvent) => {
      e.currentTarget?.addEventListener(
        'mouseleave',
        () => {
          setShow('hiding')
          setTimeout(() => setShow('hide'), 200)
        },
        {
          once: true,
        }
      )
      setShow('show')
    }

    return ref.current?.addEventListener('mouseenter', (e) => handleEv(e))
  }, [])

  const ToolTip = () => (
    <Tooltip
      className={cn(
        'z-50 opacity-0 transition-all',
        showTip == 'hiding' && 'block! -translate-x-1/2 translate-y-1.5 animate-fade',
        showTip == 'show' && 'block! opacity-100',
        'bg-theme-foreground! after:border-b-theme-foreground!',
        'dark:after:border-b-theme-300! dark:border dark:border-slate-300 dark:bg-ui-900!',
        'rounded-md! font-mono text-[0.65rem] font-[450] tracking-[-0.01ch] text-white! uppercase'
      )}
      staticPositioning={false}
      show={showTip != 'hide'}
      delay={800}
      boundingRef={ref}
      {...props}>
      <span>{tooltip}</span>
    </Tooltip>
  )

  return {
    tooltipRef: ref,
    ToolTip,
  }
}
