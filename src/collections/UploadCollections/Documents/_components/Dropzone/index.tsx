'use client'
import { cn } from '@/lib/cn'
import type { Document } from '@/payload-types'
import { Button } from '@payloadcms/ui'
import { type MouseEvent, useRef, useState } from 'react'

type Props = {
  filename: string | null
  onUploadCompleteAction?: (result: { id: number }) => void
  onFileSelectedAction?: (name: string | null) => void
  pendingFilename?: string
  children?: React.ReactNode
}

export const Dropzone = ({
  filename,
  onUploadCompleteAction,
  onFileSelectedAction,
  pendingFilename,
  children,
}: Props) => {
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0]
    if (!f) return
    setFile(f)
    onFileSelectedAction?.(f.name)
  }

  const handleUpload = async () => {
    if (!file || uploading) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', new File([file], pendingFilename ?? file.name, { type: file.type }))
      formData.append('_payload', JSON.stringify({ title: pendingFilename ?? file.name }))
      const res = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      onUploadCompleteAction?.({ id: data.doc.id })
    } finally {
      setUploading(false)
    }
  }

  const buttonLabel =
    uploading ? 'Uploading...'
    : file ? 'Upload'
    : 'Choose a File'

  return (
    <div
      className={cn(
        'flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl',
        dragging && 'border-slate-500'
      )}
      onClick={(e) => {
        const target = (e as MouseEvent<HTMLElement>).target as HTMLElement
        if (!file || (target.id != 'children' && !target.closest('#children'))) {
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}>
      <input
        ref={inputRef}
        type='file'
        accept='application/pdf'
        className='hidden'
        onChange={(e) => handleFiles(e.target.files)}
        onClick={(e) => e.stopPropagation()}
      />
      <span className='text-xs font-semibold tracking-[0.015ch] text-slate-500 uppercase'>
        {file ?
          <span className='tracking-normal text-foreground'>{filename}</span>
        : <>Drop a PDF or click to browse</>}
      </span>
      <span className='mt-1 text-xs tracking-widest text-slate-400 uppercase'>PDF</span>
      {file && (
        <span
          id='children'
          className='next:w-full block w-full'>
          {children}
        </span>
      )}
      <Button
        buttonStyle='primary'
        size='medium'
        className='mb-0!'
        onClick={(e) => {
          e.stopPropagation()
          file ? handleUpload() : inputRef.current?.click()
        }}
        disabled={uploading}>
        {buttonLabel}
      </Button>
    </div>
  )
}

export const PDFPreview = ({
  fileName,
  doc,
}: {
  fileName?: string
  doc?: Document
  url?: string
}) => {
  if (doc) {
    return <></>
  }
  return (
    <span className='flex aspect-8.5/11 h-full max-h-60 min-h-52 w-full flex-col items-center gap-y-1 rounded-sm bg-slate-200 p-3'>
      <span className='overflow-hidden text-[0.35rem] leading-3 opacity-50'>
        Anim fugiat anim labore dolore aliqua do consectetur duis amet dolore. Ut do commodo Lorem
        id. Aliquip deserunt elit officia dolore sunt cupidatat adipisicing dolor occaecat velit
        dolore proident do. Lorem veniam aute aliqua adipisicing sit consequat culpa officia.
        Deserunt ad non eiusmod laborum voluptate Lorem incididunt duis nisi qui. Nostrud veniam
        reprehenderit qui nulla consectetur cupidatat laborum sunt do duis. Enim sint officia esse
        anim fugiat sunt. Proident pariatur ad nulla dolor ullamco irure minim reprehenderit anim
        deserunt id. Dolor est pariatur voluptate ad dolore quis id nostrud qui ut eiusmod nisi quis
        aliqua incididunt. Duis pariatur ipsum esse reprehenderit qui ipsum ipsum qui ullamco non
        anim velit. Exercitation aliquip duis est amet est voluptate veniam Lorem dolor
        reprehenderit laboris. Aliqua excepteur Lorem pariatur fugiat ut enim dolor ex fugiat sint
        sunt velit nulla ipsum reprehenderit. Deserunt irure irure ut irure amet nostrud minim. Ad
        occaecat minim commodo officia ea enim proident adipisicing do consectetur reprehenderit
        exercitation ea consectetur cupidatat.
      </span>
      <span className='mt-auto w-full overflow-hidden text-center font-mono text-xs text-ellipsis whitespace-nowrap text-accent'>
        {fileName}
      </span>
    </span>
  )
}
