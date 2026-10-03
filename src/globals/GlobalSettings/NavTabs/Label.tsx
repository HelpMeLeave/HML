'use client'

import { toTitleCase } from '@/lib/textCasing'
import { useRowLabel } from '@payloadcms/ui'
import type { BlocksFieldLabelClientComponent } from 'payload'

export const StaticLabel: BlocksFieldLabelClientComponent = () => {
  const { data } = useRowLabel<{ displayText: string; blockType: string }>()
  return (
    <>
      <div className='pill pill--style-white pill--size-small blocks-field__block-pill items-center'>
        <span className='pill__label tracking-[-0.5px]'>
          {toTitleCase(data.blockType?.split('-').slice(1).join(' '))}
        </span>
      </div>
      <div className='section-title items-center font-body text-xs font-semibold tracking-normal text-nowrap text-(--theme-elevation-800)'>
        {(data?.displayText as string) ?? ''}{' '}
      </div>
    </>
  )
}

// global-settings._index-0.navigation._index-0.footer
