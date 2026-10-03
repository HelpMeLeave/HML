import { cn } from '@/lib/cn'
import type { LucideProps } from 'lucide-react'

export const SocialIcon = (props: Props<'svg'> & LucideProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 100 100'
      xmlSpace='preserve'
      {...props}
      className={cn('text-current', props.className)}>
      <path
        className='opacity-50'
        stroke='currentColor'
        fill='currentColor'
        d='M50,97.5C23.8,97.5,2.5,76.2,2.5,50S23.8,2.5,50,2.5S97.5,23.8,97.5,50S76.2,97.5,50,97.5z M50,7C26.3,7,7,26.3,7,50
		s19.3,43,43,43s43-19.3,43-43S73.7,7,50,7z'
      />
      <polygon
        fill='currentColor'
        points='72.8,27.8 42.1,27.8 21.3,48.6 52,79.3 72.8,58.5 	'
      />
    </svg>
  )
}
