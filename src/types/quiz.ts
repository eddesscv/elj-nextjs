export interface Question {
  id: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  questionCount: number;
  hasLessons?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questionCount: number;
  image: string;
  color: string;
}

export interface PersonalityTest {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface FeaturedQuiz {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  category: string;
  answers: {
    questionId: number;
    selectedAnswer: number;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  timeRemaining: number;
  isAnswered: boolean;
  showExplanation: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  content: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'ordering';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}