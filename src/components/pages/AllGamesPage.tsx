import React from 'react';
import { 
  BookOpen, 
  Shuffle, 
  Target, 
  Users, 
  Trophy, 
  Calendar, 
  Lock, 
  Image, 
  Clock, 
  HelpCircle, 
  Grid3X3,
  Play
} from 'lucide-react';

interface AllGamesPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export const AllGamesPage: React.FC<AllGamesPageProps> = ({ onBack, onNavigate }) => {
  const games = [
    {
      id: 'all-quizzes',
      name: 'All Quizzes',
      description: 'Test your knowledge with thousands of questions',
      icon: BookOpen,
      category: 'Quiz',
      difficulty: 'All Levels',
      players: '2.1M',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'mixed-answers',
      name: 'Mixed Answers',
      description: 'Unscramble the correct answers',
      icon: Shuffle,
      category: 'Puzzle',
      difficulty: 'Medium',
      players: '850K',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'correct-order',
      name: 'Correct Order',
      description: 'Put items in the right sequence',
      icon: Target,
      category: 'Logic',
      difficulty: 'Medium',
      players: '720K',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'personality-tests',
      name: 'Personality Tests',
      description: 'Discover more about yourself',
      icon: Users,
      category: 'Psychology',
      difficulty: 'Easy',
      players: '1.2M',
      color: 'from-pink-500 to-purple-600'
    },
    {
      id: 'battles',
      name: 'Quiz Battles',
      description: 'Challenge other players in real-time',
      icon: Trophy,
      category: 'Multiplayer',
      difficulty: 'All Levels',
      players: '650K',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'word-of-day',
      name: 'Word of the Day',
      description: 'Learn a new word every day',
      icon: Calendar,
      category: 'Vocabulary',
      difficulty: 'Easy',
      players: '980K',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'coded-word',
      name: 'Coded Word',
      description: 'Decode the hidden message',
      icon: Lock,
      category: 'Puzzle',
      difficulty: 'Hard',
      players: '420K',
      color: 'from-gray-500 to-gray-700'
    },
    {
      id: 'photo-of-day',
      name: 'Photo of the Day',
      description: 'Guess what\'s in the photo',
      icon: Image,
      category: 'Visual',
      difficulty: 'Medium',
      players: '760K',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'number-game',
      name: 'Number Game',
      description: 'Reach the target with given numbers',
      icon: Clock,
      category: 'Math',
      difficulty: 'Hard',
      players: '340K',
      color: 'from-emerald-500 to-green-600'
    },
    {
      id: 'riddles',
      name: 'Riddles',
      description: 'Solve challenging brain teasers',
      icon: HelpCircle,
      category: 'Logic',
      difficulty: 'Medium',
      players: '580K',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'padlock',
      name: 'The Padlock',
      description: 'Crack the code to unlock',
      icon: Lock,
      category: 'Puzzle',
      difficulty: 'Hard',
      players: '290K',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'tic-tac-toe',
      name: 'Tic-Tac-Toe',
      description: 'Classic strategy game',
      icon: Grid3X3,
      category: 'Strategy',
      difficulty: 'Easy',
      players: '1.5M',
      color: 'from-blue-500 to-indigo-600'
    }
  ];

  const categories = ['All', 'Quiz', 'Puzzle', 'Logic', 'Psychology', 'Multiplayer', 'Vocabulary', 'Visual', 'Math', 'Strategy'];

  return (
    <div className="min-h-screen bg-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="mb-6 bg-card text-text border border-border px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold text-text mb-4">🎮 All Games</h1>
          <p className="text-xl text-subtext">Choose from our collection of educational games and quizzes</p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-card text-text rounded-full border border-border hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => {
            const IconComponent = game.icon;
            return (
              <div
                key={game.id}
                onClick={() => onNavigate(game.id)}
                className="bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 group overflow-hidden border border-border"
              >
                <div className={`h-32 bg-gradient-to-br ${game.color} relative`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {game.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-subtext text-sm mb-4 line-clamp-2">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      game.difficulty === 'Easy' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      game.difficulty === 'Hard' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                      {game.difficulty}
                    </span>
                    <span className="text-xs text-subtext">{game.players} players</span>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 group-hover:scale-105 dark:from-purple-700 dark:to-blue-700 dark:hover:from-purple-800 dark:hover:to-blue-800">
                    <Play className="w-4 h-4" />
                    Play Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card rounded-2xl shadow-lg p-8 border border-border">
          <h2 className="text-2xl font-bold text-text mb-6 text-center">Game Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">12</div>
              <div className="text-sm text-subtext">Total Games</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">8.7M</div>
              <div className="text-sm text-subtext">Total Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15K</div>
              <div className="text-sm text-subtext">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-sm text-subtext">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};