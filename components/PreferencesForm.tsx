'use client'

import { useState } from 'react'
import { UserPreference, SimplificationLevel, Theme } from '@/types'
import { createUserPreferences, updateUserPreferences } from '@/lib/cosmic'

interface PreferencesFormProps {
  currentPreference: UserPreference | null;
}

export default function PreferencesForm({ currentPreference }: PreferencesFormProps) {
  const [simplificationLevel, setSimplificationLevel] = useState<SimplificationLevel>(
    currentPreference?.metadata?.simplification_level || 'medium'
  )
  const [fontSize, setFontSize] = useState(
    currentPreference?.metadata?.font_size || 18
  )
  const [captionSpeed, setCaptionSpeed] = useState(
    currentPreference?.metadata?.caption_speed || 1
  )
  const [showSpeakerColors, setShowSpeakerColors] = useState(
    currentPreference?.metadata?.show_speaker_colors ?? true
  )
  const [showSoundEvents, setShowSoundEvents] = useState(
    currentPreference?.metadata?.show_sound_events ?? true
  )
  const [showEmojis, setShowEmojis] = useState(
    currentPreference?.metadata?.show_emojis ?? true
  )
  const [theme, setTheme] = useState<Theme>(
    currentPreference?.metadata?.theme || 'light'
  )
  const [glossaryNotifications, setGlossaryNotifications] = useState(
    currentPreference?.metadata?.glossary_notifications ?? true
  )
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      const metadata = {
        simplification_level: simplificationLevel,
        font_size: fontSize,
        caption_speed: captionSpeed,
        show_speaker_colors: showSpeakerColors,
        show_sound_events: showSoundEvents,
        show_emojis: showEmojis,
        theme: theme,
        glossary_notifications: glossaryNotifications,
      }

      if (currentPreference) {
        await updateUserPreferences(currentPreference.id, metadata)
        setSaveMessage('✅ Preferences updated successfully!')
      } else {
        await createUserPreferences({
          title: 'User Preferences',
          metadata,
        })
        setSaveMessage('✅ Preferences created successfully!')
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
      setSaveMessage('❌ Failed to save preferences. Please try again.')
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  return (
    <div className="card">
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
          <p className="text-sm text-gray-600 mt-2">
            {simplificationLevel === 'easy' && 'Simplified language with shorter sentences'}
            {simplificationLevel === 'medium' && 'Balanced complexity for general understanding'}
            {simplificationLevel === 'verbatim' && 'Exact transcription of all spoken words'}
          </p>
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

        {/* Toggle Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showSpeakerColors}
              onChange={(e) => setShowSpeakerColors(e.target.checked)}
              className="w-5 h-5 text-primary"
            />
            <div>
              <div className="text-sm font-medium">Show Speaker Colors</div>
              <div className="text-xs text-gray-600">
                Display different colors for each speaker
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showSoundEvents}
              onChange={(e) => setShowSoundEvents(e.target.checked)}
              className="w-5 h-5 text-primary"
            />
            <div>
              <div className="text-sm font-medium">Show Sound Events</div>
              <div className="text-xs text-gray-600">
                Display visual indicators for background sounds
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showEmojis}
              onChange={(e) => setShowEmojis(e.target.checked)}
              className="w-5 h-5 text-primary"
            />
            <div>
              <div className="text-sm font-medium">Show Emojis</div>
              <div className="text-xs text-gray-600">
                Add emojis to enhance caption meaning
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={glossaryNotifications}
              onChange={(e) => setGlossaryNotifications(e.target.checked)}
              className="w-5 h-5 text-primary"
            />
            <div>
              <div className="text-sm font-medium">Glossary Notifications</div>
              <div className="text-xs text-gray-600">
                Highlight unfamiliar words with glossary links
              </div>
            </div>
          </label>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? '💾 Saving...' : '💾 Save Preferences'}
          </button>
          {saveMessage && (
            <p className="mt-3 text-center text-sm font-medium">
              {saveMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}