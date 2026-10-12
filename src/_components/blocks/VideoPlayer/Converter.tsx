import { VideoPlayerComponent } from '@/_components/blocks/VideoPlayer/Component'
import type { BlockConverterProps } from '@/lexicals/_types'
import type { VideoPlayerBlock } from '@/payload-types'

export const VideoPlayerConverter = ({ node }: BlockConverterProps<VideoPlayerBlock>) => (
  <VideoPlayerComponent {...node.fields} />
)
