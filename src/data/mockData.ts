import { User, Language, Unit, Lesson, Exercise, UserProgress } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Ahmet Yılmaz',
  email: 'ahmet@example.com',
  currentStreak: 7,
  longestStreak: 15,
  totalXP: 2450,
  level: 12,
};

export const languages: Language[] = [
  {
    id: 'en',
    name: 'İngilizce',
    flag: '🇬🇧',
    nativeName: 'English',
    color: '#58CC02',
  },
  {
    id: 'es',
    name: 'İspanyolca',
    flag: '🇪🇸',
    nativeName: 'Español',
    color: '#FF9600',
  },
  {
    id: 'fr',
    name: 'Fransızca',
    flag: '🇫🇷',
    nativeName: 'Français',
    color: '#1CB0F6',
  },
  {
    id: 'de',
    name: 'Almanca',
    flag: '🇩🇪',
    nativeName: 'Deutsch',
    color: '#CE82FF',
  },
];

const exercises1: Exercise[] = [
  {
    id: 'ex1',
    type: 'select',
    question: 'İngilizce\'de "merhaba" nasıl söylenir?',
    answer: 'Hello',
    options: ['Hello', 'Goodbye', 'Thanks', 'Please'],
  },
  {
    id: 'ex2',
    type: 'translate',
    question: 'How are you?',
    answer: 'Nasılsın',
  },
  {
    id: 'ex3',
    type: 'match',
    question: 'Kelimeleri eşleştirin',
    answer: '',
    pairs: [
      { word: 'Hello', translation: 'Merhaba' },
      { word: 'Goodbye', translation: 'Güle güle' },
      { word: 'Thanks', translation: 'Teşekkürler' },
      { word: 'Please', translation: 'Lütfen' },
    ],
  },
];

const exercises2: Exercise[] = [
  {
    id: 'ex4',
    type: 'select',
    question: '"Elma" kelimesinin İngilizce karşılığı nedir?',
    answer: 'Apple',
    options: ['Apple', 'Orange', 'Banana', 'Grape'],
  },
  {
    id: 'ex5',
    type: 'translate',
    question: 'I like coffee',
    answer: 'Kahve severim',
  },
  {
    id: 'ex6',
    type: 'select',
    question: '"Water" kelimesinin anlamı nedir?',
    answer: 'Su',
    options: ['Su', 'Süt', 'Çay', 'Kahve'],
  },
];

const exercises3: Exercise[] = [
  {
    id: 'ex7',
    type: 'match',
    question: 'Sayıları eşleştirin',
    answer: '',
    pairs: [
      { word: 'One', translation: 'Bir' },
      { word: 'Two', translation: 'İki' },
      { word: 'Three', translation: 'Üç' },
      { word: 'Four', translation: 'Dört' },
    ],
  },
  {
    id: 'ex8',
    type: 'select',
    question: '"Five" kelimesinin anlamı nedir?',
    answer: 'Beş',
    options: ['Beş', 'Altı', 'Yedi', 'Sekiz'],
  },
  {
    id: 'ex9',
    type: 'translate',
    question: 'I have three cats',
    answer: 'Üç kedim var',
  },
];

const exercises4: Exercise[] = [
  {
    id: 'ex10',
    type: 'select',
    question: '"Red" kelimesinin anlamı nedir?',
    answer: 'Kırmızı',
    options: ['Kırmızı', 'Mavi', 'Yeşil', 'Sarı'],
  },
  {
    id: 'ex11',
    type: 'translate',
    question: 'The sky is blue',
    answer: 'Gökyüzü mavi',
  },
  {
    id: 'ex12',
    type: 'match',
    question: 'Renkleri eşleştirin',
    answer: '',
    pairs: [
      { word: 'Red', translation: 'Kırmızı' },
      { word: 'Blue', translation: 'Mavi' },
      { word: 'Green', translation: 'Yeşil' },
      { word: 'Yellow', translation: 'Sarı' },
    ],
  },
];

export const units: Unit[] = [
  {
    id: 'unit1',
    title: 'Ünite 1',
    description: 'Temel selamlaşmalar ve tanışma',
    unlocked: true,
    lessons: [
      {
        id: 'lesson1',
        unitId: 'unit1',
        title: 'Selamlaşma',
        description: 'Temel selamlaşma ifadelerini öğrenin',
        xp: 10,
        completed: true,
        locked: false,
        type: 'lesson',
        exercises: exercises1,
      },
      {
        id: 'lesson2',
        unitId: 'unit1',
        title: 'Yiyecekler',
        description: 'Temel yiyecek isimleri',
        xp: 15,
        completed: true,
        locked: false,
        type: 'lesson',
        exercises: exercises2,
      },
      {
        id: 'practice1',
        unitId: 'unit1',
        title: 'Pratik',
        description: 'Öğrendiklerinizi pekiştirin',
        xp: 20,
        completed: false,
        locked: false,
        type: 'practice',
        exercises: [...exercises1, ...exercises2],
      },
    ],
  },
  {
    id: 'unit2',
    title: 'Ünite 2',
    description: 'Sayılar ve renkler',
    unlocked: true,
    lessons: [
      {
        id: 'lesson3',
        unitId: 'unit2',
        title: 'Sayılar',
        description: '1-10 arası sayıları öğrenin',
        xp: 10,
        completed: false,
        locked: false,
        type: 'lesson',
        exercises: exercises3,
      },
      {
        id: 'lesson4',
        unitId: 'unit2',
        title: 'Renkler',
        description: 'Temel renk isimleri',
        xp: 15,
        completed: false,
        locked: false,
        type: 'lesson',
        exercises: exercises4,
      },
      {
        id: 'story1',
        unitId: 'unit2',
        title: 'Hikaye',
        description: 'Eğlenceli bir hikaye okuyun',
        xp: 25,
        completed: false,
        locked: false,
        type: 'story',
        exercises: exercises3,
      },
    ],
  },
  {
    id: 'unit3',
    title: 'Ünite 3',
    description: 'Günlük rutinler',
    unlocked: false,
    lessons: [
      {
        id: 'lesson5',
        unitId: 'unit3',
        title: 'Günlük aktiviteler',
        description: 'Günlük aktiviteleri anlatın',
        xp: 20,
        completed: false,
        locked: true,
        type: 'lesson',
        exercises: exercises1,
      },
    ],
  },
];

export const userProgress: UserProgress = {
  languageId: 'en',
  currentUnitId: 'unit2',
  completedLessons: ['lesson1', 'lesson2'],
  dailyGoal: 50,
  todayXP: 35,
};
