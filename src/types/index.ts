export interface User {
  id: string;
  name: string;
  email: string;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  avatarUrl?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  category: 'basic' | 'clinical'; // Temel bilimler vs Klinik bilimler
  color: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  questionCount: number;
  completed: boolean;
  locked: boolean;
  type: 'theory' | 'practice' | 'mixed' | 'exam';
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Subject_Group {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  unlocked: boolean;
  category: 'basic' | 'clinical';
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'case-based';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subjectId: string;
  imageUrl?: string;
  tags?: string[];
}

export interface UserProgress {
  currentSubjectId: string;
  completedTopics: string[];
  dailyQuestionGoal: number;
  todayQuestionsSolved: number;
  weakSubjects: string[]; // Zayıf olduğu konular
  stats: {
    [subjectId: string]: {
      correct: number;
      total: number;
      lastStudied: string;
    };
  };
}
