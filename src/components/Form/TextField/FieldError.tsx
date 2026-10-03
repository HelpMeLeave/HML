export const FieldError = ({ error }: { error?: string | string[] }) => {
  if (error) {
    const groupedError = (typeof error == 'string' ? [error] : error)
      .map((ea) => ea.trim())
      .filter((e) => e && e != '')

    return (
      groupedError.length > 0 && (
        <span className='flex basis-full! gap-x-2 px-2 font-mono text-[0.7rem] leading-normal text-red-500 uppercase italic dark:text-red-400'>
          <b>Error:</b>{' '}
          <span className='block text-balance'>
            {typeof error == 'string' ? error : error.join(', ')}
          </span>
        </span>
      )
    )
  }
  return <></>
}
