export interface User {
  id: string;
  name: string;
  email: string;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  avatarUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  flag: string;
  nativeName: string;
  color: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  type: 'lesson' | 'practice' | 'story' | 'test';
  exercises: Exercise[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  unlocked: boolean;
}

export type ExerciseType =
  | 'translate'
  | 'match'
  | 'select'
  | 'speak'
  | 'listen';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  answer: string;
  options?: string[];
  pairs?: { word: string; translation: string }[];
  audioUrl?: string;
  imageUrl?: string;
}

export interface UserProgress {
  languageId: string;
  currentUnitId: string;
  completedLessons: string[];
  dailyGoal: number;
  todayXP: number;
}
