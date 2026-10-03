import { Suspense } from 'react'
import ReactPlayer from 'react-player'

export const VideoPlayerComponent = ({
  url,
  title,
  description,
  publishedDate,
  clip,
}: {
  url: string
  title: string
  description?: string | null
  publishedDate?: string | null
  clip?: {
    enableClip?: boolean | null
    startTime?: { minutes: number; seconds: number }
    endTime?: { minutes: number; seconds: number }
  } | null
}) => {
  const useClipTimes =
    clip?.enableClip ?
      {
        start: (clip.startTime?.minutes ?? 0) * 60 + (clip.startTime?.seconds ?? 0),
        end: (clip.endTime?.minutes ?? 0) * 60 + (clip.endTime?.seconds ?? 0),
      }
    : {}

  const parseDate = () => new Date(publishedDate || '')

  return (
    <span>
      <Suspense fallback={<div>Loading video...</div>}>
        <ReactPlayer
          src={url}
          title={title}
          autoPlay={false}
          {...useClipTimes}
          width={'100%'}
          height={'auto'}
          className='aspect-320/180'
        />
      </Suspense>
      {description && <p className='text-xs italic'>{description}</p>}
      {publishedDate && <p className='text-xs italic'>{parseDate().toDateString()}</p>}
    </span>
  )
}
