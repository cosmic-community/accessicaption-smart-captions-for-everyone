// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Simplification levels
export type SimplificationLevel = 'easy' | 'medium' | 'verbatim';

// Theme options
export type Theme = 'light' | 'dark' | 'high-contrast';

// Difficulty levels
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// Speaker colors (up to 8 speakers)
export const SPEAKER_COLORS = [
  '#2563eb', // blue
  '#dc2626', // red
  '#16a34a', // green
  '#9333ea', // purple
  '#ea580c', // orange
  '#0891b2', // cyan
  '#c026d3', // pink
  '#65a30d', // lime
] as const;

// Glossary Term interface
export interface GlossaryTerm extends CosmicObject {
  type: 'glossary-terms';
  metadata: {
    definition: string;
    example_sentence?: string;
    difficulty_level?: DifficultyLevel;
    category?: string;
    isl_video?: ISLVideo;
    visual_aid?: {
      url: string;
      imgix_url: string;
    };
    pronunciation?: string;
    synonyms?: string[];
    related_terms?: GlossaryTerm[];
  };
}

// ISL Video interface
export interface ISLVideo extends CosmicObject {
  type: 'isl-videos';
  metadata: {
    video_file: {
      url: string;
    };
    duration?: number;
    keyword?: string;
    description?: string;
    thumbnail?: {
      url: string;
      imgix_url: string;
    };
    difficulty_level?: DifficultyLevel;
  };
}

// Quiz Question interface
export interface QuizQuestion extends CosmicObject {
  type: 'quiz-questions';
  metadata: {
    question_text: string;
    correct_answer: string;
    incorrect_answers: string[];
    explanation?: string;
    difficulty_level?: DifficultyLevel;
    related_term?: GlossaryTerm;
    points?: number;
  };
}

// User Preference interface
export interface UserPreference extends CosmicObject {
  type: 'user-preferences';
  metadata: {
    simplification_level: SimplificationLevel;
    font_size: number;
    caption_speed: number;
    show_speaker_colors: boolean;
    show_sound_events: boolean;
    show_emojis: boolean;
    theme: Theme;
    glossary_notifications: boolean;
    custom_colors?: string[];
  };
}

// Caption Template interface
export interface CaptionTemplate extends CosmicObject {
  type: 'caption-templates';
  metadata: {
    template_name: string;
    simplification_level: SimplificationLevel;
    font_size: number;
    line_height: number;
    max_words_per_line: number;
    background_opacity: number;
    text_color?: string;
    background_color?: string;
  };
}

// Sound Event interface
export interface SoundEvent extends CosmicObject {
  type: 'sound-events';
  metadata: {
    event_name: string;
    icon_emoji?: string;
    description: string;
    color?: string;
    visual_representation?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Caption data for real-time display
export interface Caption {
  id: string;
  text: string;
  speaker_id?: number;
  timestamp: number;
  volume?: 'quiet' | 'normal' | 'loud';
  emotion?: 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised';
  pace?: 'slow' | 'normal' | 'fast';
  emphasis?: boolean;
  sound_event?: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isGlossaryTerm(obj: CosmicObject): obj is GlossaryTerm {
  return obj.type === 'glossary-terms';
}

export function isISLVideo(obj: CosmicObject): obj is ISLVideo {
  return obj.type === 'isl-videos';
}

export function isQuizQuestion(obj: CosmicObject): obj is QuizQuestion {
  return obj.type === 'quiz-questions';
}

export function isUserPreference(obj: CosmicObject): obj is UserPreference {
  return obj.type === 'user-preferences';
}

// Create types for form submissions
export type CreateGlossaryTermData = Omit<GlossaryTerm, 'id' | 'created_at' | 'modified_at' | 'slug' | 'type'>;
export type CreateISLVideoData = Omit<ISLVideo, 'id' | 'created_at' | 'modified_at' | 'slug' | 'type'>;
export type CreateQuizQuestionData = Omit<QuizQuestion, 'id' | 'created_at' | 'modified_at' | 'slug' | 'type'>;
export type CreateUserPreferenceData = Omit<UserPreference, 'id' | 'created_at' | 'modified_at' | 'slug' | 'type'>;