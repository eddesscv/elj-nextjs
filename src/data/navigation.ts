// src/data/navigation.ts
import React from 'react';
import {
  Search,
  Trophy,
  Calendar,
  Gamepad2,
  HelpCircle,
  Book,
  Clock,
  Star,
  User,
  Image,
  Lock,
  Grid,
  Tv,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  icon: React.ReactNode;
  page: string;
  type?: 'primary' | 'secondary' | 'category';
  emoji?: string;
  bgColor?: string;
}

// Primary navigation items (used in Sidebar and Mobile Menu)
export const primaryNavigation: NavigationItem[] = [
  {
    name: 'New Releases',
    icon: React.createElement(Clock, { size: 16, className: "text-purple-700" }),
    page: '/new-releases',
    type: 'primary',
  },
  {
    name: 'Popular Quizzes',
    icon: React.createElement(Star, { size: 16, className: "text-purple-700" }),
    page: '/popular-quizzes',
    type: 'primary',
  },
  {
    name: 'Categories',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: '/categories',
    type: 'primary',
  },
  {
    name: 'Lessons',
    icon: React.createElement(Trophy, { className: "w-5 h-5" }),
    page: '/lessons',
    type: 'primary',
  },
  {
    name: 'Quizzes',
    icon: React.createElement(Calendar, { className: "w-5 h-5" }),
    page: '/quizzes',
    type: 'primary',
  },
  {
    name: 'Games',
    icon: React.createElement(Gamepad2, { className: "w-5 h-5" }),
    page: '/games',
    type: 'primary',
  },
  {
    name: 'General Knowledge',
    icon: React.createElement(HelpCircle, { className: "w-5 h-5" }),
    page: '/general-knowledge',
    type: 'primary',
  },
  {
    name: 'Question of the day',
    icon: React.createElement(HelpCircle, { className: "w-5 h-5" }),
    page: '/question-day',
    type: 'primary',
  },
  {
    name: 'Grammar',
    icon: React.createElement(Book, { className: "w-5 h-5" }),
    page: '/grammar',
    type: 'primary',
  },  
  {
    name: 'Riddles',
    icon: React.createElement(HelpCircle, { size: 16, className: "w-5 h-5" }),
    page: '/riddles',
    type: 'primary',
  },  
  {
    name: 'Video Quizzes',
    icon: React.createElement(Tv, { className: "w-5 h-5" }),
    page: '/video-quizzes',
    type: 'primary',
  },
];


// Secondary navigation items (used in Mobile Menu only)
export const secondaryNavigation: NavigationItem[] = [
  {
    name: 'New Releases',
    icon: React.createElement(Clock, { size: 16, className: "text-purple-700" }),
    page: 'new-releases',
    type: 'secondary',
  },
  {
    name: 'Popular Quizzes',
    icon: React.createElement(Star, { size: 16, className: "text-purple-700" }),
    page: 'popular-quizzes',
    type: 'secondary',
  },
  {
    name: 'All Quizzes',
    icon: React.createElement(Book, { size: 16, className: "text-accent" }),
    page: 'all-quizzes',
    type: 'secondary',
  },
  
  {
    name: 'Photo of the Day',
    icon: React.createElement(Image, { size: 16, className: "text-accent" }),
    page: 'photo-day',
    type: 'secondary',
  },
  {
    name: 'Word of the Day',
    icon: React.createElement(Book, { size: 16, className: "text-accent" }),
    page: 'word-day',
    type: 'secondary',
  },
  {
    name: 'Countdown',
    icon: React.createElement(Clock, { size: 16, className: "text-accent" }),
    page: 'countdown',
    type: 'secondary',
  },
  {
    name: 'Coded Word',
    icon: React.createElement(HelpCircle, { size: 16, className: "text-accent" }),
    page: 'coded-word',
    type: 'secondary',
  },
  {
    name: 'Riddles',
    icon: React.createElement(HelpCircle, { size: 16, className: "text-accent" }),
    page: 'riddles',
    type: 'secondary',
  },
  {
    name: 'The Padlock',
    icon: React.createElement(Lock, { size: 16, className: "text-accent" }),
    page: 'padlock',
    type: 'secondary',
  },
  {
    name: 'Tic-Tac-Toe',
    icon: React.createElement(Grid, { size: 16, className: "text-accent" }),
    page: 'tictactoe',
    type: 'secondary',
  },
  {
    name: 'Video Quizzes',
    icon: React.createElement(Tv, { size: 16, className: "text-accent" }),
    page: 'video-quizzes',
    type: 'secondary',
  },
  {
    name: 'Assessments',
    icon: React.createElement(User, { size: 16, className: "text-accent" }),
    page: 'personality-tests',
    type: 'secondary',
  },
];

// Category items (used in Mobile Menu only)
export const categoryNavigation: NavigationItem[] = [
  {
    name: 'General Knowledge',
    emoji: '🧠',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'general-knowledge',
    bgColor: 'bg-card',
    type: 'category',
  },
  {
    name: 'History',
    emoji: '👑',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'history',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    type: 'category',
  },
  {
    name: 'Geography',
    emoji: '🌍',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'geography',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    type: 'category',
  },
  {
    name: 'Cinema',
    emoji: '🍿',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'cinema',
    bgColor: 'bg-red-100 dark:bg-red-900',
    type: 'category',
  },
  {
    name: 'Animals',
    emoji: '🐾',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'animals',
    bgColor: 'bg-green-100 dark:bg-green-900',
    type: 'category',
  },
  {
    name: 'French',
    emoji: '🇫🇷',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'french',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    type: 'category',
  },
  {
    name: 'Sports',
    emoji: '⚽',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'sports',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900',
    type: 'category',
  },
  {
    name: 'Flags',
    emoji: '🇨🇦',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'flags',
    bgColor: 'bg-pink-100 dark:bg-pink-900',
    type: 'category',
  },
  {
    name: 'Capitals',
    emoji: '📌',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'capitals',
    bgColor: 'bg-teal-100 dark:bg-teal-900',
    type: 'category',
  },
  {
    name: 'Disney',
    emoji: '🏰',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'disney',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
    type: 'category',
  },
  {
    name: 'Harry Potter',
    emoji: '⚡',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'harry-potter',
    bgColor: 'bg-amber-100 dark:bg-amber-900',
    type: 'category',
  },
  {
    name: 'Personality Tests',
    emoji: '😈',
    icon: React.createElement(Search, { className: "w-5 h-5" }),
    page: 'personality-tests',
    bgColor: 'bg-lime-100 dark:bg-lime-900',
    type: 'category',
  },
];

// Games items
export const gamesNavigation: NavigationItem[] = [
  {
    name: 'Tic-Tac-Toe',
    icon: React.createElement(Grid, { size: 16, className: "text-accent" }),
    page: 'tictactoe',
  },
  {
    name: 'Word of the Day',
    icon: React.createElement(Book, { size: 16, className: "text-accent" }),
    page: 'word-day',
  },
  {
    name: 'Coded Word',
    icon: React.createElement(HelpCircle, { size: 16, className: "text-accent" }),
    page: 'coded-word',
  },
  {
    name: 'The Padlock',
    icon: React.createElement(Lock, { size: 16, className: "text-accent" }),
    page: 'padlock',
  },
  {
    name: 'All Games',
    icon: React.createElement(Gamepad2, { size: 16, className: "text-accent" }),
    page: 'all-games',
  },
];