'use client'

import { useState } from 'react'
import { SPEAKER_COLORS, Caption } from '@/types'

export default function CaptionPlayer() {
  const [captions] = useState<Caption[]>([
    {
      id: '1',
      text: 'Welcome to AccessiCaption!',
      speaker_id: 0,
      timestamp: Date.now(),
      volume: 'normal',
      emotion: 'happy',
      pace: 'normal',
      emphasis: false,
    },
    {
      id: '2',
      text: '🔔 Doorbell rings',
      speaker_id: undefined,
      timestamp: Date.now() + 1000,
      sound_event: 'doorbell',
    },
    {
      id: '3',
      text: 'Hello! Thanks for joining us today.',
      speaker_id: 1,
      timestamp: Date.now() + 2000,
      volume: 'loud',
      emotion: 'happy',
      pace: 'normal',
      emphasis: true,
    },
  ])

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
        {/* Video Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-xl">Video Player Demo</p>
            <p className="text-sm text-gray-400 mt-2">Upload a video or paste a stream URL</p>
          </div>
        </div>

        {/* Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="caption-panel p-4 max-w-4xl mx-auto">
            <div className="space-y-3">
              {captions.map((caption) => {
                const speakerColor = caption.speaker_id !== undefined 
                  ? SPEAKER_COLORS[caption.speaker_id % SPEAKER_COLORS.length]
                  : undefined

                return (
                  <div key={caption.id} className="flex items-start gap-3">
                    {speakerColor && caption.speaker_id !== undefined && (
                      <div 
                        className="speaker-badge flex-shrink-0"
                        style={{ backgroundColor: speakerColor }}
                      >
                        {caption.speaker_id + 1}
                      </div>
                    )}
                    
                    {caption.sound_event ? (
                      <div className="sound-indicator flex-grow">
                        {caption.text}
                      </div>
                    ) : (
                      <p 
                        className={`caption-text flex-grow ${
                          caption.volume === 'quiet' ? 'text-volume-quiet' :
                          caption.volume === 'loud' ? 'text-volume-loud' :
                          'text-volume-normal'
                        } ${
                          caption.emotion === 'happy' ? 'text-emotion-happy' :
                          caption.emotion === 'sad' ? 'text-emotion-sad' :
                          caption.emotion === 'angry' ? 'text-emotion-angry' :
                          caption.emotion === 'surprised' ? 'text-emotion-surprised' :
                          ''
                        } ${
                          caption.emphasis ? 'text-emphasis' : ''
                        }`}
                        style={speakerColor ? { color: speakerColor } : undefined}
                      >
                        {caption.text}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <button className="btn-primary">
          📁 Upload Video
        </button>
        <button className="btn-secondary">
          🔗 Add Stream URL
        </button>
        <div className="flex-grow">
          <input 
            type="text"
            placeholder="Paste video URL or stream URL here..."
            className="input-field"
          />
        </div>
      </div>
    </div>
  )
}