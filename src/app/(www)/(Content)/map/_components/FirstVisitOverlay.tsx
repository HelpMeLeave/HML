import { cn } from '@/lib/cn'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

export const FirstVisitOverlay = ({ draggingFirst }: { draggingFirst: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 1, display: 'flex' }}
      animate={{
        opacity: 0,
        display: 'none',
        transition: { delay: 3 },
      }}
      className={cn(
        draggingFirst ? 'cursor-grabbing' : 'cursor-grab',
        'bg-background/45',
        'absolute top-0 right-0 bottom-0 left-0 z-100 flex items-center justify-center text-4xl font-bold uppercase'
      )}>
      <motion.span
        className='flex max-w-screen items-center justify-around gap-2'
        initial={{
          translateX: 0,
        }}
        animate={{
          translateX: [0, -100, 0, 100, 0, 0],
          opacity: [1, 0.5, 1, 0.5, 1, 0],
          transition: {
            delay: 0.5,
            duration: 2,
          },
        }}>
        <ArrowRight className='h-full w-auto origin-left scale-300 rotate-180' />
        <span className='block w-2/3 text-center'>Drag to move the map</span>
        <ArrowRight className='origin-left scale-300' />
      </motion.span>
    </motion.div>
  )
}
