import { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { PortalCTX } from 'www/_providers/CTX'

export type TogglePortalProps = 'open' | 'closed' | undefined
export type TogglePortalFn = (status?: TogglePortalProps) => void

export const usePortal = () => {
  const { portal } = useContext(PortalCTX)
  const [show, setShow] = useState(false)

  const Portal = ({ slug, children }: Props & { slug: string }) => {
    return portal?.current && show && createPortal(children, portal.current, slug)
  }

  return {
    Portal,
    showPortal: show,
    togglePortal: (status?: TogglePortalProps) =>
      setShow(status ? status == 'open' : (prev) => !prev),
    portalRef: portal,
  }
}
