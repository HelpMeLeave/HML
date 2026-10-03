import type { UIFieldServerProps } from 'payload'
import { UploadFieldClient } from './UploadField.client'

const UploadFieldServer = async ({ id }: UIFieldServerProps) => {
  return !id && <UploadFieldClient />
}

export default UploadFieldServer
