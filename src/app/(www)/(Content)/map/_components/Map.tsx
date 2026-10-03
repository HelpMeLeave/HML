import { cn } from '@/lib/cn'
import { motion } from 'motion/react'
import type { tMapPathElProps, tMapSVGProps } from '../_lib/types'

const svgBase = {
  width: 700,
  height: 346,
}

export const MapSvg = ({ ...props }: tMapSVGProps) => {
  return (
    <motion.svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      id='worldMap'
      xmlLang='en'
      x={svgBase.width}
      y={svgBase.height}
      enableBackground={`new ${svgBase.width} ${svgBase.height}`}
      style={{
        touchAction: 'none',
      }}
      initial={{ opacity: 1 }}
      viewBox='25 100 700 346'
      className={cn(
        'absolute top-0 left-0 h-screen w-auto lg:relative lg:h-auto lg:max-h-screen lg:w-full lg:max-w-screen',
        props.className
      )}
      strokeWidth={0.5}
      version='1.1'>
      {props.children}
    </motion.svg>
  )
}

export const MapPathEl = ({ ...props }: tMapPathElProps) => {
  const { svgPath, name, abbr, className, ...rest } = props as {
    svgPath: string | null
    name: string
    abbr: string
    className?: string
  }

  const classes = cn(
    'stroke-0.5 stroke-background focus:outline-none dark:stroke-neutral-800',
    className
  )

  return (
    <>
      <path
        {...rest}
        d={svgPath!}
        aria-label={name}
        className={cn(classes)}
        id={abbr}
        data-country={name}
        data-abb={abbr}
      />
    </>
  )
}
