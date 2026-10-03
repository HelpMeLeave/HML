'use client'

// Static import put Component.tsx in the shared blocks/converter graph, so every (Content) page shipped Payload's ConfirmationModal SCSS (btn/drawer/popup/toast, ~17KB) plus react-signature-canvas.
// dynamic() moves both into their own chunk, fetched only when a signature block actually renders. It has to live here: Converter.tsx is a Server Component, and Next does not code-split a Client Component dynamically imported from one.
// ssr: false because react-signature-canvas needs a real DOM anyway.
import type { SignatureData } from '@/_components/blocks/Signature/types'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'

const SignatureBlockComponent = dynamic(
  () => import('@/_components/blocks/Signature/Component').then((m) => m.SignatureBlockComponent),
  { ssr: false }
)

export const SignatureRender = () => {
  const [signature, setSignature] = useState<SignatureData>({
    url: '',
    points: [],
  })
  const handleSetData = (data: SignatureData['url'] | SignatureData['points']) =>
    typeof data == 'string' ?
      setSignature({ ...signature, url: data })
    : setSignature({ ...signature, points: data })

  return (
    <Fragment>
      <SignatureBlockComponent
        data={signature}
        setDataAction={handleSetData}
      />
      <input
        type='hidden'
        value={signature.url}
        id='field-signature'
      />
    </Fragment>
  )
}
