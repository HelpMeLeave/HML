import type { LucideIcon } from 'lucide-react'

export const WrapperField = ({ Icon, children }: { Icon?: LucideIcon; children: ReactNode }) => {
  return Icon ?
      <div className='field-type__wrap'>
        {Icon && <Icon className='absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50' />}
        {children}
      </div>
    : <>{children}</>
}
