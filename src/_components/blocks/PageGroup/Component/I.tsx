export const I = ({ i }: { i: number }) => {
  return (
    <span className='font-mono text-xs text-grey-600 tabular-nums'>
      {String(i + 1).padStart(2, '0')}
    </span>
  )
}
