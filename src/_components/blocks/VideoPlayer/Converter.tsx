import type { BlockConverterProps } from '@/_components/blocks/_types'
import { VideoPlayerComponent } from '@/_components/blocks/VideoPlayer/Component'
import type { VideoPlayerBlock } from '@/payload-types'

export const VideoPlayerConverter = ({ node }: BlockConverterProps<VideoPlayerBlock>) => (
  <VideoPlayerComponent {...node.fields} />
)
