import type { Operation } from 'payload'

type UploadStatus = 'uploading' | 'failed' | 'idle' | undefined

export const formIsUploading = (uploadStatus: UploadStatus) => uploadStatus === 'uploading'

export const isDisabled = ({
  operation,
  uploadStatus,
  isModified,
}: {
  operation: Operation | undefined
  uploadStatus: UploadStatus
  isModified: boolean
}) => {
  if (operation && ['update', 'create'].includes(operation.toString())) {
    return !isModified
  }
  if (!formIsUploading(uploadStatus)) {
    return false
  }
  return true
}

export const createBtnHotkey = ({
  keys,
  withCtrl,
  depth,
  disabled,
}: {
  keys: string[]
  withCtrl: boolean
  depth: number
  disabled: boolean
}) => {
  return {
    config: {
      cmdCtrlKey: withCtrl,
      keyCodes: keys,
      editDepth: depth,
    },
    fn: (e: KeyboardEvent, ref: RefObject<HTMLButtonElement | null>) => {
      if (disabled) {
        //  move along
      } else {
        e.preventDefault()
        e.stopPropagation()
        if (ref?.current) {
          ref.current.click()
        }
      }
    },
  }
}
