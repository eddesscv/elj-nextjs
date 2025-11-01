import React from 'react';
import { 
  BookOpen, 
  Trophy, 
  Calendar, 
  Users, 
  Image, 
  HelpCircle,
  Lock,
  Grid3X3,
  Shuffle,
  Target,
  Clock
} from 'lucide-react';

interface GamesGridProps {
  onNavigate?: (page: string) => void;
  compact?: boolean;
}

export const GamesGrid: React.FC<GamesGridProps> = ({ onNavigate, compact = false }) => {
  const games = [
    { 
      id: 'all-quizzes', 
      name: compact ? 'Quizzes' : 'All Quizzes', 
      icon: BookOpen, 
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' 
    },
    { 
      id: 'mixed-answers', 
      name: compact ? 'Mixed' : 'Mixed Answers', 
      icon: Shuffle, 
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
    },
    { 
      id: 'correct-order', 
      name: compact ? 'Order' : 'Correct Order', 
      icon: Target, 
      color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
    },
    { 
      id: 'personality-tests', 
      name: compact ? 'Personality' : 'Personality Tests', 
      icon: Users, 
      color: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' 
    },
    { 
      id: 'battles', 
      name: compact ? 'Battles' : 'Battles', 
      icon: Trophy, 
      color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
    },
    { 
      id: 'word-of-day', 
      name: compact ? 'Word' : 'Word of the Day', 
      icon: Calendar, 
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
    },
    { 
      id: 'coded-word', 
      name: compact ? 'Coded' : 'Coded Word', 
      icon: Lock, 
      color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' 
    },
    { 
      id: 'photo-of-day', 
      name: compact ? 'Photo' : 'Photo of the Day', 
      icon: Image, 
      color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' 
    },
    { 
      id: 'number-game', 
      name: compact ? 'Numbers' : 'Number Game', 
      icon: Clock, 
      color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' 
    },
    { 
      id: 'riddles', 
      name: compact ? 'Riddles' : 'Riddles', 
      icon: HelpCircle, 
      color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
    },
    { 
      id: 'tic-tac-toe', 
      name: 'Tic-Tac-Toe', 
      icon: Grid3X3, 
      color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' 
    },
    { 
      id: 'padlock', 
      name: 'Padlock', 
      icon: Lock, 
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' 
    },
  ];

  return (
    //<div className="p-4">
    <div>
      {/* <h3 className="font-bold text-lg text-text mb-4">All Games</h3>*/}
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-text">All Games</h3>
        <div className="flex-1">
          <hr className="border-t border-border ml-4" />
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              onClick={() => onNavigate?.(game.id)}
              className={`aspect-square flex flex-col items-center justify-center p-2 ${game.color} rounded-lg hover:opacity-90 shadow-xl hover:shadow-md transition-all`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium text-center">
                {game.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};