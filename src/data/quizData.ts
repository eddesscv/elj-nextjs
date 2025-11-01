/* import { QuizCategory, Quiz, PersonalityTest, FeaturedQuiz } from '../types/quiz';

export const popularQuizzes = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Test your general knowledge',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '2.1M'
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master English grammar',
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '1.8M'
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Expand your word power',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '1.5M'
  },
  {
    id: 'pronunciation',
    title: 'Pronunciation',
    description: 'Perfect your pronunciation',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '1.2M'
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Improve reading skills',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '980K'
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Enhance writing abilities',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '850K'
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Sharpen listening skills',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '720K'
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice speaking fluency',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '650K'
  },
  {
    id: 'business-english',
    title: 'Business English',
    description: 'Professional communication',
    image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '580K'
  },
  {
    id: 'idioms',
    title: 'English Idioms',
    description: 'Master common expressions',
    image: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '520K'
  },
  {
    id: 'business-english',
    title: 'Business English',
    description: 'Professional communication',
    image: 'https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '580K'
  }
];

export const newQuizzes = [
  {
    id: 'quiz-1',
    title: 'Quiz: Advanced Grammar Structures',
    category: 'Grammar',
    date: 'August 2, 2024'
  },
  {
    id: 'quiz-2',
    title: 'Quiz: Business English Vocabulary',
    category: 'Vocabulary',
    date: 'August 1, 2024'
  },
  {
    id: 'quiz-3',
    title: 'Quiz: American vs British Pronunciation',
    category: 'Pronunciation',
    date: 'July 31, 2024'
  },
  {
    id: 'quiz-4',
    title: 'Quiz: Reading Comprehension #35',
    category: 'Reading',
    date: 'July 30, 2024'
  }
];

export const categories: QuizCategory[] = [
  {
    id: 'general-knowledge',
    name: 'General Knowledge',
    icon: '🎓',
    description: 'Test your knowledge',
    color: 'from-blue-500 to-purple-600',
    questionCount: 500
  },
  {
    id: 'grammar',
    name: 'Grammar',
    icon: '📚',
    description: 'Master English grammar',
    color: 'from-green-500 to-blue-600',
    questionCount: 300,
    hasLessons: true
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: '🗣️',
    description: 'Expand your vocabulary',
    color: 'from-yellow-500 to-orange-600',
    questionCount: 250,
    hasLessons: true
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation',
    icon: '📖',
    description: 'Perfect pronunciation',
    color: 'from-red-500 to-pink-600',
    questionCount: 200,
    hasLessons: true
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: '✍️',
    description: 'Improve reading skills',
    color: 'from-green-500 to-teal-600',
    questionCount: 180,
    hasLessons: true
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: '👂',
    description: 'Enhance writing skills',
    color: 'from-indigo-500 to-purple-600',
    questionCount: 150,
    hasLessons: true
  },
  {
    id: 'listening',
    name: 'Listening',
    icon: '💬',
    description: 'Sharpen listening skills',
    color: 'from-cyan-500 to-blue-600',
    questionCount: 120,
    hasLessons: true
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: '💼',
    description: 'Practice speaking',
    color: 'from-orange-500 to-red-600',
    questionCount: 100,
    hasLessons: true
  },
  {
    id: 'business',
    name: 'Business English',
    icon: '💼',
    description: 'Professional English',
    color: 'from-blue-600 to-red-600',
    questionCount: 90
  },
  {
    id: 'games',
    name: 'Games',
    icon: '🎮',
    description: 'Fun learning games',
    color: 'from-purple-500 to-pink-600',
    questionCount: 80
  },
  {
    id: 'riddles',
    name: 'Riddles',
    icon: '🧩',
    description: 'English riddles',
    color: 'from-green-600 to-blue-600',
    questionCount: 75
  },
  {
    id: 'idioms',
    name: 'Idioms',
    icon: '🎭',
    description: 'Common idioms',
    color: 'from-red-500 to-yellow-600',
    questionCount: 70
  }
];

export const featuredQuizzes: FeaturedQuiz[] = [
  {
    id: 'grammar-advanced',
    title: 'Advanced Grammar Quiz',
    subtitle: 'True or False? #4',
    image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'business-vocabulary',
    title: 'Business Vocabulary Quiz',
    subtitle: '',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 'pronunciation-american',
    title: 'American Pronunciation',
    subtitle: '',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    subtitle: '',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'writing-skills',
    title: 'Writing Skills Quiz #2',
    subtitle: '',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-600 to-indigo-600'
  }
];

export const personalityTests: PersonalityTest[] = [
  {
    id: 'learning-style',
    title: 'What\'s Your Learning Style?',
    description: 'Discover your learning personality',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'english-level',
    title: 'What\'s Your English Level?',
    description: 'Find your proficiency level',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-500 to-red-600'
  },
  {
    id: 'communication-style',
    title: 'What\'s Your Communication Style?',
    description: 'Discover how you communicate',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-rainbow'
  },
  {
    id: 'motivation-type',
    title: 'What Motivates You to Learn?',
    description: 'Find your learning motivation',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-yellow-500 to-pink-600'
  }
];

export const dailyQuizzes = [
  {
    id: 'day-4161',
    title: 'Daily Test #4161',
    description: 'Test your daily knowledge',
    participants: '15 participants'
  },
  {
    id: 'word-379',
    title: 'Word of the Day #379',
    description: 'Learn a new word today',
    participants: '12 participants'
  },
  {
    id: 'grammar-275',
    title: 'Grammar Challenge #275',
    description: 'Daily grammar practice',
    participants: '8 participants'
  },
  {
    id: 'pronunciation-168',
    title: 'Pronunciation Practice #168',
    description: 'Perfect your pronunciation',
    participants: '20 participants'
  },
  {
    id: 'riddle-564',
    title: 'English Riddle #564',
    description: 'Solve this riddle',
    participants: '18 participants'
  },
  {
    id: 'idiom-522',
    title: 'Idiom of the Day #522',
    description: 'Learn common idioms',
    participants: '6 participants'
  },
  {
    id: 'speed-challenge',
    title: 'Speed Challenge',
    description: 'Quick English quiz',
    participants: '25 participants'
  }
]; */

import {
  QuizCategory,
  Quiz,
  PersonalityTest,
  FeaturedQuiz,
} from '../types/quiz';
import {
  extendedCategories,
  extendedDailyGames,
  extendedFeaturedQuizzes,
  extendedPersonalityTests,
  extendedQuizzes,
} from './extendedQuizData';

export const popularQuizzes = [
  {
    id: 'general-knowledge',
    title: 'General Knowledge',
    description: 'Test your general knowledge',
    image:
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '2.1M',
  },
  {
    id: 'grammar',
    title: 'Grammar',
    description: 'Master English grammar',
    image:
      'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '1.8M',
  },
  {
    id: 'vocabulary',
    title: 'Vocabulary',
    description: 'Expand your word power',
    image:
      'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '1.5M',
  },
  {
    id: 'pronunciation',
    title: 'Pronunciation',
    description: 'Perfect your pronunciation',
    image:
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '1.2M',
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Improve reading skills',
    image:
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '980K',
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Enhance writing abilities',
    image:
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '850K',
  },
  {
    id: 'listening',
    title: 'Listening',
    description: 'Sharpen listening skills',
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '720K',
  },
  {
    id: 'speaking',
    title: 'Speaking',
    description: 'Practice speaking fluency',
    image:
      'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400',
    participants: '650K',
  },
];

export const newQuizzes = [
  {
    id: 'quiz-1',
    title: 'Quiz: Advanced Grammar Structures',
    category: 'Grammar',
    date: 'August 2, 2024',
  },
  {
    id: 'quiz-2',
    title: 'Quiz: Business English Vocabulary',
    category: 'Vocabulary',
    date: 'August 1, 2024',
  },
  {
    id: 'quiz-3',
    title: 'Quiz: American vs British Pronunciation',
    category: 'Pronunciation',
    date: 'July 31, 2024',
  },
  {
    id: 'quiz-4',
    title: 'Quiz: Reading Comprehension #35',
    category: 'Reading',
    date: 'July 30, 2024',
  },
];

// Use extended categories with more content
export const categories: QuizCategory[] = extendedCategories;

// Use extended featured quizzes
export const featuredQuizzes: FeaturedQuiz[] = extendedFeaturedQuizzes;

// Use extended personality tests
export const personalityTests: PersonalityTest[] = extendedPersonalityTests;

// Use extended daily games
export const dailyQuizzes = extendedDailyGames;

// Use extended quizzes with 15 questions each
export const allQuizzes = extendedQuizzes;