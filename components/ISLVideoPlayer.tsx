import { ISLVideo } from '@/types'

interface ISLVideoPlayerProps {
  video: ISLVideo;
}

export default function ISLVideoPlayer({ video }: ISLVideoPlayerProps) {
  if (!video || !video.metadata?.video_file) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        <video
          controls
          className="w-full h-full"
          poster={video.metadata.thumbnail?.imgix_url ? `${video.metadata.thumbnail.imgix_url}?w=1200&h=675&fit=crop&auto=format,compress` : undefined}
        >
          <source src={video.metadata.video_file.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {video.metadata?.description && (
        <p className="text-sm text-gray-600">
          {video.metadata.description}
        </p>
      )}

      {video.metadata?.duration && (
        <p className="text-xs text-gray-500">
          Duration: {Math.floor(video.metadata.duration / 60)}:{(video.metadata.duration % 60).toString().padStart(2, '0')}
        </p>
      )}
    </div>
  )
}