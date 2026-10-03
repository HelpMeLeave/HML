import type { MarkLogoVariants, MarkText } from '@/components/Logo/_types'
import { cn } from '@/lib/cn'

export const LogoMarkFilled = (props: Props<'svg'>) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width='100'
    height='100'
    viewBox='0 0 100 100'
    xmlSpace='preserve'
    fill='currentColor'
    {...props}
    className={cn('absolute top-0 right-0 left-0 aspect-square h-full w-full', props.className)}>
    <polygon points='97.4,2.6 40.8,2.5 2.5,40.9 59.1,97.5 97.5,59.2 	' />
  </svg>
)

export const LogoMarkLowercase = (props: Props<'svg'>) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width='100'
    height='100'
    viewBox='0 0 100 100'
    xmlSpace='preserve'
    fill='currentColor'
    {...props}>
    <path
      d='M97.5,59.2L59.2,97.5L2.5,40.8L40.8,2.5l56.6,0.1L97.5,59.2z M58.4,81.2l1.8-1.8l-4.5-4.5c-1.7-1.7-1.9-3.3-0.6-4.5
		c1.5-1.5,2.7-0.5,3.9,0.7l4.7,4.7l1.9-1.9l-5.2-5.2c-2-2-4-2.6-6.1-0.5c-1.4,1.4-1.6,2.9-1.3,4.1l-4.8-4.8l-1.8,1.8L58.4,81.2
		L58.4,81.2z M68.5,71.1l1.8-1.8l-4.5-4.5c-1.7-1.7-1.9-3.3-0.7-4.4c1.4-1.4,2.7-0.5,3.9,0.7l4.7,4.7l1.9-1.9l-4.5-4.5
		c-1.7-1.7-1.9-3.2-0.7-4.4c1.4-1.4,2.7-0.5,3.9,0.7l4.7,4.7l1.8-1.8l-5.2-5.2c-2-2-4-2.6-6.1-0.6c-1.2,1.2-1.7,2.6-1.4,4.3
		c-1.3-0.5-2.6-0.3-3.9,1c-1.3,1.3-1.4,2.7-1.1,3.9l-1.5-0.9l-1.5,1.5L68.5,71.1L68.5,71.1z M85.9,53.7l1.2-1.2l-1.6-1.6l-0.6,0.6
		c-0.9,0.9-1.2,0.9-1.9,0.1l-9.4-9.4L71.7,44l9.8,9.8C83.2,55.6,84.2,55.4,85.9,53.7L85.9,53.7z'
    />
  </svg>
)

export const LogoMarkUppercase = (props: Props<'svg'>) => (
  <svg
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    width='100'
    height='100'
    viewBox='0 0 100 100'
    xmlSpace='preserve'
    fill='currentColor'
    {...props}>
    <path
      d='M97.5,59.2L59.2,97.5L2.5,40.8L40.8,2.5l56.6,0.1L97.5,59.2L97.5,59.2z M39.3,57.2L38,58.5l2.6,2.6l-2.3,2.3l-2.6-2.6
	l-1.3,1.3l6.7,6.7l1.3-1.3l-2.8-2.8l2.3-2.3l2.8,2.8l1.3-1.3L39.3,57.2z M51.1,56.2l-3.4,3.4L46,58l1.9-1.9l-1.3-1.3l-1.9,1.9
	l-1.2-1.2l3.3-3.3l-1.3-1.3l-4.6,4.6l6.7,6.7l4.8-4.8L51.1,56.2L51.1,56.2z M57.2,50l-3.3,3.3L48.5,48l-1.3,1.3l6.7,6.7l4.7-4.7
	L57.2,50L57.2,50z M56,40.5l-2.9,2.9l6.7,6.7l1.3-1.3l-2.4-2.4l1.5-1.5c1.4-1.4,1.8-3.1,0.2-4.6C59,38.9,57.2,39.3,56,40.5L56,40.5
	z M59,43.6l-1.6,1.6l-1.7-1.7l1.5-1.5c0.6-0.6,1.2-0.7,1.8-0.1C59.6,42.3,59.6,42.9,59,43.6L59,43.6z M60.1,65.2l-3.4,3.4L55.1,67
	l1.9-1.9l-1.3-1.3l-1.9,1.9l-1.2-1.2l3.3-3.3L54.6,60L50,64.6l6.7,6.7l4.8-4.8L60.1,65.2L60.1,65.2z M62.9,80.6l-3.8,3.8L53.8,79
	l-1.3,1.3l6.7,6.7l5.1-5.1L62.9,80.6L62.9,80.6z M69.2,74.3l-3.4,3.4l-1.6-1.6l1.9-1.9l-1.3-1.3l-1.9,1.9l-1.2-1.2l3.3-3.3
	l-1.3-1.3L59,73.7l6.7,6.7l4.8-4.8L69.2,74.3L69.2,74.3z M68.7,64l-1.3,1.3l4.1,9.2l1.4-1.4l-1-2l2.4-2.4l2,1l1.5-1.5L68.7,64
	L68.7,64z M71.2,69.4l-0.8-1.6c-0.3-0.5-0.5-1.1-0.7-1.4c0.3,0.2,0.8,0.4,1.4,0.7l1.6,0.8L71.2,69.4L71.2,69.4z M75.5,57.2l2.6,5.1
	c0.3,0.5,0.6,1.1,0.8,1.4c-0.3-0.2-0.9-0.5-1.4-0.8l-5.1-2.6l-1.5,1.5l9.1,4.3l1.3-1.3L77,55.7L75.5,57.2L75.5,57.2z M88.3,55.2
	l-3.4,3.4L83.2,57l1.9-1.9l-1.3-1.3l-1.9,1.9l-1.2-1.2l3.3-3.3l-1.3-1.3l-4.6,4.6l6.7,6.7l4.8-4.8L88.3,55.2L88.3,55.2z M47.1,67.5
	l1.5,3.9l-3.9-1.4l-1.3,1.3l6.7,6.7l1.3-1.3l-2.5-2.5c-0.4-0.4-1.2-1.2-1.5-1.4c0.3,0.1,1,0.4,1.6,0.6l0.5,0.2l1.9,0.7l-0.7-2
	l-0.1-0.4c-0.2-0.6-0.5-1.2-0.6-1.6c0.3,0.3,1.1,1.1,1.4,1.5l2.5,2.5l1.3-1.3l-6.7-6.7L47.1,67.5L47.1,67.5z'
    />
  </svg>
)

const LogoWrapper = ({ ...props }: Props) => (
  <span
    {...props}
    className={cn('relative block h-full w-full', props.className)}
  />
)

export const LogoMark = (
  props: Omit<MarkLogoVariants, 'logoType'> & Omit<MarkText, 'logoType'> & Props<'svg'>
) => {
  const { textBackground, mark, wrapperProps, className, ...baseProps } = props

  const wrapperClassName = wrapperProps ? wrapperProps?.className : className

  const El =
    mark == 'uppercase' ? LogoMarkUppercase
    : mark == 'lowercase' ? LogoMarkLowercase
    : LogoMarkFilled

  return (
    <LogoWrapper
      {...wrapperProps}
      className={wrapperClassName}>
      {textBackground && <LogoMarkFilled className={cn(textBackground)} />}
      <El
        {...baseProps}
        className={'relative z-1 h-full w-full text-inherit'}
      />
    </LogoWrapper>
  )
}
