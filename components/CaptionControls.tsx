'use client'

import { useState } from 'react'
import { SimplificationLevel, Theme } from '@/types'

export default function CaptionControls() {
  const [simplificationLevel, setSimplificationLevel] = useState<SimplificationLevel>('medium')
  const [fontSize, setFontSize] = useState(18)
  const [captionSpeed, setCaptionSpeed] = useState(1)
  const [showSpeakerColors, setShowSpeakerColors] = useState(true)
  const [showSoundEvents, setShowSoundEvents] = useState(true)
  const [showEmojis, setShowEmojis] = useState(true)
  const [theme, setTheme] = useState<Theme>('light')

  return (
    <div className="space-y-6">
      {/* Simplification Level */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Simplification Level
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setSimplificationLevel('easy')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              simplificationLevel === 'easy'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Easy
          </button>
          <button
            onClick={() => setSimplificationLevel('medium')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              simplificationLevel === 'medium'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setSimplificationLevel('verbatim')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              simplificationLevel === 'verbatim'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Verbatim
          </button>
        </div>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="14"
          max="32"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Caption Speed */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Caption Speed: {captionSpeed}x
        </label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={captionSpeed}
          onChange={(e) => setCaptionSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Toggle Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showSpeakerColors}
            onChange={(e) => setShowSpeakerColors(e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span className="text-sm font-medium">Show Speaker Colors</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showSoundEvents}
            onChange={(e) => setShowSoundEvents(e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span className="text-sm font-medium">Show Sound Events</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showEmojis}
            onChange={(e) => setShowEmojis(e.target.checked)}
            className="w-5 h-5 text-primary"
          />
          <span className="text-sm font-medium">Show Emojis</span>
        </label>
      </div>

      {/* Theme */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Theme
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'light'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'dark'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => setTheme('high-contrast')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              theme === 'high-contrast'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            High Contrast
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4">
        <button className="btn-primary w-full">
          💾 Save Preferences
        </button>
      </div>
    </div>
  )
}