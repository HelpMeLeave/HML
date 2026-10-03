'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import './style.scss'

export const NoCreateCountdown = ({ url }: { url: string }) => {
  const [value, setValue] = useState(4)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (value > 0) setValue((prev) => prev - 1)
    }, 1000)
    if (value == 0) {
      return router.push(url)
    }
  }, [value])

  return <span className='countdown'>{String(value)}</span>
}
