'use client'

import type { SubmittedContentRes } from '@/_components/views/Dashboard'
import { Table, TableCell, TableHead } from '@/_components/views/Dashboard/_components/Table'
import { Pill } from '@/components/Admin/Pill'
import { cn } from '@/lib/cn'
import { useState } from 'react'

const ContentTypePill = ({ type }: { type: string }) => {
  return (
    <Pill
      statusOpts={{
        hub: 'blue',
      }}
      status={type}
    />
  )
}

const Row = (data: SubmittedContentRes) => {
  const [cb, setCb] = useState(false)
  return (
    <tr key={data.id}>
      <TableCell
        label={'Edit'}
        type='checkbox'
        checked={cb}
        onToggle={() => setCb((prev) => !prev)}
      />
      <TableCell
        accessAllowed
        type='link'
        href={`/admin/collections/content/${data.id}`}
        target='_self'>
        {data.title} <span className='font-mono text-xs'>[/{data.route?.docs[0].url}]</span>
      </TableCell>
      <TableCell>
        <ContentTypePill type={data.contentType} />
      </TableCell>
      <TableCell
        type='date'
        date={data.currentLifecycle?.changed?.at ?? ''}
      />
      <TableCell>
        {
          // TODO: AUTHOR STRING HOOK
          data.authorString ?? (
            <span className='text-sx block w-full text-center opacity-50'>-</span>
          )
        }
      </TableCell>
    </tr>
  )
}

export const SubmittedContent = ({
  submittedContent,
}: {
  submittedContent: SubmittedContentRes[]
}) => {
  return (
    <section className='mb-8 flex w-full flex-col gap-2'>
      <h2>Submitted Content Pages</h2>
      {submittedContent.length > 0 ?
        <div className='border-slate-150 rounded-2xl border bg-card px-2 outline-5 -outline-offset-6 outline-card'>
          <div className='overflow-auto'>
            <div
              className={cn(
                'dashboard table mb-0! w-full border-0! bg-transparent! px-0! shadow-none!'
              )}>
              <Table>
                <TableHead>
                  <th scope='col'></th>
                  <th scope='col'>Title</th>
                  <th
                    scope='col'
                    className='text-center'>
                    Type
                  </th>
                  <th>Last Updated</th>
                  <th>Author(s)</th>
                </TableHead>
                <tbody>
                  {submittedContent.map((ea) => (
                    <Row
                      key={ea.id}
                      {...ea}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      : <h3 className='px-4 font-[350]! text-accent/50'>No Data Available</h3>}
    </section>
  )
}
