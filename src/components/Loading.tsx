'use client'

import { Plane } from 'lucide-react'
import { motion } from 'motion/react'

export const Loading = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <motion.div
        className='flex h-12 w-12 items-center justify-center rounded-full bg-background/10'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
        <Plane className='h-6 w-6 text-foreground' />
      </motion.div>
    </div>
  )
}
