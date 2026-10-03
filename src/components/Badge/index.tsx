import { cn } from '@/lib/cn'

const theme = {
  red: {
    text: 'text-red-700 dark:text-red-400',
    wrapper:
      'bg-red-500/15 group-data-hover:bg-red-500/25 dark:bg-red-500/10 dark:group-data-hover:bg-red-500/20',
  },
  orange: {
    text: 'text-orange-700 dark:text-orange-400',
    wrapper:
      'bg-orange-500/15 group-data-hover:bg-orange-500/25 dark:bg-orange-500/10 dark:group-data-hover:bg-orange-500/20',
  },
  amber: {
    text: 'text-amber-700 dark:text-amber-400',
    wrapper:
      'bg-amber-400/20 group-data-hover:bg-amber-400/30 dark:bg-amber-400/10 dark:group-data-hover:bg-amber-400/15',
  },
  yellow: {
    text: 'text-yellow-700 dark:text-yellow-300',
    wrapper:
      'bg-yellow-400/20 group-data-hover:bg-yellow-400/30 dark:bg-yellow-400/10 dark:group-data-hover:bg-yellow-400/15',
  },
  lime: {
    text: 'text-lime-700 dark:text-lime-300',
    wrapper:
      'bg-lime-400/20 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:group-data-hover:bg-lime-400/15',
  },
  cyan: {
    text: 'text-cyan-700 dark:text-cyan-300',
    wrapper:
      'bg-cyan-400/20 group-data-hover:bg-cyan-400/30 dark:bg-cyan-400/10 dark:group-data-hover:bg-cyan-400/15',
  },
  fuchsia: {
    text: 'text-fuchsia-700 dark:text-fuchsia-400',
    wrapper:
      'bg-fuchsia-400/15 group-data-hover:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:group-data-hover:bg-fuchsia-400/20',
  },
  emerald: {
    text: 'text-emerald-700 dark:text-emerald-400',
    wrapper:
      'bg-emerald-500/15 group-data-hover:bg-emerald-500/25 dark:bg-emerald-500/10 dark:group-data-hover:bg-emerald-500/20',
  },
  teal: {
    text: 'text-teal-700 dark:text-teal-300',
    wrapper:
      'bg-teal-500/15 group-data-hover:bg-teal-500/25 dark:bg-teal-500/10 dark:group-data-hover:bg-teal-500/20',
  },
  sky: {
    text: 'text-sky-700 dark:text-sky-300',
    wrapper:
      'bg-sky-500/15 group-data-hover:bg-sky-500/25 dark:bg-sky-500/10 dark:group-data-hover:bg-sky-500/20',
  },
  blue: {
    text: 'text-blue-700 dark:text-blue-400',
    wrapper: 'bg-blue-500/15 group-data-hover:bg-blue-500/25 dark:group-data-hover:bg-blue-500/25',
  },
  indigo: {
    text: 'text-indigo-700 dark:text-indigo-400',
    wrapper:
      'bg-indigo-500/15 group-data-hover:bg-indigo-500/25 dark:group-data-hover:bg-indigo-500/20',
  },
  violet: {
    text: 'text-violet-700 dark:text-violet-400',
    wrapper:
      'bg-violet-500/15 group-data-hover:bg-violet-500/25 dark:group-data-hover:bg-violet-500/20',
  },
  purple: {
    text: 'text-purple-700 dark:text-purple-400',
    wrapper:
      'bg-purple-500/15 group-data-hover:bg-purple-500/25 dark:group-data-hover:bg-purple-500/20',
  },
  pink: {
    text: 'text-pink-700 dark:text-pink-400',
    wrapper:
      'bg-pink-400/15 group-data-hover:bg-pink-400/25 dark:bg-pink-400/10 dark:group-data-hover:bg-pink-400/20',
  },
  rose: {
    text: 'text-rose-700 dark:text-rose-400',
    wrapper:
      'bg-rose-400/15 group-data-hover:bg-rose-400/25 dark:bg-rose-400/10 dark:group-data-hover:bg-rose-400/20',
  },
  zinc: {
    text: 'text-zinc-700 dark:text-zinc-400',
    wrapper:
      'bg-zinc-600/10 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:group-data-hover:bg-white/10',
  },
  green: {
    text: 'text-green-700 dark:text-green-400',
    wrapper:
      'bg-green-500/15 group-data-hover:bg-green-500/25 dark:bg-green-500/10 dark:group-data-hover:bg-green-500/20',
  },
}

const displayStyles = {
  default: '',
  secondary: 'saturate-150',
  muted: 'opacity-50 saturate-150',
  outline: 'outline',
}

type BadgeProps = {
  color?: keyof typeof theme
  displayStyle?: keyof typeof displayStyles
}

export const Badge = ({
  color = 'zinc',
  displayStyle = 'default',
  className,
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'span'>) => {
  return (
    <span
      {...props}
      className={cn(
        'relative inline-flex items-center gap-x-1.5 overflow-hidden rounded-md px-1.5 py-px text-[0.65rem]/4 font-medium sm:font-normal forced-colors:outline',
        theme[color].text,
        className
      )}>
      <span
        className={cn(
          'absolute inset-0 h-full w-full',
          theme[color].wrapper,
          displayStyles[displayStyle]
        )}
      />
      {props.children}
    </span>
  )
}
