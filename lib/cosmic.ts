import { createBucketClient } from '@cosmicjs/sdk'
import {
  GlossaryTerm,
  ISLVideo,
  QuizQuestion,
  UserPreference,
  CaptionTemplate,
  SoundEvent,
  CreateGlossaryTermData,
  CreateISLVideoData,
  CreateQuizQuestionData,
  CreateUserPreferenceData,
  SimplificationLevel,
  DifficultyLevel,
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Glossary Terms
export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'glossary-terms' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as GlossaryTerm[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch glossary terms');
  }
}

export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'glossary-terms',
      slug
    }).depth(1);
    
    const term = response.object as GlossaryTerm;
    
    if (!term || !term.metadata) {
      return null;
    }
    
    return term;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch glossary term');
  }
}

export async function searchGlossaryTerms(query: string): Promise<GlossaryTerm[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'glossary-terms',
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const terms = response.objects as GlossaryTerm[];
    
    // Filter terms that match the query
    return terms.filter(term => 
      term.title.toLowerCase().includes(query.toLowerCase()) ||
      term.metadata?.definition?.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to search glossary terms');
  }
}

export async function createGlossaryTerm(data: CreateGlossaryTermData): Promise<GlossaryTerm> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'glossary-terms',
      title: data.title,
      metadata: {
        definition: data.metadata.definition,
        example_sentence: data.metadata.example_sentence || "",
        difficulty_level: data.metadata.difficulty_level || "beginner",
        category: data.metadata.category || "",
        pronunciation: data.metadata.pronunciation || "",
        synonyms: data.metadata.synonyms || [],
      }
    });
    
    return response.object as GlossaryTerm;
  } catch (error) {
    console.error('Error creating glossary term:', error);
    throw new Error('Failed to create glossary term');
  }
}

// ISL Videos
export async function getISLVideos(): Promise<ISLVideo[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'isl-videos' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as ISLVideo[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch ISL videos');
  }
}

export async function getISLVideoBySlug(slug: string): Promise<ISLVideo | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'isl-videos',
      slug
    }).depth(1);
    
    const video = response.object as ISLVideo;
    
    if (!video || !video.metadata) {
      return null;
    }
    
    return video;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch ISL video');
  }
}

export async function createISLVideo(data: CreateISLVideoData): Promise<ISLVideo> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'isl-videos',
      title: data.title,
      metadata: {
        video_file: data.metadata.video_file,
        duration: data.metadata.duration || 0,
        keyword: data.metadata.keyword || "",
        description: data.metadata.description || "",
        difficulty_level: data.metadata.difficulty_level || "beginner",
      }
    });
    
    return response.object as ISLVideo;
  } catch (error) {
    console.error('Error creating ISL video:', error);
    throw new Error('Failed to create ISL video');
  }
}

// Quiz Questions
export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'quiz-questions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as QuizQuestion[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch quiz questions');
  }
}

export async function getQuizQuestionsByDifficulty(difficulty: DifficultyLevel): Promise<QuizQuestion[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'quiz-questions' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const questions = response.objects as QuizQuestion[];
    
    return questions.filter(q => q.metadata?.difficulty_level === difficulty);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch quiz questions');
  }
}

export async function createQuizQuestion(data: CreateQuizQuestionData): Promise<QuizQuestion> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'quiz-questions',
      title: data.title,
      metadata: {
        question_text: data.metadata.question_text,
        correct_answer: data.metadata.correct_answer,
        incorrect_answers: data.metadata.incorrect_answers || [],
        explanation: data.metadata.explanation || "",
        difficulty_level: data.metadata.difficulty_level || "beginner",
        points: data.metadata.points || 10,
      }
    });
    
    return response.object as QuizQuestion;
  } catch (error) {
    console.error('Error creating quiz question:', error);
    throw new Error('Failed to create quiz question');
  }
}

// User Preferences
export async function getUserPreferences(): Promise<UserPreference[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-preferences' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as UserPreference[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch user preferences');
  }
}

export async function createUserPreferences(data: CreateUserPreferenceData): Promise<UserPreference> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'user-preferences',
      title: data.title,
      metadata: {
        simplification_level: data.metadata.simplification_level,
        font_size: data.metadata.font_size,
        caption_speed: data.metadata.caption_speed,
        show_speaker_colors: data.metadata.show_speaker_colors,
        show_sound_events: data.metadata.show_sound_events,
        show_emojis: data.metadata.show_emojis,
        theme: data.metadata.theme,
        glossary_notifications: data.metadata.glossary_notifications,
        custom_colors: data.metadata.custom_colors || [],
      }
    });
    
    return response.object as UserPreference;
  } catch (error) {
    console.error('Error creating user preferences:', error);
    throw new Error('Failed to create user preferences');
  }
}

export async function updateUserPreferences(id: string, metadata: Partial<UserPreference['metadata']>): Promise<UserPreference> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata
    });
    
    return response.object as UserPreference;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw new Error('Failed to update user preferences');
  }
}

// Caption Templates
export async function getCaptionTemplates(): Promise<CaptionTemplate[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'caption-templates' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as CaptionTemplate[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch caption templates');
  }
}

export async function getCaptionTemplateByLevel(level: SimplificationLevel): Promise<CaptionTemplate | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'caption-templates' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const templates = response.objects as CaptionTemplate[];
    
    const template = templates.find(t => t.metadata?.simplification_level === level);
    
    return template || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch caption template');
  }
}

// Sound Events
export async function getSoundEvents(): Promise<SoundEvent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'sound-events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as SoundEvent[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch sound events');
  }
}