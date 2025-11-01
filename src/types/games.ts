export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'quiz' | 'word' | 'puzzle' | 'daily';
  difficulty?: 'easy' | 'medium' | 'hard';
  isActive: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface DailyQuestion {
  id: string;
  date: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: string;
  sourceQuizId: string;
  sourceQuizTitle: string;
}