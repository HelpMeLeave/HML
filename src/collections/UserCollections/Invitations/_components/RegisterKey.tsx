'use client'

import { TextField } from '@/components/Form'
import { env } from '@/env'
import { useField } from '@payloadcms/ui'
import { Copy } from 'lucide-react'

const TokenCopyField = () => {
  const { value: token } = useField({ path: 'token' })

  const val = `${env.NEXT_PUBLIC_BASE_URL}/admin/register?token=${token}`
  return (
    token && (
      <div
        onClick={async () => {
          await navigator.clipboard.writeText(val)
        }}>
        <TextField
          Label={'Registration Link'}

          value={val}
          onClick={async () => {
            await navigator.clipboard.writeText(val)
          }}
          onChange={() => {}}
          Icon={Copy}
        />
      </div>
    )
  )
}

export default TokenCopyField
