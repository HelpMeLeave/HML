import React from 'react'

import RenderRichText from '@/_components/lexicals/RenderRichText'
import { cn } from '@/lib/cn'
import type { ColumnsBlock } from '@/payload-types'

export const ColumnsComponent: React.FC<ColumnsBlock> = (props) => {
  const { size } = props

  const cols = props[size as keyof ColumnsBlock]

  return (
    <div className='container'>
      <div className='grid grid-cols-4 gap-x-16 lg:grid-cols-12 lg:gap-x-8'>
        {cols
          && Object.values(cols).length > 0
          && Object.values(cols).map((col, index) => {
            return (
              <div
                key={index}
                className={cn(
                  size == 'half'
                    && (index == 0 ?
                      'col-start-1 col-end-3 row-start-1 sm:col-end-7'
                    : 'col-start-3 col-end-5 row-start-1 sm:col-start-7 sm:col-end-13'),
                  size == 'oneThirdTwoThirds' && (index == 1 ? 'col-span-4' : 'col-span-8'),
                  size == 'twoThirdsOneThird' && (index == 1 ? 'col-span-8' : 'col-span-4'),
                  size == 'third' && 'col-span-4'
                )}>
                {col && (
                  <RenderRichText
                    data={col}
                    enableGutter={false}
                  />
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
