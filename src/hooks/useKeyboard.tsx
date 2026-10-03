import { useEffect } from 'react'

export const useKeyboard = ({
  key,
  onKeyPress,
}: {
  key: KeyboardEvent['key']
  onKeyPress: () => void
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key == key && onKeyPress()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
