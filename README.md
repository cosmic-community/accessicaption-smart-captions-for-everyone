# 🎧 AccessiCaption - Smart Captions for Everyone

![AccessiCaption Preview](https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&h=300&fit=crop&auto=format)

A comprehensive, accessible web application that provides smart, personalized captions for videos and live streams, specifically designed for deaf and hard-of-hearing users.

## ✨ Features

- **Adaptive Simplification**: Three levels (Easy, Medium, Verbatim) that dynamically adjust caption complexity
- **Smart Glossary**: Interactive dictionary with visual definitions and ISL video demonstrations
- **Dynamic Text Formatting**: Visual representation of volume, emotion, pace, and emphasis
- **Speaker Identification**: Color-coded text for up to 8 different speakers
- **Sound Event Captions**: Visual indicators for environmental sounds with contextual icons
- **Interactive Mini-Quizzes**: Comprehension checks to test understanding
- **User Personalization**: Extensive customization for captions, UI, and preferences
- **Real-time Updates**: Live caption streaming with WebSocket support
- **WCAG Compliant**: Meets WCAG 2.1 Level AA accessibility standards
- **Cross-Device Responsive**: Optimized for desktop, tablet, and mobile devices

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68e1fbed260d9dd939d1bccb&clone_repository=68e1fe53260d9dd939d1bcd0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a responsive, accessible web app for deaf and hard-of-hearing users that provides smart, personalized captions for videos or live streams. Features: adaptive simplification (Easy, Medium, Verbatim), context-aware text, smart glossary with visuals and ISL clips, dynamic text formatting (volume, emotion, pace, emphasis), emoji/icon augmentation, speaker identification with color-coding, sound event captions, keyword ISL support, and interactive mini-quizzes. Include user personalization, real-time updates, and an intuitive, minimalist UI. Backend should handle speech-to-text, AI simplification, user preferences, and real-time streaming. Ensure WCAG accessibility and cross-device responsiveness."

### Code Generation Prompt

> "Build a responsive, accessible web app for deaf and hard-of-hearing users that provides smart, personalized captions for videos or live streams. Features: adaptive simplification (Easy, Medium, Verbatim), context-aware text, smart glossary with visuals and ISL clips, dynamic text formatting (volume, emotion, pace, emphasis), emoji/icon augmentation, speaker identification with color-coding, sound event captions, keyword ISL support, and interactive mini-quizzes. Include user personalization, real-time updates, and an intuitive, minimalist UI. Backend should handle speech-to-text, AI simplification, user preferences, and real-time streaming. Ensure WCAG accessibility and cross-device responsiveness."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic (Content Management)
- **Package Manager**: Bun
- **Real-time**: WebSocket support for live captions
- **Accessibility**: WCAG 2.1 Level AA compliant

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket
- Environment variables configured

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure your environment variables (see below)

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

This application requires the following environment variables. Cosmic variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY) are automatically configured.

## 📚 Cosmic SDK Examples

### Fetching Glossary Terms

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getGlossaryTerms() {
  try {
    const response = await cosmic.objects
      .find({ type: 'glossary-terms' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as GlossaryTerm[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Fetching ISL Videos

```typescript
export async function getISLVideos() {
  try {
    const response = await cosmic.objects
      .find({ type: 'isl-videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as ISLVideo[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Creating User Preferences

```typescript
export async function createUserPreferences(data: CreateUserPreferenceData) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'user-preferences',
      title: data.title,
      metadata: {
        simplification_level: data.simplification_level,
        font_size: data.font_size,
        caption_speed: data.caption_speed,
        show_speaker_colors: data.show_speaker_colors,
        show_sound_events: data.show_sound_events,
        show_emojis: data.show_emojis,
        theme: data.theme,
        glossary_notifications: data.glossary_notifications
      }
    })
    
    return response.object as UserPreference
  } catch (error) {
    console.error('Error creating user preferences:', error)
    throw new Error('Failed to create user preferences')
  }
}
```

## 🎨 Cosmic CMS Integration

This application uses Cosmic to manage:

- **Glossary Terms**: Words and phrases with definitions, examples, difficulty levels, and ISL video links
- **ISL Videos**: Indian Sign Language demonstration videos with metadata
- **Quiz Questions**: Interactive comprehension questions with answers and explanations
- **User Preferences**: Personalization settings for caption appearance and behavior
- **Caption Templates**: Pre-configured formatting rules for different content types
- **Sound Events**: Library of sound effects with visual representations

The content model includes:
- `glossary-terms` - Comprehensive word definitions with multimedia
- `isl-videos` - Sign language video demonstrations
- `quiz-questions` - Interactive quiz content
- `user-preferences` - User customization settings
- `caption-templates` - Formatting configurations
- `sound-events` - Sound effect definitions

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in Netlify
3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

### Environment Setup

For production deployment, configure these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS](https://tailwindcss.com/docs)

<!-- README_END -->