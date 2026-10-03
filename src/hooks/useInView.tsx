import { useEffect, useEffectEvent, useRef, useState } from 'react'

type Options = IntersectionObserverInit & {
  queryDomSelector?: string
  queryDomSelectorFn?: (node: Element | null) => HTMLElement | null
}

const DATA_SLOTS = '[data-slot="section"],[data-slot="subsection"]'

export const useScrollProgress = (options: Options = {}) => {
  const [activeSections, setActiveSections] = useState<Element[]>([])
  const [progress, setProgress] = useState<number>(0)
  const docRef = useRef<HTMLElement>(null)

  const parseProgress = useEffectEvent(() => {
    const container = docRef.current
    if (!container) return

    const { top: containerTop, height: containerHeight } = container.getBoundingClientRect()

    setProgress(
      Math.min(
        Math.max(
          ((window.scrollY + window.innerHeight - (containerTop + window.scrollY))
            / containerHeight)
            * 100,
          0
        ),
        100
      )
    )
  })

  const handleObserver = useEffectEvent((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !activeSections.includes(entry.target)) {
        setActiveSections([...activeSections, entry.target])
      }
      if (activeSections.includes(entry.target) && !entry.isIntersecting) {
        setActiveSections([...activeSections.filter((section) => section != entry.target)])
      }
    })
  })

  useEffect(() => {
    if (options.queryDomSelector && window) {
      docRef.current = window.document.querySelector(options.queryDomSelector)
    }
  }, [options])

  useEffect(() => {
    window.addEventListener('scroll', parseProgress)
    window.addEventListener('resize', parseProgress)
    parseProgress()

    const sections = docRef?.current?.querySelectorAll(DATA_SLOTS)
    if (!sections) return

    const observer = new IntersectionObserver(handleObserver, options)
    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      el && observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', parseProgress)
      window.removeEventListener('resize', parseProgress)
      observer.disconnect()
    }
  }, [])

  return {
    docRef,
    activeSections,
    progress,
  }
}
